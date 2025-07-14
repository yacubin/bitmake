/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { VariableMap } from "@/core/Scope";
import { GeneralContext, createContext } from "@/core/BaseContext";

const SCOPE = Symbol("SCOPE");

export class ScriptContext extends GeneralContext {
  [SCOPE]: VariableMap;

  constructor(scope: VariableMap) {
    super(scope);
    this[SCOPE] = scope;
  }

  public static create(variableMap: VariableMap) {
    return createContext(new ScriptContext(variableMap));
  }
};
