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

import { fileExists } from "@/utils/FileSystem";
import { USER_CONFIG, REQUEST_ATTEMPTS } from "@/Constants";
import { DEBUG_BUILD_TYPE, RELEASE_BUILD_TYPE } from "@/core/Types";
import { importModule } from "@/utils/Module";

export class RunScriptContext {
  _nodeExecutable;
  _currentScript;
  _scriptDir;
  _rootDir;
  _workDir;
  _env;
  _userConfig;

  constructor(options: any) {
    this._nodeExecutable = options.nodeExecutable;
    this._currentScript = options.currentScript;
    this._scriptDir = options.scriptDir;
    this._rootDir = options.rootDir;
    this._workDir = options.workDir;
    this._env = Object.seal(Object.freeze(options.env));

    if (options.userConfig) {
      this._userConfig = options.userConfig;
    }
  }

  get nodeExecutable() {
    return this._nodeExecutable;
  }

  get currentScript() {
    return this._currentScript;
  }

  get scriptDir() {
    return this._scriptDir;
  }

  get rootDir() {
    return this._rootDir;
  }

  get workDir() {
    return this._workDir;
  }

  get env() {
    return this._env;
  }

  getPresetPath(preset: string) {
    return path.resolve(this._scriptDir, `preset/${preset}.mjs`);
  }

  get userConfigPath() {
    return path.resolve(this._workDir, USER_CONFIG);
  }

  get buildType() {
    return this._env.buildType == DEBUG_BUILD_TYPE ? this._env.buildType : RELEASE_BUILD_TYPE;
  }

  async getUserConfig() {
    if (!this._userConfig) {
      let configPath;
      if (this._env.config) {
        configPath = path.isAbsolute(this._env.config) ? this._env.config : path.resolve(this._workDir, this._env.config);
        if (!await fileExists(configPath))
          throw `Configuration '${this._env.config}' file does not exist`;
      }
      else {
        const userConfigPath = path.resolve(this._workDir, USER_CONFIG);
        if (await fileExists(userConfigPath))
          configPath = userConfigPath;
        else
          throw `Config file '${USER_CONFIG}' is not available`;
      }

      let userConfig = {};

      if (configPath) {
        const configUrl = url.pathToFileURL(configPath);
        const configModule = await importModule(configUrl);
        switch (typeof configModule.default) {
        case "function":
          userConfig = configModule.default(this._env, {});
          if (userConfig instanceof Promise)
            userConfig = await userConfig;
          break;
        case "object":
          userConfig = configModule.default;
          break;
        default:
          throw `Unknown user configuration type`;
        }
      }

      this._userConfig = userConfig;
    }
    return this._userConfig;
  }

  get requestAttempts() {
    return REQUEST_ATTEMPTS;
  }
};
