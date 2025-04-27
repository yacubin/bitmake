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
import { FilePath, AbsolutePath } from "@/core/Path";
import { InterfaceTarget } from "@/core/InterfaceTarget";
import { InterfaceScript } from "@/core/InterfaceScript";
import { InstallEntity } from "@/core/InstallEntity";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, BaseTarget } from "@/core/Target";
import { IncludeDirectory } from "@/core/IncludeDirectory";
import { CustomScript } from "@/core/CustomScript";
import { GlobalContext } from "@/core/GlobalContext";
import { ScopeHelper } from "@/core/Scope";
import { SystemScope } from "@/core/SystemScope";
import { findProgramSync } from "@/core/FindProgram";
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

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export class UserContext {
  private [SCOPE]: SystemScope;
  private [GLOBAL]: GlobalContext;

  private constructor(scope: SystemScope, global: GlobalContext) {
    this[SCOPE] = scope;
    this[GLOBAL] = global;
  }

  public static create(scope: SystemScope, global: GlobalContext): UserContext {
    const proto = UserContext.prototype;
    const newScope = Object.create(proto);
    ScopeHelper.clone(newScope, scope);
    const obj = Object.create(newScope);
    obj[SCOPE] = newScope;
    obj[GLOBAL] = global;
    return obj;
  }

  public getCacheVariables() {
    return ScopeHelper.getVariablesByGroup(this[SCOPE], "cache");
  }

  public addCacheVariables(params: any) {
    let variables = params;
    if (typeof params === "string") {
      const filename = this[SCOPE].SOURCE_DIR.resolve(params).toString();
      if (!fileExistsSync(filename))
        return;
      variables = requireImpl(filename);
    }
    
    ScopeHelper.defineVariables(this[SCOPE], "cache", variables);
  }

  public addIncludeDirectories(...dirs: any[]) {
    const sourceDir = this[SCOPE].SOURCE_DIR;
    for (const iter of dirs.flat(1)) {
      this[SCOPE].INCLUDES.push(IncludeDirectory.create(iter, sourceDir));
    }
  }

  public addSubdirectory(sourceDir: any, binaryDir: any) {
    binaryDir = binaryDir || path.isAbsolute(sourceDir) ? undefined : sourceDir;

    const SOURCE_DIR = path.isAbsolute(sourceDir) ? AbsolutePath.create(sourceDir) : this[SCOPE].SOURCE_DIR.join(sourceDir);
    const BINARY_DIR = path.isAbsolute(binaryDir) ? AbsolutePath.create(binaryDir) : this[SCOPE].BINARY_DIR.join(binaryDir);

    const newScope = ScopeHelper.clone({}, this[SCOPE]);
    ScopeHelper.applyVariables(newScope, this);

    newScope.SOURCE_DIR = AbsolutePath.create(this[GLOBAL].resolveSubdirectory(SOURCE_DIR).toString());
    newScope.BINARY_DIR = BINARY_DIR;

    this[GLOBAL].addSubdirectory(newScope);
  }

  public addCustomScript(script: any, params: any): CustomScript {
    return this[GLOBAL].addCustomScript(script, params, this[SCOPE].SOURCE_DIR, this[SCOPE].BINARY_DIR);
  }

  public target(name: string) {
    const utarget = this[GLOBAL].getUknownTarget(name);
    return InterfaceTarget.create(this[SCOPE], utarget);
  }

  public script(name: string) {
    let script = this[GLOBAL].INTERFACE_SCRIPTS[name];
    if (!script) {
      script = InterfaceScript.create(name);
      this[GLOBAL].INTERFACE_SCRIPTS[name] = script;
    }
    return script;
  }

  public install(value: any, params: any) {
    for (const it of [ value ].flat(1)) {
      const iter = (it instanceof BaseTarget) ? this.target(it.NAME) : it;
      const entity = InstallEntity.create(this, iter, params);
      this[GLOBAL].addInstallEntry(entity);
    }
  }

  public addStaticLibrary(name: any, ...sources: any[]) {
    const target = StaticLibrary.create(this[SCOPE], name);
    target.addSources(...sources);
  
    this[GLOBAL].TARGETS.set(name, target);
    return target;
  }

  public addObjectLibrary(name: any, ...sources: any[]) {
    const target = ObjectLibrary.create(this[SCOPE], name);
    target.addSources(...sources);

    this[GLOBAL].TARGETS.set(name, target);
    return target;
  }

  public addSharedLibrary(name: any, ...sources: any[]) {
    const target = SharedLibrary.create(this[SCOPE], name);
    target.addSources(...sources);
  
    this[GLOBAL].TARGETS.set(name, target);
    return target;
  }

  public addExecutable(name: string, ...sources: any[]) {
    const target = Executable.create(this[SCOPE], name);
    target.addSources(...sources);
  
    this[GLOBAL].TARGETS.set(name, target);
    return target;
  }

  public executeScript(script: any, options: any) {
    const scriptPath = this[SCOPE].SOURCE_DIR.resolve(script);
    const module = requireImpl(scriptPath.toString());
    module(scopeValueAsPrimitives(options));
  }
};

Object.defineProperty(UserContext.prototype, "findProgram", {
  value: findProgramSync,
  enumerable: false,
});
