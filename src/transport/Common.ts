/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export interface IMessageSender {
  sendMessage(message: any): void;
};

export interface IMessageEmitter {
  emitMessage(message: any): void;
};

export interface IRequestSync {
  requestSync(data: any): any;
};

export interface IJsonRpcReciver {
  onRequest(method: string, id: number, params?: any): void;
  onResult(result: any, id: number): void;
  onError(error: object, id: number | null): void;
  onNotification(method: string, params?: any): void;
};

export interface IJsonRpcSender {
  // sendMethod(method: string, params?: any, callback: ()): void;
};

export interface JsonRpcData {
  jsonrpc: string;
  method?: string;
  params?: any;
  id?: number;
  error?: object;
  result?: any;
};

export type JsonRpcRequestHandler = (request: IJsonRpcRequest, response: IJsonRpcResponse) => void;

export interface IJsonRpcRequest {
  get params(): any;
};

export interface IJsonRpcResponse {

};
