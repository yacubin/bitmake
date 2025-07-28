/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceScript } from "@/core/MakeInterfaces";
import { Locator } from "@/utils/Locator";
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

  public get name() {
    return this._name;
  }

  public get variables() {
    return this._variables;
  }

  public mergeVariables(variables: VariantMap) {
    ScopeHelper.mergeVariables(this._variables, variables);
  }

  public static fromJSON(json: any) {
    return PostCustomScript.create(json.name, json.variables);
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

export class CustomScript extends InterfaceScript {
  private _name: string;
  private _scriptModule: string | Locator;
  private _input?: Locator;
  private _output: Locator;
  private _sourceDir: Locator;
  private _binaryDir: Locator;
  private _variableMap: VariableMap;

  private constructor(options: CustomScript.Options) {
    super();
    this._variableMap = options.variableMap;
    this._name = options.name;
    this._input = options.input;
    this._scriptModule = options.scriptModule;
    this._output = options.output;
    this._sourceDir = options.sourceDir;
    this._binaryDir = options.binaryDir;
  }

  public static create(options: CustomScript.Options): CustomScript {
    return Object.seal(new CustomScript(options));
  }

  public mergeVariables(variables: VariantMap) {
    ScopeHelper.mergeVariableMap(this._variableMap, variables);
  }

  public get NAME() {
    return this._name;
  }

  public get scriptModule() {
    return this._scriptModule;
  }

  public get INPUT(): Locator | undefined {
    return this._input;
  }

  public get OUTPUT(): Locator {
    return this._output;
  }

  public get sourceDir(): Locator {
    return this._sourceDir;
  }

  public get binaryDir(): Locator {
    return this._binaryDir;
  }

  public get variableMap() {
    return this._variableMap;
  }

  public postUpdate(script: PostCustomScript) {
    this.mergeVariables(script.variables);
  }

  public static fromJSON(json: any) {
    const options: CustomScript.Options = {
      variableMap: ScopeHelper.fromJSON(json.variableMap),
      name: json.name,
      scriptModule: Locator.isAbsolute(json.scriptModule) ? Locator.create(json.scriptModule) : json.scriptModule,
      output: Locator.create(json.output),
      sourceDir: Locator.create(json.sourceDir),
      binaryDir: Locator.create(json.binaryDir),
    };
    if (json.input) {
      options.input = Locator.create(json.input);
    }
    return CustomScript.create(options);
  }

  public toJSON(): SimpleObject {
    const result: SimpleObject = {
      type: CustomScript.name,
      name: this._name,
      scriptModule: this._scriptModule,
      output: this._output.toURLString(),
      sourceDir: this._sourceDir.toURLString(),
      binaryDir: this._binaryDir.toURLString(),
      variableMap: ScopeHelper.toJSON(this._variableMap),
    };
    if (this._input) {
      result.input = this._input.toURLString();
    }
    return result;
  }
};

export namespace CustomScript {

export interface Options {
  name: string,
  scriptModule: string | Locator,
  input?: Locator,
  output: Locator,
  sourceDir: Locator,
  binaryDir: Locator,
  variableMap: VariableMap,
};

} // namespace CustomScript
