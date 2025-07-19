/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { TargetName } from "@/core/TargetName";
import { FilePath, AbsolutePath } from "@/core/AbsolutePath";
import { SimpleObject } from "@/core/SimpleObject";

export class InstallEntity {
  private _value: FilePath | TargetName;
  private _destination: AbsolutePath;
  private _baseDir?: AbsolutePath;

  public constructor(value: FilePath | TargetName, destination: AbsolutePath, baseDir?: AbsolutePath) {
    this._value = value;
    this._destination = destination;
    this._baseDir = baseDir;
  }

  public static create(value: FilePath | TargetName, destination: AbsolutePath, baseDir?: AbsolutePath) {
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
    const destination = AbsolutePath.create(json.destination);
    const baseDir = json.baseDir ? AbsolutePath.create(json.baseDir) : undefined;
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
