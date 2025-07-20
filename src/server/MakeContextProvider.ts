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
import { SimpleObject } from "@/core/SimpleObject";
import { ScopeHelper } from "@/core/Scope";

export class MakeContextProvider {
  private _name: string;
  private _transport: JsonRpcRequestSync;
  private _makeContexts = new Map<string, RemoteMakeContext>;
  private _makeContextCount = 0;

  public constructor(name: string, requestSync: IRequestSync) {
    this._name = name;
    this._transport = new JsonRpcRequestSync(requestSync);
  }

  public createContext(params: any) {
    const mkid = this._name + ":" + this._makeContextCount++;
    const ctx = new RemoteMakeContext(this._transport);
    this._makeContexts.set(mkid, ctx);
    return mkid;
  }

  public destroyContext(params: any) {
    return this._makeContexts.delete(params.mkid);
  }

  private getContext(mkid: string) {
    const context = this._makeContexts.get(mkid);
    if (context)
      return context;
    throw new Error(`Not exists make context with id ${mkid}`);
  }

  public async execScript(params: any): Promise<void> {
    const ctx = this.getContext(params.mkid);
    const variableMap = ScopeHelper.fromJSON(params.scope);
    const mk = UserMakeContext.create(ctx, variableMap);
    await performContext(mk);
  }

  public mainTargets(params: any) {
    const ctx = this.getContext(params.mkid);
    const mainTargets = Array.from(ctx.targets.values());
    return SimpleObject.toJSON(mainTargets);
  }

  public postTargets(params: any) {
    const ctx = this.getContext(params.mkid);
    const postTargets = Array.from(ctx.postTargets.values());
    return SimpleObject.toJSON(postTargets);
  }

  public mainScripts(params: any) {
    const ctx = this.getContext(params.mkid);
    const mainScripts = Array.from(ctx.mainScripts.values());
    return SimpleObject.toJSON(mainScripts);
  }

  public postScripts(params: any) {
    const ctx = this.getContext(params.mkid);
    const postScripts = Array.from(ctx.postScripts.values());
    return SimpleObject.toJSON(postScripts);
  }

  public installEntries(params: any) {
    const ctx = this.getContext(params.mkid);
    const installEntries = ctx.installList;
    return SimpleObject.toJSON(installEntries);
  }
};
