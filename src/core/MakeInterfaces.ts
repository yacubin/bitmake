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
import { InterfaceScript } from "@/core/InterfaceScript";
import { CustomScript } from "@/core/CustomScript";
import { VariantMap } from "@/core/Scope";
import { AbsolutePath } from "@/core/AbsolutePath";
import { SourceFileList } from "@/core/SourceFileList";
import { SourceFile } from "@/core/SourceFile";

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
  abstract addCompileOptions(...options: Array<string|string[]>): void;
  abstract addLinkOptions(...options: Array<string|string[]>): void;
  abstract getSourceFiles(...sources: any[]): SourceFileList;
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
  addCustomScript(script: string, params: any): CustomScript;
  target(name: string): InterfaceTarget;
  script(name: string): InterfaceScript;
  install(value: any, params: any): void;
  addObjectLibrary(name: string, ...sources: any[]): InterfaceTarget;
  addStaticLibrary(name: string, ...sources: any[]): InterfaceTarget;
  addSharedLibrary(name: string, ...sources: any[]): InterfaceTarget;
  addExecutable(name: string, ...sources: any[]): InterfaceTarget;
  executeScript(script: any, params: any): void;
};
