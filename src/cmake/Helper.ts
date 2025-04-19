/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { BooleanType } from "@/cmake/Constants";

export function convertToValue(obj: any): string {
  if (Array.isArray(obj))
    return obj.map(i => convertToValue(i)).join(";");

  if (typeof obj === "boolean")
    return obj ? BooleanType.ON : BooleanType.OFF;

  return obj.toString();
}
