/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { MakeContext } from "@/core/BaseContext";
import { ProjectContext } from "@/core/ProjectContext";
import { VariableMap } from "@/core/Scope";
import { requireSync } from "@/utils/Module";
import { Locator } from "@/utils/Locator";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export class LocalMakeContext extends MakeContext {
  private _project: ProjectContext;

  public constructor(project: ProjectContext) {
    super();
    this._project = project;
  }

  public executeScript(scope: VariableMap, script: any, params: any) {
    this._project.executeScriptSync(scope, script, params);
  }

  public loadJSON(filename: string): any {
    return requireSync(filename);
  }

  public addSubdirectory(scope: VariableMap, sourceDir: string | Locator, binaryDir?: string | Locator): void {
    this._project.addSubdirectory(scope, sourceDir, binaryDir);
  }
};
