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
import { SourceFile } from "@/core/SourceFile";
import { SystemScope } from "@/core/SystemScope";
import { UnknownTarget } from "@/core/UnknownTarget";
import { ScopeHelper } from "@/core/Scope";

const UNKNOWN_TARGET = Symbol("UNKNOWN_TARGET");
const SCOPE = Symbol("SCOPE");

export class InterfaceTarget {
  private [SCOPE]: SystemScope;
  private [UNKNOWN_TARGET]: UnknownTarget;

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

  public addIncludes(...includes: any): void {
    this[UNKNOWN_TARGET].IMPL.addIncludes("indirectly", false, this[SCOPE].SOURCE_DIR, ...includes);
  }

  public addPublicIncludes(...includes: Array<InterfaceIncludes|AbsolutePath|string>): void {
    this[UNKNOWN_TARGET].IMPL.addIncludes("indirectly", true, this[SCOPE].SOURCE_DIR, ...includes);
  }

  public addDefinitions(...definitions: any): void {
    this[UNKNOWN_TARGET].IMPL.addDefinitions("indirectly", false, ...definitions);
  }

  public addPublicDefinitions(...definitions: any): void {
    this[UNKNOWN_TARGET].IMPL.addDefinitions("indirectly", true, ...definitions);
  }

  public addCompileOptions(...options: Array<string|string[]>): void {
    this[UNKNOWN_TARGET].IMPL.addCompileOptions("indirectly", false, ...options);
  }

  public addPublicCompileOptions(...options: string[]): void {
    this[UNKNOWN_TARGET].IMPL.addCompileOptions("indirectly", true, ...options);
  }

  public addLinkOptions(...options: Array<string|string[]>): void {
    this[UNKNOWN_TARGET].IMPL.addLinkOptions("indirectly", false, ...options);
  }

  public addPublicLinkOptions(...options: string[]): void {
    this[UNKNOWN_TARGET].IMPL.addLinkOptions("indirectly", true, ...options);
  }
};
