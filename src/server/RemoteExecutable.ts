/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { JsonRpcRequestSync } from "@/server/JsonRpcRequestSync";
import { Logger } from "@/logger";
import { ScopeHelper, VariableMap } from "@/core/Scope";

const logger = Logger.create(import.meta.url);

const NAME = Symbol("REQUEST");
const REQUEST = Symbol("REQUEST");
const SCOPE = Symbol("SCOPE");

export class RemoteExecutable {
  [NAME]: string;
  [SCOPE]: VariableMap;
  [REQUEST]: JsonRpcRequestSync;

  public constructor(variableMap: VariableMap, name: string, requestSync: JsonRpcRequestSync) {
    this[SCOPE] = variableMap;
    this[NAME] = name;
    this[REQUEST] = requestSync;
  }

  public addSources(...sources: any[]) {
    throw new Error("Not Implemented");
  }
};
