/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { Logger } from "@/utils/Logger";
import { CompileOption } from "@/core/MakeInterfaces";
import { Locator } from "@/utils/Locator";

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
    else if (iter && typeof iter === "object") {
      for (const [key, val] of Object.entries(iter))
        result.push(`${key}=${convertValueToDefinition(val)}`);
    }
    else
      throw new Error(`Defenition ${iter} not supported`);
  }
  return result;
}

export function normalizeCompileOptions(options: CompileOption[]): Array<string | [string, string]> {
  const result = new Array<string | [string, string]>;
  for (const iter of options) {
    if (typeof iter === "string")
      result.push(iter);
    else if (Array.isArray(iter) && iter.length == 2 && typeof iter[0] === "string") {
      if (typeof iter[1] === "string")
        result.push([ iter[0], iter[1] ]);
      else if (iter[1] instanceof Locator)
        result.push([ iter[0], iter[1].toPath() ]);
      else
        throw new Error(`CompileOption ${iter} not supported`);
    }
    else {
      throw new Error(`CompileOption ${iter} not supported`);
    }
  }
  return result;
}

} // namespace namespace
