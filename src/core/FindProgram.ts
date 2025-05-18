/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { Path } from "@/utils/Path";
import { Host } from "@/utils/Host";
import { fileExists, fileExistsSync } from "@/utils/FileSystem";

function possibleProgramList(name: string) {
  if (Host.executableSuffix)
    name += Host.executableSuffix;

  const result = [];
  const paths = (process.env.PATH || "").split(Path.delimiter);
  for (const iter of paths) {
    const filename = Path.resolve(iter, name);
    result.push(filename);
  }

  return result;
}

export async function findProgram(name: string): Promise<string | undefined> {
  for (const iter of possibleProgramList(name)) {
    if (await fileExists(iter))
      return iter;
  }
  return undefined;
}

export function findProgramSync(name: string): string | undefined {
  for (const iter of possibleProgramList(name)) {
    if (fileExistsSync(iter))
      return iter;
  }
  return undefined;
}
