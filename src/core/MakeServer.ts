/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ProjectContext } from "@/core/ProjectContext";
import { VariableMap } from "@/core/Scope";
import { Worker } from "node:worker_threads";
import { currentScriptURL } from "@/utils/Module";
import { MemoryTransport } from "@/transport/MemoryTransport";
import { JsonRpcServer } from "@/transport/JsonRpcServer";
import { WORKERNODE_LOADSUBDIRECTORY } from "@/worker/RemoteMethods";
import { CONFIGURE_ADDCACHEVARIABLES } from "@/worker/RemoteMethods";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

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
  private _preparation = ProjectContext.create();
  private _listeners: { [name: string]: Function[] };

  public constructor() {
    this._listeners = {
      [ CONFIGURE_EVENT ]: new Array<ConfigureListener>,
      [ BUILD_EVENT ]: new Array<BuildListener>,
    };
  }

  public get rootVariableMap() {
    return this._rootVariableMap;
  }

  public get preparation() {
    return this._preparation;
  }

  public async start() {
    const sourceDir = this._rootVariableMap.PROJECT_SOURCE_DIR.getValue();
    const binaryDir = this._rootVariableMap.PROJECT_BINARY_DIR.getValue();

    const jsonRpcServer = new JsonRpcServer;
    const variableMap = this._preparation.createVariableMapForSubdirectory(this._rootVariableMap, sourceDir, binaryDir);
    if (!variableMap)
      throw Error("Can't creeate VariableMap");

    const mk = await this._preparation.createMakeContext(variableMap);
    jsonRpcServer.registerCallback(CONFIGURE_ADDCACHEVARIABLES, params => mk.addCacheVariables(params));

    const worker = new Worker(currentScriptURL());
    worker.postMessage({
      jsonrpc: "2.0",
      method: WORKERNODE_LOADSUBDIRECTORY,
      params: [ this._rootVariableMap.SCRIPT_FILE.getValue().toJSON() ],
      id: 2,
    });
    worker.on("message", (message) => {
      logger.info(">>> Worker Message", message);
      if (message instanceof SharedArrayBuffer) {
        const memory = new MemoryTransport.Buffer(message);
        jsonRpcServer.onMessage({
          sendMessage() { memory.set({ result: true }, true); }
        }, memory.get());
      }
    });
    worker.on("error", (e) => {
      if (e instanceof Error)
        console.error(e.stack);
      else
        console.error(e);
      process.exit(1);
    });
    worker.on("exit", (code: number) => {
      if (code)
        process.exit(code);
    });

    //this._preparation.addSubdirectory(this._rootVariableMap, sourceDir, binaryDir);
    //this._preparation.doSubdirectory().then(() => this.onConfigureEnd());
  }

  private async onConfigureEnd() {
    const event = { project: this._preparation };
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
