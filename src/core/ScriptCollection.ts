/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { CustomScript } from "@/core/CustomScript";

const MAP = Symbol("MAP");
const ENTRIES = Symbol("ENTRIES");

export class ScriptCollection {
  private [MAP]: { [name: string]: CustomScript };
  private [ENTRIES]: CustomScript[];

  private constructor() {
    this[MAP] = {};
    this[ENTRIES] = [];
  }

  public static create() {
    return Object.seal(new ScriptCollection);
  }

  public get ENTRIES() {
    return this[ENTRIES];
  }

  public get(name: string): CustomScript | undefined {
    return this[MAP][name];
  }

  public set(name: string, target: CustomScript) {
    if (!name)
      throw new Error("Not supported empty name for CustomScript");
    if (this[MAP][name])
      throw new Error(`Script "${name}" exists`);
    this[MAP][name] = target;
    this[ENTRIES].push(target);
  }

  public add(target: CustomScript) {
    this[ENTRIES].push(target);
  }
  
  public toJSON(): object {
    return this[ENTRIES];
  }
};
