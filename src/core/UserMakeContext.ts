/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMakeContext, IObjectLibrary, IStaticLibrary, ISharedLibrary, IExecutable } from "@/core/MakeInterfaces";
import { InterfaceScript } from "@/core/InterfaceScript";
import { UserIndirectTarget } from "@/core/Target";
import { CustomScript } from "@/core/CustomScript";
import { VariantMap, VariableMap } from "@/core/Scope";
import { BaseContext, createContext } from "@/core/BaseContext";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

const IMPL = Symbol("IMPL");

export class UserMakeContext extends BaseContext implements IMakeContext {
  [IMPL]: IMakeContext;

  public constructor(impl: IMakeContext, variableMap: VariableMap) {
    super(variableMap);
    this[IMPL] = impl;
  }

  public static create(impl: IMakeContext, variableMap: VariableMap) {
    return createContext(new UserMakeContext(impl, variableMap));
  }

  public getCacheVariables() {
    return this[IMPL].getCacheVariables();
  }

  public addCacheVariables(params: string | VariantMap): void {
    this[IMPL].addCacheVariables(params);
  }

  public addIncludeDirectories(...dirs: any[]): any {
    this[IMPL].addIncludeDirectories(...dirs);
  }

  public addSubdirectory(sourceDir: any, binaryDir?: any) {
    this[IMPL].addSubdirectory(sourceDir, binaryDir);
  }
  
  public addCustomScript(script: any, params: any): CustomScript {
    return this[IMPL].addCustomScript(script, params);
  }

  public target(name: string): UserIndirectTarget {
    return this[IMPL].target(name);
  }

  public script(name: string): InterfaceScript {
    return this[IMPL].script(name);
  }

  public install(value: any, params: any): void {
    this[IMPL].install(value, params);
  }

  public addObjectLibrary(name: any, ...sources: any[]): IObjectLibrary {
    return this[IMPL].addObjectLibrary(name, ...sources);
  }

  public addStaticLibrary(name: any, ...sources: any[]): IStaticLibrary {
    return this[IMPL].addStaticLibrary(name, ...sources);
  }

  public addSharedLibrary(name: any, ...sources: any[]): ISharedLibrary {
    return this[IMPL].addSharedLibrary(name, ...sources);
  }

  public addExecutable(name: any, ...sources: any[]): IExecutable {
    return this[IMPL].addExecutable(name, ...sources);
  }

  public executeScript(script: any, params: any): void {
    this[IMPL].executeScript(script, params);
  }
};
