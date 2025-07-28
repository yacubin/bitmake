/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { TargetIncludes }from "@/core/TargetIncludes";
import { TargetName }from "@/core/TargetName";
import { MainTarget } from "@/core/Target";
import { Locator } from "@/utils/Locator";
import { SimpleObject } from "@/core/SimpleObject";

const ENTRIES = Symbol("ENTRIES");

export class TargetCollection {
  private [ENTRIES] = new Map<string, MainTarget>;

  public static create() {
    return Object.seal(new TargetCollection);
  }
  
  public get ENTRIES() {
    return this[ENTRIES];
  }

  public toJSON(): SimpleObject {
    const result: SimpleObject = { type: TargetCollection.name };
    this[ENTRIES].forEach((v, k) => void (result[k] = v));
    return result;
  }

  public get(name: string): MainTarget {
    const result = this[ENTRIES].get(name);
    if (!result)
      throw `Target "${name}" does not exist`;
    return result;
  }

  public set(name: string, target: any) {
    if (this[ENTRIES].has(name))
      throw new Error(`Target "${name}" exists`);
    this[ENTRIES].set(name, target);
  }

  private __getAllIncludes(includes: string[], targetSet: Set<string>, list: Array<Locator | TargetIncludes> | Array<TargetName>) {
    for (const iter of list) {
      if (iter instanceof TargetIncludes || iter instanceof TargetName) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          this.__getAllIncludes(includes, targetSet, target.getPublicIncludes());
          this.__getAllIncludes(includes, targetSet, target.getPublicLibraries());
        }
      }
      else if (iter instanceof Locator) {
        if (!includes.includes(iter.toString()))
          includes.push(iter.toString());
      }
      else {
        throw new Error(`Not support instance ${iter}`);
      }
    }
  }

  public allIncludesOf(params: string | MainTarget): string[] {
    const target = (typeof params === "string") ? this.get(params) : params;
    const includes: string[] = [];
    const targetSet = new Set([ target.targetName ]);
    this.__getAllIncludes(includes, targetSet, target.getIncludes());
    this.__getAllIncludes(includes, targetSet, target.getLibraries());
    return includes;
  }

  private __getAllHeaders(headers: string[], targetSet: Set<string>, list: Array<Locator | TargetIncludes> | Array<TargetName>) {
    for (const iter of list) {
      if (iter instanceof TargetIncludes || iter instanceof TargetName) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          for (const header of target.getHeaders().map((i: any) => i.FILE.toString())) {
            if (!headers.includes(header.toString()))
              headers.push(header.toString());
          }
          this.__getAllHeaders(headers, targetSet, target.getPublicIncludes());
          this.__getAllHeaders(headers, targetSet, target.getPublicLibraries());
        }
      }
    }
  }

  public allHeadersOf(params: string | MainTarget) {
    const target = (typeof params === "string") ? this.get(params) : params;
    const headers = target.getHeaders().map((i: any) => i.FILE.toString());
    const targetSet = new Set([ target.targetName ]);
    this.__getAllHeaders(headers, targetSet, target.getIncludes());
    this.__getAllHeaders(headers, targetSet, target.getLibraries());
    return headers;
  }

  private __getAllLibraries(libraries: string[], targetSet: Set<string>, list: Array<TargetName>) {
    for (const iter of list) {
      console.assert(iter instanceof TargetName);
      if (!targetSet.has(iter.targetName)) {
        targetSet.add(iter.targetName);
        const target = this.get(iter.targetName);
        libraries.push(target.getFile().toString());
        this.__getAllLibraries(libraries, targetSet, target.getPublicLibraries());
      }
    }
  }

  public allLibrariesOf(params: string | MainTarget) {
    const target = (typeof params === "string") ? this.get(params) : params;
    const libraries: string[] = [];
    const targetSet = new Set([ target.targetName ]);
    this.__getAllLibraries(libraries, targetSet, target.getLibraries());
    return libraries;
  }

  private __getAllDefinitions(definitions: string[], targetSet: Set<string>, list: Array<string> | Array<TargetName>) {
    for (const iter of list) {
      if (iter instanceof TargetName) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          this.__getAllDefinitions(definitions, targetSet, target.getPublicDefinitions());
          this.__getAllDefinitions(definitions, targetSet, target.getPublicLibraries());
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

  public allDefinitionsOf(params: string | MainTarget) {
    const target = (typeof params === "string") ? this.get(params) : params;
    const definitions: string[] = [];
    const targetSet = new Set([ target.targetName ]);
    this.__getAllDefinitions(definitions, targetSet, target.getDefinitions());
    this.__getAllDefinitions(definitions, targetSet, target.getPublicLibraries());
    return definitions;
  }

  private __getAllCompileOptions(options: Array<string|string[]>, targetSet: Set<string>, list: Array<string|string[]> | Array<TargetName>) {
    for (const iter of list) {
      if (iter instanceof TargetName) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          this.__getAllCompileOptions(options, targetSet, target.getPublicCompileOptions());
          this.__getAllCompileOptions(options, targetSet, target.getPublicLibraries());
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

  public allCompileOptionsOf(params: string | MainTarget) {
    const target = (typeof params === "string") ? this.get(params) : params;
    const options: string[] = [];
    const targetSet = new Set([ target.targetName ]);
    this.__getAllCompileOptions(options, targetSet, target.getCompileOptions());
    this.__getAllCompileOptions(options, targetSet, target.getPublicLibraries());
    return options.flat();
  }

  private __getLinkOptions(options: Array<string|string[]>, targetSet: Set<string>, list: Array<string|string[]> | Array<TargetName>) {
    for (const iter of list) {
      if (iter instanceof TargetName) {
        if (!targetSet.has(iter.targetName)) {
          targetSet.add(iter.targetName);
          const target = this.get(iter.targetName);
          this.__getLinkOptions(options, targetSet, target.getPublicLinkOptions());
          this.__getLinkOptions(options, targetSet, target.getPublicLibraries());
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

  public allLinkOptionsOf(params: string | MainTarget) {
    const target = (typeof params === "string") ? this.get(params) : params;
    const options: string[] = [];
    const targetSet = new Set([ target.targetName ]);
    this.__getLinkOptions(options, targetSet, target.getLinkOptions());
    this.__getLinkOptions(options, targetSet, target.getPublicLibraries());
    return options.flat();
  }
}
