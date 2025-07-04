/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IRequestSync } from "@/transport/Common";
import { InterfaceScript } from "@/core/InterfaceScript";
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, InterfaceTarget } from "@/core/Target";
import { CustomScript } from "@/core/CustomScript";
import { createContext } from "@/core/BaseContext";
import { IMakeContext } from "@/core/IMakeContext";
import { JSONRPC_VERSION } from "@/transport/Common";
import { CONFIGURE_ADDCACHEVARIABLES } from "@/worker/RemoteMethods";
import { CONFIGURE_GETPROPERTY } from "@/worker/RemoteMethods";
import { CONFIGURE_SETPROPERTY } from "@/worker/RemoteMethods";
import { createLogger } from "@/logger";
import { FILE_SCHEME } from "@/utils/UrlScheme";
import { AbsolutePath } from "@/core/Path";

const logger = createLogger(import.meta.url);

const REQUEST = Symbol("REQUEST");

class JsonRpcRequest {
  private _request: IRequestSync;
  private _id: number;

  public constructor(requestSync: IRequestSync) {
    this._request = requestSync;
    this._id = 1;
  }

  public requestSync(method: string, params: any): any {
    const message = {
      jsonrpc: JSONRPC_VERSION,
      method,
      params,
      id: this._id++,
    };
    const response = this._request.requestSync(message);
    return response.result;
  }
}

export class RemoteMakeContext implements IMakeContext {
  [REQUEST]: JsonRpcRequest;

  public constructor(requestSync: IRequestSync) {
    this[REQUEST] = new JsonRpcRequest(requestSync);
  }

  public getCacheVariables(...params: any): any {
    return this[REQUEST].requestSync("Configure.getCacheVariables", params);
  }

  public addCacheVariables(...params: any): any {
    return this[REQUEST].requestSync(CONFIGURE_ADDCACHEVARIABLES, params);
  }

  public addIncludeDirectories(...params: any): any {
    return this[REQUEST].requestSync("Configure.addCacheVariables", params);
  }

  public addSubdirectory(...params: any): any {
    return this[REQUEST].requestSync("Configure.addSubdirectory", params);
  }

  public addCustomScript(script: any, params: any): CustomScript {
    throw new Error("Not Implemented");
  }

  public script(name: string): InterfaceScript {
    throw new Error("Not Implemented");
  }

  public install(value: any, params: any): void {
    throw new Error("Not Implemented");
  }

  public addStaticLibrary(name: any, ...sources: any[]): StaticLibrary {
    throw new Error("Not Implemented");
  }

  public addObjectLibrary(name: any, ...sources: any[]): ObjectLibrary {
    throw new Error("Not Implemented");
  }

  public addSharedLibrary(name: any, ...sources: any[]): SharedLibrary {
    throw new Error("Not Implemented");
  }

  public addExecutable(name: string, ...sources: any[]): Executable {
    throw new Error("Not Implemented");
  }

  public target(name: string): InterfaceTarget {
    throw new Error("Not Implemented");
  }

  public executeScript(...params: any): any {
    return this[REQUEST].requestSync("Configure.executeScript", params);
  }

  public getProperty(...params: any): any {
    const value = this[REQUEST].requestSync(CONFIGURE_GETPROPERTY, params);
    if (typeof value === "string" && value.startsWith(FILE_SCHEME))
      return AbsolutePath.create(value);
    return value;
  }

  public setProperty(...params: any): any {
    return this[REQUEST].requestSync(CONFIGURE_SETPROPERTY, params);
  }

  public hasProperty(...params: any): any {
    return this[REQUEST].requestSync("Configure.hasProperty", params);
  }

  public getPropertyNames(...params: any): any {
    return this[REQUEST].requestSync("Configure.getPropertyNames", params);
  }

  public deleteProperty(...params: any): any {
    return this[REQUEST].requestSync("Configure.deleteProperty", params);
  }

  public static create(requestSync: IRequestSync): RemoteMakeContext {
    return createContext(new RemoteMakeContext(requestSync));
  }
};
