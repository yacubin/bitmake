"use strict";

const { AbsolutePath } = require("###/utils/AbsolutePath.js");
const { InterfaceIncludes } = require("./InterfaceIncludes.js");
const { InterfaceObjects } = require("./InterfaceObjects.js");
const { IncludeDirectory } = require("./IncludeDirectory.js");

const UNKNOWN_TARGET = Symbol("UNKNOWN_TARGET");
const BASE_DIR = Symbol("BASE_DIR");

function InterfaceTarget(utarget, baseDir) {
  this[UNKNOWN_TARGET] = utarget;
  this[BASE_DIR] = baseDir;
}

InterfaceTarget.create = (utarget, baseDir) => {
  return Object.seal(new InterfaceTarget(utarget, baseDir));
}

InterfaceTarget.ensureInstance = (value) => {
  if (value instanceof InterfaceTarget)
    return value;
  throw new Error(`The '${value}' is not a InterfaceTarget`);
}

InterfaceTarget.prototype = Object.create(Object.prototype, {
  constructor: {
    value: InterfaceTarget,
    enumerable: false,
  },
  targetName: {
    get () { return this[UNKNOWN_TARGET].NAME; },
    enumerable: true,
  },
  includes: {
    get () { return InterfaceIncludes.create(this.targetName); },
    enumerable: true,
  },
  objects: {
    get () { return InterfaceObjects.create(this.targetName); },
    enumerable: true,
  },
});

InterfaceTarget.prototype.toJSON = function() {
  return this.toString();
}

InterfaceObjects.prototype.toString = function() {
  return "${" + this.targetName + "}";
}

InterfaceTarget.prototype.addSource = function(...sources) {
  for (const iter of sources.flat(1)) {
    this[UNKNOWN_TARGET].SOURCES.push(this[BASE_DIR].resolve(iter));
  }
}

InterfaceTarget.prototype.addIncludes = function(...includes) {
  for (const it of includes.flat(1)) {
    let VALUE;
    if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      VALUE = IncludeDirectory.create(it, this[BASE_DIR]);
    else
      VALUE = InterfaceIncludes.ensureInstance(it);
    this[UNKNOWN_TARGET].INCLUDES.push({ VALUE, PUBLIC_ONLY: false });
  }
}

InterfaceTarget.prototype.addPublicIncludes = function(...includes) {
  for (const it of includes.flat(1)) {
    let VALUE;
    if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      VALUE = IncludeDirectory.create(it, this[BASE_DIR]);
    else
      VALUE = InterfaceIncludes.ensureInstance(it);
    this[UNKNOWN_TARGET].INCLUDES.push({ VALUE, PUBLIC_ONLY: true });
  }
}

InterfaceTarget.prototype.addDefinitions = function(definitions) {
}

InterfaceTarget.prototype.addPublicDefinitions = function(definitions) {
}

InterfaceTarget.prototype.addCompileOptions = function(options) {
}

InterfaceTarget.prototype.addPublicCompileOptions = function(options) {
}

InterfaceTarget.prototype.addLinkOptions = function(options) {
}

InterfaceTarget.prototype.addPublicLinkOptions = function(options) {
}

module.exports = {
  InterfaceTarget,
};
