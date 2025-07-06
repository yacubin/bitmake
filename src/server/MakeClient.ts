/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { Worker } from "node:worker_threads";

import { ProjectContext } from "@/core/ProjectContext";
import { JsonRpcServer } from "@/server/JsonRpcServer";
import { MainNode } from "@/server/MainNode";
import { currentScriptURL } from "@/utils/Module";
import { MemoryMessageSender } from "@/server/MemoryTransport";
import { WorkerSender } from "@/server/WorkerSender";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { JSONRPC_VERSION } from "@/server/Transport";
import { WORKERNODE_STARTMAKESCRIPT } from "@/server/RemoteMethods";
import { MAINNODE_STARTMAKESCRIPT } from "@/server/RemoteMethods";
import { MAINNODE_LOADJSON } from "@/server/RemoteMethods";
import { MAINNODE_EXECUTESCRIPT } from "@/server/RemoteMethods";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

interface ResponseEntry {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
};

export class MakeClient {
  private _jsonRpcServer: JsonRpcServer;
  private _worker: Worker;
  private _id = 1;
  private _waitResponseMap = new Map<number,ResponseEntry>();;

  public constructor(project: ProjectContext) {
    this._worker = new Worker(currentScriptURL());
    this._worker.on("message", message => this.onWorkerMessage(message));
    this._worker.on("error", error => this.onWorkerError(error));
    this._worker.on("exit", code => this.onWorkerExit(code));

    const mainNode = new MainNode(project);
    this._jsonRpcServer = new JsonRpcServer;
    this._jsonRpcServer.registerCallback(MAINNODE_EXECUTESCRIPT, params => mainNode.executeScript(params));
    this._jsonRpcServer.registerCallback(MAINNODE_LOADJSON, params => mainNode.loadJSON(params));
    this._jsonRpcServer.registerCallback(MAINNODE_STARTMAKESCRIPT, params => mainNode.startMakeScript(params));
  }

  public async startMakeScript(variableMap: VariableMap): Promise<any> {
    const id = this._id++;
    const result = new Promise<any>((resolve, reject) => {
      this._waitResponseMap.set(id, { resolve, reject });
    });
    this._worker.postMessage({
      jsonrpc: JSONRPC_VERSION,
      method: WORKERNODE_STARTMAKESCRIPT,
      params: ScopeHelper.toJSON(variableMap),
      id,
    });
    return result;
  }

  private onWorkerMessage(message: any) {
    if (message instanceof SharedArrayBuffer) {
      const mt = new MemoryMessageSender(message)
      this._jsonRpcServer.emitMessage(mt, mt.readMessage());
    }
    else {
      const sender = new WorkerSender(this._worker)
      this._jsonRpcServer.emitMessage(sender, message);
    }
  }

  private onWorkerError(error: Error) {
    if (error instanceof Error)
      console.error(error.stack);
    else
      console.error(error);
    process.exit(1);
  }

  private onWorkerExit(code: number) {
    if (code)
      process.exit(code);
  }
};
