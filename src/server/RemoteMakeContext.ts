/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceScript } from "@/core/InterfaceScript";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, InterfaceTarget } from "@/core/Target";
import { CustomScript } from "@/core/CustomScript";
import { BaseContext, createContext, createVariableMapForDirectory } from "@/core/BaseContext";
import { JsonRpcRequestSync } from "@/server/JsonRpcRequestSync";
import { RemoteExecutable } from "@/server/RemoteExecutable";
import { RemoteStaticLibrary } from "@/server/RemoteStaticLibrary";
import { MAINNODE_LOADJSON } from "@/server/RemoteMethods";
import { MAINNODE_EXECUTESCRIPT } from "@/server/RemoteMethods";
import { MAINNODE_STARTMAKESCRIPT } from "@/server/RemoteMethods";
import { MAINNODE_ADDCUSTOMSCRIPT } from "@/server/RemoteMethods";
import { MAINNODE_ADDSTATICLIBRARY } from "@/server/RemoteMethods";
import { MAINNODE_ADDEXECUTABLE } from "@/server/RemoteMethods";
import { Logger } from "@/logger";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { CUSTOM_VARIABLE_GROUP } from "@/Constants";

const logger = Logger.create(import.meta.url);

const REQUEST = Symbol("REQUEST");
const SCOPE = Symbol("SCOPE");

export class RemoteMakeContext extends BaseContext {
  [SCOPE]: VariableMap;
  [REQUEST]: JsonRpcRequestSync;

  public constructor(variableMap: VariableMap, requestSync: JsonRpcRequestSync) {
    super(variableMap);
    this[SCOPE] = variableMap;
    this[REQUEST] = requestSync;
  }

  public getCacheVariables(...params: any): any {
      return ScopeHelper.getVariablesByGroup(this[SCOPE], CUSTOM_VARIABLE_GROUP);
  }

  public addCacheVariables(params: any): any {
    let variables = params;
    if (typeof params === "string") {
      const filename = ScopeHelper.get(this[SCOPE], "SOURCE_DIR").resolve(params).toString();
      variables = this[REQUEST].requestSync(MAINNODE_LOADJSON, filename);
    }
    ScopeHelper.defineVariablesInVariableMap(this[SCOPE], CUSTOM_VARIABLE_GROUP, variables);
  }

  public addIncludeDirectories(...dirs: any[]): any {
    const sourceDir = ScopeHelper.get(this[SCOPE], "SOURCE_DIR");
    for (const iter of dirs.flat())
      ScopeHelper.get(this[SCOPE], "INCLUDES").push(sourceDir.resolve(iter));
  }

  public addSubdirectory(sourceDir: any, binaryDir: any) {
    const newVariableMap = createVariableMapForDirectory(this[SCOPE], sourceDir, binaryDir);
    return this[REQUEST].requestSync(MAINNODE_STARTMAKESCRIPT, ScopeHelper.toJSON(newVariableMap));
  }

  public addCustomScript(script: any, params: any): CustomScript {
    logger.debug("RemoteMakeContext.addCustomScript(", script, params, ")");
    const newVariableMap = ScopeHelper.cloneVariableMap(this[SCOPE]);
    ScopeHelper.extendVariableMapByValues(newVariableMap, CUSTOM_VARIABLE_GROUP, params);
    ScopeHelper.set(newVariableMap, "SCRIPT_MODULE", script);
    return this[REQUEST].requestSync(MAINNODE_ADDCUSTOMSCRIPT, ScopeHelper.toJSON(newVariableMap));
  }

  public script(name: string): InterfaceScript {
    throw new Error("Not Implemented");
  }

  public install(value: any, params: any): void {
    throw new Error("Not Implemented");
  }

  public addStaticLibrary(name: any, ...sources: any[]): RemoteStaticLibrary {
    logger.debug("RemoteMakeContext.addStaticLibrary(", name, ")");
    const newVariableMap = ScopeHelper.cloneVariableMap(this[SCOPE]);
    const uuid = this[REQUEST].requestSync(MAINNODE_ADDSTATICLIBRARY, {
      name, variableMap: ScopeHelper.toJSON(this[SCOPE]),
    });
    const target = new RemoteStaticLibrary(newVariableMap, uuid, this[REQUEST]);
    target.addSources(...sources);
    return target;
  }

  public addObjectLibrary(name: any, ...sources: any[]): ObjectLibrary {
    throw new Error("Not Implemented");
  }

  public addSharedLibrary(name: any, ...sources: any[]): SharedLibrary {
    throw new Error("Not Implemented");
  }

  public addExecutable(name: string, ...sources: any[]): RemoteExecutable {
    logger.debug("RemoteMakeContext.addExecutable(", name, ")");
    const newVariableMap = ScopeHelper.cloneVariableMap(this[SCOPE]);
    const uuid = this[REQUEST].requestSync(MAINNODE_ADDEXECUTABLE, {
      name, variableMap: ScopeHelper.toJSON(this[SCOPE]),
    });
    const target = new RemoteExecutable(newVariableMap, uuid, this[REQUEST]);
    target.addSources(...sources);
    return target;
  }

  public target(name: string): InterfaceTarget {
    throw new Error("Not Implemented");
  }

  public executeScript(script: any, params: any): any {
    const newVariableMap = ScopeHelper.cloneVariableMap(this[SCOPE]);
    params && ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
    const scriptFile = ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
    ScopeHelper.set(newVariableMap, "SCRIPT_FILE", scriptFile);
    ScopeHelper.set(newVariableMap, "SCRIPT_DIR", scriptFile.dirname());
    return this[REQUEST].requestSync(MAINNODE_EXECUTESCRIPT, ScopeHelper.toJSON(newVariableMap));
  }

  public static create(variableMap: VariableMap, requestSync: JsonRpcRequestSync) {
    return createContext(new RemoteMakeContext(variableMap, requestSync));
  }
};
