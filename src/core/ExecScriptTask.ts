/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceTask } from "@/core/MakeInterfaces";
import { Locator } from "@/utils/Locator";
import { importModule } from "@/utils/Module";
import { VariableMap } from "@/core/Scope";
import { ScriptContext } from "@/core/ScriptContext";
import { SimpleObject } from "@/core/SimpleObject";
import { Logger } from "@/utils/Logger";

const logger = Logger.create(import.meta.url);

export class ExecScriptTask extends InterfaceTask {
  private _variableMap: VariableMap;
  private _script: Locator | Function;

  public constructor(variableMap: VariableMap, script: Locator | Function) {
    super();
    this._variableMap = variableMap;
    this._script = script;
  }

  public async execute(): Promise<void> {
    let func = this._script;
    if (func instanceof Locator) {
      const scriptUrl = func.toURLString();
      logger.debug("Import", scriptUrl);
      func = (await importModule(scriptUrl)).default;
    }
    if (func instanceof Function) {
      const mk = ScriptContext.create(this._variableMap);
      const result = func(mk);
      if (result instanceof Promise)
        await result;
    }
    else {
      throw new Error(`There is no Function`);
    }
  }

  public toJSON(): SimpleObject {
    return {
      type: ExecScriptTask.name,
      variableMap: this._variableMap,
      script: this._script,
    }
  }
};
