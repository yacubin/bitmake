/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMakeContext, InterfaceTarget, InterfaceScript } from "@/core/MakeInterfaces";
import { VariantMap, VariableMap, ScopeHelper } from "@/core/Scope";
import { SystemScope } from "@/core/SystemScope";
import { GeneralContext, MakeContext, createContext } from "@/core/BaseContext";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, MainTarget } from "@/core/Target";
import { UserTargetStruct } from "@/core/UserTargetStruct";
import { ALL_TARGET, INSTALL_TARGET } from "@/Constants";
import { CUSTOM_VARIABLE_GROUP } from "@/Constants";
import { randCIdentifer } from "@/utils/Random";
import { Logger } from "@/utils/Logger";
import { FilePath, Locator } from "@/utils/Locator";
import { TargetName } from "@/core/TargetName";

const logger = Logger.create(import.meta.url);

const SCOPE = Symbol("SCOPE");
const IMPL = Symbol("IMPL");
const VARMAP = Symbol("VARMAP");

function createTargetImpl<T extends MainTarget>(TargetCtor: new (...args: any[]) => T, ctx: MakeContext, scope: SystemScope, name: string) {
  if (typeof name !== "string")
    throw new Error(`Target "${name}" is not string type`);

  if (!name)
    throw new Error(`A target with an empty name cannot exist`);

  if (ctx.hasMainTarget(name))
    throw new Error(`Target "${name}" exists`);

  if ([ ALL_TARGET, INSTALL_TARGET ].includes(name))
    throw new Error(`Target "${name}" is reserved name`);

  const target = new TargetCtor(name, scope.SOURCE_DIR, scope.BINARY_DIR);
  ctx.addMainTarget(name, target);
  return target;
}

export class UserMakeContext extends GeneralContext implements IMakeContext {
  private [IMPL]: MakeContext;
  private [VARMAP]: VariableMap;
  private [SCOPE]: SystemScope;

  public constructor(impl: MakeContext, variableMap: VariableMap) {
    super(variableMap);
    this[IMPL] = impl;
    this[VARMAP] = variableMap;
    this[SCOPE] = ScopeHelper.createProxy(variableMap);
  }

  public static create(impl: MakeContext, variableMap: VariableMap) {
    return createContext(new UserMakeContext(impl, variableMap));
  }

  public getCacheVariables() {
    return ScopeHelper.getVariablesByGroup(this[VARMAP], CUSTOM_VARIABLE_GROUP);
  }

  public addCacheVariables(params: string | VariantMap): void {
    let variables = params;
    if (typeof params === "string") {
      const url = this[SCOPE].SOURCE_DIR.resolve(params).toURLString();
      variables = this[IMPL].loadJSON(url);
    }
    ScopeHelper.defineVariablesInVariableMap(this[VARMAP], CUSTOM_VARIABLE_GROUP, variables);
  }

  public addIncludeDirectories(...dirs: any[]): any {
    const sourceDir = this[SCOPE].SOURCE_DIR;
    for (const iter of dirs.flat()) {
      this[SCOPE].INCLUDES.push(sourceDir.resolve(iter));
    }
  }

  public addSubdirectory(sourceDir: any, binaryDir?: any) {
    this[IMPL].addSubdirectory(this[VARMAP], sourceDir, binaryDir);
  }
  
  public addCustomScript(scriptModule: string | Locator, params: any): InterfaceScript {
    const variableMap = ScopeHelper.cloneVariableMap(this[VARMAP]);
    ScopeHelper.extendVariableMapByValues(variableMap, CUSTOM_VARIABLE_GROUP, params);
    ScopeHelper.set(variableMap, "SCRIPT_MODULE", scriptModule);
    
    const sourceDir = ScopeHelper.get(variableMap, "SOURCE_DIR") as Locator;
    const binaryDir = ScopeHelper.get(variableMap, "BINARY_DIR") as Locator;

    let inputFile = ScopeHelper.get(variableMap, "SCRIPT_INPUT");
    if (inputFile)
      inputFile = sourceDir.resolve(inputFile);

    let outputFile = ScopeHelper.get(variableMap, "SCRIPT_OUTPUT");
    if (!outputFile)
      throw new Error("CustomScript parameters required output entity");

    outputFile = sourceDir.resolve(outputFile);

    const options = {
      variableMap,
      name: ScopeHelper.get(variableMap, "SCRIPT_NAME") || randCIdentifer(16),
      scriptModule,
      output: outputFile,
      input: inputFile,
      sourceDir,
      binaryDir,
    };

    return this[IMPL].addCustomScript(options);
  }

