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

export namespace MakeContext {

interface IMakeContext extends SystemScope {
  findProgram(name: string): string | undefined;

  getCacheVariables(): any;
  addCacheVariables(params: any): void;
  addIncludeDirectories(...dirs: any[]): void;
  addSubdirectory(sourceDir: any, binaryDir: any): void;
  addCustomScript(script: any, params: any): CustomScript;
  target(name: string): InterfaceTarget;
  script(name: string): InterfaceScript;
  install(value: any, params: any): void;
  addStaticLibrary(name: any, ...sources: any[]): StaticLibrary;
  addSharedLibrary(name: any, ...sources: any[]): SharedLibrary;
  addExecutable(name: string, ...sources: any[]): Executable;
  executeScript(this: IMakeContext, script: any, options: any): void;

  [SCOPE]: SystemScope;
  [GLOBAL]: GlobalContext;
};

const methods = {
  findProgram: findProgramSync,

  getCacheVariables(this: IMakeContext) {
    return ScopeHelper.getVariablesByGroup(this[SCOPE], "cache");
  },

  addCacheVariables(this: IMakeContext, params: any) {
    let variables = params;
    if (typeof params === "string") {
      const filename = this[SCOPE].SOURCE_DIR.resolve(params).toString();
      if (!fileExistsSync(filename))
        return;
      variables = requireImpl(filename);
    }
    
    ScopeHelper.defineVariables(this[SCOPE], "cache", variables);
  },
  
  addIncludeDirectories(this: IMakeContext, ...dirs: any[]) {
    const sourceDir = this[SCOPE].SOURCE_DIR;
    for (const iter of dirs.flat(1)) {
      this[SCOPE].INCLUDES.push(IncludeDirectory.create(iter, sourceDir));
    }
  },
  
  addSubdirectory(this: IMakeContext, sourceDir: any, binaryDir: any) {
    binaryDir = binaryDir || path.isAbsolute(sourceDir) ? undefined : sourceDir;
  
    const SOURCE_DIR = path.isAbsolute(sourceDir) ? AbsolutePath.create(sourceDir) : this[SCOPE].SOURCE_DIR.join(sourceDir);
    const BINARY_DIR = path.isAbsolute(binaryDir) ? AbsolutePath.create(binaryDir) : this[SCOPE].BINARY_DIR.join(binaryDir);
  
    const newScope = ScopeHelper.clone({}, this[SCOPE]);
    ScopeHelper.applyVariables(newScope, this);
  
    newScope.SOURCE_DIR = AbsolutePath.create(this[GLOBAL].resolveSubdirectory(SOURCE_DIR).toString());
    newScope.BINARY_DIR = BINARY_DIR;
  
    this[GLOBAL].addSubdirectory(newScope);
  },
  
  addCustomScript(this: IMakeContext, script: any, params: any): CustomScript {
    const newScope = ScopeHelper.clone({}, this[SCOPE]);
    ScopeHelper.applyVariables(newScope, this);
    return this[GLOBAL].addCustomScript(newScope, script, params);
  },
  
  target(this: IMakeContext, name: string): InterfaceTarget {
    const utarget = this[GLOBAL].getUknownTarget(name);
    return InterfaceTarget.create(this[SCOPE], utarget);
  },
  
  script(this: IMakeContext, name: string): InterfaceScript {
    let script = this[GLOBAL].INTERFACE_SCRIPTS[name];
    if (!script) {
      script = InterfaceScript.create(name);
      this[GLOBAL].INTERFACE_SCRIPTS[name] = script;
    }
    return script;
  },
  
  install(this: IMakeContext, value: any, params: any): void {
    for (const it of [ value ].flat(1)) {
      const iter = (it instanceof BaseTarget) ? this.target(it.NAME) : it;
      const entity = InstallEntity.create(this, iter, params);
      this[GLOBAL].addInstallEntry(entity);
    }
  },
  
  addStaticLibrary(this: IMakeContext, name: any, ...sources: any[]): StaticLibrary {
    const target = StaticLibrary.create(this[SCOPE], name);
    target.addSources(...sources);
  
    this[GLOBAL].TARGETS.set(name, target);
    return target;
  },

  addObjectLibrary(this: IMakeContext, name: any, ...sources: any[]): ObjectLibrary {
    const target = ObjectLibrary.create(this[SCOPE], name);
    target.addSources(...sources);
  
    this[GLOBAL].TARGETS.set(name, target);
    return target;
  },

  addSharedLibrary(this: IMakeContext, name: any, ...sources: any[]): SharedLibrary {
    const target = SharedLibrary.create(this[SCOPE], name);
    target.addSources(...sources);

    this[GLOBAL].TARGETS.set(name, target);
    return target;
  },

  addExecutable(this: IMakeContext, name: string, ...sources: any[]): Executable {
    const target = Executable.create(this[SCOPE], name);
    target.addSources(...sources);
  
    this[GLOBAL].TARGETS.set(name, target);
    return target;
  },

  executeScript(this: IMakeContext, script: any, options: any) {
    const scriptPath = this[SCOPE].SOURCE_DIR.resolve(script);
    const module = requireImpl(scriptPath.toString());
    module(scopeValueAsPrimitives(options));
  },
};

export function create(scope: SystemScope, global: GlobalContext): IMakeContext {
  const props: any = {};
  for (const [key, value] of Object.entries(methods)) {
    props[key] = {
      value,
      enumerable: false,
      writable: false,
      configurable: false,
    }
  }

  const mk = Object.create(scope, props);

  mk[SCOPE] = scope;
  mk[GLOBAL] = global;

  return mk;
}

} // namespace MakeContext
