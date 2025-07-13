/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";

import { ProjectContext } from "@/core/ProjectContext";
import { ScriptContext } from "@/core/ScriptContext";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { MakeClient } from "@/server/MakeClient";
import { JsonRpcServer } from "@/server/JsonRpcServer";
import { importModule } from "@/utils/Module";
import { createVariableMapForDirectory } from "@/core/BaseContext";
import { MAINNODE_STARTMAKESCRIPT } from "@/server/RemoteMethods";
import { MAINNODE_LOADJSON } from "@/server/RemoteMethods";
import { MAINNODE_EXECUTESCRIPT } from "@/server/RemoteMethods";
import { WORKERNODE_STARTMAKESCRIPT } from "@/server/RemoteMethods";
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
  private _jsonRpcServer = new JsonRpcServer;
  private _clients = new Map<string, MakeClient>;
  private _clientIdCounter = 1;

  public constructor() {
    this._listeners = {
      [ CONFIGURE_EVENT ]: new Array<ConfigureListener>,
      [ BUILD_EVENT ]: new Array<BuildListener>,
    };
    this._jsonRpcServer.registerCallback(MAINNODE_EXECUTESCRIPT, params => this.executeScript(params));
    this._jsonRpcServer.registerCallback(MAINNODE_LOADJSON, params => this.loadJSON(params));
    this._jsonRpcServer.registerCallback(MAINNODE_STARTMAKESCRIPT, params => this.startMakeScript(params));
  }

  public get rootVariableMap() {
    return this._rootVariableMap;
  }

  public get project() {
    return this._project;
  }

  public createClient() {
    const name = "mkc" + this._clientIdCounter++;
    const client = new MakeClient(this._jsonRpcServer);
    this._clients.set(name, client);
    return client;
  }

  public async startMakeScript(params: any): Promise<void> {
    logger.debug("MakeServer.startMakeScript");

    const variableMap = ScopeHelper.fromJSON(params);
    await this.runMakeScript(variableMap);
  }

  private async loadJSON(filename: string): Promise<any> {
    logger.debug("MakeServer.loadJSON(", filename, ")");
    if (filename.endsWith(".json")) {
      const content = await fs.promises.readFile(filename, "utf8");
      return JSON.parse(content);
    }

    const module = await importModule(filename);
    if (!module.default)
      throw new Error(`Script "${filename}" has not contain a default function`);

    return module.default;
  }

  private async executeScript(params: any): Promise<void> {
    logger.debug("MakeServer.executeScript");
    const variableMap = ScopeHelper.fromJSON(params);
    const scriptFile = ScopeHelper.get(variableMap, "SCRIPT_FILE");

    const module = await importModule(scriptFile.toString());
    if (!module.default)
      throw new Error(`Script "${scriptFile}" has not contain a default function`);

    const mk = ScriptContext.create(this._project, variableMap);
    module.default(mk);
  }

  public async runMakeScript(variableMap: VariableMap): Promise<boolean> {
    if (!await this._project.prepearScriptFile(variableMap))
      return false;

    const client = this.createClient();

    const cwdSave = process.cwd();
    const scriptDir = ScopeHelper.get(variableMap, "SCRIPT_DIR");
    process.chdir(scriptDir.toString());
    await client.request(WORKERNODE_STARTMAKESCRIPT, ScopeHelper.toJSON(variableMap));
    process.chdir(cwdSave);

    return true;
  }

  public async start() {
    const sourceDir = ScopeHelper.get(this._rootVariableMap, "PROJECT_SOURCE_DIR");
    const binaryDir = ScopeHelper.get(this._rootVariableMap, "PROJECT_BINARY_DIR");

    /*const variableMap = createVariableMapForDirectory(this._rootVariableMap, sourceDir, binaryDir);
    if (!await this.runMakeScript(variableMap))
      throw Error("Can't prepear ScriptFile");*/

    // this.onConfigureEnd();

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
