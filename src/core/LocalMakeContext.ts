/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMakeContext } from "@/core/MakeInterfaces";
import { MakeContext } from "@/core/BaseContext";
import { fileExistsSync } from "@/utils/FileSystem";
import { ProjectContext } from "@/core/ProjectContext";
import { ScopeHelper, VariantMap, VariableMap } from "@/core/Scope";
import { requireSync } from "@/utils/Module";
import { CUSTOM_VARIABLE_GROUP } from "@/Constants";
import { AbsolutePath } from "@/core/AbsolutePath";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export class LocalMakeContext extends MakeContext implements IMakeContext {
  private _project: ProjectContext;

  public constructor(scope: VariableMap, project: ProjectContext) {
    super(scope);
    this._project = project;
  }

  public executeScript(script: any, params: any) {
    this._project.executeScriptSync(this._scope, script, params);
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

  public addSubdirectory(sourceDir: string | AbsolutePath, binaryDir?: string | AbsolutePath): void {
    this._project.addSubdirectory(this._scope, sourceDir, binaryDir);
  }
};
