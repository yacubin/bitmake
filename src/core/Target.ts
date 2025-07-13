/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceTarget } from "@/core/MakeInterfaces";
import { SourceFile } from "@/core/SourceFile";
import { SourceFileList } from "@/core/SourceFileList";
import { TargetName } from "@/core/TargetName";
import { TargetFile } from "@/core/TargetFile";
import { TargetIncludes } from "@/core/TargetIncludes";
import { TargetObjects } from "@/core/TargetObjects";
import { AbsolutePath } from "@/core/AbsolutePath";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { SystemScope } from "@/core/SystemScope";
import { SYSTEM_VARIABLE_GROUP } from "@/Constants";
import { normalizeDefinitions } from "@/core/DefinitionHelper";
import { SimpleObject } from "./SimpleObject";
import { ALL_TARGET, INSTALL_TARGET } from "@/Constants";

const _languageExtensions = {
  ASM: [ ".asm", ".s" ],
  C:   [ ".c" ],
  CXX: [".cpp", ".cc", ".cxx" ],
};

function normalizeIncludes(baseDir: AbsolutePath, ...includes: any[]): Array<AbsolutePath | TargetIncludes> {
  const result = [];
  for (const iter of includes.flat()) {
    if (iter instanceof TargetIncludes)
      result.push(iter);
    else if (typeof iter === "string")
      result.push(AbsolutePath.create(baseDir.resolve(iter)));
    else if (iter instanceof AbsolutePath)
      result.push(AbsolutePath.create(iter));
    else
      throw new Error(`Not support instance ${iter}`);
  }
  return result;
}

function isSupportLanguage(language: string) {
  return _languageExtensions.hasOwnProperty(language);
}

function getFileLanguage(filename: string) {
  const filenameLowerCase = filename.toLowerCase();
  for (const [language, extensions] of Object.entries(_languageExtensions)) {
    for (const iter of extensions) {
      if (filenameLowerCase.endsWith(iter))
        return language;
    }
  }
  return "";
}

function makeLanguage(value: string) {
  if (isSupportLanguage(value))
    return value;
  throw new Error(`Language "${value}" is not supported`);
}

function createSources(scope: SystemScope, source: TargetObjects | SourceFile | AbsolutePath | string): TargetObjects | SourceFile {
  if (source instanceof TargetObjects || source instanceof SourceFile)
    return source;

  if (typeof source === "string" || AbsolutePath.isAbsolute(source)) {
    const filename = scope.SOURCE_DIR.resolve(source);
    const language = getFileLanguage(filename.toString());
    const compileFlags = !language ? [] : [
      ...(scope as any)[language + "_FLAGS"],
      ...(scope as any)[language + "_FLAGS_" + scope.BUILD_TYPE.toUpperCase()],
    ];
    return SourceFile.create(filename, scope.SOURCE_DIR, language, compileFlags);
  }
  
  throw new Error(`Not support instance ${source}`);
}

export interface TargetCommand {
  command: string | AbsolutePath | TargetFile;
  args: Array<string | AbsolutePath | TargetFile>;
};

function makeTargetCommand(_command: any, _args: any[]): TargetCommand {
  let command: string | AbsolutePath | TargetFile;
  if (typeof _command === "string")
    command = _command;
  else if (_command instanceof TargetFile)
    command = _command;
  else if (_command instanceof AbsolutePath)
    command = _command;
  else
    throw new TypeError(`Wrong type ${_command} for command`);

  const args = new Array<string | AbsolutePath | TargetFile>;
  for (const iter of _args) {
    if (typeof iter === "string")
      args.push(iter);
    else if (iter instanceof TargetFile)
      args.push(iter);
    else if (iter instanceof AbsolutePath)
      args.push(iter);
    else
      throw new TypeError(`Wrong type ${iter} for argument`);
  }

  return { command, args };
}

const TARGET_SCOPE = Symbol("TARGET_SCOPE");

interface TargetValue<T> {
  value: T;
  publicOnly: boolean;
};

type TargetValueList<T> = Array<TargetValue<T>>;

export interface BaseTargetOptions {
  name: string;
  sourceDir: AbsolutePath;
  binaryDir: AbsolutePath;
};

export abstract class BaseTarget {
  protected [TARGET_SCOPE]: SystemScope;

  protected _name: string;
  protected _sourceDir: AbsolutePath;
  protected _binaryDir: AbsolutePath;
  protected _includes: TargetValueList<AbsolutePath | TargetIncludes>;
  protected _definitions: TargetValueList<string>;
  protected _compileOptions: TargetValueList<string | string[]>;
  protected _linkOptions: TargetValueList<string | string[]>;
  protected _libraries: TargetValueList<TargetName>;
  protected _sources: TargetValueList<TargetObjects | SourceFile>;
  protected _preBuildList: TargetCommand[];
  protected _postBuildList: TargetCommand[];

