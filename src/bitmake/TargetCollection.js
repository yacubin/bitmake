"use strict";

const { IncludeDirectory } = require("./IncludeDirectory.js");
const { InterfaceIncludes } = require("./InterfaceIncludes.js");
const { InterfaceTarget } = require("./InterfaceTarget.js");

const ENTRIES = Symbol("ENTRIES");

function TargetCollection() {
  this[ENTRIES] = {};
}

TargetCollection.prototype = Object.create(Object.prototype, {
  constructor: {
    value: TargetCollection,
    enumerable: false,
    writable: true,
    configurable: true,
  },
  ENTRIES: {
    get() { return this[ENTRIES]; },
    enumerable: true,
  },
});

TargetCollection.create = () => {
  return Object.seal(new TargetCollection());
}

TargetCollection.prototype.toJSON = function() {
  return this[ENTRIES];
}

TargetCollection.prototype.get = function(name) {
  return this[ENTRIES][name];
}

TargetCollection.prototype.set = function(name, target) {
  if (this[ENTRIES][name])
    throw new Error(`Target "${name}" exists`);
  this[ENTRIES][name] = target;
}

TargetCollection.prototype.__getAllIncludes = function(includes, targetSet, list) {
  for (const iter of list) {
    if (iter instanceof InterfaceIncludes || iter instanceof InterfaceTarget) {
      if (!targetSet.has(iter.targetName)) {
        targetSet.add(iter.targetName);
        const target = this.get(iter.targetName);
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

TargetCollection.prototype.allTargetIncludes = function(params) {
  const target = (typeof params === "string") ? this.get(params) : params;
  const includes = [];
  const targetSet = new Set([ target.NAME ]);
  this.__getAllIncludes(includes, targetSet, target.getIncludes());
  this.__getAllIncludes(includes, targetSet, target.getLibraries());
  return includes;
}

TargetCollection.prototype.__getAllHeaders = function(headers, targetSet, list) {
  for (const iter of list) {
    if (iter instanceof InterfaceIncludes || iter instanceof InterfaceTarget) {
      if (!targetSet.has(iter.targetName)) {
        targetSet.add(iter.targetName);
        const target = this.get(iter.targetName);
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

TargetCollection.prototype.allTargetHeaders = function(params) {
  const target = (typeof params === "string") ? this.get(params) : params;
  const headers = target.getHeaders().map(i => i.FILE.toString());
  const targetSet = new Set([ target.NAME ]);
  this.__getAllHeaders(headers, targetSet, target.getIncludes());
  this.__getAllHeaders(headers, targetSet, target.getLibraries());
  return headers;
}

TargetCollection.prototype.__getAllLibraries = function(libraries, targetSet, list) {
  for (const iter of list) {
    console.assert(iter instanceof InterfaceTarget);
    if (!targetSet.has(iter.targetName)) {
      targetSet.add(iter.targetName);
      const target = this.get(iter.targetName);
      libraries.push(target.FILE.toString());
      this.__getAllLibraries(libraries, targetSet, target.getPublicLibraries());
    }
  }
}

TargetCollection.prototype.allTargetLibraries = function(params) {
  const target = (typeof params === "string") ? this.get(params) : params;
  const libraries = [];
  const targetSet = new Set([ target.NAME ]);
  this.__getAllLibraries(libraries, targetSet, target.getLibraries());
  return libraries;
}

module.exports = {
  TargetCollection,
};
