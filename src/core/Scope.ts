/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ensureBoolean, ensureString, ensureNumber, ensureArray } from "@/utils/StrictType";
import { AbsolutePath } from "@/core/Path";

const DEFINE_MAP = Symbol("DEFINE_MAP");

export namespace ScopeHelper {

function defineVariableImpl(scope: any, group: string, name: string, descriptor: any) {
  if (name === "DEFINE_MAP") {
    throw new Error(`${name} is reserved and cannot be used as a variable`);
  }

  if (!scope[DEFINE_MAP])
    scope[DEFINE_MAP] = {};

  const type = descriptor.type || (Array.isArray(descriptor.value) ? "array" : typeof descriptor.value);

  let defineEntry = scope[DEFINE_MAP][name];
  if (!defineEntry) {
    defineEntry = { group, type, symbol: Symbol(name) };
    scope[DEFINE_MAP][name] = defineEntry;
  }
  else if (group !== defineEntry.group) {
    if (defineEntry.group)
      throw new Error(`Attempting to recreate "${name}" variable with "${defineEntry.group}" group in another "${group}"`);
    defineEntry.group = group;
  }

  defineEntry.description = descriptor.description || defineEntry.description || "";

  let ensureValue: (value: any) => {};
  if (Array.isArray(type)) {
    let itemType;
    for (const iter of type) {
      const it = typeof iter;
      if (!itemType)
        itemType = it;
      else if (itemType !== it)
        throw new Error(`All elements for ${name} must be of the same type`);
    }
    if (itemType !== "boolean" && itemType !== "number" && itemType !== "string")
      throw new Error(`Enum ${name} not support ${itemType} type`);
    ensureValue = (value: any) => {
      if (type.includes(value))
        return value;
      throw new Error(`The '${value}' is not a ${type}`);
    }
  }
  else if (type === "boolean")
    ensureValue = ensureBoolean;
  else if (type === "number")
    ensureValue = ensureNumber;
  else if (type === "string")
    ensureValue = ensureString;
  else if (type === "array")
    ensureValue = ensureArray;
  else if (type === "DirPath")
    ensureValue = AbsolutePath.createDir;
  else if (type === "FilePath")
    ensureValue = AbsolutePath.createFile;
  else
    throw new Error(`Variable "${name}" has wrong ${type} type`);

  if (descriptor.value !== undefined) {
    defineEntry.value = (type === "array") ? Array.from(descriptor.value) : ensureValue(descriptor.value);
  }
  else {
    defineEntry.value = (type === "array") ? [] : undefined;
  }

  const { symbol, value } = defineEntry;

  if (scope[symbol] === undefined && value !== undefined)
    scope[symbol] = Array.isArray(value) ? Array.from(value) : value;

  const desc: any = {
    configurable: true,
    enumerable: true,
    get() {
      const value = scope[symbol];
      /*if (value === undefined)
        throw new Error(`Value of ${name} cannot be obtained because it has not been established`);*/
      return value;
    },
    set(value: any) {
      scope[symbol] = ensureValue(value);
    },
  };

  Object.defineProperty(scope, name, desc);
}

export function defineVariable(scope: any, group: string, name: string, descriptor: any) {
  if (!group) {
    throw new Error(`Attempting to create "${name}" variable with an empty group`);
  }
  defineVariableImpl(scope, group, name, descriptor);
}

export function defineVariables(scope: any, group: string, descriptors: any) {
  for (const [ name, descriptor ] of Object.entries(descriptors))
    ScopeHelper.defineVariable(scope, group, name, descriptor);
}

export function clone(target: any, scope: any) {
  if (scope[DEFINE_MAP]) {
    for (const [ name, { group, symbol, type, value, description } ] of Object.entries(scope[DEFINE_MAP]) as any) {
      defineVariableImpl(target, group, name, { type, value, description });
      if (scope[symbol] !== undefined)
        target[name] = scope[symbol];
    }
  }
  return target;
}

export function getVariablesByGroup(scope: any, grp?: string) {
  const result: any = {};
  for (const [ name, { type, group, symbol, description } ] of Object.entries(scope[DEFINE_MAP]) as any) {
    if (group && group !== grp)
      continue;
    result[name] = { type, description, value: scope[symbol] };
  }
  return result;
}

export function applyVariable(scope: any, name: string, value: any) {
  if (Object.getOwnPropertyDescriptor(scope, name))
    scope[name] = value;
  else
    defineVariableImpl(scope, "", name, { value });
}

export function applyVariables(scope: any, variables: object) {
  for (const [ name, value ] of Object.entries(variables))
    ScopeHelper.applyVariable(scope, name, value);
}

} // ScopeHelper
