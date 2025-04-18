/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";

export function filenameToPragmaOnceMacro(filepath: string, deep: number) {
  if (typeof deep === 'undefined')
    deep = 3;

  let components = path.normalize(filepath).split(path.sep);
  if (components.length > deep)
    components = components.slice(components.length - deep);

  return "_" + components.join('_').replace(/[- .:%~]/g, '_').toUpperCase();
}

export function lineToSinglComment(line: string) {
  return "//" + line;
}

export function lineToMultipleComment(line: string) {
  return `/* ${line} */`;
}

export function generatedScriptNameComment(filename: string) {
  return lineToMultipleComment("Generated from " + path.basename(filename));
}
