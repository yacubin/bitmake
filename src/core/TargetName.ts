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

export class TargetName {
  private [NAME]: string;

  private constructor(name: string) {
    this[NAME] = name;
  }

  public static create(name: string) {
    return Object.seal(new TargetName(name));
  }

  public static fromJSON(object: SimpleObject) {
    return TargetName.create(object.targetName as string);
  }

  public get targetName(): string {
    return this[NAME];
  }

  public toString(): string {
    return "${" + this[NAME] + ".link}";
  }

  public toJSON(): SimpleObject {
    return {
      type: TargetName.name,
      targetName: this[NAME],
    }
  }
};
