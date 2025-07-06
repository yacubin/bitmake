/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceIncludes }from "@/core/InterfaceIncludes";
import { InterfaceTarget } from "@/core/Target";
import { TargetStruct } from "@/core/TargetStruct";
import { ALL_TARGET, INSTALL_TARGET } from "@/Constants";
import { BaseTarget } from "./Target";
import { AbsolutePath } from "./AbsolutePath";

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

  private __getAllIncludes(includes: string[], targetSet: Set<string>, list: Array<AbsolutePath | InterfaceIncludes> | Array<InterfaceTarget>) {
    for (const iter of list) {
      if (iter instanceof InterfaceIncludes || iter instanceof InterfaceTarget) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          this.__getAllIncludes(includes, targetSet, target.IMPL.getPublicIncludes());
          this.__getAllIncludes(includes, targetSet, target.IMPL.getPublicLibraries());
        }
      }
      else if (iter instanceof AbsolutePath) {
        if (!includes.includes(iter.toString()))
          includes.push(iter.toString());
      }
      else {
        throw new Error(`Not support instance ${iter}`);
      }
    }
  }

  public allIncludesOf(params: string | BaseTarget): string[] {
    const target = (typeof params === "string") ? this.get(params) : params;
    const includes: string[] = [];
    const targetSet = new Set([ target.IMPL.name ]);
    this.__getAllIncludes(includes, targetSet, target.IMPL.getIncludes());
    this.__getAllIncludes(includes, targetSet, target.IMPL.getLibraries());
    return includes;
  }

  private __getAllHeaders(headers: string[], targetSet: Set<string>, list: Array<AbsolutePath | InterfaceIncludes> | Array<InterfaceTarget>) {
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
          this.__getAllHeaders(headers, targetSet, target.IMPL.getPublicLibraries());
        }
      }
    }
  }

  public allHeadersOf(params: string | BaseTarget) {
    const target = (typeof params === "string") ? this.get(params) : params;
    const headers = target.IMPL.getHeaders().map((i: any) => i.FILE.toString());
    const targetSet = new Set([ target.IMPL.name ]);
    this.__getAllHeaders(headers, targetSet, target.IMPL.getIncludes());
    this.__getAllHeaders(headers, targetSet, target.IMPL.getLibraries());
    return headers;
  }

  private __getAllLibraries(libraries: string[], targetSet: Set<string>, list: Array<InterfaceTarget>) {
    for (const iter of list) {
      console.assert(iter instanceof InterfaceTarget);
      if (!targetSet.has(iter.targetName)) {
        targetSet.add(iter.targetName);
        const target = this.get(iter.targetName);
        libraries.push(target.FILE.toString());
        this.__getAllLibraries(libraries, targetSet, target.IMPL.getPublicLibraries());
      }
    }
  }

  public allLibrariesOf(params: string | BaseTarget) {
    const target = (typeof params === "string") ? this.get(params) : params;
    const libraries: string[] = [];
    const targetSet = new Set([ target.IMPL.name ]);
    this.__getAllLibraries(libraries, targetSet, target.IMPL.getLibraries());
    return libraries;
  }

  private __getAllDefinitions(definitions: string[], targetSet: Set<string>, list: Array<string> | Array<InterfaceTarget>) {
    for (const iter of list) {
      if (iter instanceof InterfaceTarget) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          this.__getAllDefinitions(definitions, targetSet, target.IMPL.getPublicDefinitions());
          this.__getAllDefinitions(definitions, targetSet, target.IMPL.getPublicLibraries());
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

  public allDefinitionsOf(params: string | BaseTarget) {
    const target = (typeof params === "string") ? this.get(params) : params;
    const definitions: string[] = [];
    const targetSet = new Set([ target.IMPL.name ]);
    this.__getAllDefinitions(definitions, targetSet, target.IMPL.getDefinitions());
    this.__getAllDefinitions(definitions, targetSet, target.IMPL.getPublicLibraries());
    return definitions;
  }

  private __getAllCompileOptions(options: Array<string|string[]>, targetSet: Set<string>, list: Array<string|string[]> | Array<InterfaceTarget>) {
    for (const iter of list) {
      if (iter instanceof InterfaceTarget) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          this.__getAllCompileOptions(options, targetSet, target.IMPL.getPublicCompileOptions());
          this.__getAllCompileOptions(options, targetSet, target.IMPL.getPublicLibraries());
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

  public allCompileOptionsOf(params: string | BaseTarget) {
    const target = (typeof params === "string") ? this.get(params) : params;
    const options: string[] = [];
    const targetSet = new Set([ target.IMPL.name ]);
    this.__getAllCompileOptions(options, targetSet, target.IMPL.getCompileOptions());
    this.__getAllCompileOptions(options, targetSet, target.IMPL.getPublicLibraries());
    return options.flat();
  }

  private __getLinkOptions(options: Array<string|string[]>, targetSet: Set<string>, list: Array<string|string[]> | Array<InterfaceTarget>) {
    for (const iter of list) {
      if (iter instanceof InterfaceTarget) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          this.__getLinkOptions(options, targetSet, target.IMPL.getPublicLinkOptions());
          this.__getLinkOptions(options, targetSet, target.IMPL.getPublicLibraries());
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

  public allLinkOptionsOf(params: string | BaseTarget) {
    const target = (typeof params === "string") ? this.get(params) : params;
    const options: string[] = [];
    const targetSet = new Set([ target.IMPL.name ]);
    this.__getLinkOptions(options, targetSet, target.IMPL.getLinkOptions());
    this.__getLinkOptions(options, targetSet, target.IMPL.getPublicLibraries());
    return options.flat();
  }
}
