"use strict";

const { ensureBoolean, ensureString } = require("@/utils/StrictType");
const { AbsolutePath } = require("@/core/Path");

const DEFINE_MAP            = Symbol("DEFINE_MAP");

const MODULE_PATH           = Symbol("MODULE_PATH");
const ASM_COMPILER          = Symbol("ASM_COMPILER");
const ASM_FLAGS             = Symbol("ASM_FLAGS");
const ASM_FLAGS_DEBUG       = Symbol("ASM_FLAGS_DEBUG");
const ASM_FLAGS_RELEASE     = Symbol("ASM_FLAGS_RELEASE");
const C_COMPILER            = Symbol("C_COMPILER");
const C_FLAGS               = Symbol("C_FLAGS");
const C_FLAGS_DEBUG         = Symbol("C_FLAGS_DEBUG");
const C_FLAGS_RELEASE       = Symbol("C_FLAGS_RELEASE");
const CXX_COMPILER          = Symbol("CXX_COMPILER");
const CXX_FLAGS             = Symbol("CXX_FLAGS");
const CXX_FLAGS_DEBUG       = Symbol("CXX_FLAGS_DEBUG");
const CXX_FLAGS_RELEASE     = Symbol("CXX_FLAGS_RELEASE");
const AR                    = Symbol("AR");
const RANLIB                = Symbol("RANLIB");
const LINKER                = Symbol("LINKER");
const NM                    = Symbol("NM");
const OBJCOPY               = Symbol("OBJCOPY");
const OBJDUMP               = Symbol("OBJDUMP");
const STRIP                 = Symbol("STRIP");
const OBJECT_LIBRARY_PREFIX = Symbol("OBJECT_LIBRARY_PREFIX");
const OBJECT_LIBRARY_SUFFIX = Symbol("OBJECT_LIBRARY_SUFFIX");
const OBJECT_LINKER_FLAGS   = Symbol("OBJECT_LINKER_FLAGS");
const STATIC_LIBRARY_PREFIX = Symbol("STATIC_LIBRARY_PREFIX");
const STATIC_LIBRARY_SUFFIX = Symbol("STATIC_LIBRARY_SUFFIX");
const STATIC_LINKER_FLAGS   = Symbol("STATIC_LINKER_FLAGS");
const SHARED_LIBRARY_PREFIX = Symbol("SHARED_LIBRARY_PREFIX");
const SHARED_LIBRARY_SUFFIX = Symbol("SHARED_LIBRARY_SUFFIX");
const SHARED_LINKER_FLAGS   = Symbol("SHARED_LINKER_FLAGS");
const EXECUTABLE_SUFFIX     = Symbol("EXECUTABLE_SUFFIX");
const EXE_LINKER_FLAGS      = Symbol("EXE_LINKER_FLAGS");

function SystemVariables() {
  this[MODULE_PATH]           = [];
  this[ASM_COMPILER]          = "clang";
  this[ASM_FLAGS]             = [];
  this[ASM_FLAGS_DEBUG]       = [ "-g" ];
  this[ASM_FLAGS_RELEASE]     = [ "-O3", "-DNDEBUG" ];
  this[C_COMPILER]            = "clang";
  this[C_FLAGS]               = [];
  this[C_FLAGS_DEBUG]         = [ "-g" ];
  this[C_FLAGS_RELEASE]       = [ "-O3", "-DNDEBUG" ];
  this[CXX_COMPILER]          = "clang++";
  this[CXX_FLAGS]             = [];
  this[CXX_FLAGS_DEBUG]       = [ "-g" ];
  this[CXX_FLAGS_RELEASE]     = [ "-O3", "-DNDEBUG" ];
  this[AR]                    = "llvm-ar";
  this[RANLIB]                = "llvm-ranlib";
  this[LINKER]                = "wasm-ld";
  this[NM]                    = "llvm-nm";
  this[OBJCOPY]               = "llvm-objcopy";
  this[OBJDUMP]               = "llvm-objdump";
  this[STRIP]                 = "llvm-strip";
  this[OBJECT_LIBRARY_PREFIX] = "";
  this[OBJECT_LIBRARY_SUFFIX] = ".o";
  this[OBJECT_LINKER_FLAGS]   = [];
  this[STATIC_LIBRARY_PREFIX] = "lib";
  this[STATIC_LIBRARY_SUFFIX] = ".a";
  this[STATIC_LINKER_FLAGS]   = [];
  this[SHARED_LIBRARY_PREFIX] = "lib";
  this[SHARED_LIBRARY_SUFFIX] = ".so";
  this[SHARED_LINKER_FLAGS]   = [];
  this[EXECUTABLE_SUFFIX]     = "";
  this[EXE_LINKER_FLAGS]      = [];

  for (const { symbol, initValue } of Object.values(this[DEFINE_MAP] || {})) {
    this[symbol] = Array.isArray(initValue) ? Array.from(initValue) : initValue;
  }
}

SystemVariables.create = function() {
  return Object.seal(new SystemVariables);
}

