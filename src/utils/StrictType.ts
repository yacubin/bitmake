/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export function ensureBoolean(value: any) {
  if (typeof value === "boolean")
    return value;
  throw new Error(`The '${value}' is not a boolean`);
}

export function ensureNumber(value: any) {
  if (typeof value === "number")
    return value;
  throw new Error(`The '${value}' is not a string`);
}

export function ensureString(value: any) {
  if (typeof value === "string")
    return value;
  throw new Error(`The '${value}' is not a string`);
}

export function ensureArray(value: any) {
  if (Array.isArray(value))
    return Array.from(value);
  throw new Error(`The '${value}' is not a array`);
}
