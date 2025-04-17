/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";
import url from "node:url";

import { ensureString } from "@/utils/StrictType";
import { AbsolutePath } from "@/core/Path";

const TARGET_SCOPE = Symbol("TARGET_SCOPE");
const NAME         = Symbol("NAME");
const FILE         = Symbol("FILE");
const INPUT        = Symbol("INPUT");
const OUTPUT       = Symbol("OUTPUT");
const PARAMS       = Symbol("PARAMS");
const PROPERTIES   = Symbol("PROPERTIES");

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_SCRIPTS_DIR = AbsolutePath.create(__dirname).resolve("../bitmake/SystemScripts");

export class CustomScript {
  private [TARGET_SCOPE]: any;
  private [NAME]: string;
  private [FILE]: AbsolutePath;
  private [INPUT]: AbsolutePath | null;
  private [OUTPUT]: AbsolutePath;
  private [PARAMS]: object;
  private [PROPERTIES]: any;

  private constructor(scope: any, name: string, params: any) {
    this[TARGET_SCOPE] = scope;
    this[NAME] = ensureString(name);
  
    if (!params || !params.script || !params.output)
      throw new Error(`Uknown params ${JSON.stringify(params)}`);
  
    if (/[.\/\\]/.test(params.script))
      this[FILE] = scope.SOURCE_DIR.resolve(params.script);
    else
      this[FILE] = SYSTEM_SCRIPTS_DIR.join(params.script + ".js");
  
    this[INPUT] = params.input || null;
    this[OUTPUT] = params.output;
    this[PARAMS] = params;
    this[PROPERTIES] = {};
  }

  public static create(scope: any, name: string, params: any) {
    return Object.seal(new CustomScript(scope, name, params));
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

  public get FILE(): AbsolutePath {
    return this[FILE];
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
      FILE: this.FILE,
      INPUT: this.INPUT,
      OUTPUT: this.OUTPUT,
      PARAMS: this.PARAMS,
      PROPERTIES: this.PROPERTIES,
    }
  }
};
