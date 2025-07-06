/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { Worker } from "node:worker_threads";

import { currentScriptURL } from "@/utils/Module";
import { MemoryMessageSender } from "@/server/MemoryTransport";
import { WorkerSender } from "@/server/WorkerSender";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { JSONRPC_VERSION } from "@/server/Transport";
import { JsonRpcServer } from "@/server/JsonRpcServer";
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

  public constructor(jsonRpcServer: JsonRpcServer) {
    this._jsonRpcServer = jsonRpcServer;
    this._worker = new Worker(currentScriptURL());
    this._worker.on("message", message => this.onWorkerMessage(message));
    this._worker.on("error", error => this.onWorkerError(error));
    this._worker.on("exit", code => this.onWorkerExit(code));
  }

  public async request(method: string, params: any): Promise<any> {
    const id = this._id++;
    const result = new Promise<any>((resolve, reject) => {
      this._waitResponseMap.set(id, { resolve, reject });
    });
    this._worker.postMessage({
      jsonrpc: JSONRPC_VERSION,
      method,
      params,
      id,
    });
    return result;
  }

  private onWorkerMessage(message: any) {
    if (message instanceof SharedArrayBuffer) {
      const mt = new MemoryMessageSender(message)
      this._jsonRpcServer.emitMessage(mt, mt.readMessage());
    }
    else if (Object.hasOwn(message, "method")) {
      const sender = new WorkerSender(this._worker);
      this._jsonRpcServer.emitMessage(sender, message);
    }
    else if (Object.hasOwn(message, "id")) {
      const promise = this._waitResponseMap.get(message.id);
      if (!promise)
        throw new Error(`Unknown response "${message.id}" id`);
      if (Object.hasOwn(message, "result"))
        promise.resolve(message.result);
      else if (Object.hasOwn(message, "error"))
        promise.reject(message.error);
      else
        throw new Error(`Unknown message type of "${message}"`);
    }
  }

  private onWorkerError(error: Error) {
    if (error instanceof Error)
      logger.fatal(error.stack);
    else
      logger.fatal(error);
    process.exit(1);
  }

  private onWorkerExit(code: number) {
    if (code)
      process.exit(code);
  }
};
