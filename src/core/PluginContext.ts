/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { DirPath } from "@/core/Path";
import { GlobalContext } from "@/core/GlobalContext";
import { ScopeHelper } from "@/core/Scope";
import { SystemScope } from "@/core/SystemScope";

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export class PluginContext {
  private [SCOPE]: SystemScope;
  private [GLOBAL]: GlobalContext;

  private constructor(scope: SystemScope, global: any) {
    this[SCOPE] = scope;
    this[GLOBAL] = global;
  }

  public static create(scope: SystemScope, global: GlobalContext) {
    const proto = PluginContext.prototype;
    const newScope = Object.create(proto);
    ScopeHelper.clone(newScope, scope);
    const self = Object.create(newScope);
    self[SCOPE] = newScope;
    self[GLOBAL] = global;
    return self;
  }

  public addSubdirectoryAlias(src: any, dest: any) {
    this[GLOBAL].addSubdirectoryAlias(DirPath.create(src), DirPath.create(dest));
  }

  public _scope() {
    return this[SCOPE];
  }
};
