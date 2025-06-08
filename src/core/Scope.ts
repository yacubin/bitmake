/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ensureBoolean, ensureString, ensureNumber, ensureArray } from "@/utils/StrictType";
import { AbsolutePath, DirPath, FilePath } from "@/core/Path";
import { SystemScope } from "@/core/SystemScope";
import SystemVariables from "@/core/SystemVariables";

const DEFINE_MAP = Symbol("DEFINE_MAP");

interface VariableDescriptor {
  type?: string | string[];
  value?: any;
  description?: string;
};

interface VariableEntry {
  type: string | string[];
  initValue: any;
  group: string;
  value: any;
  description: string;
  ensureValue: (value: any) => any;
};

export interface VariableMap {
  [name: string]: VariableEntry;
};

export namespace ScopeHelper {

function toDescriptor(value: any): VariableDescriptor {
  if (!value || typeof value === "boolean" || typeof value === "number" || typeof value === "string" || Array.isArray(value)) {
    return { value }; 
  }
  return value;
}

function defineVariableImpl2(map: VariableMap, group: string, name: string, descriptor: VariableDescriptor) {
  let defineEntry = map[name];
  if (!defineEntry) {
    defineEntry = {
      type: "", group, value: undefined,  initValue: undefined, description: "",
      ensureValue: (value: any) => value,
    };
    map[name] = defineEntry;
  }
  else if (group !== defineEntry.group) {
    if (defineEntry.group)
      throw new Error(`Attempting to recreate "${name}" variable with "${defineEntry.group}" group in another "${group}"`);
    defineEntry.group = group;
  }

  defineEntry.type = descriptor.type || defineEntry.type;
  defineEntry.description = descriptor.description || defineEntry.description;

  let type: string | string[];
  if (defineEntry.type)
    type = defineEntry.type;
  else if (Array.isArray(descriptor.value))
    type = "array";
  else if (descriptor.value instanceof AbsolutePath)
    type = "AbsolutePath";
  else if (descriptor.value instanceof DirPath)
    type = "DirPath";
  else if (descriptor.value instanceof FilePath)
    type = "FilePath";
  else
    type = typeof descriptor.value;

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
      defineEntry.ensureValue = (value: any) => {
      if (type.includes(value))
        return value;
      throw new Error(`The '${value}' is not a ${type}`);
    }
  }
  else if (type === "boolean")
    defineEntry.ensureValue = ensureBoolean;
  else if (type === "number")
    defineEntry.ensureValue = ensureNumber;
  else if (type === "string")
    defineEntry.ensureValue = ensureString;
  else if (type === "array")
    defineEntry.ensureValue = ensureArray;
  else if (type === "AbsolutePath")
    defineEntry.ensureValue = AbsolutePath.create;
  else if (type === "DirPath")
    defineEntry.ensureValue = DirPath.create;
  else if (type === "FilePath")
    defineEntry.ensureValue = FilePath.create;
  else if (type !== "object")
    throw new Error(`Variable "${name}" has wrong "${type}" type`);

  if (descriptor.value === undefined) {
    defineEntry.initValue = (type === "array") ? [] : undefined;
  }
  else {
    defineEntry.initValue = (type === "array") ? Array.from(descriptor.value) : defineEntry.ensureValue(descriptor.value);
  }

  if (defineEntry.value !== undefined) {
    defineEntry.value = defineEntry.ensureValue(defineEntry.value);
  }
}

function defineVariableImpl(scope: any, group: string, name: string, descriptor: VariableDescriptor) {
  if (!scope[DEFINE_MAP])
    scope[DEFINE_MAP] = {};

  defineVariableImpl2(scope[DEFINE_MAP] as VariableMap, group, name, descriptor);
  Object.defineProperty(scope, name, {
    configurable: true,
    enumerable: true,
    get(this: any) {
      const entry = this[DEFINE_MAP][name];
      /*if (value === undefined)
        throw new Error(`Value of ${name} cannot be obtained because it has not been established`);*/
      return (entry.value === undefined) ? entry.initValue : entry.value;
    },
    set(this: any, value: any) {
      const entry = this[DEFINE_MAP][name];
      entry.value = entry.ensureValue(value);
    },
  });
}

export function defineVariable(scope: any, group: string, name: string, descriptor: any) {
  if (!group) {
    throw new Error(`Attempting to create "${name}" variable with an empty group`);
  }
  defineVariableImpl(scope, group, name, descriptor);
}

export function create(variables: object): SystemScope {
  const scope = {} as any;

  for (const [ name, value ] of Object.entries(variables)) {
    defineVariableImpl(scope, "", name, toDescriptor(value));
    scope[name] = value;
  }

  for (const [ name, value ] of Object.entries(SystemVariables))
    defineVariableImpl(scope, "system", name, toDescriptor(value));

  return scope as SystemScope;
}

export function getVariableMap(scope: any): VariableMap {
  return scope[DEFINE_MAP] as VariableMap;
}

export function createProxy<T>(map: VariableMap, o?: any): T {
  const handler: ProxyHandler<any> = {
    get(target: VariableMap, key: string, receiver: any) {
      const entry = target[key];
      if (!entry)
        return o && o[key];
      return (entry.value === undefined) ? entry.initValue : entry.value;
    },
    set(target: VariableMap, key: string, value: any): boolean {
      const entry = target[key];
      if (entry)
        entry.value = entry.ensureValue(value);
      else
        defineVariableImpl2(target, "", key, toDescriptor(value));
      return true;
    },
    has(target: VariableMap, key: string) {
      return target.hasOwnProperty(key) || (key in target);
    },
    ownKeys(target: VariableMap) {
      return Object.keys(target);
    },
    deleteProperty(target: VariableMap, key: string) {
      throw new Error(`Cannot delete ${key} value`);
    },
  };
  return new Proxy(map, handler);
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
    for (const [ name, entry ] of Object.entries(scope[DEFINE_MAP] as VariableMap)) {
      defineVariableImpl(target, entry.group, name, {
        type: entry.type,
        description: entry.description,
        value: entry.initValue,
      });
      if (entry.value !== undefined)
        target[name] = entry.value;
    }
  }
  return target;
}

export function getVariablesByGroup(scope: any, group?: string) {
  const result: any = {};
  for (const [ name, entry ] of Object.entries(scope[DEFINE_MAP]) as any) {
    if (group !== undefined && entry.group && entry.group !== group)
      continue;
    result[name] = {
      type: entry.type,
      description: entry.description,
      value: (entry.value === undefined) ? entry.initValue : entry.value,
    };
  }
  return result;
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
