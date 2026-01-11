/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { JSONRPC_VERSION, JsonRpcData, JsonRpcRequestHandler, IJsonRpcRequest, IJsonRpcResponse, JsonRpcDataCallback, JsonRpcCallback } from "@/server/Transport";
import { Logger } from "@/utils/Logger";

const logger = Logger.create(import.meta.url);

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
  private _id: number | null;
  private _callback: JsonRpcDataCallback;

  public constructor(id: number | null, callback: JsonRpcDataCallback) {
    this._id = id;
    this._callback = callback;
  }

  sendResult(result: any): void {
    const message: JsonRpcData = {
      jsonrpc: JSONRPC_VERSION,
      result: (result !== undefined) ? result : null,
      id: this._id,
    };
    logger.debug("<--", JSON.stringify(message));
    this._callback(message);
  }

  sendError(code: number, message: string, data?: any): void {
    const error: any = { code, message };
    if (data !== undefined) {
      error.data = data;
    }
    const msg: JsonRpcData = {
      jsonrpc: JSONRPC_VERSION,
      error,
      id: this._id,
    };
    logger.debug("<--", JSON.stringify(msg));
    this._callback(msg);
  }
};

export class JsonRpcDispatcher {
  private _requestHandlers = new Map<string, JsonRpcRequestHandler>;

  public registerHandler(method: string, handler: JsonRpcRequestHandler): void {
    this._requestHandlers.set(method, handler);
  }

  public registerCallback(method: string, callback: JsonRpcCallback): void {
    this._requestHandlers.set(method, async (request, response) => {
      let result: any = callback(request.params);
      if (result instanceof Promise)
        result = await result;
      if (result && typeof result === "object" && typeof result.toJSON === "function")
        result = result.toJSON();
      response.sendResult(result);
    });
  }

  private onMessage(data: JsonRpcData, callback: JsonRpcDataCallback): void {
    if (data && typeof data === "object" && typeof data.id === "number") {
      const response = new JsonRpcResponse(data.id, callback);
      if (typeof data.method === "string") {
        const handler = this._requestHandlers.get(data.method);
        if (handler)
          handler(new JsonRpcRequest(data.params), response);
        else
          response.sendError(-32601, "Method not found");
      }
      else {
        response.sendError(-32600, "Invalid Request");
      }
    }
    else {
      const response = new JsonRpcResponse(null, callback);
      response.sendError(-32600, "Invalid Request");
    }
  }

  public prerformMessage(message: any): Promise<JsonRpcData | JsonRpcData[]> {
    logger.debug("-->", JSON.stringify(message));
    return new Promise((resolve) => {
      if (!Array.isArray(message))
        this.onMessage(message, resolve)

      let count = message.length;
      const result = new Array<JsonRpcData>(message.length);
      for (let i = 0; i < message.length; i++) {
        this.onMessage(message[i], data => {
          result[i] = data;
          if (!--count)
            resolve(result);
        });
      }
    });
  }
};
