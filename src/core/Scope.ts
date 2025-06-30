/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { AbsolutePath, DirPath, FilePath } from "@/core/Path";

interface VariableDescriptor {
  type?: string | string[];
  value?: any;
  description?: string;
};

interface VariableEntry {
  name: string;
  type: string | string[];
  initValue: any;
  group: string;
  value: any;
  description: string;

  getValue(this: VariableEntry): any;
  setValue(this: VariableEntry, value: any): void;
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

function defineVariable(map: VariableMap, group: string, name: string, descriptor: VariableDescriptor) {
  let defineEntry = map[name];
  let isValidValue = (value: any) => true;
  if (!defineEntry) {
    defineEntry = {
      name,
      type: "", group, value: undefined,  initValue: undefined, description: "",
      getValue: function(this: VariableEntry) {
        /*if (value === undefined)
          throw new Error(`Value of ${name} cannot be obtained because it has not been established`);*/
        return (this.value === undefined) ? this.initValue : this.value;
      },
      setValue: function(this: VariableEntry, value: any) {
        this.value = value;
      },
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
    defineEntry.setValue = function(this: VariableEntry, value: any) {
      if (!isValidValue(value))
        throw new TypeError(`Attempting to set "${value}" to ${this.name} as a ${enumList}`);
      this.value = value;
    }
    type = "enum";
  }
  else if (type === "boolean") {
    isValidValue = (value: any) => typeof value === "boolean";
    defineEntry.setValue = function(this: VariableEntry, value: any) {
      if (!isValidValue(value))
        throw new TypeError(`Attempting to set "${value}" to ${this.name} as a boolean`);
      this.value = value;
    }
  }
  else if (type === "number") {
    isValidValue = (value: any) => typeof value === "number";
    defineEntry.setValue = function(this: VariableEntry, value: any) {
      if (!isValidValue(value))
        throw new TypeError(`Attempting to set "${value}" to ${this.name} as a number`);
      this.value = value;
    }
  }
  else if (type === "string") {
    isValidValue = (value: any) => typeof value === "string";
    defineEntry.setValue = function(this: VariableEntry, value: any) {
      if (!isValidValue(value))
        throw new TypeError(`Attempting to set "${value}" to ${this.name} as a string`);
      this.value = value;
    }
  }
  else if (type === "array") {
    defineEntry.setValue = function(this: VariableEntry, value: any) {
      isValidValue = Array.isArray;
      if (!isValidValue(value))
        throw new TypeError(`Attempting to set "${value}" to ${this.name} as an array`);
      this.value = Array.from(value);
    }
  }
  else if (type === "AbsolutePath") {
    isValidValue = (value: any) => !!AbsolutePath.create(value);
    defineEntry.setValue = function(this: VariableEntry, value: any) { this.value = AbsolutePath.create(value); }
  }
  else if (type === "DirPath") {
    isValidValue = (value: any) => !!DirPath.create(value);
    defineEntry.setValue = function(this: VariableEntry, value: any) { this.value = DirPath.create(value); }
  }
  else if (type === "FilePath") {
    isValidValue = (value: any) => !!FilePath.create(value);
    defineEntry.setValue = function(this: VariableEntry, value: any) { this.value = FilePath.create(value); }
  }
  else if (type !== "object")
    throw new Error(`Variable "${name}" has wrong "${type}" type`);

  if (descriptor.value === undefined) {
    defineEntry.initValue = (type === "array") ? [] : undefined;
  }
  else {
    if (!isValidValue(descriptor.value))
        throw new TypeError(`Attempting to set "${descriptor.value}" to ${name} as initValue`);
    defineEntry.initValue = (type === "array") ? Array.from(descriptor.value) : descriptor.value;
  }

  if (defineEntry.value !== undefined) {
    defineEntry.setValue(defineEntry.value);
  }
}

export function createProxy<T>(map: VariableMap, o?: any): T {
  o = o || {};
  const handler: ProxyHandler<any> = {
    get(target: VariableMap, key: string, receiver: any) {
      const entry = target[key];
      if (entry)
        return entry.getValue();
      return o[key];
    },
    set(target: VariableMap, key: string, value: any): boolean {
      const entry = target[key];
      if (entry)
        entry.setValue(value);
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
    if (entry.getValue() !== undefined)
      result[name].value = entry.getValue();
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
      value: entry.getValue(),
    };
  }
  return result;
}

export function createVariableValues(map: VariableMap): any {
  const result: any = {};
  for (const [ name, entry ] of Object.entries(map))
    result[name] = entry.getValue();
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
      let dest = entry.getValue();
      entry.setValue((dest && typeof dest === "object") ? mergeVariables(dest, value) : value);
    }
  }
  return target;
}

} // ScopeHelper
