/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ensureBoolean, ensureString } from "@/utils/StrictType";
import { AbsolutePath } from "@/core/Path";

const SCOPE_DESCRIPTORS = Symbol("SCOPE_DESCRIPTORS");

export namespace Scope {

interface VariableDescriptor {
  type?: any;
  value?: any;
  description?: string;
};

interface DefineDescriptor {
  type: string | [];
  group: string;
  symbol: symbol;
  initValue: any;
  description: string;
};

export function defineVariable(scope: any, group: string, name: string, descriptor: VariableDescriptor) {
  if (name === "SCOPE_DESCRIPTORS")
    throw new Error(`The variable ${name} is reserved`);

  if (!scope[SCOPE_DESCRIPTORS])
    scope[SCOPE_DESCRIPTORS] = {};

  const type = descriptor.type || (Array.isArray(descriptor.value) ? "array" : typeof descriptor.value);

  let needInit = false;
  let defineEntry: DefineDescriptor = scope[SCOPE_DESCRIPTORS][name];
  if (!defineEntry) {
    needInit = true;
    defineEntry = {
      type,
      group,
      initValue: null,
      symbol: Symbol(name),
      description: "",
    };
    scope[SCOPE_DESCRIPTORS][name] = defineEntry;
  }
  else {
    if (defineEntry.group !== group)
      throw new Error(`Group ${defineEntry.group} for variable cannot change to ${group}`);
    if (defineEntry.type !== type) {
      needInit = true;
      defineEntry.type = type;
    }
  }

  defineEntry.description = descriptor.description || "";

  let ensureValue = (value: any): any => {};
  if (Array.isArray(type)) {
    let itemType;
    for (const iter of type) {
      const it = typeof iter;
      if (!itemType)
        itemType = it;
      else if (itemType !== it)
        throw new Error(`All elements for ${name} must be of the same type`);
    }
    if (itemType !== "boolean" && itemType !== "string")
      throw new Error(`Unknown ${itemType} element type of ${name} variable`);
    ensureValue = (value: any) => {
      if (type.includes(value))
        return value;
      throw new Error(`The '${value}' is not a ${type}`);
    }
  }
  else if (type === "boolean")
    ensureValue = ensureBoolean;
  else if (type === "string")
    ensureValue = ensureString;
  else if (type === "DirPath")
    ensureValue = AbsolutePath.createDir;
  else if (type === "FilePath")
    ensureValue = AbsolutePath.createFile;
  else if (type === "array")
    {}
  else
    throw new Error(`Unknown ${type} type of ${name} variable`);

  if (descriptor.hasOwnProperty("value")) {
    defineEntry.initValue = (type === "array") ? Array.from(descriptor.value) : ensureValue(descriptor.value);
  }
  else {
    defineEntry.initValue = (type === "array") ? [] : null;
  }

  const { symbol } = defineEntry;

  if (needInit) {
    scope[symbol] = defineEntry.initValue;
  }

  const desc: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get(this: any): any { return this[symbol] },
  };

  if (ensureValue)
    desc.set = function(this: any, value: any): void { this[symbol] = ensureValue(value) };

  Object.defineProperty(scope, name, desc);
}

export function defineVariables(scope: any, group: string, descriptors: VariableDescriptor[]) {
  for (const [ name, descriptor ] of Object.entries(descriptors))
    defineVariable(scope, group, name, descriptor);
}

export function cloneVariables(scope: any) {
  const newScope = Object.create(Object.getPrototypeOf(scope));
  newScope[SCOPE_DESCRIPTORS] = {};

  const descriptores = (scope[SCOPE_DESCRIPTORS] || {}) as VariableDescriptor;
  for (const [name,desc] of Object.entries(descriptores)) {
    const { symbol } = desc;
    newScope[symbol] = Array.isArray(scope[symbol]) ? Array.from(scope[symbol]) : scope[symbol];
    newScope[SCOPE_DESCRIPTORS][name] = desc;
  }

  return newScope;
}

} // namespace Scope
