/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMakeContext } from "@/core/MakeInterfaces";
import { fileExistsSync } from "@/utils/FileSystem";
import { InterfaceScript } from "@/core/InterfaceScript";
import { InstallEntity } from "@/core/InstallEntity";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, BaseTarget, UserIndirectTarget } from "@/core/Target";
import { CustomScript } from "@/core/CustomScript";
import { ProjectContext } from "@/core/ProjectContext";
import { ScopeHelper, VariantMap, VariableMap } from "@/core/Scope";
import { requireSync } from "@/utils/Module";
import { CUSTOM_VARIABLE_GROUP } from "@/Constants";
import { AbsolutePath } from "@/core/AbsolutePath";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export class LocalMakeContext implements IMakeContext {
  private _scope: VariableMap;
  private _project: ProjectContext;
  private _targets = new Map<string, BaseTarget>();
  private _indirectTargets = new Map<string, UserIndirectTarget>();

  public constructor(scope: VariableMap, project: ProjectContext) {
    this._scope = scope;
    this._project = project;
  }

  public get targets() {
    return this._targets;
  }

  public get indirectTargets() {
    return this._indirectTargets;
  }

  public executeScript(script: any, params: any) {
    this._project.executeScriptSync(this._scope, script, params);
  }

  public getCacheVariables(): any {
    return ScopeHelper.getVariablesByGroup(this._scope, CUSTOM_VARIABLE_GROUP);
  }

  public addCacheVariables(params: string | VariantMap): void {
    let variables = params;
    if (typeof params === "string") {
      const filename = ScopeHelper.get(this._scope, "SOURCE_DIR").resolve(params).toString();
      if (!fileExistsSync(filename))
        return;
      variables = requireSync(filename);
    }

    ScopeHelper.defineVariablesInVariableMap(this._scope, CUSTOM_VARIABLE_GROUP, variables);
  }

  public addIncludeDirectories(...dirs: any[]) {
    const sourceDir = ScopeHelper.get(this._scope, "SOURCE_DIR");
    for (const iter of dirs.flat())
      ScopeHelper.get(this._scope, "INCLUDES").push(sourceDir.resolve(iter));
  }

  public addSubdirectory(sourceDir: string | AbsolutePath, binaryDir?: string | AbsolutePath): void {
    this._project.addSubdirectory(this._scope, sourceDir, binaryDir);
  }

  public addCustomScript(script: string, params: any): CustomScript {
    const newVariableMap = ScopeHelper.cloneVariableMap(this._scope);
    ScopeHelper.extendVariableMapByValues(newVariableMap, CUSTOM_VARIABLE_GROUP, params);
    ScopeHelper.set(newVariableMap, "SCRIPT_MODULE", script);
    return this._project.addCustomScript(newVariableMap);
  }

  public target(name: string): UserIndirectTarget {
    const target = this._project.getTarget(this._scope, name);
    this._indirectTargets.set(name, target);
    return target;
  }

  public script(name: string): InterfaceScript {
    return this._project.getInterfaceScript(this._scope, name);
  }

  public install(value: any, params: any): void {
    const scope = ScopeHelper.createVariableValues(this._scope);
    for (const it of [ value ].flat()) {
      const iter = (it instanceof BaseTarget) ? this.target(it.targetName) : it;
      const entity = InstallEntity.create(scope, iter, params);
      this._project.addInstallEntry(entity);
    }
  }

  public addObjectLibrary(name: any, ...sources: any[]): ObjectLibrary {
    const target = this._project.addObjectLibrary(this._scope, name);
    this._targets.set(name, target);
    target.addSources(...sources);
    return target;
  }

  public addStaticLibrary(name: any, ...sources: any[]): StaticLibrary {
    const target = this._project.addStaticLibrary(this._scope, name);
    this._targets.set(name, target);
    target.addSources(...sources);
    return target;
  }

  public addSharedLibrary(name: any, ...sources: any[]): SharedLibrary {
    const target = this._project.addSharedLibrary(this._scope, name);
    this._targets.set(name, target);
    target.addSources(...sources);
    return target;
  }

  public addExecutable(name: string, ...sources: any[]): Executable {
    const target = this._project.addExecutable(this._scope, name);
    this._targets.set(name, target);
    target.addSources(...sources);
    return target;
  }
};
