/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceScript } from "@/core/InterfaceScript";
import { UserIndirectTarget } from "@/core/Target";
import { CustomScript } from "@/core/CustomScript";
import { VariantMap } from "@/core/Scope";
import { AbsolutePath } from "@/core/AbsolutePath";
import { InterfaceIncludes } from "@/core/InterfaceIncludes";
import { InterfaceObjects } from "@/core/InterfaceObjects";
import { SourceFileList } from "@/core/SourceFileList";
import { SourceFile } from "@/core/SourceFile";

export interface ITargetFile {
  targetName(): string;
};

export interface IMakeTarget {
  get targetName(): string;
  get includes(): InterfaceIncludes;
  get objects(): InterfaceObjects;

  setPrefix(prefix: string): void;  
  setSuffix(suffix: string): void;
  setOutputName(outputName: string): void;
  addSources(...sources: Array<InterfaceObjects | SourceFile | AbsolutePath | string>): void;
  addIncludes(...includes: Array<InterfaceIncludes | AbsolutePath | string>): void;
  addLibraries(...libraries: any): void;
  addCompileOptions(...options: Array<string|string[]>): void;
  addLinkOptions(...options: Array<string|string[]>): void;
  getSourceFiles(...sources: any[]): SourceFileList;
  addDefinitions(...definitions: any[]): void;
  addPreBuild(command: any, args: any[]): void;
  addPostBuild(command: any, args: any[]): void;

  setPositionIndependentCode(value: boolean): void;
  addPublicIncludes(...includes: Array<InterfaceIncludes | AbsolutePath | string>): void;
  addPublicDefinitions(...definitions: any): void;
  addPublicLibraries(...libraries: any[]): void;
  addPublicCompileOptions(...options: Array<string|string[]>): void;
  addPublicLinkOptions(...options: Array<string|string[]>): void;
};

export interface IObjectLibrary extends IMakeTarget {
};

export interface IStaticLibrary extends IMakeTarget {
};

export interface ISharedLibrary extends IMakeTarget {
}

export interface IExecutable extends IMakeTarget {
};

export interface IMakeContext {
  getCacheVariables(): any;
  addCacheVariables(params: string | VariantMap): void;
  addIncludeDirectories(...dirs: any[]): void;
  addSubdirectory(sourceDir: string | AbsolutePath, binaryDir?: string | AbsolutePath): void;
  addCustomScript(script: string, params: any): CustomScript;
  target(name: string): UserIndirectTarget;
  script(name: string): InterfaceScript;
  install(value: any, params: any): void;
  addObjectLibrary(name: string, ...sources: any[]): IObjectLibrary;
  addStaticLibrary(name: string, ...sources: any[]): IStaticLibrary;
  addSharedLibrary(name: string, ...sources: any[]): ISharedLibrary;
  addExecutable(name: string, ...sources: any[]): IExecutable;
  executeScript(script: any, params: any): void;
};
