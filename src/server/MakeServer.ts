/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ProjectContext } from "@/core/ProjectContext";
import { createVariableMapForDirectory } from "@/core/BaseContext";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { MakeClient } from "@/server/MakeClient";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export const CONFIGURE_EVENT = "configure";
export const BUILD_EVENT = "build";

export interface ConfigureEvent {
  project: ProjectContext;
};

export interface BuildEvent {
  project: ProjectContext;
};

export type ConfigureListener = (event: ConfigureEvent) => void;
export type BuildListener = (event: BuildEvent) => void;

export interface MemorySender {
  sendMessage(message: any): void;
};

export class MakeServer {
  private _rootVariableMap: VariableMap = {};
  private _project = ProjectContext.create();
  private _listeners: { [name: string]: Function[] };
  private _clients = new Array<MakeClient>;;

  public constructor() {
    this._listeners = {
      [ CONFIGURE_EVENT ]: new Array<ConfigureListener>,
      [ BUILD_EVENT ]: new Array<BuildListener>,
    };
  }

  public get rootVariableMap() {
    return this._rootVariableMap;
  }

  public get project() {
    return this._project;
  }

  public async start() {
    const sourceDir = ScopeHelper.get(this._rootVariableMap, "PROJECT_SOURCE_DIR");
    const binaryDir = ScopeHelper.get(this._rootVariableMap, "PROJECT_BINARY_DIR");

    /*const variableMap = createVariableMapForDirectory(this._rootVariableMap, sourceDir, binaryDir);
    if (!await this._project.prepearScriptFile(variableMap))
      throw Error("Can't prepear ScriptFile");

    const client = new MakeClient(this._project);

    const cwdSave = process.cwd();
    const scriptDir = ScopeHelper.get(this._rootVariableMap, "SCRIPT_DIR");
    process.chdir(scriptDir.toString());
    this._clients.push(client);
    await client.startMakeScript(variableMap);
    process.chdir(cwdSave);*/

    this._project.addSubdirectory(this._rootVariableMap, sourceDir, binaryDir);
    this._project.doSubdirectory().then(() => this.onConfigureEnd());
  }

  private async onConfigureEnd() {
    const event = { project: this._project };
    await this.emitEvent(CONFIGURE_EVENT, event);
    await this.emitEvent(BUILD_EVENT, event);
  }

  private async emitEvent<T>(type: string, event: T): Promise<void> {
    for (const listener of this._listeners[type]) {
      const result = listener(event);
      if (result instanceof Promise)
        await result;
    }
  }
  
  public addEventListener(type: "configure", listener: ConfigureListener): void;
  public addEventListener(type: "build", listener: BuildListener): void;
  public addEventListener(type: string, listener: Function): void {
    this._listeners[type].push(listener);
  }
};
