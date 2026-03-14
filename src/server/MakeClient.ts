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
import { JSONRPC_VERSION } from "@/server/Transport";
import { JsonRpcDispatcher } from "@/server/JsonRpcDispatcher";
import { ScopeHelper, VariableMap } from "@/core/Scope";
import { MainTarget, PostTarget } from "@/core/Target";
import { PostCustomScript, CustomScript } from "@/core/CustomScript";
import { InstallEntity } from "@/core/InstallEntity";
import { SimpleObject } from "@/core/SimpleObject";
import { MAKECONTEXT_CREATECONTEXT } from "@/server/RemoteMethods";
import { MAKECONTEXT_DESTROYCONTEXT } from "@/server/RemoteMethods";
import { MAKECONTEXT_EXECSCRIPT } from "@/server/RemoteMethods";
import { MAKECONTEXT_MAINTARGETS } from "@/server/RemoteMethods";
import { MAKECONTEXT_POSTTARGETS } from "@/server/RemoteMethods";
import { MAKECONTEXT_MAINSCRIPTS } from "@/server/RemoteMethods";
import { MAKECONTEXT_POSTSCRIPTS } from "@/server/RemoteMethods";
import { MAKECONTEXT_INSTALLENTRIES } from "@/server/RemoteMethods";
import { WORKERSERVICE_PROCESSEXIT } from "@/server/RemoteMethods";
import { Logger } from "@/utils/Logger";

const logger = Logger.create(import.meta.url);

interface ResponseEntry {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
};

export class WorkerRpcClient {
  private _jsonRpcDispatcher: JsonRpcDispatcher;
  private _worker: Worker;
  private _id = 1;
  private _waitResponseMap = new Map<number,ResponseEntry>();;

  public constructor(jsonRpcDispatcher: JsonRpcDispatcher) {
    this._jsonRpcDispatcher = jsonRpcDispatcher;
    this._worker = new Worker(currentScriptURL());
    this._worker.on("message", message => this.onWorkerMessage(message));
    this._worker.on("error", (error: Error) => this.onWorkerError(error));
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
      this._jsonRpcDispatcher.prerformMessage(mt.readMessage()).then(data => mt.sendMessage(data))
    }
    else if (Object.hasOwn(message, "method")) {
      this._jsonRpcDispatcher.prerformMessage(message).then(data => this._worker.postMessage(data));
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

class MakeContextClient {
  private _workerRpc: WorkerRpcClient;

  public constructor(jsonRpcDispatcher: JsonRpcDispatcher) {
    this._workerRpc = new WorkerRpcClient(jsonRpcDispatcher);
  }

  public createContext(): Promise<string> {
    return this._workerRpc.request(MAKECONTEXT_CREATECONTEXT, null);
  }

  public destroyContext(mkid: string): Promise<void> {
    return this._workerRpc.request(MAKECONTEXT_DESTROYCONTEXT, { mkid });
  }

  public execScript(mkid: string, variableMap: VariableMap): Promise<string> {
    const scope = ScopeHelper.toJSON(variableMap);
    return this._workerRpc.request(MAKECONTEXT_EXECSCRIPT, { mkid, scope });
  }

  public async mainTargets(mkid: string): Promise<MainTarget[]> {
    const result = await this._workerRpc.request(MAKECONTEXT_MAINTARGETS, { mkid });
    return SimpleObject.fromJSON(result);
  }

  public async postTargets(mkid: string): Promise<PostTarget[]> {
    const result = await this._workerRpc.request(MAKECONTEXT_POSTTARGETS, { mkid });
    return SimpleObject.fromJSON(result);
  }

  public async mainScripts(mkid: string): Promise<CustomScript[]> {
    const result = await this._workerRpc.request(MAKECONTEXT_MAINSCRIPTS, { mkid });
    return SimpleObject.fromJSON(result);
  }

  public async postScripts(mkid: string): Promise<PostCustomScript[]> {
    const result = await this._workerRpc.request(MAKECONTEXT_POSTSCRIPTS, { mkid });
    return SimpleObject.fromJSON(result);
  }

  public async installEntries(mkid: string): Promise<InstallEntity[]> {
    const result = await this._workerRpc.request(MAKECONTEXT_INSTALLENTRIES, { mkid });
    return SimpleObject.fromJSON(result);
  }

  public processExit(code: number): Promise<void> {
    return this._workerRpc.request(WORKERSERVICE_PROCESSEXIT, 0);
  }
};

export class MakeClient {
  private _makeContext: MakeContextClient;
  private _mainTargets = new Array<MainTarget>;
  private _postTargets = new Array<PostTarget>;
  private _mainScripts = new Array<CustomScript>;
  private _postScripts = new Array<PostCustomScript>;
  private _installEntries = new Array<InstallEntity>;

  public constructor(jsonRpcDispatcher: JsonRpcDispatcher) {
    this._makeContext = new MakeContextClient(jsonRpcDispatcher);
  }

  public async execMakeScript(variableMap: VariableMap): Promise<void> {
    const mkid = await this._makeContext.createContext();

    const cwdSave = process.cwd();
    const scriptDir = ScopeHelper.get(variableMap, "SCRIPT_DIR");
    process.chdir(scriptDir.toString());
    await this._makeContext.execScript(mkid, variableMap);
    process.chdir(cwdSave);

    this._mainTargets = await this._makeContext.mainTargets(mkid);
    this._postTargets = await this._makeContext.postTargets(mkid);
    this._mainScripts = await this._makeContext.mainScripts(mkid);
    this._postScripts = await this._makeContext.postScripts(mkid);
    this._installEntries = await this._makeContext.installEntries(mkid);

    await this._makeContext.processExit(0);
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
