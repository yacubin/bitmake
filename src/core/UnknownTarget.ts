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
const SOURCES = Symbol("SOURCES");

export class UnknownTarget {
  private [IMPL]: TargetStruct;
  private [SOURCES]: any[];

  private constructor(impl: TargetStruct) {
    this[IMPL] = impl;
    this[SOURCES] = [];
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

  public get SOURCES () {
    return this[SOURCES];
  }

  public get IMPL(): TargetStruct {
    return this[IMPL];
  }

  public toJSON(): object {
    return {
      NAME: this.NAME,
      SOURCES: this.SOURCES,
    };
  }

  public toString(): string {
    return "${" + this[IMPL].name + "}";
  }
};