  constructor(variableMap: VariableMap, options: BaseTargetOptions) {
    const name = options.name;
    if (typeof name !== "string")
      throw new Error(`Target "${name}" is not string type`);

    if (!name)
      throw new Error(`A target with an empty name cannot exist`);

    if ([ ALL_TARGET, INSTALL_TARGET ].includes(name))
      throw new Error(`Target "${name}" is reserved name`);

    const variables = ScopeHelper.createVariableValues(variableMap, SYSTEM_VARIABLE_GROUP) as SystemScope;
    this[TARGET_SCOPE] = variables;
    this._name = options.name;
    this._sourceDir = options.sourceDir;
    this._binaryDir = options.binaryDir;
    this._includes = [];
    this._definitions = [];
    this._compileOptions = [];
    this._linkOptions = [];
    this._libraries = [];
    this._sources = [];
    this._preBuildList = [];
    this._postBuildList = [];
  }

  abstract setPrefix(value: string) : void;
  abstract setOutputName(value: any) : void;
  abstract setSuffix(value: string) : void;
  abstract setPositionIndependentCode(value: boolean) : void;

  public get targetName() {
    return this._name;
  }

  public get name() { // DELME
    return this._name;
  }

  public get sourceDir() {
    return this._sourceDir;
  }

  public get binaryDir() {
    return this._binaryDir;
  }

  public get includes(): TargetIncludes {
    return TargetIncludes.create(this._name);
  }

  public get objects(): TargetObjects {
    return TargetObjects.create(this._name);
  }

  public get targetFile(): TargetFile {
    return TargetFile.create(this._name);
  }

  public getIncludes(): Array<AbsolutePath | TargetIncludes> {
    return this._includes.map(i => i.value);
  }

  public getPublicIncludes(): Array<AbsolutePath | TargetIncludes> {
    return this._includes.filter(i => i.publicOnly).map(i => i.value);
  }

  public addIncludes(...includes: Array<TargetIncludes | AbsolutePath | string>): void {
    this.addIncludesImpl(false, ...includes);
  }

  public addPublicIncludes(...includes: Array<TargetIncludes | AbsolutePath | string>): void {
    this.addIncludesImpl(true, ...includes);
  }

  public addIncludeImpl(publicOnly: boolean, value: AbsolutePath | TargetIncludes): void {
    this._includes.push({publicOnly, value});
  }

  public addIncludesImpl(publicOnly: boolean, ...includes: Array<TargetIncludes | AbsolutePath | string>): void {
    for (const iter of normalizeIncludes(this._sourceDir, ...includes))
      this.addIncludeImpl(publicOnly, iter);
  }

  public getDefinitions(): Array<string> {
    return this._definitions.map(i => i.value);
  }

  public getPublicDefinitions(): Array<string> {
    return this._definitions.filter(i => i.publicOnly).map(i => i.value);
  }

  public addDefinitions(...definitions: any): void {
    this.addDefinitionsImpl(false, ...definitions);
  }

  public addPublicDefinitions(...definitions: any): void {
    this.addDefinitionsImpl(true, ...definitions);
  }

  public addDefinitionsImpl(publicOnly: boolean, ...definitions: Array<string | object>): void {
    for (const value of normalizeDefinitions(...definitions))
      this._definitions.push({publicOnly, value});
  }

  public getCompileOptions(): Array<string | string[]> {
    return this._compileOptions.map(i => i.value);
  }
  
  public getPublicCompileOptions(): Array<string|string[]> {
    return this._compileOptions.filter(i => i.publicOnly).map(i => i.value);
  }

  public addCompileOptions(...options: Array<string | string[]>): void {
    this.addCompileOptionsImpl(false, ...options);
  }

  public addPublicCompileOptions(...options: Array<string | string[]>): void {
    this.addCompileOptionsImpl(true, ...options);
  }

  public addCompileOptionsImpl(publicOnly: boolean, ...options: Array<string | string[]>): void {
    for (const value of options.flat())
      this._compileOptions.push({publicOnly, value});
  }

  public getLinkOptions(): Array<string | string[]> {
    return this._linkOptions.map(i => i.value);
  }

  public getPublicLinkOptions(): Array<string | string[]> {
    return this._linkOptions.filter(i => i.publicOnly).map(i => i.value);
  }

  public addLinkOptions(...options: Array<string | string[]>) {
    this.addLinkOptionsImpl(false, ...options);
  }

  public addPublicLinkOptions(...options: Array<string | string[]>) {
    this.addLinkOptionsImpl(true, ...options);
  }

  public addLinkOptionsImpl(publicOnly: boolean, ...options: Array<string | string[]>) {
    for (const value of options.flat())
      this._linkOptions.push({publicOnly, value});
  }

