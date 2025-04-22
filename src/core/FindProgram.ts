/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import os from "node:os";
import path from "node:path";

import { fileExistsSync } from "@/utils/FileSystem";

export function findProgram(name: string): string | undefined {
  if (os.platform() === "win32" && !name.endsWith(".exe"))
    name += ".exe";

  const paths = (process.env.PATH || "").split(path.posix.delimiter);
  for (const iter of paths) {
    const filename = path.posix.resolve(iter, name);
    if (fileExistsSync(filename))
      return filename;
  }

  return undefined;
}
