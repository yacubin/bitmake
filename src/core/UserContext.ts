/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import os from "node:os";
import path from "node:path";

import { copyValue } from "@/utils/Primitives";
import { fileExistsSync } from "@/utils/FileSystem";
import { AbsolutePath } from "@/core/Path";
import { InterfaceTarget } from "@/core/InterfaceTarget";
import { InterfaceScript } from "@/core/InterfaceScript";
import { InstallEntity } from "@/core/InstallEntity";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, BaseTarget } from "@/core/Target";
import { IncludeDirectory } from "@/core/IncludeDirectory";
import { Scope } from "@/core/Scope";
import { CustomScript } from "@/core/CustomScript";
import { GlobalContext } from "@/core/GlobalContext";
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

const UserContext: any = function(this: any, scope: any, global: GlobalContext) {
  this[SCOPE] = scope;
  this[GLOBAL] = global;

  const props = Object.getOwnPropertyDescriptors(Scope.prototype);
  for (const [name, desc] of Object.entries(props)) {
    if (desc.get || desc.set) {
      const newDesc: any = { enumerable: desc.enumerable, configurable: false };
      if (desc.get)
        newDesc.get = function() { return this[SCOPE][name]; }
      if (desc.set)
        newDesc.set = function(value: any) { this[SCOPE][name] = value; }
      Object.defineProperty(this, name, newDesc);
    }
  }
}

UserContext.create = (scope: any, global: GlobalContext) => {
  const proto = UserContext.prototype;
  const newScope = Object.create(proto);
  const obj = Object.create(newScope);
  UserContext.call(obj, scope, global)
  return obj;
}

UserContext.prototype.__scope = function() {
  return this[SCOPE];
}

UserContext.prototype.getCacheVariables = function() {
  const result: any = {};
  for (const [key, entry] of Object.entries(this[GLOBAL].CACHE) as any) {
    const value = copyValue(this[key]);
    result[key] = {
      type: copyValue(entry.type) || typeof value,
      description: entry.description || "",
      value,
    };
  }
  return result;
}

UserContext.prototype.addCacheVariables = function(params: any) {

  if (typeof params === "string") {
    const scripts = this.SOURCE_DIR.resolve(params);
    this[GLOBAL].loadCacheVariables(scripts);
  }
  else if (typeof params === "object") {
    this[GLOBAL].addCacheVariables(params);
  }
  else {
    throw new Error(`Type ${params} cannot use for cache variables`);
  }

  this[GLOBAL].copyCacheVariables(this);
}

UserContext.prototype.addIncludeDirectories = function(...dirs: any[]) {
  for (const iter of dirs.flat(1)) {
    this.INCLUDES.push(IncludeDirectory.create(iter, this.SOURCE_DIR));
  }
}

UserContext.prototype.addSubdirectory = function(sourceDir: any, binaryDir: any) {

  binaryDir = binaryDir || path.isAbsolute(sourceDir) ? undefined : sourceDir;

  const SOURCE_DIR = path.isAbsolute(sourceDir) ? AbsolutePath.create(sourceDir) : this.SOURCE_DIR.join(sourceDir);
  const BINARY_DIR = path.isAbsolute(binaryDir) ? AbsolutePath.create(binaryDir) : this.BINARY_DIR.join(binaryDir);

  const newScope = this[SCOPE].clone();

  newScope.SOURCE_DIR = AbsolutePath.create(this[GLOBAL].resolveSubdirectory(SOURCE_DIR).toString());
  newScope.BINARY_DIR = BINARY_DIR;
  
  const newContex = UserContext.create(newScope, this[GLOBAL]);
  for (const [key, val] of Object.entries(this)) {
    if (!Object.hasOwn(Scope.prototype, key))
      newContex[key] = val;
  }

  this[GLOBAL].addSubdirectory(newContex);
}

UserContext.prototype.addCustomScript = function(name: string, params: any) {
  if (!params || !params.script || !params.output)
    throw new Error(`Uknown params ${JSON.stringify(params)}`);

  let script;
  if (typeof params.script === "string")
    script = this[GLOBAL].findScriptFunction(params.script);
  if (!script)
    script = this[SCOPE].SOURCE_DIR.resolve(params.script);

  const target = CustomScript.create(this[SCOPE], name, script, params.output, params);
  this[GLOBAL].SCRIPTS.set(name, target);
  return target;
}

UserContext.prototype.target = function(name: string) {
  const utarget = this[GLOBAL].getUknownTarget(name);
  return InterfaceTarget.create(this[SCOPE], utarget);
}

UserContext.prototype.script = function(name: string) {
  let script = this[GLOBAL].INTERFACE_SCRIPTS[name];
  if (!script) {
    script = InterfaceScript.create(name);
    this[GLOBAL].INTERFACE_SCRIPTS[name] = script;
  }

  return script;
}

UserContext.prototype.install = function(value: any, params: any) {
  for (const it of [ value ].flat(1)) {
    const iter = (it instanceof BaseTarget) ? this.target(it.NAME) : it;
    const entity = InstallEntity.create(this, iter, params);
    this[GLOBAL].INSTALL_LIST.push(entity);
  }
}

UserContext.prototype.addStaticLibrary = function(name: any, ...sources: any[]) {
  const target = StaticLibrary.create(this[SCOPE], name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addObjectLibrary = function(name: any, ...sources: any[]) {
  const target = ObjectLibrary.create(this[SCOPE], name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addSharedLibrary = function(name: any, ...sources: any[]) {
  const target = SharedLibrary.create(this[SCOPE], name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.addExecutable = function(name: string, ...sources: any[]) {
  const target = Executable.create(this[SCOPE], name);
  target.addSources(...sources);

  this[GLOBAL].TARGETS.set(name, target);
  return target;
}

UserContext.prototype.findProgram = function(name: string) {
  if (os.platform() === "win32" && !name.endsWith(".exe"))
    name += ".exe";

  const paths = (process.env.PATH || "").split(path.posix.delimiter);
  for (const iter of paths) {
    const filename = path.posix.resolve(iter, name);
    if (fileExistsSync(filename))
      return filename;
  }

  return null;
}

UserContext.prototype.executeScript = function(script: any, options: any) {
  const scriptPath = this.SOURCE_DIR.resolve(script);
  const module = requireImpl(scriptPath.toString());
  module(scopeValueAsPrimitives(options));
}

export { UserContext };
