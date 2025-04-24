/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { AbsolutePath } from "@/core/Path";
import { InterfaceIncludes } from "@/core/InterfaceIncludes";
import { InterfaceObjects } from "@/core/InterfaceObjects";
import { IncludeDirectory } from "@/core/IncludeDirectory";
import { SourceFile } from "@/core/SourceFile";
import { ScopeHelper } from "@/core/Scope";

const UNKNOWN_TARGET = Symbol("UNKNOWN_TARGET");
const SCOPE = Symbol("SCOPE");

export class InterfaceTarget {
  private [SCOPE]: any;
  private [UNKNOWN_TARGET]: any;

  private constructor(scope: any, utarget: any) {
    this[SCOPE] = ScopeHelper.clone({}, scope);
    this[UNKNOWN_TARGET] = utarget;
  }

  public static create(scope: any, utarget: any) {
    return Object.seal(new InterfaceTarget(scope, utarget));
  }

  public static ensureInstance(value: any) {
    if (value instanceof InterfaceTarget)
      return value;
    throw new Error(`The '${value}' is not a InterfaceTarget`);
  }

  public get targetName(): string {
    return this[UNKNOWN_TARGET].NAME;
  }

  public get includes(): InterfaceIncludes {
    return InterfaceIncludes.create(this.targetName);
  }

  public get objects(): InterfaceObjects {
    return InterfaceObjects.create(this.targetName);
  }

  public toJSON(): string {
    return this.toString();
  }

  public toString(): string {
    return "${" + this.targetName + "}";
  }

  public addSources(...sources: Array<InterfaceObjects|SourceFile|AbsolutePath|string>): void {
    for (let it of sources.flat(1)) {
      if (it instanceof InterfaceObjects || it instanceof SourceFile)
        {}
      else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
        it = SourceFile.create(this[SCOPE], it);
      else
        throw new Error(`Not support instance ${it}`);
      this[UNKNOWN_TARGET].SOURCES.push(it);
    }
  }

  public addIncludes(...includes: Array<InterfaceIncludes|AbsolutePath|string>): void {
    for (const it of includes.flat(1)) {
      let VALUE;
      if (it instanceof InterfaceIncludes)
        VALUE = it;
      else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
        VALUE = IncludeDirectory.create(it, this[SCOPE].SOURCE_DIR);
      else
        throw new Error(`Not support instance ${it}`);
      this[UNKNOWN_TARGET].INCLUDES.push({ VALUE, PUBLIC_ONLY: false });
    }
  }

  public addPublicIncludes(...includes: Array<InterfaceIncludes|AbsolutePath|string>): void {
    for (const it of includes.flat(1)) {
      let VALUE;
      if (it instanceof InterfaceIncludes)
        VALUE = it;
      else if (typeof it === "string" || AbsolutePath.isAbsolute(it))
        VALUE = IncludeDirectory.create(it, this[SCOPE].SOURCE_DIR);
      else
        throw new Error(`Not support instance ${it}`);
      this[UNKNOWN_TARGET].INCLUDES.push({ VALUE, PUBLIC_ONLY: true });
    }
  }

  public addDefinitions(...definitions: string[]): void {
    for (const VALUE of definitions.flat(1))
      this[UNKNOWN_TARGET].DEFINES.push({ VALUE });
  }

  public addPublicDefinitions(...definitions: string[]): void {
    for (const VALUE of definitions.flat(1))
      this[UNKNOWN_TARGET].DEFINES.push({ VALUE, PUBLIC_ONLY: true });
  }

  public addCompileOptions(...options: string[]): void {
    for (const it of options.flat(1)) {
      this[UNKNOWN_TARGET].COMPILE_OPTIONS.push({ VALUE: it });
    }
  }

  public addLinkOptions(...options: string[]): void {
    for (const it of options.flat(1)) {
      this[UNKNOWN_TARGET].LINK_OPTIONS.push({ VALUE: it });
    }
  }

  public addPublicCompileOptions(...options: string[]): void {
    for (const it of options.flat(1)) {
      this[UNKNOWN_TARGET].COMPILE_OPTIONS.push({ VALUE: it, PUBLIC_ONLY: true });
    }
  }

  public addPublicLinkOptions(...options: string[]): void {
    for (const it of options.flat(1)) {
      this[UNKNOWN_TARGET].LINK_OPTIONS.push({ VALUE: it, PUBLIC_ONLY: true });
    }
  }
};
