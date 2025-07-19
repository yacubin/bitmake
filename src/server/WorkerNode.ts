/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IRequestSync } from "@/server/Transport";
import { JsonRpcRequestSync } from "@/server/JsonRpcRequestSync";
import { RemoteMakeContext } from "@/server/RemoteMakeContext";
import { UserMakeContext } from "@/core/UserMakeContext";
import { performContext } from "@/core/BaseContext";
import { MainTarget, PostTarget } from "@/core/Target";
import { SimpleObject } from "@/core/SimpleObject";
import { ScopeHelper } from "@/core/Scope";

export class WorkerNode {
  private _transport: JsonRpcRequestSync;
  private _mainTargets = new Array<MainTarget>;
  private _postTargets = new Array<PostTarget>;

  public constructor(requestSync: IRequestSync) {
    this._transport = new JsonRpcRequestSync(requestSync);
  }

  public async execMakeScript(params: any): Promise<void> {
    const variableMap = ScopeHelper.fromJSON(params);

    const ctx = new RemoteMakeContext(variableMap, this._transport);
    const mk = UserMakeContext.create(ctx, variableMap);
    await performContext(mk);

    this._mainTargets = Array.from(ctx.targets.values());
    this._postTargets = Array.from(ctx.postTargets.values());
  }

  public mainTargets(params: any): MainTarget[] {
    return SimpleObject.toJSON(this._mainTargets);
  }

  public postTargets(params: any): PostTarget[] {
    return SimpleObject.toJSON(this._postTargets);
  }
};
