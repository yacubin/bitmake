/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { SimpleObject } from "@/core/SimpleObject";

const NAME = Symbol("NAME");

export class TargetIncludes {
  private [NAME]: string;

  private constructor(name: string) {
    this[NAME] = name;
  }

  public static create(name: string) {
    return Object.seal(new TargetIncludes(name));
  }

  public static fromJSON(object: SimpleObject) {
    return TargetIncludes.create(object.targetName as string);
  }

  public get targetName(): string {
    return this[NAME];
  }

  public toString(): string {
    return "${" + this[NAME] + ".includes}";
  }

  public toJSON(): SimpleObject {
    return {
      type: TargetIncludes.name,
      targetName: this[NAME],
    }
  }

  public static ensureInstance(value: any) {
    if (value instanceof TargetIncludes)
      return value;
    throw new Error(`The '${value}' is not a TargetIncludes`);
  }
};
