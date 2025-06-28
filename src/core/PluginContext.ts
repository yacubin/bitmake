/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { GlobalContext } from "@/core/GlobalContext";
import { VariableMap } from "@/core/Scope";
import { BaseContext } from "@/core/BaseContext";

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export class PluginContext extends BaseContext {
  [GLOBAL]: GlobalContext;
  [SCOPE]: VariableMap;

  public constructor(global: GlobalContext, scope: VariableMap) {
    super();
    this[GLOBAL] = global;
    this[SCOPE] = scope;
  }

  public addSubdirectory(sourceDir: any, binaryDir: any) {
    this[GLOBAL].addSubdirectory(this[SCOPE], "post", sourceDir, binaryDir);
  }

  public addSubdirectoryAlias(src: any, dest: any) {
    this[GLOBAL].addSubdirectoryAlias(this[SCOPE], src, dest);
  }
};
