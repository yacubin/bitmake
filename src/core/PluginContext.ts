/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { AbsolutePath } from "@/core/Path";

const GLOBAL = Symbol("GLOBAL");
const SCOPE = Symbol("SCOPE");

export class PluginContext {
  private [SCOPE]: any;
  private [GLOBAL]: any;

  private constructor(scope: any, global: any) {
    this[SCOPE] = scope;
    this[GLOBAL] = global;
  }

  public static create(protoScope: any, global: any) {
    const ctx = Object.create(protoScope);
    ctx[SCOPE] = protoScope;
    ctx[GLOBAL] = global;

    const proto: any = PluginContext.prototype;
    const names = Object.getOwnPropertyNames(proto).filter(name => typeof proto[name] === 'function' && name !== 'constructor');
    for (const name of names) {
      ctx[name] = proto[name];
    }

    return Object.seal(ctx);
  }

  public addSubdirectoryAlias(src: AbsolutePath | string, dest: AbsolutePath | string) {
    this[GLOBAL].addSubdirectoryAlias(AbsolutePath.createDir(src), AbsolutePath.createDir(dest));
  }

  public toJSON(): object {
    return {};
  }
};
