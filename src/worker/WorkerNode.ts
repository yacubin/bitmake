/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IRequestSync } from "@/transport/Common";
import { RemoteMakeContext } from "@/core/RemoteMakeContext";
import { importModule } from "@/utils/Module";

export class WorkerNode {
  private _transport: IRequestSync;

  public constructor(requestSync: IRequestSync) {
    this._transport = requestSync;
  }

  public async loadSubdirectory(params: any): Promise<void> {
    const module = await importModule(params);
    if (!module.default)
      throw new Error(`Subdirectory ${params} not contain default function`);

    const mk = RemoteMakeContext.create(this._transport);
    const result = module.default(mk);
    if (result instanceof Promise)
      await result;
  }
};
