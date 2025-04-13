/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const requireImpl = eval("require");

export function requireResolve(name: string): string {
  if (typeof import.meta.resolve === 'function')
    return import.meta.resolve(name);
  if (typeof requireImpl !== 'undefined')
    return requireImpl.resolve(name);
  throw new Error("No compatible module resolver found");
}
