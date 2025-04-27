/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { FilePath, DirPath } from "@/core/Path";
import { ScopeHelper } from "@/core/Scope";

const NAME         = Symbol("NAME");
const SCRIPT       = Symbol("SCRIPT");
const INPUT        = Symbol("INPUT");
const OUTPUT       = Symbol("OUTPUT");
const PARAMS       = Symbol("PARAMS");
const WORK_DIR     = Symbol("WORK_DIR");
const VARIABLES   = Symbol("VARIABLES");

export class CustomScript {
  private [NAME]: string | null;
  private [SCRIPT]: FilePath | Function;
  private [INPUT]: FilePath | undefined;
  private [OUTPUT]: FilePath;
  private [PARAMS]: object;
  private [WORK_DIR]: DirPath;
  private [VARIABLES]: object;

  private constructor(options: CustomScript.Options) {
    this[NAME] = options.name || null;
    this[INPUT] = options.input;
    this[SCRIPT] = options.script;
    this[OUTPUT] = options.output;
    this[PARAMS] = options.params;
    this[WORK_DIR] = options.workDir;
    this[VARIABLES] = options.variables;
  }

  public static create(options: CustomScript.Options): CustomScript {
    return Object.seal(new CustomScript(options));
  }

  public mergeVariables(variables: any) {
    ScopeHelper.mergeVariables(this[VARIABLES], variables);
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

  public get VARIABLES() {
    return this[VARIABLES];
  }

  public toJSON(): object {
    return {
      NAME: this[NAME],
      SCRIPT: this.SCRIPT,
      INPUT: this.INPUT,
      OUTPUT: this.OUTPUT,
      PARAMS: this.PARAMS,
      VARIABLES: this.VARIABLES,
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
  variables: object;
};

} // namespace CustomScript
