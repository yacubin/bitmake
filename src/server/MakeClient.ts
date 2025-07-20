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
import { JSONRPC_VERSION } from "@/server/Transport";
import { JsonRpcServer } from "@/server/JsonRpcServer";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { MainTarget, PostTarget } from "@/core/Target";
import { PostCustomScript, CustomScript } from "@/core/CustomScript";
import { InstallEntity } from "@/core/InstallEntity";
import { SimpleObject } from "@/core/SimpleObject";
import { WORKERNODE_STARTMAKESCRIPT } from "@/server/RemoteMethods";
import { WORKERNODE_MAINTARGETS } from "@/server/RemoteMethods";
import { WORKERNODE_POSTTARGETS } from "@/server/RemoteMethods";
import { WORKERNODE_MAINSCRIPTS } from "@/server/RemoteMethods";
import { WORKERNODE_POSTSCRIPTS } from "@/server/RemoteMethods";
import { WORKERNODE_INSTALLENTRIES } from "@/server/RemoteMethods";
import { WORKERNODE_PROCESSEXIT } from "@/server/RemoteMethods";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

interface ResponseEntry {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
};

export class WorkerRpcClient {
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

  /*public stopServer(): Promise<number> {
    return this._worker.terminate();
  }*/

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
      throw new Error(`Wortker return exit code ${code}`);
  }
};

export class MakeClient {
  private _workerRpc: WorkerRpcClient;
  private _mainTargets = new Array<MainTarget>;
  private _postTargets = new Array<PostTarget>;
  private _mainScripts = new Array<CustomScript>;
  private _postScripts = new Array<PostCustomScript>;
  private _installEntries = new Array<InstallEntity>;

  public constructor(jsonRpcServer: JsonRpcServer) {
    this._workerRpc = new WorkerRpcClient(jsonRpcServer);
  }

  public async execMakeScript(variableMap: VariableMap): Promise<void> {
    const cwdSave = process.cwd();
    const scriptDir = ScopeHelper.get(variableMap, "SCRIPT_DIR");
    process.chdir(scriptDir.toString());
    await this._workerRpc.request(WORKERNODE_STARTMAKESCRIPT, ScopeHelper.toJSON(variableMap));
    process.chdir(cwdSave);

    const mainTargets = await this._workerRpc.request(WORKERNODE_MAINTARGETS, null);
    this._mainTargets = SimpleObject.fromJSON(mainTargets);

    const postTargets = await this._workerRpc.request(WORKERNODE_POSTTARGETS, null);
    this._postTargets = SimpleObject.fromJSON(postTargets);

    const mainScripts = await this._workerRpc.request(WORKERNODE_MAINSCRIPTS, null);
    this._mainScripts = SimpleObject.fromJSON(mainScripts);

    const postScripts = await this._workerRpc.request(WORKERNODE_POSTSCRIPTS, null);
    this._postScripts = SimpleObject.fromJSON(postScripts);

    const installEntries = await this._workerRpc.request(WORKERNODE_INSTALLENTRIES, null);
    this._installEntries = SimpleObject.fromJSON(installEntries);

    await this._workerRpc.request(WORKERNODE_PROCESSEXIT, 0);
  }

  public get mainTargets(): MainTarget[] {
    return this._mainTargets;
  }

  public get postTargets(): PostTarget[] {
    return this._postTargets;
  }

  public get mainScripts(): CustomScript[] {
    return this._mainScripts;
  }

  public get postScripts(): PostCustomScript[] {
    return this._postScripts;
  }

  public get installEntries(): InstallEntity[] {
    return this._installEntries;
  }
};
