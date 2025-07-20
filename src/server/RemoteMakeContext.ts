/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { MakeContext } from "@/core/BaseContext";
import { createVariableMapForDirectory } from "@/core/BaseContext";
import { JsonRpcRequestSync } from "@/server/JsonRpcRequestSync";
import { MAINNODE_LOADJSON } from "@/server/RemoteMethods";
import { MAINNODE_EXECUTESCRIPT } from "@/server/RemoteMethods";
import { MAINNODE_STARTMAKESCRIPT } from "@/server/RemoteMethods";
import { Logger } from "@/logger";
import { ScopeHelper, VariableMap, VariantMap } from "@/core/Scope";
import { AbsolutePath } from "@/core/AbsolutePath";

const logger = Logger.create(import.meta.url);

export class RemoteMakeContext extends MakeContext {
  private _transport: JsonRpcRequestSync;

  public constructor(transport: JsonRpcRequestSync) {
    super();
    this._transport = transport;
  }

  public executeScript(scope: VariableMap, script: any, params: any): any {
    logger.debug("RemoteMakeContext.executeScript(", script, params, ")");
    const newVariableMap = ScopeHelper.cloneVariableMap(scope);
    params && ScopeHelper.extendVariableMapByValues(newVariableMap, "", params);
    const scriptFile = ScopeHelper.get(newVariableMap, "SOURCE_DIR").resolve(script);
    ScopeHelper.set(newVariableMap, "SCRIPT_FILE", scriptFile);
    ScopeHelper.set(newVariableMap, "SCRIPT_DIR", scriptFile.dirname());
    return this._transport.requestSync(MAINNODE_EXECUTESCRIPT, ScopeHelper.toJSON(newVariableMap));
  }
  
  public loadJSON(filename: string): any {
    return this._transport.requestSync(MAINNODE_LOADJSON, filename);
  }

  public addSubdirectory(scope: VariableMap, sourceDir: string | AbsolutePath, binaryDir?: string | AbsolutePath): void {
    logger.debug("RemoteMakeContext.addSubdirectory(", sourceDir, binaryDir, ")");
    const newVariableMap = createVariableMapForDirectory(scope, sourceDir, binaryDir);
    this._transport.requestSync(MAINNODE_STARTMAKESCRIPT, ScopeHelper.toJSON(newVariableMap));
  }
};
