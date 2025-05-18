/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceIncludes }from "@/core/InterfaceIncludes";
import { InterfaceTarget } from "@/core/InterfaceTarget";
import { TargetStruct } from "@/core/TargetStruct";
import { ALL_TARGET, INSTALL_TARGET } from "@/Constants";
import { BaseTarget } from "./Target";
import { DirPath } from "./Path";

const ENTRIES = Symbol("ENTRIES");

export class TargetStructCollection {
  private [ENTRIES] = new Map<string, TargetStruct>;

  constructor() {
  }

  get(name: string): TargetStruct {
    if (typeof name !== "string")
      throw new Error(`Target "${name}" is not string type`);
    if ([ ALL_TARGET, INSTALL_TARGET ].includes(name))
      throw new Error(`Target "${name}" is reserved name`);
    let result: TargetStruct | undefined = this[ENTRIES].get(name);
    if (!result) {
      result = new TargetStruct(name);
      this[ENTRIES].set(name, result);
    }
    return result;
  }

  public toJSON(): object {
    const result: any = {};
    this[ENTRIES].forEach((v, k) => void (result[k] = v));
    return result;
  }
};

function getLibraries(target: any) {
  return target.LIBRARIES.map((i: any) => i.VALUE);
}

function getPublicLibraries(target: any) {
  return target.LIBRARIES.filter((i: any) => i.PUBLIC_ONLY).map((i: any) => i.VALUE);
}

export class TargetCollection {
  private [ENTRIES]: { [name: string]: BaseTarget };

  private constructor() {
    this[ENTRIES] = {};
  }

  public static create() {
    return Object.seal(new TargetCollection);
  }
  
  public get ENTRIES() {
    return this[ENTRIES];
  }

  public toJSON(): object {
    return this[ENTRIES];
  }

  public get(name: string): BaseTarget {
    return this[ENTRIES][name];
  }

  public set(name: string, target: any) {
    if (this[ENTRIES][name])
      throw new Error(`Target "${name}" exists`);
    this[ENTRIES][name] = target;
  }

