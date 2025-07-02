/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ProjectContext } from "@/core/ProjectContext";
import { VariableMap } from "@/core/Scope";
import { BaseContext, createContext } from "@/core/BaseContext";

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export class PluginContext extends BaseContext {
  [GLOBAL]: ProjectContext;
  [SCOPE]: VariableMap;

  public constructor(global: ProjectContext, variableMap: VariableMap) {
    super(variableMap);
    this[GLOBAL] = global;
    this[SCOPE] = variableMap;
  }

  public addSubdirectoryAlias(src: any, dest: any) {
    this[GLOBAL].addSubdirectoryAlias(this[SCOPE], src, dest);
  }

  public static create(global: ProjectContext, variableMap: VariableMap) {
    return createContext(new PluginContext(global, variableMap));
  }
};
