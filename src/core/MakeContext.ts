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
import { ProjectContext } from "@/core/ProjectContext";
import { ScopeHelper, VariantMap, VariableMap } from "@/core/Scope";
import { BaseContext, createContext } from "@/core/BaseContext";
import { IMakeContext } from "@/core/IMakeContext";
import { createLogger } from "@/logger";
import { requireSync } from "@/utils/Module";
import { CUSTOM_VARIABLE_GROUP } from "@/Constants";

const logger = createLogger(import.meta.url);

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export class MakeContext extends BaseContext implements IMakeContext {
  [GLOBAL]: ProjectContext;
  [SCOPE]: VariableMap;

  public constructor(global: ProjectContext, variableMap: VariableMap) {
    super(variableMap);
    this[GLOBAL] = global;
    this[SCOPE] = variableMap;
  }

  public getCacheVariables() {
    return ScopeHelper.getVariablesByGroup(this[SCOPE], CUSTOM_VARIABLE_GROUP);
  }

  public addCacheVariables(params: string | VariantMap): void {
    let variables = params;
    if (typeof params === "string") {
      const filename = ScopeHelper.get(this[SCOPE], "SOURCE_DIR").resolve(params).toString();
      if (!fileExistsSync(filename))
        return;
      variables = requireSync(filename);
    }

    ScopeHelper.defineVariablesInVariableMap(this[SCOPE], CUSTOM_VARIABLE_GROUP, variables);
  }

  public addIncludeDirectories(...dirs: any[]) {
    const sourceDir = ScopeHelper.get(this[SCOPE], "SOURCE_DIR");
    for (const iter of dirs.flat())
      ScopeHelper.get(this[SCOPE], "INCLUDES").push(sourceDir.resolve(iter));
  }

  public addSubdirectory(sourceDir: any, binaryDir: any) {
    this[GLOBAL].addSubdirectory(this[SCOPE], sourceDir, binaryDir);
  }

  public addCustomScript(script: any, params: any): CustomScript {
    const newVariableMap = ScopeHelper.cloneVariableMap(this[SCOPE]);
    ScopeHelper.extendVariableMapByValues(newVariableMap, CUSTOM_VARIABLE_GROUP, params);
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

  public static create(global: ProjectContext, variableMap: VariableMap) {
    return createContext(new MakeContext(global, variableMap));
  }
};
