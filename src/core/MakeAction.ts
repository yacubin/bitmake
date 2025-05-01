/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { spawnAsync } from "@/utils/ChildProcess";
import { getPathString }  from "@/utils/FileSystem";
import { SettingsStorage } from "@/utils/SettingsStorage";

export async function makeAction(config: any, environment: any, settings: SettingsStorage) {
  const binaryDir = getPathString(config.binaryDir);
  const args = config.args || [];
  if (config.destDir) {
    args.push(`DESTDIR=${config.destDir}`);
  }
  const res2 = await spawnAsync("make", args, {
    cwd: binaryDir,
    env: environment,
    extra: {
      output: `make.log`,
    },
  });
  if (res2.status !== 0) {
    throw new Error(`make returned status ${res2.status}`);
  }
}
