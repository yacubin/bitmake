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
import { TargetObjects } from "@/core/TargetObjects";
import { AbsolutePath } from "@/core/AbsolutePath";
import { SourceFile } from "@/core/SourceFile";
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

export class UserTargetStruct extends InterfaceTarget {
  [IMPL]: BaseTarget;
  [SCOPE]: SystemScope;

  private constructor(impl: BaseTarget, scope: SystemScope) {
    super();
    this[IMPL] = impl;
    this[SCOPE] = scope;
  }

  public static create(impl: BaseTarget, scope: SystemScope) {
    return Object.seal(new UserTargetStruct(impl, scope));
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
        const compileFlags = !language ? [] : [
          ...(scope as any)[language + "_FLAGS"],
          ...(scope as any)[language + "_FLAGS_" + scope.BUILD_TYPE.toUpperCase()],
        ];
        const source = SourceFile.create(filename, scope.SOURCE_DIR, language, compileFlags);
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

  public addIncludes(...includes: any[]): void {
    this[IMPL].addIncludes(...includes);
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

  public getSourceFiles(...sources: any[]) {
    return this[IMPL].getSourceFiles(...sources);
  }

  public addDefinitions(...definitions: any[]): void {
    this[IMPL].addDefinitions(...definitions);
  }

  public addPreBuild(command: any, args: any[]): void {
    this[IMPL].addPreBuild(command, args);
  }

  public addPostBuild(command: any, args: any[]): void {
    this[IMPL].addPostBuild(command, args);
  }

  public setPositionIndependentCode(value: boolean): void {
    this[IMPL].setPositionIndependentCode(value);
  }

  public addPublicIncludes(...includes: any[]): void {
    this[IMPL].addPublicIncludes(...includes);
  }

  public addPublicDefinitions(...definitions: any): void {
    this[IMPL].addPublicDefinitions(...definitions);
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
