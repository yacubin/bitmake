/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export function equalValue(a: any, b: any): boolean {
  if (a === b)
    return true;

  if (a === undefined || b === undefined)
    return false;

  if (typeof a !== "object" || typeof b !== "object")
    return false;

  const k1 = Object.keys(a);
  const k2 = Object.keys(b);

  if (k1.length != k2.length)
    return false;

  for (const key of k1) {
    if (!Object.hasOwn(b, key) || !equalValue(a[key], b[key]))
      return false;
  }

  return true;
}

export function copyValue(o: any): any {
  if (!o || typeof o !== "object")
    return o;
  if (Array.isArray(o)) {
    const result = [];
    for (const iter of o)
      result.push(copyValue(iter));
    return result;
  }
  else {
    const result = {} as any;
    for (const [key,val] of Object.entries(o))
      result[key] = copyValue(val);
    return result;
  }
}

export function assignObject(target: any, source: any) {
  if (Array.isArray(target) && Array.isArray(source)) {
    for (const iter of source)
      target.push(iter);
  }
  else {
    for (const key of Object.keys(source)) {
      const a = target[key], b = source[key];
      if (a && typeof a === "object" && b && typeof b === "object")
        assignObject(a, b);
      else
        target[key] = copyValue(b);
    }
  }
}

export function arrayWrapper(value: any) {
  if (value === undefined || Array.isArray(value))
    return value;
  return [ value ];
}
