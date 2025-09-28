/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IGeneralContext } from "@/core/MakeInterfaces";
import { findProgramSync } from "@/core/FindProgram";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { SystemScope } from "@/core/SystemScope";
import { FilePath, Locator } from "@/utils/Locator";
import { importModule } from "@/utils/Module";
import { MainTarget, PostTarget } from "@/core/Target";
import { CustomScript, PostCustomScript } from "@/core/CustomScript";
import { InstallEntity } from "@/core/InstallEntity";
import { TargetName } from "@/core/TargetName";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export abstract class GeneralContext implements IGeneralContext {
  protected _scope: VariableMap;

  constructor(scope: VariableMap) {
    this._scope = scope;
  }

  public findProgram(name: string): string | undefined {
    return findProgramSync(name, ScopeHelper.get(this._scope, "FIND_PROGRAM_PATHS"));
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

export abstract class MakeContext {
  private _targets = new Map<string, MainTarget>;
  private _postTargets = new Map<string, PostTarget>;
  private _mainScripts = new Map<string, CustomScript>;
  private _postScripts = new Map<string, PostCustomScript>;
  private _installList = new Array<InstallEntity>();

  protected constructor() {
  }

  abstract executeScript(scope: VariableMap, script: any, params: any): any;
  abstract loadJSON(url: string): any;
  abstract addSubdirectory(scope: VariableMap, sourceDir: string | Locator, binaryDir?: string | Locator): void;

  public get targets() {
    return this._targets;
  }

  public get postTargets() {
    return this._postTargets;
  }

  public get mainScripts() {
    return this._mainScripts;
  }

  public get postScripts() {
    return this._postScripts;
  }

  public get installList() {
    return this._installList;
  }

  public getPostTarget(name: string): PostTarget {
    let target = this._postTargets.get(name);
    if (!target) {
      target = PostTarget.create(name)
      this._postTargets.set(name, target);
    }
    return target;
  }

  public hasMainTarget(name: string) {
    return this._targets.has(name);
  }

  public addMainTarget(name: string, target: MainTarget) {
    this._targets.set(name, target);
  }

  public script(name: string): PostCustomScript {
    let script = this._postScripts.get(name);
    if (!script) {
      script = PostCustomScript.create(name)
      this._postScripts.set(name, script);
    }
    return script;
  }

  public addCustomScript(options: CustomScript.Options): CustomScript {
    const target = CustomScript.create(options);
    this._mainScripts.set(options.name, target);
    return target;
  }

  public addInstallEntry(value: FilePath | TargetName, destination: Locator, baseDir?: Locator): void {
    const entity = new InstallEntity(value, destination, baseDir);
    this._installList.push(entity);
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
    if (!Locator.isAbsolute(sourceDir))
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