  public getLibraries() {
    return this._libraries.map(i => i.value);
  }

  public getPublicLibraries() {
    return this._libraries.filter(i => i.publicOnly).map(i => i.value);
  }

  public addLibraries(...libraries: PostTarget[]) {
    this.addLibrariesImpl(false, ...libraries);
  }

  public addPublicLibraries(...libraries: PostTarget[]) {
    this.addLibrariesImpl(true, ...libraries);
  }

  public addLibrariesImpl(publicOnly: boolean, ...libraries: PostTarget[]) {
    for (const iter of libraries.flat())
      this._libraries.push({publicOnly, value: TargetName.create(iter.targetName)});
  }

  public getHeaders(): SourceFile[] {
    const result = new Array<SourceFile>;
    for (const iter of this._sources) {
      if (iter.value instanceof SourceFile && iter.value.HEADER_FILE_ONLY)
        result.push(iter.value);
    }
    return result;
  }

  public getSources() {
    return this._sources;
  }

  public getSourceFileList(): SourceFile[] {
    return this._sources.map(i => i.value).filter(i => i instanceof SourceFile);
  }

  public getTargetObjectsList(): TargetObjects[] {
    return this._sources.map(i => i.value).filter(i => i instanceof TargetObjects);
  }

  public getSourceFiles(...sources: any[]): SourceFileList {
    const result = [];
    const scope = this[TARGET_SCOPE];
    const sourceFiles = this.getSourceFileList();
    for (const it of sources.flat()) {
      const filename = scope.SOURCE_DIR.resolve(it).toString();
      const src = sourceFiles.find(i => i.FILE.toString() === filename);
      if (!src)
        throw new Error(`Cannot find "${it}"`);
      result.push(src);
    }

    if (result.length)
      return SourceFileList.create(scope, result);

    return SourceFileList.create(scope, sourceFiles);
  }

  public addSources(...sources: Array<TargetObjects | SourceFile | AbsolutePath | string>) {
    for (let it of sources.flat()) {
      this._sources.push({publicOnly: false, value: createSources(this[TARGET_SCOPE], it)});
    }
  }

  public get preBuildList() {
    return this._preBuildList;
  }

  public addPreBuild(command: any, args: any[]) {
    this._preBuildList.push(makeTargetCommand(command, args));
  }

  public get postBuildList() {
    return this._postBuildList;
  }

  public addPostBuild(command: any, args: any[]) {
    this._postBuildList.push(makeTargetCommand(command, args));
  }

  public toJSON(): object {
    return {
      name: this._name,
      sourceDir: this._sourceDir,
      binaryDir: this._binaryDir,
      preBuildList: this._preBuildList,
      postBuildList: this._postBuildList,
      includes: this._includes,
      compileOptions: this._compileOptions,
      linkOptions: this._linkOptions,
      sources: this._sources,
      libraries: this._libraries,
    }
  }
};

export class PostTarget extends BaseTarget {
  private _prefix?: string;
  private _outputName?: string;
  private _suffix?: string;
  private _positionIndependentCode?: boolean;

  private constructor(variableMap: VariableMap, options: BaseTargetOptions) {
    super(variableMap, options);
  }

  public static create(variableMap: VariableMap, options: BaseTargetOptions) {
    return Object.seal(new PostTarget(variableMap, options));
  }

  public static ensureInstance(value: any) {
    if (value instanceof PostTarget)
      return value;
    throw new Error(`The '${value}' is not a PostTarget`);
  }

  public get prefix() {
    return this._prefix;
  }

  public setPrefix(value: string) {
    this._prefix = value;
  }

  public get outputName() {
    return this._outputName;
  }

  public setOutputName(value: any) {
    this._outputName = value;
  }

  public get suffix() {
    return this._suffix;
  }

  public setSuffix(value: string) {
    this._suffix = value;
  }

  public get positionIndependentCode() {
    return this._positionIndependentCode;
  }

  public setPositionIndependentCode(value: boolean) {
    this._positionIndependentCode = value;
  }

  public get INCLUDES() {
    return this._includes;
  }

  public get DEFINITIONS() {
    return this._definitions;
  }

  public get COMPILE_OPTIONS() {
    return this._compileOptions;
  }

  public get LINK_OPTIONS() {
    return this._linkOptions;
  }

  public get LIBRARIES() {
    return this._libraries;
  }

  public get SOURCES() {
    return this._sources;
  }

  public toJSON(): SimpleObject {
    const result: any = super.toJSON();

    result.type = PostTarget.name;
    
    if (this._prefix !== undefined)
      result.prefix = this._prefix;

    if (this._outputName !== undefined)
      result.outputName = this._outputName;

    if (this._suffix !== undefined)
      result.suffix = this._suffix;

    if (this._positionIndependentCode !== undefined)
      result.positionIndependentCode = this._positionIndependentCode;

    return result;
  }
};

