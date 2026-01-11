/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ProjectContext } from "@/core/ProjectContext";
import { ScriptContext } from "@/core/ScriptContext";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { MakeClient } from "@/server/MakeClient";
import { JsonRpcDispatcher } from "@/server/JsonRpcDispatcher";
import { importModule } from "@/utils/Module";
import { loadJSValue } from "@/utils/JSValue";
import { createVariableMapForDirectory } from "@/core/BaseContext";
import { MAINNODE_STARTMAKESCRIPT } from "@/server/RemoteMethods";
import { MAINNODE_LOADJSON } from "@/server/RemoteMethods";
import { MAINNODE_EXECUTESCRIPT } from "@/server/RemoteMethods";
import { Logger } from "@/utils/Logger";
import { Locator } from "@/utils/Locator";

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
  private _jsonRpcDispatcher = new JsonRpcDispatcher;
  private _clients = new Array<MakeClient>;

  public constructor() {
    this._listeners = {
      [ CONFIGURE_EVENT ]: new Array<ConfigureListener>,
      [ BUILD_EVENT ]: new Array<BuildListener>,
    };
    this._jsonRpcDispatcher.registerCallback(MAINNODE_EXECUTESCRIPT, params => this.executeScript(params));
    this._jsonRpcDispatcher.registerCallback(MAINNODE_LOADJSON, params => this.loadJSON(params));
    this._jsonRpcDispatcher.registerCallback(MAINNODE_STARTMAKESCRIPT, params => this.startMakeScript(params));
  }

  public get rootVariableMap() {
    return this._rootVariableMap;
  }

  public get project() {
    return this._project;
  }

  public async startMakeScript(params: any): Promise<void> {
    logger.debug("MakeServer.startMakeScript");

    const variableMap = ScopeHelper.fromJSON(params);
    await this.runMakeScript(variableMap);
  }

  private async loadJSON(filename: string): Promise<any> {
    logger.debug("MakeServer.loadJSON(", filename, ")");
    return await loadJSValue(Locator.create(filename));
  }

  private async executeScript(params: any): Promise<void> {
    logger.debug("MakeServer.executeScript");
    const variableMap = ScopeHelper.fromJSON(params);
    const scriptFile = ScopeHelper.get(variableMap, "SCRIPT_FILE");

    const module = await importModule(scriptFile.toURLString());
    if (!module.default)
      throw new Error(`Script "${scriptFile}" has not contain a default function`);

    const mk = ScriptContext.create(variableMap);
    module.default(mk);
  }

  public async runMakeScript(variableMap: VariableMap): Promise<boolean> {
    if (!await this._project.prepearScriptFile(variableMap))
      return false;

    const client = new MakeClient(this._jsonRpcDispatcher);
    this._clients.push(client);

    await client.execMakeScript(variableMap);
    return true;
  }

  public combineResults() {
    for (const ctx of this._clients) {
      this._project.applyMainTargets(ctx.mainTargets);
      this._project.applyMainScripts(ctx.mainScripts);
      this._project.applyInstallEntities(ctx.installEntries);
    }
    for (const ctx of this._clients) {
      this._project.applPostTargets(ctx.postTargets);
      this._project.applPostScripts(ctx.postScripts);
    }
  }

  public async start() {
    const sourceDir = ScopeHelper.get(this._rootVariableMap, "PROJECT_SOURCE_DIR");
    const binaryDir = ScopeHelper.get(this._rootVariableMap, "PROJECT_BINARY_DIR");

    const variableMap = createVariableMapForDirectory(this._rootVariableMap, sourceDir, binaryDir);
    if (!await this.runMakeScript(variableMap))
      throw Error("Can't prepear ScriptFile");

    this.combineResults();
    this.onConfigureEnd();
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
