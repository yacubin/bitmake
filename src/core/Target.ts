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
import { InterfaceTarget } from "@/core/InterfaceTarget";
import { InterfaceObjects } from "@/core/InterfaceObjects";
import { AbsolutePath, FilePath } from "@/core/Path";
import { ScopeHelper } from "@/core/Scope";
import { SystemScope } from "@/core/SystemScope";
import { TargetStruct, TargetType, LiveString } from "@/core/TargetStruct";

const IMPL                = Symbol("IMPL");
const TARGET_SCOPE        = Symbol("TARGET_SCOPE");
const LIBRARIES           = Symbol("LIBRARIES");

export class BaseTarget {
  private [IMPL]: TargetStruct;
  private [TARGET_SCOPE]: SystemScope;
  private [LIBRARIES]: any[];

  protected constructor(impl: TargetStruct, scope: SystemScope, prefix: string, suffix: string) {
    this[IMPL] = impl;

    const targetFile = impl.targetFile;
    targetFile.fileDir = scope.BINARY_DIR;
    if (targetFile.prefix === undefined)
      targetFile.prefix = prefix;
    if (targetFile.outputName === undefined)
      targetFile.outputName = impl.name;
    if (targetFile.suffix === undefined)
      targetFile.suffix = suffix;

    this[IMPL].addIncludes("initialize", false, scope.SOURCE_DIR, ...scope.INCLUDES);
    this[IMPL].positionIndependentCode = scope.POSITION_INDEPENDENT_CODE;

    this[TARGET_SCOPE] = ScopeHelper.clone({}, scope);
    this[LIBRARIES] = [];
  }

  public get NAME() {
    return this[IMPL].name;
  }

  public get TARGET_SCOPE() {
    return this[TARGET_SCOPE];
  }

  public get LIBRARIES(): string[] {
    return this[LIBRARIES];
  }

  public get FILE_DIR(): AbsolutePath {
    if (!this[IMPL].targetFile.fileDir)
      throw new Error(`Target "${this.NAME}" is not defined`);
    return this[IMPL].targetFile.fileDir;
  }

  public get FILE_NAME(): string {
    if (!this[IMPL].targetFile.fileName)
      throw new Error(`Target "${this.NAME}" is not defined`);
    return this[IMPL].targetFile.fileName;
  }

  public get FILE(): AbsolutePath {
    if (!this[IMPL].targetFile.file)
      throw new Error(`Target "${this.NAME}" is not defined`);
    return this[IMPL].targetFile.file;
  }

  public get IMPL(): TargetStruct {
    return this[IMPL];
  }

  public addSources(...sources: Array<InterfaceObjects | SourceFile | AbsolutePath | string>) {
    for (let it of sources.flat()) {
      if (it instanceof InterfaceObjects || it instanceof SourceFile)
        {}
      else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
        it = SourceFile.create(this[TARGET_SCOPE], it);
      else
        throw new Error(`Not support instance ${it}`);
      this[IMPL].addSource("directly", false, it);
    }
  }

  public addIncludes(...includes: any) {
    this[IMPL].addIncludes("directly", false, this[TARGET_SCOPE].SOURCE_DIR, ...includes);
  }

  public addLibraries(...libraries: any) {
    for (const it of libraries.flat(1)) {
      this[LIBRARIES].push({ VALUE: InterfaceTarget.ensureInstance(it) });
    }
  }

  public addCompileOptions(...options: Array<string|string[]>) {
    this[IMPL].addCompileOptions("directly", false, ...options);
  }

  public addLinkOptions(...options: Array<string|string[]>) {
    this[IMPL].addLinkOptions("directly", false, ...options);
  }

