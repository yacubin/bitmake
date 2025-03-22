"use strict";

const { InterfaceIncludes } = require("###/bitmake/InterfaceIncludes.js");
const { InterfaceObjects } = require("###/bitmake/InterfaceObjects.js");

const NAME     = Symbol("NAME");
const SCOPE    = Symbol("SCOPE");
const PROTO    = Symbol("PROTO");
const INCLUDES = Symbol("INCLUDES");
const SOURCES  = Symbol("SOURCES");

function InterfaceTarget(name) {
  this[NAME] = name;
  this[SOURCES] = [];
  this[INCLUDES] = [];

  const includes = InterfaceIncludes.create(name);
  const objects = InterfaceObjects.create(name);

  this[PROTO] = Object.create(this, {
    includes: {
      get () { return includes; },
      enumerable: false,
    },
    objects: {
      get () { return objects; },
      enumerable: false,
    },
  });
  this[PROTO].addSource = function(...sources) {
    for (const iter of sources.flat(1)) {
      this[SOURCES].push(this[SCOPE].SOURCE_DIR.resolve(iter));
    }
  }
  this[PROTO].addIncludes = function(...includes) {
    for (const iter of includes.flat(1))
      this[INCLUDES].push({ VALUE: this[SCOPE].SOURCE_DIR.resolve(iter), PUBLIC_ONLY: false });
  }
  this[PROTO].addPublicIncludes = function(...includes) {
    for (const iter of includes.flat(1))
      this[INCLUDES].push({ VALUE: this[SCOPE].SOURCE_DIR.resolve(iter), PUBLIC_ONLY: true });
  }
}

InterfaceTarget.create = (name) => {
  return Object.seal(new InterfaceTarget(name));
}

InterfaceTarget.asInstance = (value) => {
  if (value instanceof InterfaceTarget)
    return value;
  throw new Error(`The '${value}' is not a InterfaceTarget`);
}

InterfaceTarget.prototype = Object.create(Object.prototype, {
  constructor: {
    value: InterfaceTarget,
    enumerable: false,
  },
  NAME: {
    get () { return this[NAME]; },
    enumerable: true,
  },
  INCLUDES: {
    get () { return this[INCLUDES]; },
    enumerable: false,
  },
  SOURCES: {
    get () { return this[SOURCES]; },
    enumerable: false,
  },
});

InterfaceTarget.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

InterfaceTarget.prototype.toString = function() {
  return "${" + this[NAME] + "}";
}

InterfaceTarget.prototype.forUser = function(scope) {
  const o = Object.create(this[PROTO]);
  o[SCOPE] = scope;
  return Object.seal(o);
}

module.exports = {
  InterfaceTarget,
};