  private __getAllIncludes(includes: string[], targetSet: Set<string>, list: any) {
    for (const iter of list) {
      if (iter instanceof InterfaceIncludes || iter instanceof InterfaceTarget) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          this.__getAllIncludes(includes, targetSet, target.IMPL.getPublicIncludes());
          this.__getAllIncludes(includes, targetSet, getPublicLibraries(target));
        }
      }
      else if (iter instanceof DirPath) {
        if (!includes.includes(iter.toString()))
          includes.push(iter.toString());
      }
      else {
        throw new Error(`Not support instance ${iter}`);
      }
    }
  }

  public allIncludesOf(params: any): string[] {
    const target = ((typeof params === "string") ? this.get(params) : params) as BaseTarget;
    const includes: string[] = [];
    const targetSet = new Set([ target.NAME ]);
    this.__getAllIncludes(includes, targetSet, target.IMPL.getIncludes());
    this.__getAllIncludes(includes, targetSet, getLibraries(target));
    return includes;
  }

  private __getAllHeaders(headers: string[], targetSet: Set<string>, list: any) {
    for (const iter of list) {
      if (iter instanceof InterfaceIncludes || iter instanceof InterfaceTarget) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          for (const header of target.IMPL.getHeaders().map((i: any) => i.FILE.toString())) {
            if (!headers.includes(header.toString()))
              headers.push(header.toString());
          }
          this.__getAllHeaders(headers, targetSet, target.IMPL.getPublicIncludes());
          this.__getAllHeaders(headers, targetSet, getPublicLibraries(target));
        }
      }
    }
  }

  public allHeadersOf(params: any) {
    const target = ((typeof params === "string") ? this.get(params) : params) as BaseTarget;
    const headers = target.IMPL.getHeaders().map((i: any) => i.FILE.toString());
    const targetSet = new Set([ target.NAME ]);
    this.__getAllHeaders(headers, targetSet, target.IMPL.getIncludes());
    this.__getAllHeaders(headers, targetSet, getLibraries(target));
    return headers;
  }

  private __getAllLibraries(libraries: string[], targetSet: Set<string>, list: any) {
    for (const iter of list) {
      console.assert(iter instanceof InterfaceTarget);
      if (!targetSet.has(iter.targetName)) {
        targetSet.add(iter.targetName);
        const target = this.get(iter.targetName);
        libraries.push(target.FILE.toString());
        this.__getAllLibraries(libraries, targetSet, getPublicLibraries(target));
      }
    }
  }

  public allLibrariesOf(params: any) {
    const target = (typeof params === "string") ? this.get(params) : params;
    const libraries: string[] = [];
    const targetSet = new Set([ target.NAME ]);
    this.__getAllLibraries(libraries, targetSet, getLibraries(target));
    return libraries;
  }

  private __getAllDefinitions(definitions: string[], targetSet: Set<string>, list: any) {
    for (const iter of list) {
      if (iter instanceof InterfaceTarget) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          this.__getAllDefinitions(definitions, targetSet, target.IMPL.getPublicDefinitions());
          this.__getAllDefinitions(definitions, targetSet, getPublicLibraries(target));
        }
      }
      else if (typeof iter === "string") {
        if (!definitions.includes(iter))
          definitions.push(iter);
      }
      else {
        throw new Error(`Not support instance ${iter}`);
      }
    }
  }

  public allDefinitionsOf(params: any) {
    const target = ((typeof params === "string") ? this.get(params) : params) as BaseTarget;
    const definitions: string[] = [];
    const targetSet = new Set([ target.NAME ]);
    this.__getAllDefinitions(definitions, targetSet, target.IMPL.getDefinitions());
    this.__getAllDefinitions(definitions, targetSet, getPublicLibraries(target));
    return definitions;
  }

  private __getAllCompileOptions(options: Array<string|string[]>, targetSet: Set<string>, list: any) {
    for (const iter of list) {
      if (iter instanceof InterfaceTarget) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          this.__getAllCompileOptions(options, targetSet, target.IMPL.getPublicCompileOptions());
          this.__getAllCompileOptions(options, targetSet, getPublicLibraries(target));
        }
      }
      else if (typeof iter === "string") {
        if (!options.includes(iter))
          options.push(iter);
      }
      else if (Array.isArray(iter)) {
        // TODO: Add compare for same array in options
        options.push(iter);
      }
      else {
        throw new Error(`Not support instance ${iter}`);
      }
    }
  }

  public allCompileOptionsOf(params: any) {
    const target = ((typeof params === "string") ? this.get(params) : params) as BaseTarget;
    const options: string[] = [];
    const targetSet = new Set([ target.NAME ]);
    this.__getAllCompileOptions(options, targetSet, target.IMPL.getCompileOptions());
    this.__getAllCompileOptions(options, targetSet, getPublicLibraries(target));
    return options.flat();
  }

  private __getLinkOptions(options: Array<string|string[]>, targetSet: Set<string>, list: any) {
    for (const iter of list) {
      if (iter instanceof InterfaceTarget) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          this.__getLinkOptions(options, targetSet, target.IMPL.getPublicLinkOptions());
          this.__getLinkOptions(options, targetSet, getPublicLibraries(target));
        }
      }
      else if (typeof iter === "string") {
        if (!options.includes(iter))
          options.push(iter);
      }
      else if (Array.isArray(iter)) {
        // TODO: Add compare for same array in options
        options.push(iter);
      }
      else {
        throw new Error(`Not support instance ${iter}`);
      }
    }
  }

  public allLinkOptionsOf(params: any) {
    const target = ((typeof params === "string") ? this.get(params) : params) as BaseTarget;
    const options: string[] = [];
    const targetSet = new Set([ target.NAME ]);
    this.__getLinkOptions(options, targetSet, target.IMPL.getLinkOptions());
    this.__getLinkOptions(options, targetSet, getPublicLibraries(target));
    return options.flat();
  }
}
