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
import { findProgramSync } from "@/core/FindProgram";

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export namespace ToolchainContext {

interface IToolchainContext {
  findProgram(name: string): string | undefined;
};
  
export function create(scope: SystemScope, global: GlobalContext): IToolchainContext {
  const mk = Object.create(scope, {
    findProgram: {
      value: findProgramSync,
      enumerable: false,
      writable: false,
      configurable: false,
    },
  });

  mk[SCOPE] = scope;
  mk[GLOBAL] = global;

  return mk;
}

} // namespace ToolchainContext