export interface TargetOptions extends BaseTargetOptions {
  name: string;
  sourceDir: AbsolutePath;
  binaryDir: AbsolutePath;
  prefix: string;
  suffix: string;
  positionIndependentCode: boolean;
  includes: Array<TargetIncludes | AbsolutePath | string>;
  linkOptions: Array<string | string[]>;
};

export class MainTarget extends BaseTarget {
  protected _prefix: string;
  protected _suffix: string;
  protected _outputName: string;
  protected _positionIndependentCode: boolean;

  protected constructor(variableMap: VariableMap, options: TargetOptions) {
    super(variableMap, options);

    this._prefix = options.prefix;
    this._suffix = options.suffix;
    this._outputName = options.name;
    this._positionIndependentCode = options.positionIndependentCode;

    this.addIncludesImpl(false, ...options.includes);
    this.addLinkOptionsImpl(false, ...options.linkOptions);
  }

  public getFileDir() {
    return this._binaryDir;
  }

  public getFileName() {
    return this.prefix + this.outputName + this.suffix;
  }

  public getFile() {
    return this._binaryDir.join(this.getFileName());
  }

  public get prefix() {
    return this._prefix;
  }

  public setPrefix(value: string) {
    this._prefix = value;
  }

  public get suffix() {
    return this._suffix;
  }

  public setSuffix(value: any) {
    this._suffix = value;
  }

  public get outputName() {
    return this._outputName;
  }

  public setOutputName(value: any) {
    this._outputName = value;
  }

  public get TARGET_SCOPE() {
    return this[TARGET_SCOPE];
  }

  public get positionIndependentCode() {
    return this._positionIndependentCode;
  }

  public setPositionIndependentCode(value: boolean) {
    this._positionIndependentCode = value;
  }

  public postUpdate(target: PostTarget) {
    if (target.prefix !== undefined)
      this._prefix = target.prefix;
    if (target.outputName !== undefined)
      this._outputName = target.outputName;
    if (target.suffix !== undefined)
      this._suffix = target.suffix;
    if (target.positionIndependentCode !== undefined)
      this._positionIndependentCode = target.positionIndependentCode;
    this._includes.push(...target.INCLUDES);
    this._definitions.push(...target.DEFINITIONS);
    this._compileOptions.push(...target.COMPILE_OPTIONS);
    this._linkOptions.push(...target.LINK_OPTIONS);
    this._libraries.push(...target.LIBRARIES);
    this._sources.push(...target.SOURCES);
    this._preBuildList.push(...target.preBuildList);
    this._postBuildList.push(...target.postBuildList);
  }

  public toJSON(): object {
    const result: any = super.toJSON();

    result.prefix = this._prefix;
    result.outputName = this._outputName;
    result.suffix = this._suffix;
    result.positionIndependentCode = this._positionIndependentCode;

    return result;
  }
};

export class ObjectLibrary extends MainTarget {
  private constructor(variableMap: VariableMap, options: TargetOptions) {
    super(variableMap, options);
  }

  public static create(variableMap: VariableMap, options: TargetOptions) {
    return Object.seal(new ObjectLibrary(variableMap, options));
  }

  public toJSON(): SimpleObject {
    const result: any = super.toJSON();
    result.type = ObjectLibrary.name;
    return result;
  }
};

export class StaticLibrary extends MainTarget {
  private constructor(variableMap: VariableMap, options: TargetOptions) {
    super(variableMap, options);
  }

  public static create(variableMap: VariableMap, options: TargetOptions) {
    return Object.seal(new StaticLibrary(variableMap, options));
  }

  public toJSON(): SimpleObject {
    const result: any = super.toJSON();
    result.type = StaticLibrary.name;
    return result;
  }
};

export class SharedLibrary extends MainTarget {
  private constructor(variableMap: VariableMap, options: TargetOptions) {
    super(variableMap, options);
  }

  public static create(variableMap: VariableMap, options: TargetOptions) {
    return Object.seal(new SharedLibrary(variableMap, options));
  }

  public toJSON(): SimpleObject {
    const result: any = super.toJSON();
    result.type = SharedLibrary.name;
    return result;
  }
}

export class Executable extends MainTarget {
  private constructor(variableMap: VariableMap, options: TargetOptions) {
    super(variableMap, options);
  }

  public static create(variableMap: VariableMap, options: TargetOptions) {
    return Object.seal(new Executable(variableMap, options));
  }

  public toJSON(): SimpleObject {
    const result: any = super.toJSON();
    result.type = Executable.name;
    return result;
  }
};