  public getSourceFiles(...sources: any[]): SourceFileList {
    const result = [];
    const sourceFiles = this[IMPL].getSourceFiles();
    for (const it of sources.flat()) {
      const filename = this[TARGET_SCOPE].SOURCE_DIR.resolve(it).toString();
      const src = sourceFiles.find(i => i.FILE.toString() === filename);
      if (!src)
        throw new Error(`Cannot find "${it}"`);
      result.push(src);
    }
  
    if (result.length)
      return SourceFileList.create(this[TARGET_SCOPE], result);
  
    return SourceFileList.create(this[TARGET_SCOPE], sourceFiles);
  }

  public setPrefix(prefix: any) {
    this[IMPL].targetFile.prefix = ensureString(prefix);
  }

  public setSuffix(suffix: any) {
    this[IMPL].targetFile.suffix = ensureString(suffix);
  }

  public setOutputName(outputName: any) {
    this[IMPL].targetFile.outputName = ensureString(outputName);
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
      NAME: this.NAME,
      TARGET_SCOPE: this.TARGET_SCOPE,
      LIBRARIES: this.LIBRARIES,
      FILE_DIR: this.FILE_DIR,
      FILE: this.FILE,
    }
  }
};

export class BaseLibrary extends BaseTarget {
  protected constructor(impl: TargetStruct, scope: SystemScope, prefix: string, suffix: string) {
    super(impl, scope, prefix, suffix);
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
    for (const it of libraries.flat(1)) {
      this[LIBRARIES].push({VALUE: InterfaceTarget.ensureInstance(it), PUBLIC_ONLY: true});
    }
  }

  public addPublicCompileOptions(...options: Array<string|string[]>) {
    this[IMPL].addCompileOptions("directly", true, ...options);
  }

  public addPublicLinkOptions(...options: Array<string|string[]>) {
    this[IMPL].addLinkOptions("directly", true, ...options);
  }
};

export class ObjectLibrary extends BaseLibrary {
  private constructor(impl: TargetStruct, scope: SystemScope) {
    super(impl, scope, scope.OBJECT_LIBRARY_PREFIX, scope.OBJECT_LIBRARY_SUFFIX);
    this[IMPL].type = TargetType.ObjectLibrary;
    this[IMPL].addLinkOptions("initialize", true, ...scope.OBJECT_LINKER_FLAGS);
  }

  public static create(impl: TargetStruct, scope: SystemScope) {
    return Object.seal(new ObjectLibrary(impl, scope));
  }
};

export class StaticLibrary extends BaseLibrary {
  private constructor(impl: TargetStruct, scope: SystemScope) {
    super(impl, scope, scope.STATIC_LIBRARY_PREFIX, scope.STATIC_LIBRARY_SUFFIX);
    this[IMPL].type = TargetType.StaticLibrary;
    this[IMPL].addLinkOptions("initialize", true, ...scope.STATIC_LINKER_FLAGS);
  }

  public static create(impl: TargetStruct, scope: SystemScope) {
    return Object.seal(new StaticLibrary(impl, scope));
  }
};

export class SharedLibrary extends BaseLibrary {
  private constructor(impl: TargetStruct, scope: SystemScope) {
    super(impl, scope, scope.SHARED_LIBRARY_PREFIX, scope.SHARED_LIBRARY_SUFFIX);
    this[IMPL].type = TargetType.SharedLibrary;
    this[IMPL].addLinkOptions("initialize", true, ...scope.SHARED_LINKER_FLAGS);
  }

  public static create(impl: TargetStruct, scope: SystemScope) {
    return Object.seal(new SharedLibrary(impl, scope));
  }
}

export class Executable extends BaseTarget {
  private constructor(impl: TargetStruct, scope: SystemScope) {
    super(impl, scope, "", scope.EXECUTABLE_SUFFIX);
    this[IMPL].type = TargetType.Executable;
    this[IMPL].addLinkOptions("initialize", true, ...scope.EXE_LINKER_FLAGS);
  }

  public static create(impl: TargetStruct, scope: SystemScope) {
    return Object.seal(new Executable(impl, scope));
  }
};
