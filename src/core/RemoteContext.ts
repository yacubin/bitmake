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
import { BaseContext } from "@/core/BaseContext";
import { CONFIGURE_ADDCACHEVARIABLES } from "@/worker/RemoteMethods";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

const REQUEST = Symbol("REQUEST");

export class RemoteContext extends BaseContext {
  [REQUEST]: IRequestSync;

  public constructor(requestSync: IRequestSync) {
    super();
    this[REQUEST] = requestSync;
  }

  public getCacheVariables() {
    return this[REQUEST].requestSync({
      method: "Configure.getCacheVariables",
    }).result;
  }

  public addCacheVariables(params: any) {
    return this[REQUEST].requestSync({
      method: CONFIGURE_ADDCACHEVARIABLES,
      params,
    }).result;
  }

  public addIncludeDirectories(...dirs: any[]) {
    return this[REQUEST].requestSync({
      method: "Configure.addCacheVariables",
      params: dirs,
    }).result;
  }

  public addSubdirectory(sourceDir: any, binaryDir: any) {
    return this[REQUEST].requestSync({
      method: "Configure.addSubdirectory",
      params: {
        sourceDir,
        binaryDir,
      },
    }).result;
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

  public executeScript(script: any, options: any) {
    return this[REQUEST].requestSync({
      method: "Configure.executeScript",
      params: {
        script,
        options,
      },
    }).result;
  }

  public getProperty(name: string): any {
    return this[REQUEST].requestSync({
      method: "Configure.getProperty",
      params: {
        name,
      },
    }).result;
  }

  public setProperty(name: string, value: any): any {
    return this[REQUEST].requestSync({
      method: "Configure.setProperty",
      params: {
        name,
        value,
      },
    }).result;
  }

  public hasProperty(name: string): boolean {
    return this[REQUEST].requestSync({
      method: "Configure.hasProperty",
      params: {
        name,
      },
    }).result;
  }

  public getPropertyNames(): string[] {
    return this[REQUEST].requestSync({
      method: "Configure.getPropertyNames",
    }).result;
  }

  public deleteProperty(name: string): boolean {
    return this[REQUEST].requestSync({
      method: "Configure.deleteProperty",
      params: {
        name,
      },
    }).result;
  }

  public static create(requestSync: IRequestSync): RemoteContext {
    const ctx = new RemoteContext(requestSync);
    const handler: ProxyHandler<RemoteContext> = {
      get(target: RemoteContext, name: string, receiver: any) {
        if (name in target)
          return (target as any)[name];
        return target.getProperty(name);
      },
      set(target: RemoteContext, name: string, value: any): boolean {
        target.setProperty(name, value);
        return true;
      },
      has(target: RemoteContext, name: string) {
        return name in target || target.hasProperty(name);
      },
      ownKeys(target: RemoteContext) {
        return target.getPropertyNames();
      },
      deleteProperty(target: RemoteContext, name: string) {
        return target.deleteProperty(name);
      },
    };
    return new Proxy(ctx, handler);
  }
};
