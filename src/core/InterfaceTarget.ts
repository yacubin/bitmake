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
import { TargetStruct } from "@/core/TargetStruct";
import { ScopeHelper } from "@/core/Scope";

const IMPL = Symbol("IMPL");
const SCOPE = Symbol("SCOPE");

export class InterfaceTarget {
  private [SCOPE]: SystemScope;
  private [IMPL]: TargetStruct;

  private constructor(scope: SystemScope, impl: TargetStruct) {
    this[SCOPE] = ScopeHelper.clone({}, scope);
    this[IMPL] = impl;
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
    return this[IMPL].name;
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
        this[IMPL].addSource("indirectly", false, it);
    }
  }

  public addIncludes(...includes: any): void {
    this[IMPL].addIncludes("indirectly", false, this[SCOPE].SOURCE_DIR, ...includes);
  }

  public addPublicIncludes(...includes: Array<InterfaceIncludes|AbsolutePath|string>): void {
    this[IMPL].addIncludes("indirectly", true, this[SCOPE].SOURCE_DIR, ...includes);
  }

  public addDefinitions(...definitions: any): void {
    this[IMPL].addDefinitions("indirectly", false, ...definitions);
  }

  public addPublicDefinitions(...definitions: any): void {
    this[IMPL].addDefinitions("indirectly", true, ...definitions);
  }

  public addCompileOptions(...options: Array<string|string[]>): void {
    this[IMPL].addCompileOptions("indirectly", false, ...options);
  }

  public addPublicCompileOptions(...options: string[]): void {
    this[IMPL].addCompileOptions("indirectly", true, ...options);
  }

  public addLinkOptions(...options: Array<string|string[]>): void {
    this[IMPL].addLinkOptions("indirectly", false, ...options);
  }

  public addPublicLinkOptions(...options: string[]): void {
    this[IMPL].addLinkOptions("indirectly", true, ...options);
  }
};
