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
    isValidValue = (value: any) => type.includes(value);
    defineEntry.setValue = function(this: VariableEntry, value: any) {
      if (!isValidValue(value))
        throw new TypeError(`Attempting to set "${value}" to ${this.name} as a ${type}`);
      this.value = value;
    }
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

function definePropertyByName(scope: any, name: string) {
  Object.defineProperty(scope, name, {
    configurable: true,
    enumerable: true,
    get(this: any) {
      const entry = this[DEFINE_MAP][name] as VariableEntry;
      return entry.getValue();
    },
    set(this: any, value: any) {
      const entry = this[DEFINE_MAP][name] as VariableEntry;
      return entry.setValue(value);
    },
  });
}

function defineVariableImpl(scope: any, group: string, name: string, descriptor: VariableDescriptor) {
  if (!scope[DEFINE_MAP])
    scope[DEFINE_MAP] = {};

  defineVariableImpl2(scope[DEFINE_MAP] as VariableMap, group, name, descriptor);
  definePropertyByName(scope, name);
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
  o = o || {};
  const handler: ProxyHandler<any> = {
    get(target: VariableMap, key: string, receiver: any) {
      if ((key as any) === DEFINE_MAP)
        return target;
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
      if (entry.getValue() !== undefined)
        target[name] = entry.getValue();
    }
  }
  return target;
}

export function createScope(map: VariableMap) {
  const scope: any = {};
  scope[DEFINE_MAP] = map;

  for (const name of Object.keys(map))
    definePropertyByName(scope, name);

  return scope;
}

export function cloneVariableMap(map: VariableMap) {
  const result: VariableMap = {};
  for (const [ name, entry ] of Object.entries(map)) {
    defineVariableImpl2(result, entry.group, name, {
      type: entry.type,
      description: entry.description,
      value: entry.initValue,
    });
    if (entry.getValue() !== undefined)
      result[name].value = entry.getValue();
  }
  return result;
}

export function getVariablesByGroup(descMap: VariableMap, group?: string) {
  const result: any = {};
  for (const [ name, entry ] of Object.entries(descMap)) {
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
