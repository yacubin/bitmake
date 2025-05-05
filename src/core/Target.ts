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
import { IncludeDirectory } from "@/core/IncludeDirectory";
import { InterfaceTarget } from "@/core/InterfaceTarget";
import { InterfaceIncludes } from "@/core/InterfaceIncludes";
import { InterfaceObjects } from "@/core/InterfaceObjects";
import { AbsolutePath, DirPath, FilePath } from "@/core/Path";
import { ScopeHelper } from "@/core/Scope";
import { SystemScope } from "@/core/SystemScope";
import { normalizeDefinitions } from "@/core/DefinitionHelper";
import { TargetStruct, TargetType, LiveString } from "@/core/TargetStruct";

const IMPL                = Symbol("IMPL");
const TARGET_SCOPE        = Symbol("TARGET_SCOPE");
const INCLUDES            = Symbol("INCLUDES");
const DEFINES             = Symbol("DEFINES");
const SOURCES             = Symbol("SOURCES");
const LIBRARIES           = Symbol("LIBRARIES");
const POSITION_INDEPENDENT_CODE = Symbol("POSITION_INDEPENDENT_CODE");

interface IncludeEntry {
  VALUE: InterfaceIncludes | IncludeDirectory | string;
  PUBLIC_ONLY?: boolean;
};

export class BaseTarget {
  private [IMPL]: TargetStruct;
  private [TARGET_SCOPE]: SystemScope;
  private [SOURCES]: any[];
  private [LIBRARIES]: any[];
  private [INCLUDES]: IncludeEntry[];
  private [DEFINES]: any[];
  private [POSITION_INDEPENDENT_CODE]: boolean;

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

    this[TARGET_SCOPE] = ScopeHelper.clone({}, scope);
    this[SOURCES] = [];
    this[LIBRARIES] = [];
    this[INCLUDES] = scope.INCLUDES.map((VALUE: any) => ({ VALUE }));
    this[DEFINES] = [];
    this[POSITION_INDEPENDENT_CODE] = scope.POSITION_INDEPENDENT_CODE;
  }

  public get NAME() {
    return this[IMPL].name;
  }

  public get TARGET_SCOPE() {
    return this[TARGET_SCOPE];
  }

  public get INCLUDES() {
    return this[INCLUDES];
  }

  public get DEFINES(): string[] {
    return this[DEFINES];
  }

  public get SOURCES(): string[] {
    return this[SOURCES];
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

  public get POSITION_INDEPENDENT_CODE(): boolean {
    return this[POSITION_INDEPENDENT_CODE];
  }

  public get IMPL(): TargetStruct {
    return this[IMPL];
  }

  public addSources(...sources: Array<InterfaceObjects | SourceFile | AbsolutePath | string>) {
    for (let it of sources.flat(1)) {
      if (it instanceof InterfaceObjects || it instanceof SourceFile)
        {}
      else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
        it = SourceFile.create(this[TARGET_SCOPE], it);
      else
        throw new Error(`Not support instance ${it}`);
  
      if (it instanceof SourceFile && it.LANGUAGE) {
        const rfile1 = this[TARGET_SCOPE].BINARY_DIR.relative(it.FILE);
        const rfile2 = this[TARGET_SCOPE].SOURCE_DIR.relative(it.FILE);
        const rfile = (rfile2.length < rfile1.length ? rfile2 : rfile1).replace("../", "__/");
        it.OBJECT_FILE = this[TARGET_SCOPE].BINARY_DIR.join("MakeFiles", this[IMPL].name + ".dir",  rfile + ".obj");
      }
  
      this[SOURCES].push(it);
    }
  }

  public addIncludes(...includes: Array<InterfaceIncludes | AbsolutePath | string>) {
    for (const it of includes.flat(1)) {
      let VALUE;
      if (it instanceof InterfaceIncludes)
        VALUE = it;
      else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
        VALUE = IncludeDirectory.create(it, this[TARGET_SCOPE].SOURCE_DIR);
      else
        throw new Error(`Not support instance ${it}`);
      this[INCLUDES].push({VALUE}); // IncludeDirectory[]
    }
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
    for (const it of sources.flat(1)) {
      const filename = this[TARGET_SCOPE].SOURCE_DIR.resolve(it).toString();
      const src = this[SOURCES].find(i => i instanceof SourceFile && i.FILE.toString() === filename);
      if (!src)
        throw new Error(`Cannot find "${it}"`);
      result.push(src);
    }
  
    if (result.length)
      return SourceFileList.create(this[TARGET_SCOPE], result);
  
    return SourceFileList.create(this[TARGET_SCOPE], this[SOURCES].filter(i => i instanceof SourceFile));
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
    for (const VALUE of normalizeDefinitions(...definitions))
      this[DEFINES].push({ VALUE });
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
      INCLUDES: this.INCLUDES,
      DEFINES: this.DEFINES,
      SOURCES: this.SOURCES,
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
    this[POSITION_INDEPENDENT_CODE] = value;
  }

  public addPublicIncludes(...includes: Array<InterfaceIncludes | AbsolutePath | string>) {
    for (const it of includes.flat(1)) {
      let VALUE;
      if (it instanceof InterfaceIncludes)
        VALUE = it;
      else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
        VALUE = IncludeDirectory.create(it, this[TARGET_SCOPE].SOURCE_DIR);
      else
        throw new Error(`Not support instance ${it}`);
      this[INCLUDES].push({VALUE, PUBLIC_ONLY: true}); // IncludeDirectory[]
    }
  }

  public addPublicDefinitions(...definitions: string[]) {
    for (const VALUE of definitions.flat(1))
      this[DEFINES].push({ VALUE, PUBLIC_ONLY: true });
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
