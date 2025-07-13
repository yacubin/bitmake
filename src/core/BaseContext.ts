/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IGeneralContext, InterfaceTarget } from "@/core/MakeInterfaces";
import { findProgramSync } from "@/core/FindProgram";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { Logger } from "@/logger";
import { SystemScope } from "@/core/SystemScope";
import { AbsolutePath } from "@/core/AbsolutePath";
import { importModule } from "@/utils/Module";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, MainTarget, PostTarget } from "@/core/Target";
import { CUSTOM_VARIABLE_GROUP } from "@/Constants";
import { InstallEntity } from "@/core/InstallEntity";

const logger = Logger.create(import.meta.url);

export abstract class GeneralContext implements IGeneralContext {
  protected _scope: VariableMap;

  constructor(scope: VariableMap) {
    this._scope = scope;
  }

  public findProgram(name: string): string | undefined {
    return findProgramSync(name);
  }

  public getProperty(this: any, name: string): any {
    return ScopeHelper.get(this._scope, name);
  }

  public setProperty(this: any, name: string, value: any): any {
    const entry = this._scope[name];
    if (entry)
      ScopeHelper.setEntryValue(entry, value);
    else
      ScopeHelper.defineVariable(this._scope, "", name, {value});
    return true;
  }

  public hasProperty(this: any, name: string): boolean {
    return Object.hasOwn(this._scope, name);
  }

  public deleteProperty(this: any, name: string): boolean {
    return delete this._scope[name];
  }

  public getPropertyNames(this: any): string[] {
    return Object.keys(this._scope);
  }
};

export abstract class MakeContext extends GeneralContext {
  private _targets = new Map<string, MainTarget>();
  private _indirectTargets = new Map<string, PostTarget>();
  private _installList = new Array<InstallEntity>();

  protected constructor(scope: VariableMap) {
    super(scope);
  }

  public get targets() {
    return this._targets;
  }

  public get indirectTargets() {
    return this._indirectTargets;
  }

  public get installList() {
    return this._installList;
  }
  
  public getCacheVariables(): any {
    return ScopeHelper.getVariablesByGroup(this._scope, CUSTOM_VARIABLE_GROUP);
  }

  public addIncludeDirectories(...dirs: any[]) {
    const sourceDir = ScopeHelper.get(this._scope, "SOURCE_DIR");
    for (const iter of dirs.flat())
      ScopeHelper.get(this._scope, "INCLUDES").push(sourceDir.resolve(iter));
  }

  public target(name: string): PostTarget {
    let target = this._indirectTargets.get(name);
    if (!target) {
      target = PostTarget.create(this._scope, name)
      this._indirectTargets.set(name, target);
    }
    return target;
  }

  public addObjectLibrary(name: any, ...sources: any[]): ObjectLibrary {
    if (this._targets.has(name))
      throw new Error(`Target "${name}" exists`);
    const target = ObjectLibrary.create(this._scope, name);
    this._targets.set(name, target);
    target.addSources(...sources);
    return target;
  }

  public addStaticLibrary(name: any, ...sources: any[]): StaticLibrary {
    if (this._targets.has(name))
      throw new Error(`Target "${name}" exists`);
    const target = StaticLibrary.create(this._scope, name);
    this._targets.set(name, target);
    target.addSources(...sources);
    return target;
  }

  public addSharedLibrary(name: any, ...sources: any[]): SharedLibrary {
    if (this._targets.has(name))
      throw new Error(`Target "${name}" exists`);
    const target = SharedLibrary.create(this._scope, name);
    this._targets.set(name, target);
    target.addSources(...sources);
    return target;
  }

  public addExecutable(name: string, ...sources: any[]): Executable {
    if (this._targets.has(name))
      throw new Error(`Target "${name}" exists`);
    const target = Executable.create(this._scope, name);
    this._targets.set(name, target);
    target.addSources(...sources);
    return target;
  }

  public install(value: any, params: any): void {
    const scope = ScopeHelper.createVariableValues(this._scope);
    for (const it of [ value ].flat()) {
      const iter = (it instanceof InterfaceTarget) ? this.target(it.targetName) : it;
      const entity = InstallEntity.create(scope, iter, params);
      this._installList.push(entity);
    }
  }
};

export function createContext<T extends IGeneralContext>(ctx: T): T & SystemScope {
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

export async function performContext(mk: IGeneralContext & SystemScope) {
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