SystemVariables.prototype = Object.create(Object.prototype, {
  constructor: {
    value: SystemVariables,
    enumerable: false,
  },
  MODULE_PATH: {
    get () { return this[MODULE_PATH]; },
    set(value) { this[MODULE_PATH] = value; },
    enumerable: true,
  },
  ASM_COMPILER: {
    get () { return this[ASM_COMPILER]; },
    set(value) { this[ASM_COMPILER] = value; },
    enumerable: true,
  },
  ASM_FLAGS: {
    get () { return this[ASM_FLAGS]; },
    set(value) { this[ASM_FLAGS] = value; },
    enumerable: true,
  },
  ASM_FLAGS_DEBUG: {
    get () { return this[ASM_FLAGS_DEBUG]; },
    set(value) { this[ASM_FLAGS_DEBUG] = value; },
    enumerable: true,
  },
  ASM_FLAGS_RELEASE: {
    get () { return this[ASM_FLAGS_RELEASE]; },
    set(value) { this[ASM_FLAGS_RELEASE] = value; },
    enumerable: true,
  },
  C_COMPILER: {
    get () { return this[C_COMPILER]; },
    set(value) { this[C_COMPILER] = value; },
    enumerable: true,
  },
  C_FLAGS: {
    get () { return this[C_FLAGS]; },
    set(value) { this[C_FLAGS] = value; },
    enumerable: true,
  },
  C_FLAGS_DEBUG: {
    get () { return this[C_FLAGS_DEBUG]; },
    set(value) { this[C_FLAGS_DEBUG] = value; },
    enumerable: true,
  },
  C_FLAGS_RELEASE: {
    get () { return this[C_FLAGS_RELEASE]; },
    set(value) { this[C_FLAGS_RELEASE] = value; },
    enumerable: true,
  },
  CXX_COMPILER: {
    get () { return this[CXX_COMPILER]; },
    set(value) { this[CXX_COMPILER] = value; },
    enumerable: true,
  },
  CXX_FLAGS: {
    get () { return this[CXX_FLAGS]; },
    set(value) { this[CXX_FLAGS] = value; },
    enumerable: true,
  },
  CXX_FLAGS_DEBUG: {
    get () { return this[CXX_FLAGS_DEBUG]; },
    set(value) { this[CXX_FLAGS_DEBUG] = value; },
    enumerable: true,
  },
  CXX_FLAGS_RELEASE: {
    get () { return this[CXX_FLAGS_RELEASE]; },
    set(value) { this[CXX_FLAGS_RELEASE] = value; },
    enumerable: true,
  },
  AR: {
    get () { return this[AR]; },
    set(value) { this[AR] = value; },
    enumerable: true,
  },
  RANLIB: {
    get () { return this[RANLIB]; },
    set(value) { this[RANLIB] = value; },
    enumerable: true,
  },
  LINKER: {
    get () { return this[LINKER]; },
    set(value) { this[LINKER] = value; },
    enumerable: true,
  },
  NM: {
    get () { return this[NM]; },
    set(value) { this[NM] = value; },
    enumerable: true,
  },
  OBJCOPY: {
    get () { return this[OBJCOPY]; },
    set(value) { this[OBJCOPY] = value; },
    enumerable: true,
  },
  OBJDUMP: {
    get () { return this[OBJDUMP]; },
    set(value) { this[OBJDUMP] = value; },
    enumerable: true,
  },
  STRIP: {
    get () { return this[STRIP]; },
    set(value) { this[STRIP] = value; },
    enumerable: true,
  },
  OBJECT_LIBRARY_PREFIX: {
    get () { return this[OBJECT_LIBRARY_PREFIX]; },
    set(value) { this[OBJECT_LIBRARY_PREFIX] = value; },
    enumerable: true,
  },
  OBJECT_LIBRARY_SUFFIX: {
    get () { return this[OBJECT_LIBRARY_SUFFIX]; },
    set(value) { this[OBJECT_LIBRARY_SUFFIX] = value; },
    enumerable: true,
  },
  OBJECT_LINKER_FLAGS: {
    get() { return this[OBJECT_LINKER_FLAGS]; },
    set(value) { this[OBJECT_LINKER_FLAGS] = value; },
    enumerable: true,
  },
  STATIC_LIBRARY_PREFIX: {
    get () { return this[STATIC_LIBRARY_PREFIX]; },
    set(value) { this[STATIC_LIBRARY_PREFIX] = value; },
    enumerable: true,
  },
  STATIC_LIBRARY_SUFFIX: {
    get () { return this[STATIC_LIBRARY_SUFFIX]; },
    set(value) { this[STATIC_LIBRARY_SUFFIX] = value; },
    enumerable: true,
  },
  STATIC_LINKER_FLAGS: {
    get() { return this[STATIC_LINKER_FLAGS]; },
    set(value) { this[STATIC_LINKER_FLAGS] = value; },
    enumerable: true,
  },
  SHARED_LIBRARY_PREFIX: {
    get() { return this[SHARED_LIBRARY_PREFIX]; },
    set(value) { this[SHARED_LIBRARY_PREFIX] = value; },
    enumerable: true,
  },
  SHARED_LIBRARY_SUFFIX: {
    get() { return this[SHARED_LIBRARY_SUFFIX]; },
    set(value) { this[SHARED_LIBRARY_SUFFIX] = value; },
    enumerable: true,
  },
  SHARED_LINKER_FLAGS: {
    get() { return this[SHARED_LINKER_FLAGS]; },
    set(value) { this[SHARED_LINKER_FLAGS] = value; },
    enumerable: true,
  },
  EXECUTABLE_SUFFIX: {
    get() { return this[EXECUTABLE_SUFFIX]; },
    set(value) { this[EXECUTABLE_SUFFIX] = value; },
    enumerable: true,
  },
  EXE_LINKER_FLAGS: {
    get() { return this[EXE_LINKER_FLAGS]; },
    set(value) { this[EXE_LINKER_FLAGS] = value; },
    enumerable: true,
  },
});

