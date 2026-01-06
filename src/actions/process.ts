/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */


import path from "node:path";

import { getPathString } from "@/utils/FileSystem";
import { SettingsStorage } from "@/utils/SettingsStorage";
import { Environment } from "@/utils/Environment";
import { spawnAsync } from "@/utils/ChildProcess";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export default async function(config: any, environment: Environment, settings: SettingsStorage) {
  if (!config.command)
    throw new Error("Required command field for process action");
  const sourceDir = getPathString(config.sourceDir);
  const binaryDir = getPathString(config.binaryDir);
  let { command } = config;
  if (!path.isAbsolute(command) && (command.includes(path.posix.delimiter) || command.includes(path.win32.delimiter))) {
    command = path.resolve(sourceDir, command);
  }
  const res = await spawnAsync(command, config.args || [], {
    cwd: binaryDir,
    env: environment,
    extra: {
      output: `process.log`,
    },
  });
  if (res.status !== 0) {
    throw new Error(`process returned status ${res.status}`);
  }
}
