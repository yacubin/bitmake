/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { TargetStruct } from "@/core/TargetStruct";

const IMPL = Symbol("NAME");
const INCLUDES = Symbol("INCLUDES");
const SOURCES = Symbol("SOURCES");
const DEFINES = Symbol("DEFINES");
const LINK_OPTIONS = Symbol("LINK_OPTIONS");

export class UnknownTarget {
  private [IMPL]: TargetStruct;
  private [INCLUDES]: any[];
  private [SOURCES]: any[];
  private [DEFINES]: any[];
  private [LINK_OPTIONS]: any[];

  private constructor(impl: TargetStruct) {
    this[IMPL] = impl;
    this[INCLUDES] = [];
    this[SOURCES] = [];
    this[DEFINES] = [];
    this[LINK_OPTIONS] = [];
  }

  public static create(impl: TargetStruct) {
    return Object.seal(new UnknownTarget(impl));
  }

  public static ensureInstance(value: any) {
    if (value instanceof UnknownTarget)
      return value;
    throw new TypeError(`The "${value}" is not a UnknownTarget`);
  }

  public get NAME () {
    return this[IMPL].name;
  }

  public get INCLUDES () {
    return this[INCLUDES];
  }

  public get SOURCES () {
    return this[SOURCES];
  }

  public get DEFINES () {
    return this[DEFINES];
  }

  public get LINK_OPTIONS () {
    return this[LINK_OPTIONS];
  }
  
  public get IMPL(): TargetStruct {
    return this[IMPL];
  }

  public toJSON(): object {
    return {
      NAME: this.NAME,
      INCLUDES: this.INCLUDES,
      SOURCES: this.SOURCES,
      DEFINES: this.DEFINES,
      LINK_OPTIONS: this.LINK_OPTIONS,
    };
  }

  public toString(): string {
    return "${" + this[IMPL].name + "}";
  }
};
