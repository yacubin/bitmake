/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";

import { fileExists } from "@/utils/FileSystem";
import { RunScriptContext } from "@/RunScriptContext";
import { requireResolve } from "@/utils/Module";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

export default async function(options: any) {
  const ctx = new RunScriptContext(options);
  const preset: string = ctx.env.preset;

  let presetPath;
  if (await fileExists(preset))
    presetPath = preset;
  else {
    const components = preset.split("/");
    if (components.length === 2) {
        try { presetPath = requireResolve(`${components[0]}/bitmake/presets/${components[1]}`) } catch(e) {}
    }
  }

  if (!presetPath)
    throw `Preset '${preset}' is not available`;

  if (await fileExists(ctx.userConfigPath))
    await fs.promises.rm(ctx.userConfigPath);

  await fs.promises.copyFile(presetPath, ctx.userConfigPath);
  logger.info(`Preset '${preset}' installed successfully`);
}
