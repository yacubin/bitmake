/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";

import { USER_CONFIG } from "@/Constants";
import { DEBUG_BUILD_TYPE, RELEASE_BUILD_TYPE } from "@/core/Types";

export interface RunScriptOptions {
  handler: string;
  nodeExecutable: string;
  currentScript: string;
  workDir: string;
  env: {
    buildType?: string;
    config?: string;
    preset?: string;
  };
};

export class RunScriptContext {
  _nodeExecutable;
  _currentScript;
  _workDir;
  readonly _env;
  _userConfig?: object;

  constructor(options: RunScriptOptions) {
    this._nodeExecutable = options.nodeExecutable;
    this._currentScript = options.currentScript;
    this._workDir = options.workDir;
    this._env = options.env;
  }

  get nodeExecutable() {
    return this._nodeExecutable;
  }

  get currentScript() {
    return this._currentScript;
  }

  get workDir() {
    return this._workDir;
  }

  get env() {
    return this._env;
  }

  get userConfigPath() {
    return path.resolve(this._workDir, USER_CONFIG);
  }

  get buildType() {
    return this._env.buildType == DEBUG_BUILD_TYPE ? this._env.buildType : RELEASE_BUILD_TYPE;
  }
};
