/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { AbsolutePath } from "@/core/AbsolutePath";
import { deepCopy } from "@/utils/Primitives";

interface VariableDescriptor {
  type?: string | string[];
  value?: any;
  description?: string;
};

interface VariableEntry {
  name: string;
  type: string | string[];
  group: string;
  description: string;
  initValue?: any;
  value?: any;
};

export interface VariableMap {
  [ name: string ]: VariableEntry;
};

export type Variant = boolean | number | string | boolean[] | number[] | string[];
export type VariantMap = {
  [ name: string ]: Variant;
};

export namespace ScopeHelper {

function toDescriptor(value: any): VariableDescriptor {
  if (!value || typeof value === "boolean" || typeof value === "number" || typeof value === "string" || Array.isArray(value)) {
    return { value }; 
  }
  return value;
}

export function getEntryValue(entry: VariableEntry): any {
  /*if (value === undefined)
    throw new Error(`Value of ${name} cannot be obtained because it has not been established`);*/
  return (entry.value === undefined) ? entry.initValue : entry.value;
}

export function get(variableMap: VariableMap, name: string): any {
  const entry = variableMap[name];
  if (entry)
    return getEntryValue(entry);
}

const makeValueMap: any = {
  array: (value: any) => {
    return Array.isArray(value) ? Array.from(value) : undefined;
  },
  boolean: (value: any) => {
    return (typeof value === "boolean") ? value : undefined;
  },
  number: (value: any) => {
    return (typeof value === "number") ? value : undefined;
  },
  string: (value: any) => {
    return (typeof value === "string") ? value : undefined;
  },
  AbsolutePath: (value: any) => {
    return AbsolutePath.create(value);
  },
  FilePath: (value: any) => {
    return AbsolutePath.create(value);
  },
  DirPath: (value: any) => {
    return AbsolutePath.create(value);
  },
  object: (value: any) => {
    return value;
  },
};

const tojsonValueMap: any = {
  array: (value: any) => {
    return deepCopy(value);
  },
  boolean: (value: any) => {
    return value;
  },
  number: (value: any) => {
    return value;
  },
  string: (value: any) => {
    return value;
  },
  AbsolutePath: (value: any) => {
    return value.toJSON();
  },
  FilePath: (value: any) => {
    return value.toJSON();
  },
  DirPath: (value: any) => {
    return value.toJSON();
  },
  object: (value: any) => {
    return deepCopy(value);
  },
};

export function makeJSONValue(entry: VariableEntry, value: any): any {
  if (Array.isArray(entry.type))
    return value;
  const func = tojsonValueMap[entry.type];
  if (!func)
    throw new Error(`Unknown type "${entry.type}" for ${entry.name}`);
  return func(value);
}

export function makeEntryValue(entry: VariableEntry, value: any): any {
  let newValue: any;
  if (Array.isArray(entry.type))
    newValue = entry.type.includes(value) ? value : undefined;
  else {
    const func = makeValueMap[entry.type];
    if (!func)
      throw new Error(`Unknown type "${entry.type}" for ${entry.name}`);
    newValue = func(value);
  }
  if (newValue === undefined)
    throw new TypeError(`Attempting to set "${value}" to ${entry.name} as an ${entry.type}`);
  return newValue;
}

export function copyEntryValue(entry: VariableEntry, transform: (entry: VariableEntry, value: any) => any) {
  const result: VariableEntry = {
    name: entry.name,
    type: entry.type,
    group: entry.group,
    description: entry.description,
  };
  if (entry.initValue !== undefined)
    result.initValue = transform(entry, entry.initValue);
  if (entry.value !== undefined)
    result.value = transform(entry, entry.value);
  return result;
}

export function fromJSON(variableMap: VariableMap): VariableMap {
  const result: VariableMap = {};
  for (const [key, val] of Object.entries(variableMap))
    result[key] = copyEntryValue(val, makeEntryValue);
  return result;
}

export function toJSON(variableMap: VariableMap): VariableMap {
  const result: VariableMap = {};
  for (const [key, val] of Object.entries(variableMap))
    result[key] = copyEntryValue(val, makeJSONValue);
  return result;
}

export function setEntryValue(entry: VariableEntry, value: any): any {
  entry.value = makeEntryValue(entry, value);
}

export function set(variableMap: VariableMap, name: string, value: any): void {
  const entry = variableMap[name];
  if (!entry)
    throw new Error(`Variable "${name}" does not exists`);
  setEntryValue(entry, value);
}

export function reset(variableMap: VariableMap, name: string): void {
  const entry = variableMap[name];
  if (!entry)
    throw new Error(`Variable "${name}" does not exists`);
  entry.value = undefined;
}

export function defineVariable(map: VariableMap, group: string, name: string, descriptor: VariableDescriptor) {
  let defineEntry = map[name];
  let isValidValue = (value: any) => true;
  if (!defineEntry) {
    defineEntry = {
      name,
      type: "", group, value: undefined,  initValue: undefined, description: "",
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
  else
    type = typeof descriptor.value;

  if (Array.isArray(type)) {
    const enumList = type;
    let itemType;
    for (const iter of enumList) {
      const it = typeof iter;
      if (!itemType)
        itemType = it;
      else if (itemType !== it)
        throw new Error(`All elements for ${name} must be of the same type`);
    }
    if (itemType !== "boolean" && itemType !== "number" && itemType !== "string")
      throw new Error(`Enum ${name} not support ${itemType} type`);
    isValidValue = (value: any) => enumList.includes(value);
  }
  else if (type === "boolean") {
    isValidValue = (value: any) => typeof value === "boolean";
  }
  else if (type === "number") {
    isValidValue = (value: any) => typeof value === "number";
  }
  else if (type === "string") {
    isValidValue = (value: any) => typeof value === "string";
  }
  else if (type === "array") {
    isValidValue = Array.isArray;
  }
  else if (type === "AbsolutePath" || type === "FilePath" || type === "DirPath") {
    isValidValue = (value: any) => !!AbsolutePath.create(value);
  }
  else if (type !== "object" && type !== "enum") {
    throw new Error(`Variable "${name}" has wrong "${type}" type`);
  }

  if (descriptor.value === undefined) {
    defineEntry.initValue = (type === "array") ? [] : undefined;
  }
  else {
    if (!isValidValue(descriptor.value))
        throw new TypeError(`Attempting to set "${descriptor.value}" to ${name} as initValue`);
    defineEntry.initValue = (type === "array") ? Array.from(descriptor.value) : descriptor.value;
  }

  defineEntry.type = type;
  if (defineEntry.initValue !== undefined) {
    defineEntry.initValue = makeEntryValue(defineEntry, defineEntry.initValue);
  }
  if (defineEntry.value !== undefined) {
    defineEntry.value = makeEntryValue(defineEntry, defineEntry.value);
  }
}

export function createProxy<T>(map: VariableMap, o?: any): T {
  o = o || {};
  const handler: ProxyHandler<any> = {
    get(target: VariableMap, key: string, receiver: any) {
      const entry = target[key];
      if (entry)
        return getEntryValue(entry);
      return o[key];
    },
    set(target: VariableMap, key: string, value: any): boolean {
      const entry = target[key];
      if (entry)
        setEntryValue(entry, value);
      else
        defineVariable(target, "", key, toDescriptor(value));
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

export function cloneVariableMap(map: VariableMap) {
  const result: VariableMap = {};
  for (const [ name, entry ] of Object.entries(map)) {
    defineVariable(result, entry.group, name, {
      type: entry.type,
      description: entry.description,
      value: entry.initValue,
    });
    if (getEntryValue(entry) !== undefined)
      result[name].value = getEntryValue(entry);
  }
  return result;
}

export function extendVariableMapByValues(map: VariableMap, group: string, values: { [ key: string ]: any }) {
  for (const [name, value] of Object.entries(values)) {
    defineVariable(map, group, name, { value });
    map[name].value = value;
  }
}

export function defineVariablesInVariableMap(map: VariableMap, group: string, variables: any) {
  for (const [name, value] of Object.entries(variables)) {
    const descriptor = value && typeof value === "object" ? value : {value };
    defineVariable(map, group, name, descriptor);
  }
}

export function getVariablesByGroup(map: VariableMap, group?: string) {
  const result: any = {};
  for (const [ name, entry ] of Object.entries(map)) {
    if (group !== undefined && entry.group && entry.group !== group)
      continue;
    result[name] = {
      type: entry.type,
      description: entry.description,
      value: getEntryValue(entry),
    };
  }
  return result;
}

export function createVariableValues(map: VariableMap, group?: string): any {
  const result: any = {};
  for (const [ name, entry ] of Object.entries(map)) {
    if (!group || group === entry.group)
      result[name] = getEntryValue(entry);
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

export function mergeVariableMap(target: VariableMap, source: any): VariableMap {
  for (const [name, value] of Object.entries(source)) {
    let entry = target[name];
    if (!entry)
      defineVariable(target, "", name, { value });
    else {
      let dest = getEntryValue(entry);
      setEntryValue(entry, (dest && typeof dest === "object") ? mergeVariables(dest, value) : value);
    }
  }
  return target;
}

} // ScopeHelper
