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
import { ObjectLibrary, StaticLibrary, SharedLibrary, Executable, BaseTarget, InterfaceTarget } from "@/core/Target";
import { CustomScript } from "@/core/CustomScript";
import { BaseContext } from "@/core/BaseContext";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

const VARIABLE_GROUP = "custom";

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
    });
  }

  public addCacheVariables(params: any) {
    return this[REQUEST].requestSync({
      method: "Configure.addCacheVariables",
      params,
    });
  }

  public addIncludeDirectories(...dirs: any[]) {
    return this[REQUEST].requestSync({
      method: "Configure.addCacheVariables",
      params: dirs,
    });
  }

  public addSubdirectory(sourceDir: any, binaryDir: any) {
    return this[REQUEST].requestSync({
      method: "Configure.addSubdirectory",
      params: {
        sourceDir,
        binaryDir,
      },
    });
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

  public executeScript(script: any, params: any) {
    return this[REQUEST].requestSync({
      method: "Configure.executeScript",
      params: {
        script,
        params,
      },
    });
  }
};
