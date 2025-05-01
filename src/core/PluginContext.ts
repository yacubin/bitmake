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
import { SystemScope } from "@/core/SystemScope";
import { findProgramSync } from "@/core/FindProgram";

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export namespace PluginContext {

interface IPluginContext extends SystemScope {
  findProgram(name: string): string | undefined;
  addSubdirectoryAlias(src: any, dest: any): void;

  [GLOBAL]: GlobalContext;
  [SCOPE]: SystemScope;
};

function addSubdirectoryAlias(this: IPluginContext, src: any, dest: any) {
  const srcPath = DirPath.create(this[SCOPE].SCRIPT_DIR.resolve(src));
  const destPath = (dest === null) ? null : DirPath.create(this[SCOPE].SCRIPT_DIR.resolve(dest));
  this[GLOBAL].addSubdirectoryAlias(srcPath, destPath);
}

export function create(scope: SystemScope, global: GlobalContext): IPluginContext {
  const mk = Object.create(scope, {
    findProgram: {
      value: findProgramSync,
      enumerable: false,
      writable: false,
      configurable: false,
    },
    addSubdirectoryAlias: {
      value: addSubdirectoryAlias,
      enumerable: false,
      writable: false,
      configurable: false,
    },
  });

  mk[SCOPE] = scope;
  mk[GLOBAL] = global;

  return mk;
}

} // namespace PluginContext
