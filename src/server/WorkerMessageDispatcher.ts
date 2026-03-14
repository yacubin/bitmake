/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMessageSender } from "@/server/Transport";
import { MemoryTransport } from "@/server/MemoryTransport";
import { JsonRpcDispatcher } from "@/server/JsonRpcDispatcher";
import { MakeContextProvider } from "@/server/MakeContextProvider";
import { WorkerServiceProvider } from "@/server/WorkerServiceProvider";
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

export class WorkerMessageDispatcher {
  private _jsonRpcDispatcher: JsonRpcDispatcher;

  public constructor(name: string, sender: IMessageSender) {
    this._jsonRpcDispatcher = new JsonRpcDispatcher;

    const buffer = new SharedArrayBuffer(0x8000);
    const transport = new MemoryTransport(sender, buffer);

    const makeContext = new MakeContextProvider(name, transport);
    this._jsonRpcDispatcher.registerCallback(MAKECONTEXT_CREATECONTEXT, params => makeContext.createContext(params));
    this._jsonRpcDispatcher.registerCallback(MAKECONTEXT_DESTROYCONTEXT, params => makeContext.destroyContext(params));
    this._jsonRpcDispatcher.registerCallback(MAKECONTEXT_EXECSCRIPT, params => makeContext.execScript(params));
    this._jsonRpcDispatcher.registerCallback(MAKECONTEXT_MAINTARGETS, params => makeContext.mainTargets(params));
    this._jsonRpcDispatcher.registerCallback(MAKECONTEXT_POSTTARGETS, params => makeContext.postTargets(params));
    this._jsonRpcDispatcher.registerCallback(MAKECONTEXT_MAINSCRIPTS, params => makeContext.mainScripts(params));
    this._jsonRpcDispatcher.registerCallback(MAKECONTEXT_POSTSCRIPTS, params => makeContext.postScripts(params));
    this._jsonRpcDispatcher.registerCallback(MAKECONTEXT_INSTALLENTRIES, params => makeContext.installEntries(params));

    const workerService = new WorkerServiceProvider;
    this._jsonRpcDispatcher.registerCallback(WORKERSERVICE_PROCESSEXIT, params => workerService.processExit(params));
  }

  public prerformMessage(message: any): Promise<any> {
    return this._jsonRpcDispatcher.prerformMessage(message);
  }
};
