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

export class UnknownTarget {
  private [IMPL]: TargetStruct;

  private constructor(impl: TargetStruct) {
    this[IMPL] = impl;
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

  public get IMPL(): TargetStruct {
    return this[IMPL];
  }

  public toJSON(): object {
    return {
      NAME: this.NAME,
    };
  }

  public toString(): string {
    return "${" + this[IMPL].name + "}";
  }
};
