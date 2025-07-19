/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceTarget } from "@/core/MakeInterfaces";
import { BaseTarget } from "@/core/Target";
import { SystemScope } from "@/core/SystemScope";
import { ensureString } from "@/utils/StrictType";
import { TargetIncludes } from "@/core/TargetIncludes";
import { TargetObjects } from "@/core/TargetObjects";
import { DirPath, AbsolutePath } from "@/core/AbsolutePath";
import { SourceFile } from "@/core/SourceFile";
import { UserSourceFiles } from "@/core/UserSourceFiles";
import { TargetFile } from "@/core/TargetFile";
import { TargetHelper } from "@/core/TargetHelper";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

const SCOPE = Symbol("SCOPE");
const IMPL = Symbol("IMPL");

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

function addIncludeImpl(target: BaseTarget, sourceDir: AbsolutePath, publicOnly: boolean, include: TargetIncludes | AbsolutePath | string): void {
  if (include instanceof TargetIncludes)
    target.addInclude(publicOnly, include);
  else if (typeof include === "string")
    target.addInclude(publicOnly, new DirPath(sourceDir.resolve(include).toURLString()));
  else if (include instanceof AbsolutePath)
    target.addInclude(publicOnly, new DirPath(include.toURLString()));
  else
    throw new Error(`Not support instance ${include}`);
}

function addIncludesImpl(target: BaseTarget, scope: SystemScope, publicOnly: boolean, ...includes: Array<TargetIncludes | AbsolutePath | string>): void {
  const sourceDir = scope.SOURCE_DIR;
  for (const iter of includes.flat())
    addIncludeImpl(target, sourceDir, publicOnly, iter);
}

function ensureCmdValue(value: any): string | AbsolutePath | TargetFile {
  if (typeof value === "string")
    return value;
  else if (value instanceof TargetFile)
    return value;
  else if (value instanceof AbsolutePath)
    return value;
  else
    throw new TypeError(`Wrong type ${value} for command`);
}

export class UserTargetStruct extends InterfaceTarget {
  [IMPL]: BaseTarget;
  [SCOPE]: SystemScope;

  private constructor(impl: BaseTarget, scope: SystemScope) {
    super();
    this[IMPL] = impl;
    this[SCOPE] = scope;

    this[IMPL].setPositionIndependentCode(this[SCOPE].POSITION_INDEPENDENT_CODE);

    addIncludesImpl(this[IMPL], this[SCOPE], false, ...this[SCOPE].INCLUDES);
  }

  public static create(impl: BaseTarget, scope: SystemScope, ...sources: any[]) {
    const target = Object.seal(new UserTargetStruct(impl, scope));
    target.addSources(...sources);
    return target;
  }

  public get targetName() {
    return this[IMPL].targetName;
  }

  public get targetFile() {
    return this[IMPL].targetFile;
  }

  public get includes() {
    return this[IMPL].includes;
  }

  public get objects() {
    return this[IMPL].objects;
  }
  
  public setPrefix(value: any): void {
    this[IMPL].setPrefix(ensureString(value));
  }

  public setSuffix(value: any): void {
    this[IMPL].setSuffix(ensureString(value));
  }

  public setOutputName(value: any): void {
    this[IMPL].setOutputName(ensureString(value));
  }

  public addSources(...sources: Array<TargetObjects | SourceFile | AbsolutePath | string>): void {
    const scope = this[SCOPE];
    for (const iter of sources.flat()) {
      if (typeof iter === "string" || iter instanceof AbsolutePath) {
        const filename = scope.SOURCE_DIR.resolve(iter);
        const language = getFileLanguage(filename.toPath());
        let compilerPath = "";
        const compilerFlags = [];

        if (language) {
          compilerPath = (scope as any)[language + "_COMPILER"];
          const COMPILER_FLAGS1 = (scope as any)[`${language}_FLAGS`]
          if (COMPILER_FLAGS1) {
            compilerFlags.push(...COMPILER_FLAGS1);
          }

          const COMPILER_FLAGS2 = (scope as any)[`${language}_FLAGS_${scope.BUILD_TYPE.toUpperCase()}`]
          if (COMPILER_FLAGS2) {
            compilerFlags.push(...COMPILER_FLAGS2);
          }

          if (!this[IMPL].language || (this[IMPL].language === "C" && language === "CXX")) {
            this[IMPL].language = language;
            this[IMPL].compilerPath = compilerPath;
            this[IMPL].compilerFlags = [ ...compilerFlags ];
          }
        }

        const source = SourceFile.create(filename, scope.SOURCE_DIR, language, compilerPath, compilerFlags);
        this[IMPL].addSource(source);
      }
      else if (iter instanceof TargetObjects)
        this[IMPL].addSource(iter);
      else if (iter instanceof SourceFile)
        this[IMPL].addSource(iter);
      else
        throw new Error(`Not support instance ${iter}`);
    }
  }
  
  public getSourceFiles(...sources: any[]): UserSourceFiles {
    const result = [];
    const scope = this[SCOPE];
    const sourceFiles = this[IMPL].getSourceFiles();
    for (const it of sources.flat()) {
      const filename = scope.SOURCE_DIR.resolve(it).toPath();
      const src = sourceFiles.find(i => i.FILE.toPath() === filename);
      if (!src)
        throw new Error(`Cannot find "${it}"`);
      result.push(src);
    }
    
    return UserSourceFiles.create(this[IMPL], result.length ? result : sourceFiles);
  }

  public addIncludes(...includes: Array<TargetIncludes | AbsolutePath | string>): void {
    addIncludesImpl(this[IMPL], this[SCOPE], false, ...includes);
  }

  public addLibraries(...libraries: any[]): void {
    this[IMPL].addLibraries(...libraries);
  }

  public addCompileOptions(...options: any[]): void {
    this[IMPL].addCompileOptions(...options);
  }

  public addLinkOptions(...options: any[]): void {
    this[IMPL].addLinkOptions(...options);
  }

  public addDefinitions(...definitions: any[]): void {
    for (const iter of TargetHelper.normalizeDefinitions(definitions.flat()))
      this[IMPL].addDefinition(false, iter);
  }

  public addPreBuild(command: any, args: any[]): void {
    this[IMPL].addPreBuild(ensureCmdValue(command), args.map(i => ensureCmdValue(i)));
  }

  public addPostBuild(command: any, args: any[]): void {
    this[IMPL].addPostBuild(ensureCmdValue(command), args.map(i => ensureCmdValue(i)));
  }

  public setPositionIndependentCode(value: boolean): void {
    this[IMPL].setPositionIndependentCode(value);
  }

  public addPublicIncludes(...includes: Array<TargetIncludes | AbsolutePath | string>): void {
    addIncludesImpl(this[IMPL], this[SCOPE], true, ...includes);
  }

  public addPublicDefinitions(...definitions: any): void {
    for (const iter of TargetHelper.normalizeDefinitions(definitions.flat()))
      this[IMPL].addDefinition(true, iter);
  }

  public addPublicLibraries(...libraries: any[]): void {
    this[IMPL].addPublicLibraries(...libraries);
  }

  public addPublicCompileOptions(...options: any[]): void {
    this[IMPL].addPublicCompileOptions(...options);
  }

  public addPublicLinkOptions(...options: any[]): void {
    this[IMPL].addPublicLinkOptions(...options);
  }
};
