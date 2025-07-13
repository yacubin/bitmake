/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMakeContext, InterfaceScript } from "@/core/MakeInterfaces";
import { VariantMap, VariableMap, ScopeHelper } from "@/core/Scope";
import { SystemScope } from "@/core/SystemScope";
import { GeneralContext, MakeContext, createContext } from "@/core/BaseContext";
import { UserTargetStruct } from "@/core/UserTargetStruct";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

const SCOPE = Symbol("SCOPE");
const IMPL = Symbol("IMPL");

export class UserMakeContext extends GeneralContext implements IMakeContext {
  [IMPL]: MakeContext;
  [SCOPE]: SystemScope;

  public constructor(impl: MakeContext, variableMap: VariableMap) {
    super(variableMap);
    this[IMPL] = impl;
    this[SCOPE] = ScopeHelper.createProxy(variableMap);
  }

  public static create(impl: MakeContext, variableMap: VariableMap) {
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
  
  public addCustomScript(script: any, params: any): InterfaceScript {
    return this[IMPL].addCustomScript(script, params);
  }

  public target(name: string): UserTargetStruct {
    const target = this[IMPL].target(name);
    return UserTargetStruct.create(target, this[SCOPE]);
  }

  public script(name: string): InterfaceScript {
    return this[IMPL].script(name);
  }

  public install(value: any, params: any): void {
    this[IMPL].install(value, params);
  }

  public addObjectLibrary(name: any, ...sources: any[]): UserTargetStruct {
    const target = this[IMPL].addObjectLibrary(name, ...sources);
    return UserTargetStruct.create(target, this[SCOPE]);
  }

  public addStaticLibrary(name: any, ...sources: any[]): UserTargetStruct {
    const target = this[IMPL].addStaticLibrary(name, ...sources);
    return UserTargetStruct.create(target, this[SCOPE]);
  }

  public addSharedLibrary(name: any, ...sources: any[]): UserTargetStruct {
    const target = this[IMPL].addSharedLibrary(name, ...sources);
    return UserTargetStruct.create(target, this[SCOPE]);
  }

  public addExecutable(name: any, ...sources: any[]): UserTargetStruct {
    const target = this[IMPL].addExecutable(name, ...sources);
    return UserTargetStruct.create(target, this[SCOPE]);
  }

  public executeScript(script: any, params: any): void {
    this[IMPL].executeScript(script, params);
  }
};
