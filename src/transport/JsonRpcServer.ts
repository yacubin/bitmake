/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMessageSender, JsonRpcData, JsonRpcRequestHandler, IJsonRpcRequest, IJsonRpcResponse, JsonRpcCallback } from "@/transport/Common";
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

class JsonRpcResponse implements IJsonRpcResponse {
  private _sender: IMessageSender;
  private _id: number;

  public constructor(sender: IMessageSender, id: number) {
    this._sender = sender;
    this._id = id;
  }

  sendResult(result: any): void {
    const message: JsonRpcData = {
      jsonrpc: "2.0",
      id: this._id,
    };
    if (result !== undefined) {
      message.result;
    }
    this._sender.sendMessage(message);
  }
};

export class JsonRpcServer {
  private _requestHandlers = new Map<string, JsonRpcRequestHandler>();

  public constructor() {
  }

  public registerHandler(method: string, handler: JsonRpcRequestHandler): void {
    this._requestHandlers.set(method, handler);
  }

  public registerCallback(method: string, callback: JsonRpcCallback): void {
    this._requestHandlers.set(method, async (request, response) => {
      logger.info(">>> Call", method, request.params);
      let result: any = callback.apply(undefined, request.params);
      if (result instanceof Promise)
        result = await result;
      response.sendResult(result);
    });
  }

  public onRequest(sender: IMessageSender, method: any, id: any, params: any): void {
    const handler = (typeof method === "string") ? this._requestHandlers.get(method) : undefined;
    if (handler) {
      handler(new JsonRpcRequest(params), new JsonRpcResponse(sender, id));
    }
    else {
      sender.sendMessage({ error: { code: -32601, message: "Method not found" }, id })
    }
  }

  public onResult(sender: IMessageSender, result: any, id: number): void {
    
  }

  public onError(sender: IMessageSender, error: object, id: number | null): void {
    
  }

  public onNotification(sender: IMessageSender, method: any, params?: any): void {
    
  }

  private onMessageImpl(sender: IMessageSender, message: any): void {
    logger.debug("-->", JSON.stringify(message));
    if (!message || typeof message !== "object") {
      return;
    }

    const data = message as JsonRpcData;

    if (Object.hasOwn(data, "method")) {
      if (Object.hasOwn(data, "id"))
        this.onRequest(sender, data.method, data.id, data.params);
      else
        this.onNotification(sender, data.method, data.params);
    }
    else if (data.id) {
      
    }
    else {

    }
  }

  public onMessage(sender: IMessageSender, message: any): void {
    if (Array.isArray(message))
      message.forEach(msg => this.onMessageImpl(sender, msg));
    else
      this.onMessageImpl(sender, message);
  }
};
