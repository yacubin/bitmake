/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { JSONRPC_VERSION } from "@/server/Transport";
import { IRequestSync } from "@/server/Transport";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export class JsonRpcRequestSync {
  private _request: IRequestSync;
  private _id: number;

  public constructor(requestSync: IRequestSync) {
    this._request = requestSync;
    this._id = 1;
  }

  public requestSync(method: string, params: any): any {
    logger.debug("JsonRpcRequestSync.requestSync(", method, "...params)");
    const message = {
      jsonrpc: JSONRPC_VERSION,
      method,
      params,
      id: this._id++,
    };
    const response = this._request.requestSync(message);
    if (response.error)
      throw new Error(response.error.message, { cause: response.error.code });
    return response.result;
  }
};
