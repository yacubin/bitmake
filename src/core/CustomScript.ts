/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { FilePath, DirPath } from "@/core/Path";

const NAME         = Symbol("NAME");
const SCRIPT       = Symbol("SCRIPT");
const INPUT        = Symbol("INPUT");
const OUTPUT       = Symbol("OUTPUT");
const PARAMS       = Symbol("PARAMS");
const WORK_DIR     = Symbol("WORK_DIR");
const PROPERTIES   = Symbol("PROPERTIES");

export class CustomScript {
  private [NAME]: string | null;
  private [SCRIPT]: FilePath | Function;
  private [INPUT]: FilePath | undefined;
  private [OUTPUT]: FilePath;
  private [PARAMS]: object;
  private [WORK_DIR]: DirPath;
  private [PROPERTIES]: any;

  private constructor(options: CustomScript.Options) {
    this[NAME] = options.name || null;
    this[INPUT] = options.input;
    this[SCRIPT] = options.script;
    this[OUTPUT] = options.output;
    this[PARAMS] = options.params;
    this[WORK_DIR] = options.workDir;
    this[PROPERTIES] = {};
  }

  public static create(options: CustomScript.Options): CustomScript {
    return Object.seal(new CustomScript(options));
  }

  public addProperty(key: string, ...vals: any[]) {
    let property = this[PROPERTIES][key];
    if (!property) {
      property = [];
      this[PROPERTIES][key] = property;
    }
    vals.forEach(v => property.push(v));
  }

  public get SCRIPT() {
    return this[SCRIPT];
  }

  public get INPUT(): FilePath | undefined {
    return this[INPUT];
  }

  public get OUTPUT(): FilePath {
    return this[OUTPUT];
  }

  public get PARAMS(): object {
    return this[PARAMS];
  }

  public set PARAMS(value: object) {
    this[PARAMS] = value;
  }

  public get workDir(): FilePath {
    return this[WORK_DIR];
  }

  public get PROPERTIES() {
    return this[PROPERTIES];
  }

  public toJSON(): object {
    return {
      NAME: this[NAME],
      SCRIPT: this.SCRIPT,
      INPUT: this.INPUT,
      OUTPUT: this.OUTPUT,
      PARAMS: this.PARAMS,
      PROPERTIES: this.PROPERTIES,
    }
  }
};

export namespace CustomScript {

export interface Options {
  name?: string,
  params: any,
  script: FilePath | Function,
  input?: FilePath,
  output: FilePath,
  workDir: DirPath,
};

} // namespace CustomScript
