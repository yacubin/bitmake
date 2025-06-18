/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";

import { ensureBoolean } from "@/utils/StrictType";
import { getPathString } from "@/utils/FileSystem";
import { SettingsStorage } from "@/utils/SettingsStorage";
import { spawnAsync } from "@/utils/ChildProcess";

export default async function(config: any, environment: any, settings: SettingsStorage) {
  const sourceDir = getPathString(config.sourceDir);
  const binaryDir = getPathString(config.binaryDir);
  let step = await settings.get("configure") || "config";
  if (step === "config") {
    const command = path.resolve(sourceDir, "configure");
    const params = [];
    if (Array.isArray(config.variables)) {
      for (const iter of config.variables)
        params.push(iter);
    }
    else if (config.variables) {
      for (const [key,val] of Object.entries(config.variables)) {
        if (key === "features" && Array.isArray(val)) {
          for (const iter of val)
            params.push(`--${iter}`);
        }
        else if (val === null)
          params.push(`--${key}`);
        else
          params.push(`--${key}=${val}`);
      }
    }
    if (config.features) {
      for (const key of config.features)
        params.push(`--${key}`);
    }
    const res1 = await spawnAsync(command, params, {
      cwd: binaryDir,
      env: environment,
      extra: {
        output: `ac-configure-${step}.log`,
      },
    });
    if (res1.status !== 0) {
      throw new Error(`configure returned status ${res1.status}`);
    }
    step = "make";
    await settings.set("configure", step);
  }
  if (step === "make") {
    let runMake = false;
    if (Object.hasOwn(config, "runMake"))
      runMake = ensureBoolean(config.runMake);
    if (runMake) {
      const res2 = await spawnAsync("make", [], {
        cwd: binaryDir,
        env: environment,
        extra: {
          output: `ac-configure-${step}.log`,
        },
      });
      if (res2.status !== 0) {
        throw new Error(`make returned status ${res2.status}`);
      }
    }
    step = "install";
    await settings.set("configure", step);
  }
  if (step === "install") {
    let runMakeInstall = true;
    if (Object.hasOwn(config, "runMakeInstall"))
      runMakeInstall = ensureBoolean(config.runMakeInstall);
    if (runMakeInstall) {
      const args = [ "install" ];
      if (config.destDir) {
        args.push(`DESTDIR=${config.destDir}`);
      }
      const res2 = await spawnAsync("make", args, {
        cwd: binaryDir,
        env: environment,
        extra: {
          output: `ac-configure-${step}.log`,
        },
      });
      if (res2.status !== 0) {
        throw new Error(`make returned status ${res2.status}`);
      }
    }
    step = "done";
    await settings.set("configure", step);
  }
}
