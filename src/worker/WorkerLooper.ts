/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMessageSender, IMessageEmitter } from "@/transport/Common";
import { MemoryTransport } from "@/transport/MemoryTransport";
import { JsonRpcServer } from "@/transport/JsonRpcServer";
import { WorkerNode } from "@/worker/WorkerNode";
import { WORKERNODE_EXECMAKESCRIPT } from "@/worker/RemoteMethods";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

export class WorkerLooper implements IMessageEmitter {
  private _jsonrpcServer: JsonRpcServer;

  public constructor(sender: IMessageSender) {
    this._jsonrpcServer = new JsonRpcServer;

    const buffer = new SharedArrayBuffer(0x8000);
    const transport = new MemoryTransport(sender, buffer);

    const workerNode = new WorkerNode(transport);
    this._jsonrpcServer.registerCallback(WORKERNODE_EXECMAKESCRIPT, params => workerNode.execMakeScript(params));
  }

  public emitMessage(sender: IMessageSender, message: any): void {
    return this._jsonrpcServer.onMessage(sender, message);
  }
};
