/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceTarget } from "@/core/Target";
import { AbsolutePath } from "@/core/AbsolutePath";
import { SystemScope } from "@/core/SystemScope";

const VALUE       = Symbol("VALUE");
const DESTINATION = Symbol("DESTINATION");
const BASE_DIR    = Symbol("BASE_DIR");

export class InstallEntity {
  private [VALUE]: AbsolutePath | InterfaceTarget;
  private [DESTINATION]: AbsolutePath;
  private [BASE_DIR]: AbsolutePath | null;

  private constructor(scope: SystemScope, value: string | AbsolutePath | InterfaceTarget, params: string | any) {
    let destination: string | AbsolutePath | undefined;
    let baseDir;
    if (typeof params === "string")
      destination = params;
    else if (params) {
      destination = params.destination;
      baseDir = params.baseDir;
    }
  
    if (!destination)
      throw new Error(`Parameter destination is not specified`);
  
    if (baseDir)
      baseDir = scope.SOURCE_DIR.resolve(baseDir);
  
    if (typeof value === "string" || value instanceof AbsolutePath) {
      value = scope.SOURCE_DIR.resolve(value.toString()) as AbsolutePath;
      value = AbsolutePath.create(value);
      baseDir = baseDir || value.dirname();
    }
    else if (!(value instanceof InterfaceTarget)) {
      throw new Error(`Not supportet value of ${value}`);
    }
  
    this[VALUE] = value;
    this[DESTINATION] = AbsolutePath.create(scope.INSTALL_PREFIX.resolve(destination.toString()).toString());
    this[BASE_DIR] = baseDir ? AbsolutePath.create(baseDir.toString()) : null;
  }
  
  public static create(scope: any, value: string | AbsolutePath | InterfaceTarget, params: string | any) {
    return Object.seal(new InstallEntity(scope, value, params));
  }

  public get VALUE () {
    return this[VALUE];
  }

  public get DESTINATION () {
    return this[DESTINATION];
  }

  public get BASE_DIR () {
    return this[BASE_DIR];
  }

  public toJSON(): object {
    return {
      VALUE: this.VALUE,
      DESTINATION: this.DESTINATION,
      BASE_DIR: this.BASE_DIR,
    };
  }
};
