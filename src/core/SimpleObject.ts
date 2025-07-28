/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export interface SimpleObject {
  type: string;
  [name: string]: null | boolean | number | string |object;
};

type InstanceCreateFunction = (object: SimpleObject) => any;

const _creators = new Map<string, InstanceCreateFunction>();

export namespace SimpleObject {

export function registerParser(name: string, func: InstanceCreateFunction) {
  if (!name && _creators.has(name))
    throw new Error(`Name "${name}" is wrong or registered`);
  _creators.set(name, func);
}

export function fromJSON(value: SimpleObject): any {
  if (value === undefined)
    throw new Error("Not support undefined value");
  if (value && typeof value === "object") {
    if (typeof value.type === "string") {
      const func = _creators.get(value.type);
      if (func)
        return func(value);
      throw new Error(`Uknown object type: ${JSON.stringify(value)}`);
    }
    else if (Array.isArray(value)) {
      return value.map(i => fromJSON(i));
    }
  }
  return value;
}

export function toJSON(value: any): any {
  if (value && typeof value === "object") {
    if (typeof value.toJSON === "function")
      return value.toJSON();
    else if (Array.isArray(value))
      return value.map(i => toJSON(i));
  }
  return value;
}

} // namespace SimpleObject
