/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { FileSystem, fetchBuffer, fileExists } from "@/utils/FileSystem";
import { USER_CONFIG } from "@/Constants";
import { CommandOptions } from "@/core/CommandOptions";
import { Logger } from "@/utils/Logger";

const logger = Logger.create(import.meta.url);

export default async function(options: CommandOptions) {
  const preset = options.env.preset;

  if (!preset)
    throw new Error(`Preset '${preset}' is not available`);

  const presetData = await fetchBuffer(preset);

  const userConfigPath = options.workDir.join(USER_CONFIG);
  if (await fileExists(userConfigPath))
    await FileSystem.rm(userConfigPath);

  await FileSystem.writeFile(userConfigPath, presetData, "utf8");
  logger.info(`Preset '${preset}' installed successfully`);
}
