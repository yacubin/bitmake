/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { CMakeProcess, DEFAULT_GENERATOR } from "@/cmake";
import { getPathString }  from "@/utils/FileSystem";
import { SettingsStorage } from "@/utils/SettingsStorage";

export async function cmakeAction(config: any, environment: any, settings: SettingsStorage) {
  const sourceDir = getPathString(config.sourceDir);
  const binaryDir = getPathString(config.binaryDir);
  const cmakeArgs = {
    environment: {
      ...environment,
      DESTDIR: config.destDir,
    },
    generator: config.generator || DEFAULT_GENERATOR,
    cacheVariables: config.cacheVariables,
    sourceDir,
    binaryDir,
  };

  if (!cmakeArgs.cacheVariables.CMAKE_BUILD_TYPE) {
    cmakeArgs.cacheVariables.CMAKE_BUILD_TYPE = config.buildType;
  }

  const cmake = CMakeProcess.getInstance();
  await cmake.configure(cmakeArgs);
  await cmake.build(cmakeArgs);
  await cmake.install(cmakeArgs);
}
