/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";
import fs from "node:fs";

import { fileExists } from "@/utils/FileSystem";
import { USER_CONFIG } from "@/Constants";
import { CommandOptions } from "@/core/CommandOptions";
import { requireResolve } from "@/utils/Module";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

export default async function(options: CommandOptions) {
  const preset = options.env.preset;

  let presetPath;
  if (preset) {
    if (await fileExists(preset))
      presetPath = preset;
    else {
      const components = preset.split("/");
      if (components.length === 2) {
          try { presetPath = requireResolve(`${components[0]}/bitmake/presets/${components[1]}`) } catch(e) {}
      }
    }
  }

  if (!presetPath)
    throw new Error(`Preset '${preset}' is not available`);

  const userConfigPath = path.resolve(options.workDir, USER_CONFIG);
  if (await fileExists(userConfigPath))
    await fs.promises.rm(userConfigPath);

  await fs.promises.copyFile(presetPath, userConfigPath);
  logger.info(`Preset '${preset}' installed successfully`);
}
