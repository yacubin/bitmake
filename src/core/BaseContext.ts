/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { findProgramSync } from "@/core/FindProgram";
import { SystemScope } from "@/core/SystemScope";
import { GlobalContext } from "@/core/GlobalContext";
import { ScopeHelper } from "@/core/Scope";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

export class BaseContext {
  protected constructor() {
  }

  public findProgram(name: string): string | undefined {
    return findProgramSync(name);
  }
};

type ContextProxy<T extends BaseContext> = T & SystemScope;
type ContextConstructor<T extends BaseContext> = new (scope: SystemScope, global: GlobalContext) => T;

export function createContext<T extends BaseContext>(ctor: ContextConstructor<T>, scope: SystemScope, global: GlobalContext): ContextProxy<T> {
  const handler: ProxyHandler<T> = {
    get(target: any, prop: string, receiver: any) {
      if (Object.hasOwn(scope, prop))
        return (scope as any) [prop];
      return target[prop];
    },
    set(target: any, prop: string, value: any): boolean {
      ScopeHelper.applyVariable(scope, prop, value);
      return true;
    },
  };
  const mk = new ctor(scope, global);
  return new Proxy(mk, handler) as ContextProxy<T>;
}