SystemVariables.defineVariable = function(scope, name, descriptor) {
  if (!scope[DEFINE_MAP])
    scope[DEFINE_MAP] = {};

  const type = descriptor.type || typeof descriptor.value;

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

  let ensureValue;
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
    ensureValue = (value) => {
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
    /* */;
  else
    throw new Error(`Unknown ${type} type of ${name} variable`);

  if (descriptor.hasOwnProperty("value")) {
    defineEntry.initValue = (type === "array") ? descriptor.value : ensureValue(descriptor.value);
  }
  else {
    defineEntry.initValue = (type === "array") ? [] : null;
  }

  const { symbol } = defineEntry;
  const desc = {
    configurable: true,
    enumerable: true,
    get() { return this[symbol] },
  };

  if (ensureValue)
    desc.set = function(value) { this[symbol] = ensureValue(value) };

  Object.defineProperty(scope, name, desc);
}

SystemVariables.defineVariables = function(scope, descriptors) {
  for (const [ name, descriptor ] of Object.entries(descriptors))
    SystemVariables.defineVariable(scope, name, descriptor);
}

SystemVariables.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

SystemVariables.prototype.clone = function() {
  const o = Object.create(SystemVariables.prototype);

  o[MODULE_PATH]           = Array.from(this[MODULE_PATH]);
  o[ASM_COMPILER]          = this[ASM_COMPILER];
  o[ASM_FLAGS]             = [ ...this[ASM_FLAGS] ];
  o[ASM_FLAGS_DEBUG]       = [ ...this[ASM_FLAGS_DEBUG] ];
  o[ASM_FLAGS_RELEASE]     = [ ...this[ASM_FLAGS_RELEASE] ];
  o[C_COMPILER]            = this[C_COMPILER];
  o[C_FLAGS]               = [ ...this[C_FLAGS] ];
  o[C_FLAGS_DEBUG]         = [ ...this[C_FLAGS_DEBUG] ];
  o[C_FLAGS_RELEASE]       = [ ...this[C_FLAGS_RELEASE] ];
  o[CXX_COMPILER]          = this[CXX_COMPILER];
  o[CXX_FLAGS]             = [ ...this[CXX_FLAGS] ];
  o[CXX_FLAGS_DEBUG]       = [ ...this[CXX_FLAGS_DEBUG] ];
  o[CXX_FLAGS_RELEASE]     = [ ...this[CXX_FLAGS_RELEASE] ];
  o[AR]                    = this[AR];
  o[RANLIB]                = this[RANLIB];
  o[LINKER]                = this[LINKER];
  o[NM]                    = this[NM];
  o[OBJCOPY]               = this[OBJCOPY];
  o[OBJDUMP]               = this[OBJDUMP];
  o[STRIP]                 = this[STRIP];
  o[OBJECT_LIBRARY_PREFIX] = this[OBJECT_LIBRARY_PREFIX];
  o[OBJECT_LIBRARY_SUFFIX] = this[OBJECT_LIBRARY_SUFFIX];
  o[OBJECT_LINKER_FLAGS]   = [ ...this[OBJECT_LINKER_FLAGS] ];
  o[STATIC_LIBRARY_PREFIX] = this[STATIC_LIBRARY_PREFIX];
  o[STATIC_LIBRARY_SUFFIX] = this[STATIC_LIBRARY_SUFFIX];
  o[STATIC_LINKER_FLAGS]   = [ ...this[STATIC_LINKER_FLAGS] ];
  o[SHARED_LIBRARY_PREFIX] = this[SHARED_LIBRARY_PREFIX];
  o[SHARED_LIBRARY_SUFFIX] = this[SHARED_LIBRARY_SUFFIX];
  o[SHARED_LINKER_FLAGS]   = [ ...this[SHARED_LINKER_FLAGS] ];
  o[EXECUTABLE_SUFFIX]     = this[EXECUTABLE_SUFFIX];
  o[EXE_LINKER_FLAGS]      = [ ...this[EXE_LINKER_FLAGS] ];

  for (const { symbol } of Object.values(this[DEFINE_MAP] || {})) {
    o[symbol] = Array.isArray(this[symbol]) ? Array.from(this[symbol]) : this[symbol];
  }

  return Object.seal(o);
}

module.exports = {
  SystemVariables,
};
