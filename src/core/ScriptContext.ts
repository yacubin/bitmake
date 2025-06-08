/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { GlobalContext } from "@/core/GlobalContext";
import { SystemScope } from "@/core/SystemScope";
import { BaseContext } from "@/core/BaseContext";

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export class ScriptContext extends BaseContext {  
  [GLOBAL]: GlobalContext;
  [SCOPE]: SystemScope;

  constructor(scope: SystemScope, global: GlobalContext) {
    super();
    this[SCOPE] = scope;
    this[GLOBAL] = global;
  }
};
