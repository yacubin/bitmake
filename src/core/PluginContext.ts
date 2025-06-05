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
import { BaseContext } from "@/core/BaseContext";

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export class PluginContext extends BaseContext {
  [GLOBAL]: GlobalContext;
  [SCOPE]: SystemScope;

  constructor(scope: SystemScope, global: GlobalContext) {
    super();
    this[SCOPE] = scope;
    this[GLOBAL] = global;
  }

  addSubdirectoryAlias(src: any, dest: any) {
    const srcPath = DirPath.create(this[SCOPE].SCRIPT_DIR.resolve(src));
    const destPath = (dest === null) ? null : DirPath.create(this[SCOPE].SCRIPT_DIR.resolve(dest));
    this[GLOBAL].addSubdirectoryAlias(srcPath, destPath);
  }
};
