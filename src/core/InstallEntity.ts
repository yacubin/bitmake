/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { TargetName } from "@/core/TargetName";
import { FilePath, Locator } from "@/utils/Locator";
import { SimpleObject } from "@/core/SimpleObject";

export class InstallEntity {
  private _value: FilePath | TargetName;
  private _destination: Locator;
  private _baseDir?: Locator;

  public constructor(value: FilePath | TargetName, destination: Locator, baseDir?: Locator) {
    this._value = value;
    this._destination = destination;
    this._baseDir = baseDir;
  }

  public static create(value: FilePath | TargetName, destination: Locator, baseDir?: Locator) {
    return new InstallEntity(value, destination, baseDir);
  }

  public get value () {
    return this._value;
  }

  public get destination () {
    return this._destination;
  }

  public get baseDir () {
    return this._baseDir;
  }

  public static fromJSON(json: any) {
    const value = SimpleObject.fromJSON(json.value);
    const destination = Locator.create(json.destination);
    const baseDir = json.baseDir ? Locator.create(json.baseDir) : undefined;
    return new InstallEntity(value, destination, baseDir);
  }

  public toJSON(): SimpleObject {
    const result: SimpleObject = {
      type: InstallEntity.name,
      value: this._value.toJSON(),
      destination: this._destination.toURLString(),
    };
    if (this._baseDir)
      result.baseDir = this._baseDir.toURLString();
    return result;
  }
};
