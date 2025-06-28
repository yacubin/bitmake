/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export { importModule } from "./ImportModule.mjs";
export const requireSync = eval("require") as NodeJS.Require;
export function requireResolve(name: string) {
  if (typeof import.meta.resolve === 'function')
    return import.meta.resolve(name);
  if (typeof requireSync !== 'undefined')
    return requireSync.resolve(name);
  throw new Error("No compatible module resolver found");
}

