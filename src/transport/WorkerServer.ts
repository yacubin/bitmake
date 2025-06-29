/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMessageSender, IMessageEmitter, JsonRpcData, JsonRpcRequestHandler, IJsonRpcRequest, IJsonRpcResponse } from "@/transport/Common";
import { MemoryTransport } from "@/transport/MemoryTransport";
import { importModule } from "@/utils/Module";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

class JsonRpcRequest implements IJsonRpcRequest {
  private _params: any;

  constructor(params: any) {
    this._params = params;
  }

  get params(): any {
    return this._params;
  }
}

class JsonRpcServer {
  private _sender: IMessageSender;
  private _requestHandlers = new Map<string, JsonRpcRequestHandler>();

  public constructor(sender: IMessageSender) {
    this._sender = sender;
  }

  public registerHandler(method: string, handler: JsonRpcRequestHandler): void {
    this._requestHandlers.set(method, handler);
  }

  public onRequest(method: any, id: any, params: any): void {
    const handler = (typeof method === "string") ? this._requestHandlers.get(method) : undefined;
    if (handler) {
      handler(new JsonRpcRequest(params), {});
    }
    else {
      this._sender.sendMessage({ error: { code: -32601, message: "Method not found" }, id })
    }
  }

  public onResult(result: any, id: number): void {
    
  }

  public onError(error: object, id: number | null): void {
    
  }

  public onNotification(method: any, params?: any): void {
    
  }

  private onMessageImpl(message: any): void {
    logger.debug("-->", JSON.stringify(message));
    if (!message || typeof message !== "object") {
      return;
    }

    const data = message as JsonRpcData;

    if (Object.hasOwn(data, "method")) {
      if (Object.hasOwn(data, "id"))
        this.onRequest(data.method, data.id, data.params);
      else
        this.onNotification(data.method, data.params);
    }
    else if (data.id) {
      
    }
    else {

    }
  }

  public onMessage(message: any): void {
    if (Array.isArray(message))
      message.forEach(msg => this.onMessageImpl(msg));
    else
      this.onMessageImpl(message);
  }
};

export class WorkerServer implements IMessageEmitter {
  private _jsonrpcServer: JsonRpcServer;

  public constructor(sender: IMessageSender) {
    this._jsonrpcServer = new JsonRpcServer(sender);

    const buffer = new SharedArrayBuffer(1024);
    const transport = new MemoryTransport(sender, buffer);

    this._jsonrpcServer.registerHandler("PostMessage.buffer", (request: IJsonRpcRequest, response: IJsonRpcResponse) => {
      logger.info("Handler");
    });
    this._jsonrpcServer.registerHandler("Module.import", async (request: IJsonRpcRequest, response: IJsonRpcResponse) => {
      logger.info("> Module.import");
      const module = await importModule(request.params);
      const result = transport.requestSync({ method: "System.wait", params: 1000 });
      logger.info("< Module.import", result);
    });
  }

  public emitMessage(message: any): void {
    return this._jsonrpcServer.onMessage(message);
  }
};
