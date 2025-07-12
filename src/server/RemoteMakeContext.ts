/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { MakeContext } from "@/core/BaseContext";
import { InterfaceScript } from "@/core/InterfaceScript";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, MainTarget, PostTarget } from "@/core/Target";
import { CustomScript } from "@/core/CustomScript";
import { createVariableMapForDirectory } from "@/core/BaseContext";
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
import { ScopeHelper, VariableMap, VariantMap } from "@/core/Scope";
import { CUSTOM_VARIABLE_GROUP } from "@/Constants";
import { AbsolutePath } from "@/core/AbsolutePath";

const logger = Logger.create(import.meta.url);

export class RemoteMakeContext extends MakeContext {
  private _scope: VariableMap;
  private _transport: JsonRpcRequestSync;
  private _targets = new Map<string, MainTarget>();

  public constructor(scope: VariableMap, transport: JsonRpcRequestSync) {
    super(scope);
    this._scope = scope;
    this._transport = transport;
  }

  public get targets() {
    return this._targets;
  }

  public executeScript(script: any, params: any): any {
    const newVariableMap = ScopeHelper.cloneVariableMap(this._scope);
    params && ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
    const scriptFile = ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
    ScopeHelper.set(newVariableMap, "SCRIPT_FILE", scriptFile);
    ScopeHelper.set(newVariableMap, "SCRIPT_DIR", scriptFile.dirname());
    return this._transport.requestSync(MAINNODE_EXECUTESCRIPT, ScopeHelper.toJSON(newVariableMap));
  }

  public getCacheVariables(): any {
      return ScopeHelper.getVariablesByGroup(this._scope, CUSTOM_VARIABLE_GROUP);
  }
  
  public addCacheVariables(params: string | VariantMap): void {
    let variables = params;
    if (typeof params === "string") {
      const filename = ScopeHelper.get(this._scope, "SOURCE_DIR").resolve(params).toString();
      variables = this._transport.requestSync(MAINNODE_LOADJSON, filename);
    }
    ScopeHelper.defineVariablesInVariableMap(this._scope, CUSTOM_VARIABLE_GROUP, variables);
  }

  public addIncludeDirectories(...dirs: any[]): any {
    const sourceDir = ScopeHelper.get(this._scope, "SOURCE_DIR");
    for (const iter of dirs.flat())
      ScopeHelper.get(this._scope, "INCLUDES").push(sourceDir.resolve(iter));
  }

  public addSubdirectory(sourceDir: string | AbsolutePath, binaryDir?: string | AbsolutePath): void {
    const newVariableMap = createVariableMapForDirectory(this._scope, sourceDir, binaryDir);
    this._transport.requestSync(MAINNODE_STARTMAKESCRIPT, ScopeHelper.toJSON(newVariableMap));
  }

  public addCustomScript(script: any, params: any): CustomScript {
    logger.debug("RemoteMakeContext.addCustomScript(", script, params, ")");
    const newVariableMap = ScopeHelper.cloneVariableMap(this._scope);
    ScopeHelper.extendVariableMapByValues(newVariableMap, CUSTOM_VARIABLE_GROUP, params);
    ScopeHelper.set(newVariableMap, "SCRIPT_MODULE", script);
    return this._transport.requestSync(MAINNODE_ADDCUSTOMSCRIPT, ScopeHelper.toJSON(newVariableMap));
  }

  public target(name: string): PostTarget {
    throw new Error("Not Implemented");
  }

  public script(name: string): InterfaceScript {
    throw new Error("Not Implemented");
  }
  
  public install(value: any, params: any): void {
    throw new Error("Not Implemented");
  }

  public addObjectLibrary(name: any, ...sources: any[]): ObjectLibrary {
    throw new Error("Not Implemented");
  }

  public addStaticLibrary(name: any, ...sources: any[]): StaticLibrary {
    logger.debug("RemoteMakeContext.addStaticLibrary(", name, ")");
    const newVariableMap = ScopeHelper.cloneVariableMap(this._scope);
    const uuid = this._transport.requestSync(MAINNODE_ADDSTATICLIBRARY, {
      name, variableMap: ScopeHelper.toJSON(this._scope),
    });
    const target = new RemoteStaticLibrary(newVariableMap, uuid, this._transport);
    this._targets.set(name, target as any);
    target.addSources(...sources);
    return target as any;
  }

  public addSharedLibrary(name: any, ...sources: any[]): SharedLibrary {
    throw new Error("Not Implemented");
  }

  public addExecutable(name: string, ...sources: any[]): Executable {
    logger.debug("RemoteMakeContext.addExecutable(", name, ")");
    const newVariableMap = ScopeHelper.cloneVariableMap(this._scope);
    const uuid = this._transport.requestSync(MAINNODE_ADDEXECUTABLE, {
      name, variableMap: ScopeHelper.toJSON(this._scope),
    });
    const target = new RemoteExecutable(newVariableMap, uuid, this._transport);
    this._targets.set(name, target as any);
    target.addSources(...sources);
    return target as any;
  }
};
