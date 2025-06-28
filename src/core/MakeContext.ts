/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { fileExistsSync } from "@/utils/FileSystem";
import { AbsolutePath } from "@/core/Path";
import { InterfaceScript } from "@/core/InterfaceScript";
import { InstallEntity } from "@/core/InstallEntity";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, BaseTarget, InterfaceTarget } from "@/core/Target";
import { CustomScript } from "@/core/CustomScript";
import { GlobalContext } from "@/core/GlobalContext";
import { ScopeHelper } from "@/core/Scope";
import { BaseContext } from "@/core/BaseContext";
import { SystemScope } from "@/core/SystemScope";
import { createLogger } from "@/logger";
import { requireSync } from "@/utils/Module";

const logger = createLogger(import.meta.url);

function scopeValueAsPrimitives(o: any): any {
  if (typeof o === "undefined")
    return o;
  if (typeof o === "boolean")
    return o;
  if (typeof o === "number")
    return o;
  if (typeof o === "string")
    return o;
  if (typeof o === "object") {
    if (!o)
      return o;
    if (o instanceof AbsolutePath) {
      return o.toString();
    }
    if (o instanceof Array) {
      const result = [];
      for (const i of o)
        result.push(scopeValueAsPrimitives(i));
      return result;
    }
    if (o instanceof Object) {
      const result: any = {};
      for (const [k,v] of Object.entries(o))
        result[k] = scopeValueAsPrimitives(v);
      return result;
    }
  }
  throw new Error(`Unknown instance of ${o}`);
}

const VARIABLE_GROUP = "custom";

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export class MakeContext extends BaseContext {
  [GLOBAL]: GlobalContext;
  [SCOPE]: SystemScope;

  public constructor(global: GlobalContext, scope: SystemScope) {
    super();
    this[GLOBAL] = global;
    this[SCOPE] = scope;
  }

  public getCacheVariables() {
    const variableMap = ScopeHelper.getVariableMap(this[SCOPE]);
    return ScopeHelper.getVariablesByGroup(variableMap, VARIABLE_GROUP);
  }

  public addCacheVariables(params: any) {
    let variables = params;
    if (typeof params === "string") {
      const filename = this[SCOPE].SOURCE_DIR.resolve(params).toString();
      if (!fileExistsSync(filename))
        return;
      variables = requireSync(filename);
    }

    ScopeHelper.defineVariables(this[SCOPE], VARIABLE_GROUP, variables);
  }

  public addIncludeDirectories(...dirs: any[]) {
    const variableMap = ScopeHelper.getVariableMap(this[SCOPE]);
    const sourceDir = variableMap.SOURCE_DIR.getValue();
    for (const iter of dirs.flat())
      variableMap.INCLUDES.getValue().push(sourceDir.resolve(iter));
  }

  public addSubdirectory(sourceDir: any, binaryDir: any) {
    const variableMap = ScopeHelper.getVariableMap(this[SCOPE]);
    this[GLOBAL].addSubdirectory(variableMap, "work", sourceDir, binaryDir);
  }

  public addCustomScript(script: any, params: any): CustomScript {
    const newScope = ScopeHelper.clone({}, this[SCOPE]);
    for (const [name, value] of Object.entries(params)) {
      ScopeHelper.defineVariable(newScope, VARIABLE_GROUP, name, { value })
      newScope[name] = value;
    }
    return this[GLOBAL].addCustomScript(newScope, script, params);
  }

  public script(name: string): InterfaceScript {
    const variableMap = ScopeHelper.getVariableMap(this[SCOPE]);
    return this[GLOBAL].getInterfaceScript(variableMap, name);
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

  public executeScript(script: any, options: any) {
    const scriptPath = this[SCOPE].SOURCE_DIR.resolve(script);
    const module = requireSync(scriptPath.toString());
    module(scopeValueAsPrimitives(options));
  }
};
