/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceScript } from "@/core/InterfaceScript";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, UserIndirectTarget } from "@/core/Target";
import { CustomScript } from "@/core/CustomScript";
import { VariantMap } from "@/core/Scope";
import { AbsolutePath } from "@/core/AbsolutePath";

export interface IMakeContext {
  getCacheVariables(): any;
  addCacheVariables(params: string | VariantMap): void;
  addIncludeDirectories(...dirs: any[]): void;
  addSubdirectory(sourceDir: string | AbsolutePath, binaryDir?: string | AbsolutePath): void;
  addCustomScript(script: string, params: any): CustomScript;
  target(name: string): UserIndirectTarget;
  script(name: string): InterfaceScript;
  install(value: any, params: any): void;
  addObjectLibrary(name: string, ...sources: any[]): ObjectLibrary;
  addStaticLibrary(name: string, ...sources: any[]): StaticLibrary;
  addSharedLibrary(name: string, ...sources: any[]): SharedLibrary;
  addExecutable(name: string, ...sources: any[]): Executable;
  executeScript(script: any, params: any): void;
};
