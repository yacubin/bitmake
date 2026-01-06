/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { Locator } from "@/utils/Locator";
import { Host } from "@/utils/Host";
import { fileExists, fileExistsSync } from "@/utils/FileSystem";

function possibleProgramList(name: string, paths: string[]) {
  if (Host.executableSuffix)
    name += Host.executableSuffix;

  const result = [];
  for (const iter of paths) {
    const filename = Locator.create(iter).join(name);
    result.push(filename);
  }

  return result;
}

export async function findProgram(name: string, paths: string[]): Promise<string | undefined> {
  for (const iter of possibleProgramList(name, paths)) {
    if (await fileExists(iter.toPath()))
      return iter.toPath();
  }
  return undefined;
}

export function findProgramSync(name: string, paths: string[]): string | undefined {
  for (const iter of possibleProgramList(name, paths)) {
    if (fileExistsSync(iter.toPath()))
      return iter.toPath();
  }
  return undefined;
}
