/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { fileExistsSync } from "@/utils/FileSystem";
import { InterfaceScript } from "@/core/InterfaceScript";
import { InstallEntity } from "@/core/InstallEntity";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, BaseTarget, InterfaceTarget } from "@/core/Target";
import { CustomScript } from "@/core/CustomScript";
import { GlobalContext } from "@/core/GlobalContext";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { BaseContext } from "@/core/BaseContext";
import { createLogger } from "@/logger";
import { requireSync } from "@/utils/Module";

const logger = createLogger(import.meta.url);

const VARIABLE_GROUP = "custom";

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export class MakeContext extends BaseContext {
  [GLOBAL]: GlobalContext;
  [SCOPE]: VariableMap;

  public constructor(global: GlobalContext, variableMap: VariableMap) {
    super();
    this[GLOBAL] = global;
    this[SCOPE] = variableMap;
  }

  public getCacheVariables() {
    return ScopeHelper.getVariablesByGroup(this[SCOPE], VARIABLE_GROUP);
  }

  public addCacheVariables(params: any) {
    let variables = params;
    if (typeof params === "string") {
      const filename = this[SCOPE].SOURCE_DIR.getValue().resolve(params).toString();
      if (!fileExistsSync(filename))
        return;
      variables = requireSync(filename);
    }

    ScopeHelper.defineVariablesInVariableMap(this[SCOPE], VARIABLE_GROUP, variables);
  }

  public addIncludeDirectories(...dirs: any[]) {
    const sourceDir = this[SCOPE].SOURCE_DIR.getValue();
    for (const iter of dirs.flat())
      this[SCOPE].INCLUDES.getValue().push(sourceDir.resolve(iter));
  }

  public addSubdirectory(sourceDir: any, binaryDir: any) {
    this[GLOBAL].addSubdirectory(this[SCOPE], "work", sourceDir, binaryDir);
  }

  public addCustomScript(script: any, params: any): CustomScript {
    const newVariableMap = ScopeHelper.cloneVariableMap(this[SCOPE]);
    ScopeHelper.extendVariableMapByValues(newVariableMap, VARIABLE_GROUP, params);
    return this[GLOBAL].addCustomScript(newVariableMap, script, params);
  }

  public script(name: string): InterfaceScript {
    return this[GLOBAL].getInterfaceScript(this[SCOPE], name);
  }

  public install(value: any, params: any): void {
    for (const it of [ value ].flat()) {
      const iter = (it instanceof BaseTarget) ? this.target(it.targetName) : it;
      const entity = InstallEntity.create(this, iter, params);
      this[GLOBAL].addInstallEntry(entity);
    }
  }

  public addStaticLibrary(name: any, ...sources: any[]): StaticLibrary {
    return this[GLOBAL].addStaticLibrary(this[SCOPE], name, ...sources);
  }

  public addObjectLibrary(name: any, ...sources: any[]): ObjectLibrary {
    return this[GLOBAL].addObjectLibrary(this[SCOPE], name, ...sources);
  }

  public addSharedLibrary(name: any, ...sources: any[]): SharedLibrary {
    return this[GLOBAL].addSharedLibrary(this[SCOPE], name, ...sources);
  }

  public addExecutable(name: string, ...sources: any[]): Executable {
    return this[GLOBAL].addExecutable(this[SCOPE], name, ...sources);
  }

  public target(name: string): InterfaceTarget {
    return this[GLOBAL].getTarget(this[SCOPE], name);
  }

  public executeScript(script: any, params: any) {
    this[GLOBAL].executeScriptSync(this[SCOPE], script, params);
  }

  public static create(global: GlobalContext, variableMap: VariableMap) {
    const ctx = new MakeContext(global, variableMap);
    return ScopeHelper.createProxy(variableMap, ctx);
  }
};
