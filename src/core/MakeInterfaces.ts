/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { TargetFile } from "@/core/TargetFile";
import { TargetObjects } from "@/core/TargetObjects";
import { TargetIncludes } from "@/core/TargetIncludes";
import { VariantMap } from "@/core/Scope";
import { AbsolutePath } from "@/core/AbsolutePath";
import { SourceFile } from "@/core/SourceFile";

export abstract class InterfaceTask {
  abstract execute(): Promise<void> | void;
};

export abstract class InterfaceSourceFiles {
  abstract setLanguage(language: string): void;
  abstract addDefinitions(...definitions: string[]): void;
  abstract addCompileFlags(...flags: string[]): void;
};

export abstract class InterfaceTarget {
  abstract get targetName(): string;
  abstract get targetFile(): TargetFile;
  abstract get includes(): TargetIncludes;
  abstract get objects(): TargetObjects;

  abstract setPrefix(prefix: string): void;  
  abstract setSuffix(suffix: string): void;
  abstract setOutputName(outputName: string): void;

  abstract addSources(...sources: Array<TargetObjects | SourceFile | AbsolutePath | string>): void;
  abstract addIncludes(...includes: Array<TargetIncludes | AbsolutePath | string>): void;
  abstract addLibraries(...libraries: any): void;
  abstract addCompileOptions(...options: Array<string | string[]>): void;
  abstract addLinkOptions(...options: Array<string|string[]>): void;
  abstract getSourceFiles(...sources: any[]): InterfaceSourceFiles;
  abstract addDefinitions(...definitions: any[]): void;
  abstract addPreBuild(command: any, args: any[]): void;
  abstract addPostBuild(command: any, args: any[]): void;

  abstract setPositionIndependentCode(value: boolean): void;
  abstract addPublicIncludes(...includes: Array<TargetIncludes | AbsolutePath | string>): void;
  abstract addPublicDefinitions(...definitions: any): void;
  abstract addPublicLibraries(...libraries: any[]): void;
  abstract addPublicCompileOptions(...options: Array<string|string[]>): void;
  abstract addPublicLinkOptions(...options: Array<string|string[]>): void;
};

export abstract class InterfaceScript {
  abstract mergeVariables(variables: VariantMap): void;
};

export interface IGeneralContext {
  getProperty(name: string): any;
  setProperty(name: string, value: any): boolean;
  hasProperty(name: string): boolean;
  deleteProperty(name: string): boolean;
  getPropertyNames(): string[];

  findProgram(name: string): string | undefined;
};

export interface IMakeContext extends IGeneralContext {
  getCacheVariables(): any;
  addCacheVariables(params: string | VariantMap): void;
  addIncludeDirectories(...dirs: any[]): void;
  addSubdirectory(sourceDir: string | AbsolutePath, binaryDir?: string | AbsolutePath): void;
  script(name: string): InterfaceScript;
  addCustomScript(script: string, params: any): InterfaceScript;
  target(name: string): InterfaceTarget;
  addObjectLibrary(name: string, ...sources: any[]): InterfaceTarget;
  addStaticLibrary(name: string, ...sources: any[]): InterfaceTarget;
  addSharedLibrary(name: string, ...sources: any[]): InterfaceTarget;
  addExecutable(name: string, ...sources: any[]): InterfaceTarget;
  executeScript(script: any, params: any): void;
  install(value: any, params: any): void;
};
