"use strict";

const { AbsolutePath } = require("@/utils/AbsolutePath.js");
const { InterfaceIncludes } = require("./InterfaceIncludes.js");
const { InterfaceObjects } = require("./InterfaceObjects.js");
const { IncludeDirectory } = require("@/core/IncludeDirectory");
const { SourceFile } = require("./SourceFile.js");

const UNKNOWN_TARGET = Symbol("UNKNOWN_TARGET");
const SCOPE = Symbol("SCOPE");

function InterfaceTarget(scope, utarget) {
  this[SCOPE] = scope.clone();
  this[UNKNOWN_TARGET] = utarget;
}

InterfaceTarget.create = (scope, utarget) => {
  return Object.seal(new InterfaceTarget(scope, utarget));
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

InterfaceTarget.prototype.toString = function() {
  return "${" + this.targetName + "}";
}

InterfaceTarget.prototype.addSources = function(...sources) {
  for (let it of sources.flat(1)) {
    if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      it = SourceFile.create(this[SCOPE], it);
    else if (!(it instanceof InterfaceObjects || it instanceof SourceFile))
      throw new Error(`Not support instance ${it}`);
    this[UNKNOWN_TARGET].SOURCES.push(it);
  }
}

InterfaceTarget.prototype.addIncludes = function(...includes) {
  for (const it of includes.flat(1)) {
    let VALUE;
    if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      VALUE = IncludeDirectory.create(it, this[SCOPE].SOURCE_DIR);
    else
      VALUE = InterfaceIncludes.ensureInstance(it);
    this[UNKNOWN_TARGET].INCLUDES.push({ VALUE, PUBLIC_ONLY: false });
  }
}

InterfaceTarget.prototype.addPublicIncludes = function(...includes) {
  for (const it of includes.flat(1)) {
    let VALUE;
    if (typeof it === "string" || AbsolutePath.isAbsolute(it))
      VALUE = IncludeDirectory.create(it, this[SCOPE].SOURCE_DIR);
    else
      VALUE = InterfaceIncludes.ensureInstance(it);
    this[UNKNOWN_TARGET].INCLUDES.push({ VALUE, PUBLIC_ONLY: true });
  }
}

InterfaceTarget.prototype.addDefinitions = function(...definitions) {
  for (const VALUE of definitions.flat(1))
    this[UNKNOWN_TARGET].DEFINES.push({ VALUE });
}

InterfaceTarget.prototype.addPublicDefinitions = function(...definitions) {
  for (const VALUE of definitions.flat(1))
    this[UNKNOWN_TARGET].DEFINES.push({ VALUE, PUBLIC_ONLY: true });
}

InterfaceTarget.prototype.addCompileOptions = function(...options) {
  for (const it of options.flat(1)) {
    this[UNKNOWN_TARGET].COMPILE_OPTIONS.push({ VALUE: it });
  }
}

InterfaceTarget.prototype.addLinkOptions = function(...options) {
  for (const it of options.flat(1)) {
    this[UNKNOWN_TARGET].LINK_OPTIONS.push({ VALUE: it });
  }
}

InterfaceTarget.prototype.addPublicCompileOptions = function(...options) {
  for (const it of options.flat(1)) {
    this[UNKNOWN_TARGET].COMPILE_OPTIONS.push({ VALUE: it, PUBLIC_ONLY: true });
  }
}

InterfaceTarget.prototype.addPublicLinkOptions = function(...options) {
  for (const it of options.flat(1)) {
    this[UNKNOWN_TARGET].LINK_OPTIONS.push({ VALUE: it, PUBLIC_ONLY: true });
  }
}

module.exports = {
  InterfaceTarget,
};
