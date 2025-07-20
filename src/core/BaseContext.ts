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
import { ScopeHelper, VariableMap, VariantMap } from "@/core/Scope";
import { SystemScope } from "@/core/SystemScope";
import { FilePath, AbsolutePath } from "@/core/AbsolutePath";
import { importModule } from "@/utils/Module";
import { MainTarget, PostTarget } from "@/core/Target";
import { CUSTOM_VARIABLE_GROUP } from "@/Constants";
import { CustomScript, PostCustomScript } from "@/core/CustomScript";
import { InstallEntity } from "@/core/InstallEntity";
import { TargetName } from "@/core/TargetName";
import { randCIdentifer } from "@/utils/Random";
import { Logger } from "@/logger";

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
  private _targets = new Map<string, MainTarget>;
  private _postTargets = new Map<string, PostTarget>;
  private _mainScripts = new Map<string, CustomScript>;
  private _postScripts = new Map<string, PostCustomScript>;
  private _installList = new Array<InstallEntity>();

  protected constructor(scope: VariableMap) {
    super(scope);
  }

  abstract executeScript(script: any, params: any): any;
  abstract addCacheVariables(params: string | VariantMap): void;
  abstract addSubdirectory(sourceDir: string | AbsolutePath, binaryDir?: string | AbsolutePath): void;

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
  
  public getCacheVariables(): any {
    return ScopeHelper.getVariablesByGroup(this._scope, CUSTOM_VARIABLE_GROUP);
  }

  public addIncludeDirectories(...dirs: any[]) {
    const sourceDir = ScopeHelper.get(this._scope, "SOURCE_DIR");
    for (const iter of dirs.flat())
      ScopeHelper.get(this._scope, "INCLUDES").push(sourceDir.resolve(iter));
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

  public addCustomScript(scriptModule: string, params: any): CustomScript {
    const variableMap = ScopeHelper.cloneVariableMap(this._scope);
    ScopeHelper.extendVariableMapByValues(variableMap, CUSTOM_VARIABLE_GROUP, params);
    ScopeHelper.set(variableMap, "SCRIPT_MODULE", scriptModule);
    
    const sourceDir = ScopeHelper.get(variableMap, "SOURCE_DIR") as AbsolutePath;
    const binaryDir = ScopeHelper.get(variableMap, "BINARY_DIR") as AbsolutePath;

    let inputFile = ScopeHelper.get(variableMap, "SCRIPT_INPUT");
    if (inputFile)
      inputFile = sourceDir.resolve(inputFile);

    let outputFile = ScopeHelper.get(variableMap, "SCRIPT_OUTPUT");
    if (!outputFile)
      throw new Error("CustomScript parameters required output entity");

    outputFile = sourceDir.resolve(outputFile);

    const options: CustomScript.Options = {
      variableMap,
      name: ScopeHelper.get(variableMap, "SCRIPT_NAME") || randCIdentifer(16),
      scriptModule,
      output: outputFile,
      input: inputFile,
      sourceDir,
      binaryDir,
    };

    const target = CustomScript.create(options);
    this._mainScripts.set(options.name, target);

    return target;
  }

  public install(value: any, params: any): void {
    const scope = ScopeHelper.createVariableValues(this._scope);
    for (const it of [ value ].flat()) {
      let iter = (it instanceof InterfaceTarget) ? TargetName.create(it.targetName) : it;

      let destination: string | AbsolutePath | undefined;
      let baseDir;
      if (typeof params === "string")
        destination = params;
      else if (params) {
        destination = params.destination;
        baseDir = params.baseDir;
      }

      if (!destination)
        throw new Error(`Parameter destination is not specified`);
    
      if (baseDir)
        baseDir = scope.SOURCE_DIR.resolve(baseDir);

      if (typeof iter === "string" || iter instanceof AbsolutePath) {
        iter = scope.SOURCE_DIR.resolve(iter.toString());
        iter = FilePath.create(iter);
        baseDir = baseDir || iter.dirname();
      }
      else if (!(iter instanceof TargetName)) {
        throw new Error(`Not supportet value of ${iter}`);
      }

      const entity = new InstallEntity(iter, AbsolutePath.create(scope.INSTALL_PREFIX.resolve(destination)), baseDir);
      this._installList.push(entity);
    }
  }

  public getVariableMap(): VariableMap {
    return this._scope;
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
