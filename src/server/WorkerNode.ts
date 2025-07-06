/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IRequestSync } from "@/server/Transport";
import { RemoteMakeContext } from "@/server/RemoteMakeContext";
import { performContext } from "@/core/BaseContext";
import { ScopeHelper } from "@/core/Scope";

export class WorkerNode {
  private _transport: IRequestSync;

  public constructor(requestSync: IRequestSync) {
    this._transport = requestSync;
  }

  public async execMakeScript(params: any): Promise<void> {
    const variableMap = ScopeHelper.fromJSON(params);

    const mk = RemoteMakeContext.create(variableMap, this._transport);
    await performContext(mk);
  }
};
