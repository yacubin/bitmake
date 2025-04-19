/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { CustomScript } from "@/core/CustomScript";

const ENTRIES = Symbol("ENTRIES");

export class ScriptCollection {
  private [ENTRIES]: { [name: string]: CustomScript };

  private constructor() {
    this[ENTRIES] = {};
  }

  public static create() {
    return Object.seal(new ScriptCollection);
  }

  public get ENTRIES() {
    return this[ENTRIES];
  }

  public get(name: string) {
    return this[ENTRIES][name];
  }

  public set(name: string, target: any) {
    if (this[ENTRIES][name])
      throw new Error(`Script "${name}" exists`);
    this[ENTRIES][name] = target;
  }
  
  public toJSON(): object {
    return this[ENTRIES];
  }
};
