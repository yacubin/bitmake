/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceScript } from "@/core/MakeInterfaces";
import { AbsolutePath } from "@/core/AbsolutePath";
import { ScopeHelper, VariableMap, VariantMap } from "@/core/Scope";
import { SimpleObject } from "@/core/SimpleObject";

export class PostCustomScript extends InterfaceScript {
  private _name: string;
  private _variables: VariantMap;

  private constructor(name: string, variables?: VariantMap) {
    super();
    this._name = name;
    this._variables = variables || {};
  }

  public static create(name: string, variables?: VariantMap) {
    return Object.seal(new PostCustomScript(name, variables));
  }

  public static fromJSON(object: SimpleObject) {
    return PostCustomScript.create(object.name as string, object.variables as VariantMap);
  }

  public get variables() {
    return this._variables;
  }

  public mergeVariables(variables: VariantMap) {
    ScopeHelper.mergeVariables(this._variables, variables);
  }

  public toJSON(): SimpleObject {
    return {
      type: PostCustomScript.name,
      name: this._name,
      variables: this._variables,
    };
  }
  
  public toString(): string {
    return `[object ${PostCustomScript.name}]`;
  }
};

const SCOPE        = Symbol("SCOPE");
const NAME         = Symbol("NAME");
const SCRIPT       = Symbol("SCRIPT");
const INPUT        = Symbol("INPUT");
const OUTPUT       = Symbol("OUTPUT");
const WORK_DIR     = Symbol("WORK_DIR");

export class CustomScript extends InterfaceScript {
  private [SCOPE]: VariableMap;
  private [NAME]: string;
  private [SCRIPT]: AbsolutePath | Function;
  private [INPUT]: AbsolutePath | undefined;
  private [OUTPUT]: AbsolutePath;
  private [WORK_DIR]: AbsolutePath;

  private constructor(options: CustomScript.Options) {
    super();
    this[SCOPE] = options.variableMap;
    this[NAME] = options.name || "";
    this[INPUT] = options.input;
    this[SCRIPT] = options.script;
    this[OUTPUT] = options.output;
    this[WORK_DIR] = options.workDir;
  }

  public static create(options: CustomScript.Options): CustomScript {
    return Object.seal(new CustomScript(options));
  }

  public mergeVariables(variables: VariantMap) {
    ScopeHelper.mergeVariableMap(this[SCOPE], variables);
  }

  public get NAME() {
    return this[NAME];
  }

  public get SCRIPT() {
    return this[SCRIPT];
  }

  public get INPUT(): AbsolutePath | undefined {
    return this[INPUT];
  }

  public get OUTPUT(): AbsolutePath {
    return this[OUTPUT];
  }

  public get workDir(): AbsolutePath {
    return this[WORK_DIR];
  }

  public get variableMap() {
    return this[SCOPE];
  }

  public postUpdate(script: PostCustomScript) {
    this.mergeVariables(script.variables);
  }

  public toJSON(): object {
    return {
      variableMap: this[SCOPE],
      NAME: this[NAME],
      SCRIPT: this.SCRIPT,
      INPUT: this.INPUT,
      OUTPUT: this.OUTPUT,
    }
  }
};

export namespace CustomScript {

export interface Options {
  variableMap: VariableMap,
  name?: string,
  script: AbsolutePath | Function,
  input?: AbsolutePath,
  output: AbsolutePath,
  workDir: AbsolutePath,
};

} // namespace CustomScript

SimpleObject.registerInstanceCreator(PostCustomScript.name, PostCustomScript.fromJSON);
