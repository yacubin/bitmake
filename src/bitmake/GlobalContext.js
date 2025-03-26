"use strict";

const fs = require("node:fs");

const { fileExistsSync } = require("###/utils/FileSystem.js");
const { TargetCollection } = require("./TargetCollection.js");
const { ScriptCollection } = require("./ScriptCollection.js");
const { InterfaceIncludes } = require("./InterfaceIncludes.js");
const { InterfaceTarget } = require("./InterfaceTarget.js");
const { IncludeDirectory } = require("./IncludeDirectory.js");

const TARGETS = Symbol("TARGETS");
const SCRIPTS = Symbol("SCRIPTS");
const CACHE = Symbol("CACHE");
const INTERFACE_TARGETS = Symbol("INTERFACE_TARGETS");
const INTERFACE_SCRIPTS = Symbol("INTERFACE_SCRIPTS");
const INSTALL_LIST = Symbol("INSTALL_LIST");

function GlobalContext() {
  this[TARGETS] = TargetCollection.create();
  this[SCRIPTS] = ScriptCollection.create();
  this[CACHE] = {};
  this[INTERFACE_TARGETS] = {};
  this[INTERFACE_SCRIPTS] = {};
  this[INSTALL_LIST] = [];
}

GlobalContext.create = () => {
  return Object.seal(new GlobalContext);
}

GlobalContext.prototype = Object.create(Object.prototype, {
  constructor: {
    value: GlobalContext,
    enumerable: false,
  },
  TARGETS: {
    get() { return this[TARGETS]; },
    enumerable: true,
  },
  SCRIPTS: {
    get() { return this[SCRIPTS]; },
    enumerable: true,
  },
  CACHE: {
    get() { return this[CACHE]; },
    enumerable: true,
  },
  INTERFACE_TARGETS: {
    get() { return this[INTERFACE_TARGETS]; },
    enumerable: true,
  },
  INTERFACE_SCRIPTS: {
    get() { return this[INTERFACE_SCRIPTS]; },
    enumerable: true,
  },
  INSTALL_LIST: {
    get() { return this[INSTALL_LIST]; },
    enumerable: true,
  },
});

GlobalContext.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

GlobalContext.prototype.loadCacheVariables = function(filename) {
  if (fileExistsSync(filename.toString())) {
    const variables = require(filename.toString());
    this.addCacheVariables(variables);
  }
}

GlobalContext.prototype.addCacheVariables = function(variables) {
  const cache = this[CACHE];
  for (const [key, entry] of Object.entries(variables)) {
    cache[key] = entry;
  }
}

GlobalContext.prototype.copyCacheVariables = function(scope) {
  for (const [key, entry] of Object.entries(this[CACHE])) {
    if (!Object.hasOwn(scope, key))
      scope[key] = entry.value;
  }
}

GlobalContext.prototype.writeCacheVariables = function(filename) {
  const json = JSON.stringify(this[CACHE], null, 2);
  fs.writeFileSync(filename, json, "utf-8");
}

GlobalContext.prototype.__getAllIncludes = function(includes, targetSet, list) {
  for (const iter of list) {
    if (iter instanceof InterfaceIncludes || iter instanceof InterfaceTarget) {
      if (!targetSet.has(iter.NAME)) {
        targetSet.add(iter.NAME);
        const target = this[TARGETS].get(iter.NAME);
        this.__getAllIncludes(includes, targetSet, target.getPublicIncludes());
        this.__getAllIncludes(includes, targetSet, target.getPublicLibraries());
      }
    }
    else if (iter instanceof IncludeDirectory) {
      if (!includes.includes(iter.toString()))
        includes.push(iter.toString());
    }
    else {
      throw new Error(`Not support instance ${iter}`);
    }
  }
}

GlobalContext.prototype.getAllIncludes = function(target) {
  const includes = target.TARGET_SCOPE.INCLUDES.map(i => i.toString());
  const targetSet = new Set([ target.NAME ]);
  this.__getAllIncludes(includes, targetSet, target.getIncludes());
  this.__getAllIncludes(includes, targetSet, target.getLibraries());
  return includes;
}

GlobalContext.prototype.__getAllHeaders = function(headers, targetSet, list) {
  for (const iter of list) {
    if (iter instanceof InterfaceIncludes || iter instanceof InterfaceTarget) {
      if (!targetSet.has(iter.NAME)) {
        targetSet.add(iter.NAME);
        const target = this[TARGETS].get(iter.NAME);
        for (const header of target.getHeaders().map(i => i.FILE.toString())) {
          if (!headers.includes(header.toString()))
            headers.push(header.toString());
        }
        this.__getAllHeaders(headers, targetSet, target.getPublicIncludes());
        this.__getAllHeaders(headers, targetSet, target.getPublicLibraries());
      }
    }
  }
}

GlobalContext.prototype.getAllHeaders = function(target) {
  const headers = target.getHeaders().map(i => i.FILE.toString());
  const targetSet = new Set([ target.NAME ]);
  this.__getAllHeaders(headers, targetSet, target.getIncludes());
  this.__getAllHeaders(headers, targetSet, target.getLibraries());
  return headers;
}

GlobalContext.prototype.__getAllLibraries = function(libraries, targetSet, list) {
  for (const iter of list) {
    console.assert(iter instanceof InterfaceTarget);
    if (!targetSet.has(iter.NAME)) {
      targetSet.add(iter.NAME);
      const target = this[TARGETS].get(iter.NAME);
      libraries.push(target.FILE.toString());
      this.__getAllLibraries(libraries, targetSet, target.getPublicLibraries());
    }
  }
}

GlobalContext.prototype.getAllLibraries = function(target) {
  const libraries = [];
  const targetSet = new Set([ target.NAME ]);
  this.__getAllLibraries(libraries, targetSet, target.getLibraries());
  return libraries;
}

module.exports = {
  GlobalContext,
};
