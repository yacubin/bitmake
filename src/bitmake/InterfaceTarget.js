"use strict";

const { InterfaceIncludes } = require("###/bitmake/InterfaceIncludes.js");
const { InterfaceObjects } = require("###/bitmake/InterfaceObjects.js");
const { DirPath } = require("./Path.js");

const UNKNOWN_TARGET = Symbol("UNKNOWN_TARGET");
const SOURCE_DIR = Symbol("SOURCE_DIR");

function InterfaceTarget(scope, utarget) {
  this[SOURCE_DIR] = DirPath.create(scope.SOURCE_DIR.toString());
  this[UNKNOWN_TARGET] = utarget;
}

InterfaceTarget.create = (scope, target) => {
  return Object.seal(new InterfaceTarget(scope, target));
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
  name: {
    get () { return this[UNKNOWN_TARGET].NAME; },
    enumerable: true,
  },
  includes: {
    get () { return InterfaceIncludes.create(this.name); },
    enumerable: true,
  },
  objects: {
    get () { return InterfaceObjects.create(this.name); },
    enumerable: true,
  },
});

InterfaceTarget.prototype.toJSON = function() {
  return this.toString();
}

InterfaceObjects.prototype.toString = function() {
  return "${" + this[NAME] + ".objects}";
}

InterfaceTarget.prototype.addSource = function(...sources) {
  for (const iter of sources.flat(1)) {
    this[UNKNOWN_TARGET].SOURCES.push(this[SOURCE_DIR].resolve(iter));
  }
}

InterfaceTarget.prototype.addIncludes = function(...includes) {
  for (const it of includes.flat(1)) {
    this[UNKNOWN_TARGET].INCLUDES.push({ VALUE: (it instanceof InterfaceIncludes) ? it : this[SOURCE_DIR].resolve(it), PUBLIC_ONLY: false });
  }
}

InterfaceTarget.prototype.addPublicIncludes = function(...includes) {
  for (const it of includes.flat(1))
    this[UNKNOWN_TARGET].INCLUDES.push({ VALUE: (it instanceof InterfaceIncludes) ? it : this[SOURCE_DIR].resolve(it), PUBLIC_ONLY: true });
}

module.exports = {
  InterfaceTarget,
};
