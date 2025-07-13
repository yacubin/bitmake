/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMakeContext } from "@/core/MakeInterfaces";
import { MakeContext } from "@/core/BaseContext";
import { InterfaceScript } from "@/core/InterfaceScript";
import { CustomScript } from "@/core/CustomScript";
import { createVariableMapForDirectory } from "@/core/BaseContext";
import { JsonRpcRequestSync } from "@/server/JsonRpcRequestSync";
import { MAINNODE_LOADJSON } from "@/server/RemoteMethods";
import { MAINNODE_EXECUTESCRIPT } from "@/server/RemoteMethods";
import { MAINNODE_STARTMAKESCRIPT } from "@/server/RemoteMethods";
import { MAINNODE_ADDCUSTOMSCRIPT } from "@/server/RemoteMethods";
import { Logger } from "@/logger";
import { ScopeHelper, VariableMap, VariantMap } from "@/core/Scope";
import { CUSTOM_VARIABLE_GROUP } from "@/Constants";
import { AbsolutePath } from "@/core/AbsolutePath";

const logger = Logger.create(import.meta.url);

export class RemoteMakeContext extends MakeContext implements IMakeContext {
  private _transport: JsonRpcRequestSync;

  public constructor(scope: VariableMap, transport: JsonRpcRequestSync) {
    super(scope);
    this._transport = transport;
  }

  public executeScript(script: any, params: any): any {
    logger.debug("RemoteMakeContext.executeScript(", script, params, ")");
    const newVariableMap = ScopeHelper.cloneVariableMap(this._scope);
    params && ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
    const scriptFile = ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
    ScopeHelper.set(newVariableMap, "SCRIPT_FILE", scriptFile);
    ScopeHelper.set(newVariableMap, "SCRIPT_DIR", scriptFile.dirname());
    return this._transport.requestSync(MAINNODE_EXECUTESCRIPT, ScopeHelper.toJSON(newVariableMap));
  }
  
  public addCacheVariables(params: string | VariantMap): void {
    logger.debug("RemoteMakeContext.addCacheVariables(", params, ")");
    let variables = params;
    if (typeof params === "string") {
      const filename = ScopeHelper.get(this._scope, "SOURCE_DIR").resolve(params).toString();
      variables = this._transport.requestSync(MAINNODE_LOADJSON, filename);
    }
    ScopeHelper.defineVariablesInVariableMap(this._scope, CUSTOM_VARIABLE_GROUP, variables);
  }

  public addSubdirectory(sourceDir: string | AbsolutePath, binaryDir?: string | AbsolutePath): void {
    logger.debug("RemoteMakeContext.addSubdirectory(", sourceDir, binaryDir, ")");
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

  public script(name: string): InterfaceScript {
    throw new Error("Not Implemented");
  }
  
  public install(value: any, params: any): void {
    throw new Error("Not Implemented");
  }
};
