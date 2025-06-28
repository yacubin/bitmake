/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ensureString } from "@/utils/StrictType";
import { SourceFile } from "@/core/SourceFile";
import { SourceFileList } from "@/core/SourceFileList";
import { InterfaceIncludes } from "@/core/InterfaceIncludes";
import { InterfaceObjects } from "@/core/InterfaceObjects";
import { AbsolutePath, FilePath } from "@/core/Path";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { SystemScope } from "@/core/SystemScope";
import { TargetStruct, TargetType, LiveString } from "@/core/TargetStruct";

const _languageExtensions = {
  ASM: [ ".asm", ".s" ],
  C:   [ ".c" ],
  CXX: [".cpp", ".cc", ".cxx" ],
};

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

function createSources(scope: SystemScope, source: any): InterfaceObjects | SourceFile {
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

export class InterfaceTarget {
  private [IMPL]: TargetStruct;
  private [TARGET_SCOPE]: SystemScope;

  private constructor(impl: TargetStruct, variableMap: VariableMap) {
    this[IMPL] = impl;
    this[TARGET_SCOPE] = ScopeHelper.createVariableValues(variableMap) as SystemScope;
  }

  public static create(impl: TargetStruct, variableMap: VariableMap) {
    return Object.seal(new InterfaceTarget(impl, variableMap));
  }

  public static ensureInstance(value: any) {
    if (value instanceof InterfaceTarget)
      return value;
    throw new Error(`The '${value}' is not a InterfaceTarget`);
  }

  public get targetName(): string {
    return this[IMPL].name;
  }

  public get includes(): InterfaceIncludes {
    return InterfaceIncludes.create(this.targetName);
  }

  public get objects(): InterfaceObjects {
    return InterfaceObjects.create(this.targetName);
  }

  public setPrefix(prefix: any) {
    this[IMPL].targetFile.setForcePrefix(ensureString(prefix));
  }

  public setSuffix(suffix: any) {
    this[IMPL].targetFile.setForceSuffix(ensureString(suffix));
  }

  public setOutputName(outputName: any) {
    this[IMPL].targetFile.setForceOutputName(ensureString(outputName));
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

  public addIncludes(...includes: any): void {
    this[IMPL].addIncludes("indirectly", false, this[TARGET_SCOPE].SOURCE_DIR, ...includes);
  }

  public addPublicIncludes(...includes: Array<InterfaceIncludes|AbsolutePath|string>): void {
    this[IMPL].addIncludes("indirectly", true, this[TARGET_SCOPE].SOURCE_DIR, ...includes);
  }

  public addDefinitions(...definitions: any): void {
    this[IMPL].addDefinitions("indirectly", false, ...definitions);
  }

  public addPublicDefinitions(...definitions: any): void {
    this[IMPL].addDefinitions("indirectly", true, ...definitions);
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
};

export class BaseTarget {
  private [IMPL]: TargetStruct;
  private [TARGET_SCOPE]: SystemScope;

  protected constructor(impl: TargetStruct, variableMap: VariableMap) {
    this[IMPL] = impl;

    const scope = ScopeHelper.createVariableValues(variableMap) as SystemScope;
    const targetFile = impl.targetFile;
    targetFile.fileDir = scope.BINARY_DIR;
    targetFile.setInitOutputName(impl.name);

    this[IMPL].addIncludes("initialize", false, scope.SOURCE_DIR, ...scope.INCLUDES);
    this[IMPL].positionIndependentCode = scope.POSITION_INDEPENDENT_CODE;

    this[TARGET_SCOPE] = scope;
  }

  public get targetName() {
    return this[IMPL].name;
  }

  public get includes(): InterfaceIncludes {
    return InterfaceIncludes.create(this.targetName);
  }

  public get objects(): InterfaceObjects {
    return InterfaceObjects.create(this.targetName);
  }

  public setPrefix(prefix: any) {
    this[IMPL].targetFile.setTargetPrefix(ensureString(prefix));
  }

  public setSuffix(suffix: any) {
    this[IMPL].targetFile.setTargetSuffix(ensureString(suffix));
  }

  public setOutputName(outputName: any) {
    this[IMPL].targetFile.setTargetOutputName(ensureString(outputName));
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

  public addIncludes(...includes: any) {
    this[IMPL].addIncludes("directly", false, this[TARGET_SCOPE].SOURCE_DIR, ...includes);
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

  public addDefinitions(...definitions: any[]) {
    this[IMPL].addDefinitions("directly", false, ...definitions);
  }

  public addPreBuild(command: any, args: any[]) {
    this[IMPL].addPreBuild(command, args);
  }

  public addPostBuild(command: any, args: any[]) {
    this[IMPL].addPostBuild(command, args);
  }

  public get targetFile(): LiveString {
    const targetFile = this[IMPL].targetFile;
    return LiveString.create(() => FilePath.create(targetFile.file).toString());
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

export class BaseLibrary extends BaseTarget {
  protected constructor(impl: TargetStruct, variableMap: VariableMap) {
    super(impl, variableMap);
  }

  public setPositionIndependentCode(value: boolean) {
    this[IMPL].positionIndependentCode = value;
  }

  public addPublicIncludes(...includes: any[]) {
    this[IMPL].addIncludes("directly", true, this[TARGET_SCOPE].SOURCE_DIR, ...includes);
  }

  public addPublicDefinitions(...definitions: any) {
    this[IMPL].addDefinitions("directly", true, ...definitions);
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
};

export class ObjectLibrary extends BaseLibrary {
  private constructor(impl: TargetStruct, variableMap: VariableMap) {
    super(impl, variableMap);
    this[IMPL].type = TargetType.ObjectLibrary;
    this[IMPL].targetFile.setInitPrefix(this[TARGET_SCOPE].OBJECT_LIBRARY_PREFIX);
    this[IMPL].targetFile.setInitSuffix(this[TARGET_SCOPE].OBJECT_LIBRARY_SUFFIX);
    this[IMPL].addLinkOptions("initialize", true, ...this[TARGET_SCOPE].OBJECT_LINKER_FLAGS);
  }

  public static create(impl: TargetStruct, variableMap: VariableMap) {
    return Object.seal(new ObjectLibrary(impl, variableMap));
  }
};

export class StaticLibrary extends BaseLibrary {
  private constructor(impl: TargetStruct, variableMap: VariableMap) {
    super(impl, variableMap);
    this[IMPL].type = TargetType.StaticLibrary;
    this[IMPL].targetFile.setInitPrefix(this[TARGET_SCOPE].STATIC_LIBRARY_PREFIX);
    this[IMPL].targetFile.setInitSuffix(this[TARGET_SCOPE].STATIC_LIBRARY_SUFFIX);
    this[IMPL].addLinkOptions("initialize", true, ...this[TARGET_SCOPE].STATIC_LINKER_FLAGS);
  }

  public static create(impl: TargetStruct, variableMap: VariableMap) {
    return Object.seal(new StaticLibrary(impl, variableMap));
  }
};

export class SharedLibrary extends BaseLibrary {
  private constructor(impl: TargetStruct, variableMap: VariableMap) {
    super(impl, variableMap);
    this[IMPL].type = TargetType.SharedLibrary;
    this[IMPL].targetFile.setInitPrefix(this[TARGET_SCOPE].SHARED_LIBRARY_PREFIX);
    this[IMPL].targetFile.setInitSuffix(this[TARGET_SCOPE].SHARED_LIBRARY_SUFFIX);
    this[IMPL].addLinkOptions("initialize", true, ...this[TARGET_SCOPE].SHARED_LINKER_FLAGS);
  }

  public static create(impl: TargetStruct, variableMap: VariableMap) {
    return Object.seal(new SharedLibrary(impl, variableMap));
  }
}

export class Executable extends BaseTarget {
  private constructor(impl: TargetStruct, variableMap: VariableMap) {
    super(impl, variableMap);
    this[IMPL].type = TargetType.Executable;
    this[IMPL].targetFile.setInitPrefix("");
    this[IMPL].targetFile.setInitSuffix(this[TARGET_SCOPE].EXECUTABLE_SUFFIX);
    this[IMPL].addLinkOptions("initialize", true, ...this[TARGET_SCOPE].EXE_LINKER_FLAGS);
  }

  public static create(impl: TargetStruct, variableMap: VariableMap) {
    return Object.seal(new Executable(impl, variableMap));
  }
};
