/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IJsonRpcRequest, IJsonRpcResponse, IRequestSync } from "@/transport/Common";
import { RemoteContext } from "@/core/RemoteContext";
import { importModule } from "@/utils/Module";

export class WorkerNode {
  private _transport: IRequestSync;

  public constructor(requestSync: IRequestSync) {
    this._transport = requestSync;
  }

  public async loadSubdirectory(request: IJsonRpcRequest, response: IJsonRpcResponse): Promise<void> {
    const module = await importModule(request.params);
    if (!module.default)
      throw new Error(`Subdirectory ${request.params} not contain default function`);

    const mk = RemoteContext.create(this._transport);
    const result = module.default(mk);
    if (result instanceof Promise)
      await result;

    response.sendResult(null);
  }
};
