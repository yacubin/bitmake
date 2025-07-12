/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMakeTarget, IObjectLibrary, IStaticLibrary, ISharedLibrary, IExecutable } from "@/core/MakeInterfaces";
import { SourceFile } from "@/core/SourceFile";
import { SourceFileList } from "@/core/SourceFileList";
import { InterfaceIncludes } from "@/core/InterfaceIncludes";
import { InterfaceObjects } from "@/core/InterfaceObjects";
import { AbsolutePath } from "@/core/AbsolutePath";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { SystemScope } from "@/core/SystemScope";
import { TargetStruct, TargetType, LiveString } from "@/core/TargetStruct";
import { SYSTEM_VARIABLE_GROUP } from "@/Constants";
import { normalizeDefinitions } from "@/core/DefinitionHelper";

const _languageExtensions = {
  ASM: [ ".asm", ".s" ],
  C:   [ ".c" ],
  CXX: [".cpp", ".cc", ".cxx" ],
};

function normalizeIncludes(baseDir: AbsolutePath, ...includes: any[]): Array<AbsolutePath|InterfaceIncludes> {
  const result = [];
  for (const iter of includes.flat()) {
    if (iter instanceof InterfaceIncludes)
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

function createSources(scope: SystemScope, source: InterfaceObjects | SourceFile | AbsolutePath | string): InterfaceObjects | SourceFile {
  if (source instanceof InterfaceObjects || source instanceof SourceFile)
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

function getSourceFiles(impl: TargetStruct, scope: SystemScope, ...sources: any[]): SourceFileList {
  const result = [];
  const sourceFiles = impl.getSourceFiles();
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

const IMPL                = Symbol("IMPL");
const TARGET_SCOPE        = Symbol("TARGET_SCOPE");

interface TargetValue<T> {
  value: T;
  publicOnly: boolean;
};

type TargetValueList<T> = Array<TargetValue<T>>;

export class UserIndirectTarget implements IMakeTarget {
  private [IMPL]: TargetStruct;
  private [TARGET_SCOPE]: SystemScope;
  private _name: string;
  private _prefix?: string;
  private _outputName?: string;
  private _suffix?: string;
  private _positionIndependentCode?: boolean;
  private _includes: TargetValueList<AbsolutePath | InterfaceIncludes>;
  private _definitions: TargetValueList<string>;

  private constructor(impl: TargetStruct, variableMap: VariableMap, name: string) {
    const variables = ScopeHelper.createVariableValues(variableMap, SYSTEM_VARIABLE_GROUP) as SystemScope;
    this[IMPL] = impl;
    this[TARGET_SCOPE] = variables;
    this._name = name;
    this._includes = [];
    this._definitions = [];
  }

  public static create(impl: TargetStruct, variableMap: VariableMap, name: string) {
    return Object.seal(new UserIndirectTarget(impl, variableMap, name));
  }

  public static ensureInstance(value: any) {
    if (value instanceof UserIndirectTarget)
      return value;
    throw new Error(`The '${value}' is not a UserIndirectTarget`);
  }

  public get targetName(): string {
    return this._name;
  }

  public get includes(): InterfaceIncludes {
    return InterfaceIncludes.create(this.targetName);
  }

  public get objects(): InterfaceObjects {
    return InterfaceObjects.create(this.targetName);
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

  public toJSON(): string {
    return this.toString();
  }

  public toString(): string {
    return "${" + this.targetName + "}";
  }

  public addSources(...sources: Array<InterfaceObjects | SourceFile | AbsolutePath | string>): void {
    for (let it of sources.flat()) {
      this[IMPL].addSource("indirectly", false, createSources(this[TARGET_SCOPE], it));
    }
  }

  public getIncludes() {
    return this._includes;
  }

  public addIncludes(...includes: Array<InterfaceIncludes | AbsolutePath | string>): void {
    this.addIncludesImpl(false, ...includes);
  }

  public addPublicIncludes(...includes: Array<InterfaceIncludes | AbsolutePath | string>): void {
    this.addIncludesImpl(true, ...includes);
  }

  public addIncludesImpl(publicOnly: boolean, ...includes: Array<InterfaceIncludes | AbsolutePath | string>): void {
    const baseDir = this[TARGET_SCOPE].SOURCE_DIR;
    for (const value of normalizeIncludes(baseDir, ...includes))
      this._includes.push({publicOnly, value});
  }

  public getDefinitions() {
    return this._definitions;
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

  public addCompileOptions(...options: Array<string|string[]>): void {
    this[IMPL].addCompileOptions("indirectly", false, ...options);
  }

  public addPublicCompileOptions(...options: string[]): void {
    this[IMPL].addCompileOptions("indirectly", true, ...options);
  }

  public addLinkOptions(...options: Array<string|string[]>): void {
    this[IMPL].addLinkOptions("indirectly", false, ...options);
  }

  public addPublicLinkOptions(...options: string[]): void {
    this[IMPL].addLinkOptions("indirectly", true, ...options);
  }

  public getSourceFiles(...sources: any[]): SourceFileList {
    return getSourceFiles(this[IMPL], this[TARGET_SCOPE], ...sources);
  }

  public addLibraries(...libraries: any) {
    new Error("Not Implemented");
  }

  public addPreBuild(command: any, args: any[]) {
    new Error("Not Implemented");
  }

  public addPostBuild(command: any, args: any[]) {
    new Error("Not Implemented");
  }

  public get positionIndependentCode() {
    return this._positionIndependentCode;
  }

  public setPositionIndependentCode(value: boolean) {
    this._positionIndependentCode = value;
  }

  public addPublicLibraries(...libraries: any[]) {
    new Error("Not Implemented");
  }
};

export class BaseTarget implements IMakeTarget {
  private [IMPL]: TargetStruct;
  private [TARGET_SCOPE]: SystemScope;

  protected _name: string;
  protected _prefix = "";
  protected _outputName: string;
  protected _suffix = "";

  private _positionIndependentCode: boolean;
  private _includes: TargetValueList<AbsolutePath | InterfaceIncludes> = [];
  private _definitions: TargetValueList<string> = [];

  protected constructor(impl: TargetStruct, variableMap: VariableMap, name: string) {
    this[IMPL] = impl;
    this._name = name;
    this._outputName = name;

    const scope = ScopeHelper.createVariableValues(variableMap) as SystemScope;
    const targetFile = impl.targetFile;
    targetFile.fileDir = scope.BINARY_DIR;

    this._positionIndependentCode = scope.POSITION_INDEPENDENT_CODE;

    this[TARGET_SCOPE] = scope;

    this.addIncludesImpl(false, ...scope.INCLUDES);
  }

  public get targetName() {
    return this._name;
  }

  public get includes(): InterfaceIncludes {
    return InterfaceIncludes.create(this.targetName);
  }

  public get objects(): InterfaceObjects {
    return InterfaceObjects.create(this.targetName);
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

  public get FILE_DIR(): AbsolutePath {
    if (!this[IMPL].targetFile.fileDir)
      throw new Error(`Target "${this.targetName}" is not defined`);
    return this[IMPL].targetFile.fileDir;
  }

  public get FILE_NAME(): string {
    if (!this[IMPL].targetFile.fileName)
      throw new Error(`Target "${this.targetName}" is not defined`);
    return this[IMPL].targetFile.fileName;
  }

  public get FILE(): AbsolutePath {
    if (!this[IMPL].targetFile.file)
      throw new Error(`Target "${this.targetName}" is not defined`);
    return this[IMPL].targetFile.file;
  }

  public get IMPL(): TargetStruct {
    return this[IMPL];
  }

  public addSources(...sources: Array<InterfaceObjects | SourceFile | AbsolutePath | string>) {
    for (let it of sources.flat()) {
      this[IMPL].addSource("directly", false, createSources(this[TARGET_SCOPE], it));
    }
  }

  public getIncludes() {
    return this._includes;
  }

  public addIncludes(...includes: Array<InterfaceIncludes | AbsolutePath | string>): void {
    this.addIncludesImpl(false, ...includes);
  }

  public addPublicIncludes(...includes: Array<InterfaceIncludes | AbsolutePath | string>): void {
    this.addIncludesImpl(true, ...includes);
  }

  public addIncludesImpl(publicOnly: boolean, ...includes: Array<InterfaceIncludes | AbsolutePath | string>): void {
    const baseDir = this[TARGET_SCOPE].SOURCE_DIR;
    for (const value of normalizeIncludes(baseDir, ...includes))
      this._includes.push({publicOnly, value});
  }

  public getDefinitions() {
    return this._definitions;
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

  public addLibraries(...libraries: any) {
    this[IMPL].addLibraries("directly", false, ...libraries);
  }

  public addCompileOptions(...options: Array<string|string[]>) {
    this[IMPL].addCompileOptions("directly", false, ...options);
  }

  public addLinkOptions(...options: Array<string|string[]>) {
    this[IMPL].addLinkOptions("directly", false, ...options);
  }

  public getSourceFiles(...sources: any[]): SourceFileList {
    return getSourceFiles(this[IMPL], this[TARGET_SCOPE], ...sources);
  }

  public addPreBuild(command: any, args: any[]) {
    this[IMPL].addPreBuild(command, args);
  }

  public addPostBuild(command: any, args: any[]) {
    this[IMPL].addPostBuild(command, args);
  }

  public get targetFile(): LiveString {
    const targetFile = this[IMPL].targetFile;
    return LiveString.create(() => targetFile.file ? targetFile.file.toString() : "");
  }

  public get positionIndependentCode() {
    return this._positionIndependentCode;
  }

  public setPositionIndependentCode(value: boolean) {
    this._positionIndependentCode = value;
  }

  public addPublicLibraries(...libraries: any[]) {
    this[IMPL].addLibraries("directly", true, ...libraries);
  }

  public addPublicCompileOptions(...options: Array<string|string[]>) {
    this[IMPL].addCompileOptions("directly", true, ...options);
  }

  public addPublicLinkOptions(...options: Array<string|string[]>) {
    this[IMPL].addLinkOptions("directly", true, ...options);
  }

  public toJSON(): object {
    return {
      NAME: this.targetName,
      TARGET_SCOPE: this.TARGET_SCOPE,
      FILE_DIR: this.FILE_DIR,
      FILE: this.FILE,
    }
  }
};

export class ObjectLibrary extends BaseTarget implements IObjectLibrary {
  private constructor(impl: TargetStruct, variableMap: VariableMap, name: string) {
    super(impl, variableMap, name);
    this._prefix = this[TARGET_SCOPE].OBJECT_LIBRARY_PREFIX;
    this._suffix = this[TARGET_SCOPE].OBJECT_LIBRARY_SUFFIX;
    this[IMPL].type = TargetType.ObjectLibrary;
    this[IMPL].addLinkOptions("initialize", true, ...this[TARGET_SCOPE].OBJECT_LINKER_FLAGS);
  }

  public static create(impl: TargetStruct, variableMap: VariableMap, name: string) {
    return Object.seal(new ObjectLibrary(impl, variableMap, name));
  }
};

export class StaticLibrary extends BaseTarget implements IStaticLibrary {
  private constructor(impl: TargetStruct, variableMap: VariableMap, name: string) {
    super(impl, variableMap, name);
    this._prefix = this[TARGET_SCOPE].STATIC_LIBRARY_PREFIX;
    this._suffix = this[TARGET_SCOPE].STATIC_LIBRARY_SUFFIX;
    this[IMPL].type = TargetType.StaticLibrary;
    this[IMPL].addLinkOptions("initialize", true, ...this[TARGET_SCOPE].STATIC_LINKER_FLAGS);
  }

  public static create(impl: TargetStruct, variableMap: VariableMap, name: string) {
    return Object.seal(new StaticLibrary(impl, variableMap, name));
  }
};

export class SharedLibrary extends BaseTarget implements ISharedLibrary {
  private constructor(impl: TargetStruct, variableMap: VariableMap, name: string) {
    super(impl, variableMap, name);
    this._prefix = this[TARGET_SCOPE].SHARED_LIBRARY_PREFIX;
    this._suffix = this[TARGET_SCOPE].SHARED_LIBRARY_SUFFIX;
    this[IMPL].type = TargetType.SharedLibrary;
    this[IMPL].addLinkOptions("initialize", true, ...this[TARGET_SCOPE].SHARED_LINKER_FLAGS);
  }

  public static create(impl: TargetStruct, variableMap: VariableMap, name: string) {
    return Object.seal(new SharedLibrary(impl, variableMap, name));
  }
}

export class Executable extends BaseTarget implements IExecutable {
  private constructor(impl: TargetStruct, variableMap: VariableMap, name: string) {
    super(impl, variableMap, name);
    this._prefix = "";
    this._suffix = this[TARGET_SCOPE].EXECUTABLE_SUFFIX;
    this[IMPL].type = TargetType.Executable;
    this[IMPL].addLinkOptions("initialize", true, ...this[TARGET_SCOPE].EXE_LINKER_FLAGS);
  }

  public static create(impl: TargetStruct, variableMap: VariableMap, name: string) {
    return Object.seal(new Executable(impl, variableMap, name));
  }
};
