/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export namespace Args {

function toOptionKey(name: string) {
  if (!name.startsWith("--"))
    return null;

  name = name.substring(2).toLowerCase();
  if (!name.length)
    return null;

  let key = name.charAt(0);
  if (!key.match(/[a-z]/))
    return null;

  let hyphen = 0;
  for (let i = 1; i < name.length; i++) {
    const ch = name.charAt(i);
    if (ch.match(/[a-z0-9]/)) {
      key += (hyphen ? ch.toUpperCase() : ch)
      hyphen = 0;
    }
    else if (ch == "-") {
      if (++hyphen > 1)
        return null;
    }
  }

  return hyphen ? null : key;
}

export function toObject(args: string[]): object {
  const result: any = {};

  let lastKey = null;
  for (const iter of args) {
    if (iter.startsWith("--")) {
      const key = toOptionKey(iter);
      if (!key)
        throw Error(`Option ${iter} is not supported`);
      if (result.hasOwnProperty(key))
        throw Error(`Cannot specify the same option '${iter}' more than once`);
      lastKey = key;
      result[key] = true;
    }
    else if (lastKey) {
      const value = result[lastKey];
      if (typeof value === 'boolean')
        result[lastKey] = iter;
      else if (typeof value === 'string')
        result[lastKey] = [ value, iter ];
      else
        value.push(iter);
    }
    else {
      throw Error(`Need to specify the option name before '${iter}' parameter`);
    }
  }

  return result;
}

} // namespace Args
