/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { execFileAsync } from "@/utils/ChildProcess";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

const VERSION_REGEX = /^clang version (\d+.\d.\d+)/;

export namespace clang {
export async function readVersion(clangPath: string) {
  const { stdout } = await execFileAsync(clangPath, [ "--version" ]);

  const content = stdout.toString();
  let match = content.match(VERSION_REGEX);
  if (!match)
    throw new Error("The pattern of the Clang version is different");
  
  return match[1];
}
} // namespace clang
