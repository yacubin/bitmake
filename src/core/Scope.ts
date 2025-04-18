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

const DEFINE_MAP = Symbol("DEFINE_MAP");

const Scope = function(this: any) {
  for (const { symbol, initValue } of Object.values(this[DEFINE_MAP] || {}) as any) {
    this[symbol] = Array.isArray(initValue) ? Array.from(initValue) : initValue;
  }
} as any;

Scope.create = () => {
  return Object.seal(new Scope);
}

Scope.prototype = Object.create(Object.prototype, {
  constructor: {
    value: Scope,
    enumerable: false,
  },
});

Scope.defineVariable = function(scope: any, name: string, descriptor: any) {
  if (!scope[DEFINE_MAP])
    scope[DEFINE_MAP] = {};

  const type = descriptor.type || (Array.isArray(descriptor.value) ? "array" : typeof descriptor.value);

  let defineEntry = scope[DEFINE_MAP][name];
  if (!defineEntry) {
    defineEntry = {};
    scope[DEFINE_MAP][name] = defineEntry;
  }

  if (defineEntry.type !== type) {
    defineEntry.symbol = Symbol(name);
  }

  defineEntry.type = type;
  defineEntry.description = descriptor.description || "";

  let ensureValue = (value: any) => {};
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
  const desc: any = {
    configurable: true,
    enumerable: true,
    get(this: any) { return this[symbol] },
  };

  if (ensureValue)
    desc.set = function(this: any, value: any) { this[symbol] = ensureValue(value) };

  Object.defineProperty(scope, name, desc);
}

Scope.defineVariables = function(scope: any, descriptors: any) {
  for (const [ name, descriptor ] of Object.entries(descriptors))
    Scope.defineVariable(scope, name, descriptor);
}

Scope.prototype.toJSON = function() {
  const json: any = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

Scope.prototype.clone = function() {
  const o = Object.create(Scope.prototype);

  for (const { symbol } of Object.values(this[DEFINE_MAP] || {}) as any) {
    o[symbol] = Array.isArray(this[symbol]) ? Array.from(this[symbol]) : this[symbol];
  }

  return Object.seal(o);
}

export { Scope };
