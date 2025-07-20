/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { MakeContext } from "@/core/BaseContext";
import { fileExistsSync } from "@/utils/FileSystem";
import { ProjectContext } from "@/core/ProjectContext";
import { ScopeHelper, VariantMap, VariableMap } from "@/core/Scope";
import { requireSync } from "@/utils/Module";
import { CUSTOM_VARIABLE_GROUP } from "@/Constants";
import { AbsolutePath } from "@/core/AbsolutePath";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export class LocalMakeContext extends MakeContext {
  private _project: ProjectContext;

  public constructor(scope: VariableMap, project: ProjectContext) {
    super(scope);
    this._project = project;
  }

  public executeScript(scope: VariableMap, script: any, params: any) {
    this._project.executeScriptSync(scope, script, params);
  }

  public addCacheVariables(scope: VariableMap, params: string | VariantMap): void {
    let variables = params;
    if (typeof params === "string") {
      const filename = ScopeHelper.get(scope, "SOURCE_DIR").resolve(params).toString();
      if (!fileExistsSync(filename))
        return;
      variables = requireSync(filename);
    }

    ScopeHelper.defineVariablesInVariableMap(scope, CUSTOM_VARIABLE_GROUP, variables);
  }

  public addSubdirectory(scope: VariableMap, sourceDir: string | AbsolutePath, binaryDir?: string | AbsolutePath): void {
    this._project.addSubdirectory(scope, sourceDir, binaryDir);
  }
};
