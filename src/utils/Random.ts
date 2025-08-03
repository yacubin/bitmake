/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const firstChars = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const otherChars = firstChars + "0123456789";

function getCharOf(chars: string) {
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

export function randCIdentifer(length: number) {
  if (!length)
    return "";

  let result = getCharOf(firstChars);
  for (let i = 1; i < length; i++)
    result += getCharOf(otherChars);

  return result;
}

export function randInt(min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER): number {
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
