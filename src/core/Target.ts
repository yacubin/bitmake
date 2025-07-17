/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { SourceFile } from "@/core/SourceFile";
import { TargetName } from "@/core/TargetName";
import { TargetFile } from "@/core/TargetFile";
import { TargetIncludes } from "@/core/TargetIncludes";
import { TargetObjects } from "@/core/TargetObjects";
import { AbsolutePath } from "@/core/AbsolutePath";
import { normalizeDefinitions } from "@/core/DefinitionHelper";
import { SimpleObject } from "./SimpleObject";
import { ALL_TARGET, INSTALL_TARGET } from "@/Constants";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

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
  protected _language = "";
  protected _compilerPath = "";
  protected _compilerFlags = new Array<string>;

  constructor(options: BaseTargetOptions) {
    const name = options.name;
    if (typeof name !== "string")
      throw new Error(`Target "${name}" is not string type`);

    if (!name)
      throw new Error(`A target with an empty name cannot exist`);

    if ([ ALL_TARGET, INSTALL_TARGET ].includes(name))
      throw new Error(`Target "${name}" is reserved name`);

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

  public addInclude(publicOnly: boolean, value: AbsolutePath | TargetIncludes): void {
    this._includes.push({publicOnly, value});
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

  public getAllSources() {
    return this._sources;
  }

  public getSourceFiles(): SourceFile[] {
    return this._sources.map(i => i.value).filter(i => i instanceof SourceFile);
  }

  public getTargetObjects(): TargetObjects[] {
    return this._sources.map(i => i.value).filter(i => i instanceof TargetObjects);
  }

  public addSource(source: TargetObjects | SourceFile) {
    this._sources.push({publicOnly: false, value: source});
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

  public get language(): string {
    return this._language;
  }

  public set language(value: string) {
    this._language = value;
  }

  public get compilerPath(): string {
    return this._compilerPath;
  }

  public set compilerPath(value: string) {
    this._compilerPath = value;
  }

  public get compilerFlags(): string[] {
    return this._compilerFlags;
  }

  public set compilerFlags(value: string[]) {
    this._compilerFlags = value;
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

  private constructor(options: BaseTargetOptions) {
    super(options);
  }

  public static create(options: BaseTargetOptions) {
    return Object.seal(new PostTarget(options));
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
  linkOptions: Array<string | string[]>;
};

export class MainTarget extends BaseTarget {
  private _prefix: string;
  private _suffix: string;
  private _outputName: string;
  private _positionIndependentCode = false;

  protected constructor(options: TargetOptions) {
    super(options);

    this._prefix = options.prefix;
    this._suffix = options.suffix;
    this._outputName = options.name;

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
  private constructor(options: TargetOptions) {
    super(options);
  }

  public static create(options: TargetOptions) {
    return Object.seal(new ObjectLibrary(options));
  }

  public toJSON(): SimpleObject {
    const result: any = super.toJSON();
    result.type = ObjectLibrary.name;
    return result;
  }
};

export class StaticLibrary extends MainTarget {
  private constructor(options: TargetOptions) {
    super(options);
  }

  public static create(options: TargetOptions) {
    return Object.seal(new StaticLibrary(options));
  }

  public toJSON(): SimpleObject {
    const result: any = super.toJSON();
    result.type = StaticLibrary.name;
    return result;
  }
};

export class SharedLibrary extends MainTarget {
  private constructor(options: TargetOptions) {
    super(options);
  }

  public static create(options: TargetOptions) {
    return Object.seal(new SharedLibrary(options));
  }

  public toJSON(): SimpleObject {
    const result: any = super.toJSON();
    result.type = SharedLibrary.name;
    return result;
  }
}

export class Executable extends MainTarget {
  private constructor(options: TargetOptions) {
    super(options);
  }

  public static create(options: TargetOptions) {
    return Object.seal(new Executable(options));
  }

  public toJSON(): SimpleObject {
    const result: any = super.toJSON();
    result.type = Executable.name;
    return result;
  }
};
