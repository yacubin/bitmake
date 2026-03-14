/*
 * MIT License
 *
 * Copyright (c) 2025-2026  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { BooleanType, ValueType } from "@/cmake/Constants";

export function convertToValue(obj: any): string {
  if (Array.isArray(obj))
    return obj.map(i => convertToValue(i)).join(";");

  if (typeof obj === "boolean")
    return obj ? BooleanType.ON : BooleanType.OFF;

  if (obj === null)
    return "NULL";

  return obj.toString();
}

export function cmakeVariableToString(name: string, value: any) {
  return name + "=" + convertToValue(value);
}

export function cmakeCacheVariableToString(name: string, type: ValueType, value: any) {
  return name + ":" + type + "=" + convertToValue(value);
}
