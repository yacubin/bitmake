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

export class TargetObjects {
  private [NAME]: string;

  private constructor(name: string) {
    this[NAME] = name;
  }

  public static create(name: string) {
    return Object.seal(new TargetObjects(name));
  }

  public static fromJSON(object: SimpleObject) {
    return TargetObjects.create(object.targetName as string);
  }

  public static ensureInstance(value: any): TargetObjects {
    if (value instanceof TargetObjects)
      return value;
    throw new Error(`The '${value}' is not a TargetObjects`);
  }

  public get targetName(): string {
    return this[NAME];
  }

  public toString(): string {
    return "${" + this[NAME] + ".objects}";
  }

  public toJSON(): SimpleObject {
    return {
      type: TargetObjects.name,
      targetName: this[NAME],
    }
  }
};

SimpleObject.registerInstanceCreator(TargetObjects.name, TargetObjects.fromJSON);
