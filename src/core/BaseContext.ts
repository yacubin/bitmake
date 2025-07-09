/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMakeObject } from "@/core/IMakeObject";
import { findProgramSync } from "@/core/FindProgram";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { Logger } from "@/logger";
import { SystemScope } from "@/core/SystemScope";
import { AbsolutePath } from "@/core/AbsolutePath";
import { importModule } from "@/utils/Module";

const logger = Logger.create(import.meta.url);

const VARIABLE_MAP = Symbol("VARIABLE_MAP");

export abstract class BaseContext implements IMakeObject {
  [VARIABLE_MAP]: VariableMap;

  protected constructor(variableMap: VariableMap) {
    this[VARIABLE_MAP] = variableMap;
  }

  public findProgram(name: string): string | undefined {
    return findProgramSync(name);
  }

  // MakeObject
  public getProperty(name: string): any {
    return ScopeHelper.get(this[VARIABLE_MAP], name);
  }
  public setProperty(name: string, value: any): any {
    const entry = this[VARIABLE_MAP][name];
    if (entry)
      ScopeHelper.setEntryValue(entry, value);
    else
      ScopeHelper.defineVariable(this[VARIABLE_MAP], "", name, {value});
    return true;
  }
  public hasProperty(name: string): boolean {
    return Object.hasOwn(this[VARIABLE_MAP], name);
  }
  public deleteProperty(name: string): boolean {
    return delete this[VARIABLE_MAP][name];
  }
  public getPropertyNames(): string[] {
    return Object.keys(this[VARIABLE_MAP]);
  }
};

export function createContext<T extends IMakeObject>(ctx: T): T & SystemScope {
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
    getOwnPropertyDescriptor(target: T, name: string): PropertyDescriptor | undefined {
      if (target.hasProperty(name)) {
        const value = target.getProperty(name);
        return { value, writable: true, enumerable: true, configurable: true };
      }
      return undefined;
    },
  };
  return new Proxy(ctx, handler) as T & SystemScope;
}

export async function performContext(mk: BaseContext & SystemScope) {
  const scriptUrl = mk.SCRIPT_FILE.toJSON();
  const module = await importModule(scriptUrl);
  if (!module.default)
    throw new Error(`Script ${scriptUrl} has not contain a default function`);

  const result = module.default(mk);
  if (result instanceof Promise)
    await result;
}

export function createVariableMapForDirectory(variableMap: VariableMap, sourceDir: any, binaryDir?: any): VariableMap {
  if (binaryDir === undefined) {
    if (!AbsolutePath.isAbsolute(sourceDir))
      binaryDir = sourceDir;
    else {
      const binaryDir1 = ScopeHelper.get(variableMap, "PROJECT_BINARY_DIR").relative(sourceDir);
      const binaryDir2 = ScopeHelper.get(variableMap, "PROJECT_SOURCE_DIR").relative(sourceDir);
      binaryDir = (binaryDir1.length > binaryDir2.length) ? binaryDir2 : binaryDir1;
    }
  }

  const SOURCE_DIR = ScopeHelper.get(variableMap, "SOURCE_DIR").resolve(sourceDir);
  const BINARY_DIR = ScopeHelper.get(variableMap, "BINARY_DIR").resolve(binaryDir);

  const newVariableMap = ScopeHelper.cloneVariableMap(variableMap);

  ScopeHelper.set(newVariableMap, "SOURCE_DIR", SOURCE_DIR);
  ScopeHelper.set(newVariableMap, "BINARY_DIR", BINARY_DIR);
  ScopeHelper.reset(newVariableMap, "SCRIPT_DIR");
  ScopeHelper.reset(newVariableMap, "SCRIPT_FILE");

  return newVariableMap;
}
