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
import { AbsolutePath } from "@/core/Path";
import { Scope } from "@/core/Scope";

const NAME                = Symbol("NAME");
const TARGET_SCOPE        = Symbol("TARGET_SCOPE");
const OUTPUT_NAME         = Symbol("OUTPUT_NAME");
const COMPILE_OPTIONS     = Symbol("COMPILE_OPTIONS");
const PREFIX              = Symbol("PREFIX");
const SUFFIX              = Symbol("SUFFIX");
const LINK_OPTIONS        = Symbol("LINK_OPTIONS");
const INCLUDES            = Symbol("INCLUDES");
const DEFINES             = Symbol("DEFINES");
const SOURCES             = Symbol("SOURCES");
const LIBRARIES           = Symbol("LIBRARIES");
const POSITION_INDEPENDENT_CODE = Symbol("POSITION_INDEPENDENT_CODE");

const reservedTagetNames = [ "all", "install" ];
function ensureTargetName(name: string): string {
  if (typeof name !== "string")
    throw new Error(`Target "${name}" is not string type`);
  if (reservedTagetNames.includes(name))
    throw new Error(`Target "${name}" is reserved name`);
  return name;
}

export class BaseTarget {
  private [NAME]: string;
  private [TARGET_SCOPE]: any;
  private [OUTPUT_NAME]: string;
  private [PREFIX]: string;
  private [SUFFIX]: string
  private [COMPILE_OPTIONS]: any[];
  private [LINK_OPTIONS]: any[];
  private [SOURCES]: any[];
  private [LIBRARIES]: any[];
  private [INCLUDES]: any[];
  private [DEFINES]: any[];
  private [POSITION_INDEPENDENT_CODE]: boolean;

  protected constructor(scope: any, name: string) {
    this[NAME] = ensureTargetName(name);
    this[TARGET_SCOPE] = Scope.clone({}, scope);
    this[OUTPUT_NAME] = ensureString(name);
    this[PREFIX] = "";
    this[SUFFIX] = "";
    this[COMPILE_OPTIONS] = [];
    this[LINK_OPTIONS] = [];
    this[SOURCES] = [];
    this[LIBRARIES] = [];
    this[INCLUDES] = scope.INCLUDES.map((VALUE: any) => { return {VALUE} });
    this[DEFINES] = [];
    this[POSITION_INDEPENDENT_CODE] = scope.POSITION_INDEPENDENT_CODE;
  }

  public get NAME() {
    return this[NAME];
  }

  public get TARGET_SCOPE() {
    return this[TARGET_SCOPE];
  }

  public get OUTPUT_NAME() {
    return this[OUTPUT_NAME];
  }

  public set OUTPUT_NAME(value: string) {
    this[OUTPUT_NAME] = ensureString(value);
  }

  public get COMPILE_OPTIONS(): string[] {
    return this[COMPILE_OPTIONS];
  }

  public get PREFIX() {
    return this[PREFIX];
  }

  public set PREFIX(value: string) {
    this[PREFIX] = ensureString(value);
  }

  public get SUFFIX() {
    return this[SUFFIX];
  }

  public set SUFFIX(value: string) {
    this[SUFFIX] = ensureString(value);
  }

  public get LINK_OPTIONS(): string[] {
    return this[LINK_OPTIONS];
  }

  public get INCLUDES(): string[] {
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
    return this[TARGET_SCOPE].BINARY_DIR;
  }

  public get FILE_NAME(): string {
    return this.PREFIX + this.OUTPUT_NAME + this.SUFFIX;
  }

  public get FILE(): AbsolutePath {
    return this.FILE_DIR.join(this.FILE_NAME);
  }

