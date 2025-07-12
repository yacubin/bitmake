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

export function registerInstanceCreator(name: string, func: InstanceCreateFunction) {
  if (!name && _creators.has(name))
    throw new Error(`Name "${name}" is wrong or registered`);
  _creators.set(name, func);
}

export function createInstance(object: SimpleObject): any {
  const func = _creators.get(object.type);
  if (!func)
    throw new Error(`Uknown object type: ${JSON.stringify(object)}`);
  return func(object);
}

} // namespace SimpleObject
