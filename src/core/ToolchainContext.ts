/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ProjectContext } from "@/core/ProjectContext";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { BaseContext } from "@/core/BaseContext";

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export class ToolchainContext extends BaseContext {
  [SCOPE]: VariableMap;
  [GLOBAL]: ProjectContext;

  constructor(global: ProjectContext, scope: VariableMap) {
    super();
    this[GLOBAL] = global;
    this[SCOPE] = scope;
  }

  public static create(global: ProjectContext, variableMap: VariableMap) {
    const ctx = new ToolchainContext(global, variableMap);
    return ScopeHelper.createProxy(variableMap, ctx);
  }
};
