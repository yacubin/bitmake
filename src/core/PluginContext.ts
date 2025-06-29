/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { GlobalContext } from "@/core/GlobalContext";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { BaseContext } from "@/core/BaseContext";

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export class PluginContext extends BaseContext {
  [GLOBAL]: GlobalContext;
  [SCOPE]: VariableMap;

  public constructor(global: GlobalContext, variableMap: VariableMap) {
    super();
    this[GLOBAL] = global;
    this[SCOPE] = variableMap;
  }

  public addSubdirectoryAlias(src: any, dest: any) {
    this[GLOBAL].addSubdirectoryAlias(this[SCOPE], src, dest);
  }

  public static create(global: GlobalContext, variableMap: VariableMap) {
    const ctx = new PluginContext(global, variableMap);
    return ScopeHelper.createProxy(variableMap, ctx);
  }
};
