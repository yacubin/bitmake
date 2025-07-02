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
import { CONFIGURE_ADDCACHEVARIABLES } from "@/worker/RemoteMethods";
import { IMakeContext } from "@/core/IMakeContext";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

const REQUEST = Symbol("REQUEST");
const REQUEST_ID = Symbol("REQUEST_ID");

export class RemoteMakeContext implements IMakeContext {
  [REQUEST]: IRequestSync;
  [REQUEST_ID]: number;

  public constructor(requestSync: IRequestSync) {
    this[REQUEST] = requestSync;
    this[REQUEST_ID] = 1;
  }

  public getCacheVariables() {
    return this[REQUEST].requestSync({
      method: "Configure.getCacheVariables",
      id: this[REQUEST_ID],
    }).result;
  }

  public addCacheVariables(...params: any): void {
    return this[REQUEST].requestSync({
      method: CONFIGURE_ADDCACHEVARIABLES,
      params,
      id: this[REQUEST_ID],
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
      id: this[REQUEST_ID],
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
      id: this[REQUEST_ID],
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
      id: this[REQUEST_ID],
    }).result;
  }

  public hasProperty(name: string): boolean {
    return this[REQUEST].requestSync({
      method: "Configure.hasProperty",
      params: {
        name,
      },
      id: this[REQUEST_ID],
    }).result;
  }

  public getPropertyNames(): string[] {
    return this[REQUEST].requestSync({
      method: "Configure.getPropertyNames",
      id: this[REQUEST_ID],
    }).result;
  }

  public deleteProperty(name: string): boolean {
    return this[REQUEST].requestSync({
      method: "Configure.deleteProperty",
      params: {
        name,
      },
      id: this[REQUEST_ID],
    }).result;
  }

  public static create(requestSync: IRequestSync): RemoteMakeContext {
    return createContext(new RemoteMakeContext(requestSync));
  }
};
