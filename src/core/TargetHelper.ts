/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export namespace TargetHelper {

function convertValueToDefinition(value: any): string {
  if (value === undefined)
    throw `Definition undefined`;
  if (typeof value === "object")
    return '"' + JSON.stringify(value) + '"';
  return value.toString();
}

export function normalizeDefinitions(definitions: any[]): string[] {
  const result = [];
  for (const iter of definitions) {
    if (typeof iter === "string")
      result.push(iter);
    else if (!iter)
      throw new Error(`Defenition ${iter} not supported`)
    else if (typeof iter === "object") {
      for (const [key, val] of Object.entries(iter))
        result.push(`${key}=${convertValueToDefinition(val)}`);
    }
    else
      throw new Error(`Defenition ${iter} not supported`)
  }
  return result;
}

} // namespace namespace
