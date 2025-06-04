/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ensureBoolean, ensureString, ensureNumber, ensureArray } from "@/utils/StrictType";
import { DirPath, FilePath } from "@/core/Path";
import { SystemScope } from "@/core/SystemScope";
import SystemVariables from "@/core/SystemVariables";

const DEFINE_MAP = Symbol("DEFINE_MAP");

interface VariableDescriptor {
  type?: string | string[];
  value?: any;
  description?: string;
}

export namespace ScopeHelper {

function toDescriptor(value: any): VariableDescriptor {
  if (!value || typeof value === "boolean" || typeof value === "number" || typeof value === "string" || Array.isArray(value)) {
    return { value }; 
  }
  return value;
}

function defineVariableImpl(scope: any, init: boolean, group: string, name: string, descriptor: VariableDescriptor) {
  if (!scope[DEFINE_MAP])
    scope[DEFINE_MAP] = {};

  let defineEntry = scope[DEFINE_MAP][name];
  if (!defineEntry) {
    defineEntry = { init, group, symbol: Symbol(name) };
    scope[DEFINE_MAP][name] = defineEntry;
  }
  else if (group !== defineEntry.group) {
    if (defineEntry.group)
      throw new Error(`Attempting to recreate "${name}" variable with "${defineEntry.group}" group in another "${group}"`);
    defineEntry.group = group;
  }

  defineEntry.type = descriptor.type || defineEntry.type;
  defineEntry.description = descriptor.description || defineEntry.description || "";

  let ensureValue: (value: any) => {};

  const type = defineEntry.type || (Array.isArray(descriptor.value) ? "array" : typeof descriptor.value);
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
    ensureValue = DirPath.create;
  else if (type === "FilePath")
    ensureValue = FilePath.create;
  else
    throw new Error(`Variable "${name}" has wrong "${type}" type`);

  if (descriptor.value === undefined) {
    defineEntry.value = (type === "array") ? [] : undefined;
  }
  else {
    defineEntry.value = (type === "array") ? Array.from(descriptor.value) : ensureValue(descriptor.value);
  }

  const { symbol, value } = defineEntry;

  if (scope[symbol] !== undefined) {
    if (!init || defineEntry.init)
      scope[symbol] = ensureValue(scope[symbol]);
    else if (value !== undefined)
      scope[symbol] = Array.isArray(value) ? Array.from(value) : ensureValue(value);
  }
  else if (value !== undefined)
    scope[symbol] = Array.isArray(value) ? Array.from(value) : ensureValue(value);

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
  defineVariableImpl(scope, false, group, name, descriptor);
}

export function create(variables: object): SystemScope {
  const scope = {};

  for (const [ name, value ] of Object.entries(variables))
    defineVariableImpl(scope, true, "", name, toDescriptor(value));

  for (const [ name, value ] of Object.entries(SystemVariables))
    defineVariableImpl(scope, false, "system", name, toDescriptor(value));

  return scope as SystemScope;
}

export function defineVariables(scope: any, group: string, descriptors: any) {
  for (let [ name, descriptor ] of Object.entries(descriptors)) {
    if (!descriptor || typeof descriptor === "boolean" || typeof descriptor === "number" || typeof descriptor === "string" || Array.isArray(descriptor)) {
      descriptor = { value: descriptor }; 
    }
    ScopeHelper.defineVariable(scope, group, name, descriptor);
  }
}

export function clone(target: any, scope: any) {
  if (scope[DEFINE_MAP]) {
    for (const [ name, { group, symbol, type, value, description } ] of Object.entries(scope[DEFINE_MAP]) as any) {
      defineVariableImpl(target, false, group, name, { type, value, description });
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
    defineVariableImpl(scope, false, "", name, toDescriptor(value));
}

export function applyVariables(scope: any, variables: object) {
  for (const [ name, value ] of Object.entries(variables))
    ScopeHelper.applyVariable(scope, name, value);
}

export function mergeVariables(target: any, source: any): object {
  if (!target || typeof target !== "object")
    throw new Error(`Target ${target} is not object`);
  if (!source || typeof source !== "object")
    throw new Error(`Source ${source} is not object`);
  for (const [ key, val ] of Object.entries(source)) {
    if (!Object.hasOwn(target, key)) {
      target[key] = val;
    }
    else if (Array.isArray(target[key])) {
      if (!Array.isArray(val))
        throw new Error(`Source ${key} has ${val} which is not an array`);
      for (const iter of val)
        target[key].push(iter);
    }
    else if (target[key] && typeof target[key] === "object") {
      if (!val || typeof val !== "object")
        throw new Error(`Source ${key} has ${val} which is not an object`);
      mergeVariables(target[key], val);
    }
    else {
      throw new Error(`Source ${key} has ${val} which is not ${typeof target[key]}`);
    }
  }
  return target;
}

} // ScopeHelper
