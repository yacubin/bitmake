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

export class TargetFile {
  private [NAME]: string;

  private constructor(targetName: string) {
    this[NAME] = targetName;
  }

  public static create(name: string) {
    return Object.seal(new TargetFile(name));
  }

  public static fromJSON(object: SimpleObject) {
    return TargetFile.create(object.targetName as string);
  }

  public get targetName(): string {
    return this[NAME];
  }

  public toString(): string {
    return "${" + this[NAME] + ".file}";
  }

  public toJSON(): SimpleObject {
    return {
      type: TargetFile.name,
      targetName: this[NAME],
    }
  }
};
