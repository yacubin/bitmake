/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ensureString } from "@/utils/StrictType";
import { AbsolutePath } from "@/core/Path";

const TARGET_SCOPE = Symbol("TARGET_SCOPE");
const NAME         = Symbol("NAME");
const SCRIPT       = Symbol("SCRIPT");
const INPUT        = Symbol("INPUT");
const OUTPUT       = Symbol("OUTPUT");
const PARAMS       = Symbol("PARAMS");
const PROPERTIES   = Symbol("PROPERTIES");

export class CustomScript {
  private [TARGET_SCOPE]: any;
  private [NAME]: string;
  private [SCRIPT]: AbsolutePath | Function;
  private [INPUT]: AbsolutePath | null;
  private [OUTPUT]: AbsolutePath;
  private [PARAMS]: object;
  private [PROPERTIES]: any;

  private constructor(scope: any, name: string, script: AbsolutePath | Function, output: AbsolutePath, params: any) {
    this[TARGET_SCOPE] = scope.clone();
    this[NAME] = ensureString(name);
    this[INPUT] = params.input || null;
    this[SCRIPT] = script;
    this[OUTPUT] = output;
    this[PARAMS] = params;
    this[PROPERTIES] = {};
  }

  public static create(scope: any, name: string, script: AbsolutePath | Function, output: AbsolutePath, params: any) {
    return Object.seal(new CustomScript(scope, name, script, output, params));
  }

  public addProperty(key: string, ...vals: any[]) {
    let property = this[PROPERTIES][key];
    if (!property) {
      property = [];
      this[PROPERTIES][key] = property;
    }
    vals.forEach(v => property.push(v));
  }

  public get NAME(): string {
    return this[NAME];
  }

  public get TARGET_SCOPE(): any {
    return this[TARGET_SCOPE];
  }

  public get SCRIPT() {
    return this[SCRIPT];
  }

  public get INPUT(): AbsolutePath | null {
    return this[INPUT];
  }

  public set INPUT(value: AbsolutePath | string) {
    this[INPUT] = this[TARGET_SCOPE].SOURCE_DIR.resolve(value);
  }

  public get OUTPUT(): AbsolutePath {
    return this[OUTPUT];
  }

  public set OUTPUT(value: AbsolutePath | string) {
    this[OUTPUT] = AbsolutePath.create(value);
  }

  public get PARAMS(): object {
    return this[PARAMS];
  }

  public set PARAMS(value: object) {
    this[PARAMS] = value;
  }

  public get PROPERTIES() {
    return this[PROPERTIES];
  }

  public toString(): string {
    return this[NAME].toString();
  }

  public toJSON(): object {
    return {
      NAME: this.NAME,
      TARGET_SCOPE: this.TARGET_SCOPE,
      SCRIPT: this.SCRIPT,
      INPUT: this.INPUT,
      OUTPUT: this.OUTPUT,
      PARAMS: this.PARAMS,
      PROPERTIES: this.PROPERTIES,
    }
  }
};