  public target(name: string): UserTargetStruct {
    return UserTargetStruct.create(this[IMPL].getPostTarget(name), this[SCOPE]);
  }

  public script(name: string): InterfaceScript {
    return this[IMPL].script(name);
  }

  public install(value: any, params: any): void {
    for (const it of [ value ].flat()) {
      let iter = (it instanceof InterfaceTarget) ? TargetName.create(it.targetName) : it;

      let destination: string | Locator | undefined;
      let baseDir;
      if (typeof params === "string")
        destination = params;
      else if (params) {
        destination = params.destination;
        baseDir = params.baseDir;
      }

      if (!destination)
        throw new Error(`Parameter destination is not specified`);
    
      if (baseDir)
        baseDir = this[SCOPE].SOURCE_DIR.resolve(baseDir);

      if (typeof iter === "string" || iter instanceof Locator) {
        iter = this[SCOPE].SOURCE_DIR.resolve(iter.toString());
        iter = FilePath.create(iter);
        baseDir = baseDir || iter.dirname();
      }
      else if (!(iter instanceof TargetName)) {
        throw new Error(`Not supportet value of ${iter}`);
      }

      this[IMPL].addInstallEntry(iter, Locator.create(this[SCOPE].INSTALL_PREFIX.resolve(destination)), baseDir);
    }
  }

  public addObjectLibrary(name: string, ...sources: any[]): UserTargetStruct {
    const target = createTargetImpl(ObjectLibrary, this[IMPL], this[SCOPE], name);
    target.setPrefix(this[SCOPE].OBJECT_LIBRARY_PREFIX);
    target.setSuffix(this[SCOPE].OBJECT_LIBRARY_SUFFIX);
    target.addLinkOptions(...this[SCOPE].OBJECT_LINKER_FLAGS);

    return UserTargetStruct.create(target, this[SCOPE], ...sources);
  }

  public addStaticLibrary(name: any, ...sources: any[]): UserTargetStruct {
    const target = createTargetImpl(StaticLibrary, this[IMPL], this[SCOPE], name);
    target.setPrefix(this[SCOPE].STATIC_LIBRARY_PREFIX);
    target.setSuffix(this[SCOPE].STATIC_LIBRARY_SUFFIX);
    target.addLinkOptions(...this[SCOPE].STATIC_LINKER_FLAGS);

    return UserTargetStruct.create(target, this[SCOPE], ...sources);
  }

  public addSharedLibrary(name: any, ...sources: any[]): UserTargetStruct {
    const target = createTargetImpl(SharedLibrary, this[IMPL], this[SCOPE], name);
    target.setPrefix(this[SCOPE].SHARED_LIBRARY_PREFIX);
    target.setSuffix(this[SCOPE].SHARED_LIBRARY_SUFFIX);
    target.addLinkOptions(...this[SCOPE].SHARED_LINKER_FLAGS);

    return UserTargetStruct.create(target, this[SCOPE], ...sources);
  }

  public addExecutable(name: any, ...sources: any[]): UserTargetStruct {
    const target = createTargetImpl(Executable, this[IMPL], this[SCOPE], name);
    target.setSuffix(this[SCOPE].EXECUTABLE_SUFFIX);
    target.addLinkOptions(...this[SCOPE].EXE_LINKER_FLAGS);

    return UserTargetStruct.create(target, this[SCOPE], ...sources);
  }

  public executeScript(script: any, params: any): void {
    this[IMPL].executeScript(this[VARMAP], script, params);
  }
};