  public get POSITION_INDEPENDENT_CODE(): boolean {
    return this[POSITION_INDEPENDENT_CODE];
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
        it.OBJECT_FILE = this[TARGET_SCOPE].BINARY_DIR.join("MakeFiles", this[NAME] + ".dir",  rfile + ".obj");
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

  public addCompileOptions(...options: string[]) {
    for (const it of options.flat(1)) {
      this[COMPILE_OPTIONS].push({ VALUE: it });
    }
  }

  public addLinkOptions(...options: string[]) {
    for (const it of options.flat(1)) {
      this[LINK_OPTIONS].push({ VALUE: it });
    }
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

  public setPrefix(prefix: string) {
    this[PREFIX] = prefix;
  }
  
  public setSuffix(suffix: string) {
    this[SUFFIX] = suffix;
  }
  
  public setOutputName(outputName: string) {
    this[OUTPUT_NAME] = outputName;
  }
  
  public addDefinitions(...definitions: string[]) {
    for (const VALUE of definitions.flat(1))
      this[DEFINES].push({ VALUE });
  }

  public toJSON(): object {
    return {
      NAME: this.NAME,
      TARGET_SCOPE: this.TARGET_SCOPE,
      OUTPUT_NAME: this.OUTPUT_NAME,
      COMPILE_OPTIONS: this.COMPILE_OPTIONS,
      PREFIX: this.PREFIX,
      SUFFIX: this.SUFFIX,
      LINK_OPTIONS: this.LINK_OPTIONS,
      INCLUDES: this.INCLUDES,
      DEFINES: this.DEFINES,
      SOURCES: this.SOURCES,
      LIBRARIES: this.LIBRARIES,
      FILE_DIR: this.FILE_DIR,
      FILE_NAME: this.FILE_NAME,
      FILE: this.FILE,
    }
  }
};

export class BaseLibrary extends BaseTarget {
  protected constructor(scope: any, name: string) {
    super(scope, name);
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

  public addPublicCompileOptions(...options: string[]) {
    for (const it of options.flat(1)) {
      this[COMPILE_OPTIONS].push({ VALUE: it, PUBLIC_ONLY: true });
    }
  }

  public addPublicLinkOptions(...options: any[]) {
    for (const it of options.flat(1)) {
      this[LINK_OPTIONS].push({ VALUE: it, PUBLIC_ONLY: true });
    }
  }
};

export class ObjectLibrary extends BaseLibrary {
  private constructor(scope: any, name: string) {
    super(scope, name);
    this.PREFIX = scope.OBJECT_LIBRARY_PREFIX;
    this.SUFFIX = scope.OBJECT_LIBRARY_SUFFIX;
    this.LINK_OPTIONS.push(...scope.OBJECT_LINKER_FLAGS.map((VALUE: any) => { return { VALUE } }));
  }

  public static create(scope: any, name: string) {
    return Object.seal(new ObjectLibrary(scope, name));
  }
};

export class StaticLibrary extends BaseLibrary {
  private constructor(scope: any, name: string) {
    super(scope, name);
    this.PREFIX = scope.STATIC_LIBRARY_PREFIX;
    this.SUFFIX = scope.STATIC_LIBRARY_SUFFIX;
    this.LINK_OPTIONS.push(...scope.STATIC_LINKER_FLAGS.map((VALUE: any) => { return { VALUE } }));
  }

  public static create(scope: any, name: string) {
    return Object.seal(new StaticLibrary(scope, name));
  }
};

export class SharedLibrary extends BaseLibrary {
  private constructor(scope: any, name: string) {
    super(scope, name);
    this.PREFIX = scope.SHARED_LIBRARY_PREFIX;
    this.SUFFIX = scope.SHARED_LIBRARY_SUFFIX;
    this.LINK_OPTIONS.push(...scope.SHARED_LINKER_FLAGS.map((VALUE: any) => { return { VALUE } }));
  }

  public static create(scope: any, name: string) {
    return Object.seal(new SharedLibrary(scope, name));
  }
}

export class Executable extends BaseTarget {
  private constructor(scope: any, name: string) {
    super(scope, name);
    this.SUFFIX = scope.EXECUTABLE_SUFFIX;
    this.LINK_OPTIONS.push(...scope.EXE_LINKER_FLAGS.map((VALUE: any) => { return { VALUE } }));
  }

  public static create(scope: any, name: string) {
    return Object.seal(new Executable(scope, name));
  }
};
