/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { TargetName } from "@/core/TargetName";
import { AbsolutePath } from "@/core/AbsolutePath";
import { SimpleObject } from "@/core/SimpleObject";

export class InstallEntity {
  private _value: AbsolutePath | TargetName;
  private _destination: AbsolutePath;
  private _baseDir?: AbsolutePath;

  public constructor(value: AbsolutePath | TargetName, destination: AbsolutePath, baseDir?: AbsolutePath) {
    this._value = value;
    this._destination = destination;
    this._baseDir = baseDir;
  }

  public get VALUE () {
    return this._value;
  }

  public get DESTINATION () {
    return this._destination;
  }

  public get BASE_DIR () {
    return this._baseDir;
  }

  public toJSON(): SimpleObject {
    const json: SimpleObject = {
      type: InstallEntity.name,
      value: this._value,
      destination: this._destination,
    };
    if (this._baseDir)
      json.baseDir = this._baseDir;
    return json;
  }
};
