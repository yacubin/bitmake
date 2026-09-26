/*
 * MIT License
 *
 * Copyright (c) 2026  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";

import { ensureBoolean } from "@/utils/StrictType";
import { getPathString, fileExists } from "@/utils/FileSystem";
import { SettingsStorage } from "@/utils/SettingsStorage";
import { Environment } from "@/utils/Environment";
import { spawnAsync } from "@/utils/ChildProcess";

function formatValue(val: any): string {
  if (Array.isArray(val))
    return val.map(formatValue).join(",");
  return String(val);
}

async function runMeson(args: string[], cwd: string, environment: Environment, step: string) {
  const res = await spawnAsync("meson", args, {
    cwd,
    env: environment,
    extra: {
      output: `meson-${step}.log`,
    },
  });
  if (res.status !== 0) {
    throw new Error(`meson ${args[0]} returned status ${res.status}`);
  }
}

export default async function(config: any, environment: Environment, settings: SettingsStorage) {
  const sourceDir = getPathString(config.sourceDir);
  const binaryDir = getPathString(config.binaryDir);
  let step = await settings.get("meson") || "setup";
  if (step === "setup") {
    const params = [ "setup" ];
    const variables = config.variables || {};
    if (!Object.hasOwn(variables, "buildtype") && config.buildType) {
      params.push(`--buildtype=${String(config.buildType).toLowerCase()}`);
    }
    for (const [key,val] of Object.entries(variables)) {
      if (val === null)
        params.push(`--${key}`);
      else
        params.push(`--${key}=${formatValue(val)}`);
    }
    if (config.options) {
      for (const [key,val] of Object.entries(config.options))
        params.push(`-D${key}=${formatValue(val)}`);
    }
    if (await fileExists(path.join(binaryDir, "meson-private", "coredata.dat"))) {
      params.push("--reconfigure");
    }
    params.push(binaryDir, sourceDir);
    await runMeson(params, binaryDir, environment, step);
    step = "compile";
    await settings.set("meson", step);
  }
  if (step === "compile") {
    await runMeson([ "compile", "-C", binaryDir ], binaryDir, environment, step);
    step = "install";
    await settings.set("meson", step);
  }
  if (step === "install") {
    let runInstall = true;
    if (Object.hasOwn(config, "runInstall"))
      runInstall = ensureBoolean(config.runInstall);
    if (runInstall) {
      const args = [ "install", "-C", binaryDir ];
      if (config.destDir) {
        args.push(`--destdir=${config.destDir}`);
      }
      await runMeson(args, binaryDir, environment, step);
    }
    step = "done";
    await settings.set("meson", step);
  }
}
