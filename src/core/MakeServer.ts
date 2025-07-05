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
import { Worker } from "node:worker_threads";
import { currentScriptURL } from "@/utils/Module";
import { MemoryMessageSender } from "@/transport/MemoryTransport";
import { JSONRPC_VERSION } from "@/transport/Common";
import { JsonRpcServer } from "@/transport/JsonRpcServer";
import { MainNode } from "@/worker/MainNode";
import { MAINNODE_LOADJSON } from "@/worker/RemoteMethods";
import { MAINNODE_EXECUTESCRIPT } from "@/worker/RemoteMethods";
import { WORKERNODE_EXECMAKESCRIPT } from "@/worker/RemoteMethods";
import { createLogger } from "@/logger";
import { AbsolutePath } from "@/core/Path";
import { fileExists } from "@/utils/FileSystem";

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

interface MakeClient {
  jsonRpcServer: JsonRpcServer,
  mainNode: MainNode,
  worker: Worker,
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

  public get preparation() {
    return this._project;
  }

  public async createClient(variableMap: VariableMap, sourceDir: any, binaryDir?: any): Promise<MakeClient | undefined> {
    const jsonRpcServer = new JsonRpcServer;
    const newVariableMap = createVariableMapForDirectory(variableMap, sourceDir, binaryDir);
    if (!await this._project.prepearScriptFile(newVariableMap))
      throw Error("Can't prepear ScriptFile");

    const mainNode = new MainNode(this._project);
    jsonRpcServer.registerCallback(MAINNODE_EXECUTESCRIPT, params => mainNode.executeScript(params));
    jsonRpcServer.registerCallback(MAINNODE_LOADJSON, params => mainNode.loadJSON(params));

    const worker = new Worker(currentScriptURL());
    worker.postMessage({
      jsonrpc: JSONRPC_VERSION,
      method: WORKERNODE_EXECMAKESCRIPT,
      params: ScopeHelper.toJSON(newVariableMap),
      id: 2,
    });
    worker.on("message", (message) => {
      if (message instanceof SharedArrayBuffer) {
        const mt = new MemoryMessageSender(message)
        jsonRpcServer.onMessage(mt, mt.readMessage());
      }
      else {
        logger.info(">>> Worker Message", message);
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

    return { jsonRpcServer, mainNode, worker };
  }

  public async start() {
    const sourceDir = ScopeHelper.get(this._rootVariableMap, "PROJECT_SOURCE_DIR");
    const binaryDir = ScopeHelper.get(this._rootVariableMap, "PROJECT_BINARY_DIR");

    //const client = await this.createClient(this._rootVariableMap, sourceDir, binaryDir);
    //if (client)
    //  this._clients.push(client);

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
