/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMakeObject } from "@/core/IMakeContext";
import { findProgramSync } from "@/core/FindProgram";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

const VARIABLE_MAP = Symbol("VARIABLE_MAP");

export class BaseContext implements IMakeObject {
  [VARIABLE_MAP]: VariableMap;

  protected constructor(variableMap: VariableMap) {
    this[VARIABLE_MAP] = variableMap;
  }

  public findProgram(name: string): string | undefined {
    return findProgramSync(name);
  }

  // MakeObject
  public getProperty(name: string): any {
    const entry = this[VARIABLE_MAP][name];
    return entry ? entry.getValue() : undefined;
  }
  public setProperty(name: string, value: any): any {
    const entry = this[VARIABLE_MAP][name];
    if (entry)
      entry.setValue(value);
    else
      ScopeHelper.defineVariable(this[VARIABLE_MAP], "", name, {value});
    return true;
  }
  public hasProperty(name: string): boolean {
    return Object.hasOwn(this[VARIABLE_MAP], name);
  }
  public getPropertyNames(): string[] {
    return Object.keys(this[VARIABLE_MAP]);
  }
  public deleteProperty(name: string): boolean {
    return delete this[VARIABLE_MAP][name];
  }
};

export function createContext<T extends IMakeObject>(ctx: T): T {
  const handler: ProxyHandler<T> = {
    get(target: T, name: string, receiver: any) {
      if (name in target)
        return (target as any)[name];
      return target.getProperty(name);
    },
    set(target: T, name: string, value: any): boolean {
      target.setProperty(name, value);
      return true;
    },
    has(target: T, name: string) {
      return name in target || target.hasProperty(name);
    },
    ownKeys(target: T) {
      return target.getPropertyNames();
    },
    deleteProperty(target: T, name: string) {
      return target.deleteProperty(name);
    },
  };
  return new Proxy(ctx, handler) as T;
}
