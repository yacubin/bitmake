/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ScopeHelper } from "@/core/Scope";

const NAME      = Symbol("NAME");
const VARIABLES = Symbol("VARIABLES");

export class InterfaceScript {
  private [NAME]: string;
  private [VARIABLES]: any;

  private constructor(name: string) {
    this[NAME] = name;
    this[VARIABLES] = {};
  }

  public get NAME() {
    return this[NAME];
  }

  public get variables() {
    return this[VARIABLES];
  }

  public mergeVariables(variables: any) {
    ScopeHelper.mergeVariables(this[VARIABLES], variables);
  }

  public toJSON(): object {
    return {
      name: this[NAME],
      variableMap: this[VARIABLES],
    };
  }
  
  public toString(): string {
    return this[NAME];
  }

  public static create(name: string) {
    return Object.seal(new InterfaceScript(name));
  }

  public static ensureInstance(value: any) {
    if (value instanceof InterfaceScript)
      return value;
    throw new Error(`The '${value}' is not a InterfaceScript`);
  }
};
