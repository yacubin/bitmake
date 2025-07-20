/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMessageSender, IMessageEmitter } from "@/server/Transport";
import { MemoryTransport } from "@/server/MemoryTransport";
import { JsonRpcServer } from "@/server/JsonRpcServer";
import { WorkerNode } from "@/server/WorkerNode";
import { WORKERNODE_STARTMAKESCRIPT } from "@/server/RemoteMethods";
import { WORKERNODE_MAINTARGETS } from "@/server/RemoteMethods";
import { WORKERNODE_POSTTARGETS } from "@/server/RemoteMethods";
import { WORKERNODE_MAINSCRIPTS } from "@/server/RemoteMethods";
import { WORKERNODE_POSTSCRIPTS } from "@/server/RemoteMethods";
import { WORKERNODE_INSTALLENTRIES } from "@/server/RemoteMethods";
import { WORKERNODE_PROCESSEXIT } from "@/server/RemoteMethods";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export class WorkerLooper implements IMessageEmitter {
  private _jsonrpcServer: JsonRpcServer;

  public constructor(sender: IMessageSender) {
    this._jsonrpcServer = new JsonRpcServer;

    const buffer = new SharedArrayBuffer(0x8000);
    const transport = new MemoryTransport(sender, buffer);

    const workerNode = new WorkerNode(transport);
    this._jsonrpcServer.registerCallback(WORKERNODE_STARTMAKESCRIPT, params => workerNode.execMakeScript(params));
    this._jsonrpcServer.registerCallback(WORKERNODE_MAINTARGETS, params => workerNode.mainTargets(params));
    this._jsonrpcServer.registerCallback(WORKERNODE_POSTTARGETS, params => workerNode.postTargets(params));
    this._jsonrpcServer.registerCallback(WORKERNODE_MAINSCRIPTS, params => workerNode.mainScripts(params));
    this._jsonrpcServer.registerCallback(WORKERNODE_POSTSCRIPTS, params => workerNode.postScripts(params));
    this._jsonrpcServer.registerCallback(WORKERNODE_INSTALLENTRIES, params => workerNode.installEntries(params));
    this._jsonrpcServer.registerCallback(WORKERNODE_PROCESSEXIT, params => workerNode.processExit(params));
  }

  public emitMessage(sender: IMessageSender, message: any): void {
    return this._jsonrpcServer.emitMessage(sender, message);
  }
};
