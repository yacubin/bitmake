/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";

import { fileExistsSync } from "@/utils/FileSystem";
import { AbsolutePath } from "@/core/Path";
import { InterfaceTarget } from "@/core/InterfaceTarget";
import { InterfaceScript } from "@/core/InterfaceScript";
import { InstallEntity } from "@/core/InstallEntity";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, BaseTarget } from "@/core/Target";
import { CustomScript } from "@/core/CustomScript";
import { GlobalContext } from "@/core/GlobalContext";
import { ScopeHelper } from "@/core/Scope";
import { BaseContext } from "@/core/BaseContext";
import { SystemScope } from "@/core/SystemScope";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

const requireImpl = eval("require");

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
  [SCOPE]: SystemScope;
  [GLOBAL]: GlobalContext;

  public constructor(scope: SystemScope, global: GlobalContext) {
    super();
    this[SCOPE] = scope;
    this[GLOBAL] = global;
  }

  public getCacheVariables() {
    return ScopeHelper.getVariablesByGroup(this[SCOPE], VARIABLE_GROUP);
  }

  public addCacheVariables(params: any) {
    let variables = params;
    if (typeof params === "string") {
      const filename = this[SCOPE].SOURCE_DIR.resolve(params).toString();
      if (!fileExistsSync(filename))
        return;
      variables = requireImpl(filename);
    }

    ScopeHelper.defineVariables(this[SCOPE], VARIABLE_GROUP, variables);
  }

  public addIncludeDirectories(...dirs: any[]) {
    const sourceDir = this[SCOPE].SOURCE_DIR;
    for (const iter of dirs.flat())
      this[SCOPE].INCLUDES.push(sourceDir.resolve(iter));
  }

  public addSubdirectory(sourceDir: any, binaryDir: any) {
    binaryDir = binaryDir || path.isAbsolute(sourceDir) ? undefined : sourceDir;

    const SOURCE_DIR = path.isAbsolute(sourceDir) ? AbsolutePath.create(sourceDir) : this[SCOPE].SOURCE_DIR.join(sourceDir);
    const BINARY_DIR = path.isAbsolute(binaryDir) ? AbsolutePath.create(binaryDir) : this[SCOPE].BINARY_DIR.join(binaryDir);

    const newScope = ScopeHelper.clone({}, this[SCOPE]);

    const resolvePath = this[GLOBAL].resolveSubdirectory(SOURCE_DIR);
    if (!resolvePath) {
      logger.info(`Source dir "${SOURCE_DIR}" was disabled`);
      return;
    }

    newScope.SOURCE_DIR = AbsolutePath.create(resolvePath.toString());
    newScope.BINARY_DIR = BINARY_DIR;

    this[GLOBAL].addSubdirectory(newScope);
  }
  
  public addCustomScript(script: any, params: any): CustomScript {
    const newScope = ScopeHelper.clone({}, this[SCOPE]);
    for (const [key, val] of Object.entries(params))
      newScope[key] = val;
    return this[GLOBAL].addCustomScript(newScope, script, params);
  }
  
  public script(name: string): InterfaceScript {
    let script = this[GLOBAL].INTERFACE_SCRIPTS[name];
    if (!script) {
      script = InterfaceScript.create(name);
      this[GLOBAL].INTERFACE_SCRIPTS[name] = script;
    }
    return script;
  }

  public install(value: any, params: any): void {
    for (const it of [ value ].flat(1)) {
      const iter = (it instanceof BaseTarget) ? this.target(it.NAME) : it;
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
    const module = requireImpl(scriptPath.toString());
    module(scopeValueAsPrimitives(options));
  }
};
