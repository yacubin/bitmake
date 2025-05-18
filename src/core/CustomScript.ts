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
import { SystemScope } from "@/core/SystemScope";

const SCOPE        = Symbol("SCOPE");
const NAME         = Symbol("NAME");
const SCRIPT       = Symbol("SCRIPT");
const INPUT        = Symbol("INPUT");
const OUTPUT       = Symbol("OUTPUT");
const WORK_DIR     = Symbol("WORK_DIR");

export class CustomScript {
  private [SCOPE]: SystemScope;
  private [NAME]: string;
  private [SCRIPT]: FilePath | Function;
  private [INPUT]: FilePath | undefined;
  private [OUTPUT]: FilePath;
  private [WORK_DIR]: DirPath;

  private constructor(options: CustomScript.Options) {
    this[SCOPE] = options.scope;
    this[NAME] = options.name || "";
    this[INPUT] = options.input;
    this[SCRIPT] = options.script;
    this[OUTPUT] = options.output;
    this[WORK_DIR] = options.workDir;
  }

  public static create(options: CustomScript.Options): CustomScript {
    return Object.seal(new CustomScript(options));
  }

  public mergeVariables(variables: any) {
    ScopeHelper.mergeVariables(this[SCOPE], variables);
  }

  public get NAME() {
    return this[NAME];
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

  public get workDir(): FilePath {
    return this[WORK_DIR];
  }

  public get SCOPE() {
    return this[SCOPE];
  }

  public toJSON(): object {
    return {
      SCOPE: this[SCOPE],
      NAME: this[NAME],
      SCRIPT: this.SCRIPT,
      INPUT: this.INPUT,
      OUTPUT: this.OUTPUT,
    }
  }
};

export namespace CustomScript {

export interface Options {
  scope: SystemScope,
  name?: string,
  script: FilePath | Function,
  input?: FilePath,
  output: FilePath,
  workDir: DirPath,
};

} // namespace CustomScript
