/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";
import { importModule } from "@/utils/Module";
import { ScopeHelper } from "@/core/Scope";
import { ScriptContext } from "@/core/ScriptContext";
import { ProjectContext } from "@/core/ProjectContext";
import { MakeClient } from "@/server/MakeClient";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export class MainNode {
  _project: ProjectContext;

  public constructor(project: ProjectContext) {
    this._project = project;
  }

  public async loadJSON(filename: string): Promise<any> {
    if (filename.endsWith(".json")) {
      const content = await fs.promises.readFile(filename, "utf8");
      return JSON.parse(content);
    }

    const module = await importModule(filename);
    if (!module.default)
      throw new Error(`Script "${filename}" has not contain a default function`);

    return module.default;
  }

  public async executeScript(params: any): Promise<void> {
    const variableMap = ScopeHelper.fromJSON(params);
    const scriptFile = ScopeHelper.get(variableMap, "SCRIPT_FILE");

    const module = await importModule(scriptFile.toString());
    if (!module.default)
      throw new Error(`Script "${scriptFile}" has not contain a default function`);

    const mk = ScriptContext.create(this._project, variableMap);
    module.default(mk);
  }

  public async startMakeScript(params: any): Promise<void> {
    logger.debug("startMakeScript");

    const variableMap = ScopeHelper.fromJSON(params);
    
    if (!await this._project.prepearScriptFile(variableMap))
      return;

    const client = new MakeClient(this._project);

    const cwdSave = process.cwd();
    const scriptDir = ScopeHelper.get(variableMap, "SCRIPT_DIR");
    process.chdir(scriptDir.toString());
    await client.startMakeScript(variableMap);
    process.chdir(cwdSave);
  }
};
