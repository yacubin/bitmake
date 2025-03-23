"use strict";

const { DirPath } = require("./Path.js");
const { AbsolutePath } = require("###/utils/AbsolutePath.js");

const SYSTEM_NAME           = Symbol("SYSTEM_NAME");
const PROJECT_NAME          = Symbol("PROJECT_NAME");
const PROJECT_VERSION       = Symbol("PROJECT_VERSION");
const PROJECT_SOURCE_DIR    = Symbol("PROJECT_SOURCE_DIR");
const PROJECT_BINARY_DIR    = Symbol("PROJECT_BINARY_DIR");
const BUILD_TYPE            = Symbol("BUILD_TYPE");
const DESTDIR               = Symbol("DESTDIR");
const INSTALL_PREFIX        = Symbol("INSTALL_PREFIX");
const SCRIPT_FILE           = Symbol("SCRIPT_FILE");
const SOURCE_DIR            = Symbol("SOURCE_DIR");
const BINARY_DIR            = Symbol("BINARY_DIR");
const MODULE_PATH           = Symbol("MODULE_PATH");
const INCLUDES              = Symbol("INCLUDES");
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

function Scope() {
  this[SYSTEM_NAME]           = "Linux";
  this[PROJECT_NAME]          = "";
  this[PROJECT_VERSION]       = "";
  this[PROJECT_SOURCE_DIR]    = null;
  this[PROJECT_BINARY_DIR]    = null;
  this[BUILD_TYPE]            = "Debug";
  this[DESTDIR]               = "";
  this[INSTALL_PREFIX]        = DirPath.create("/usr");
  this[SCRIPT_FILE]           = null;
  this[SOURCE_DIR]            = null;
  this[BINARY_DIR]            = null;
  this[MODULE_PATH]           = [];
  this[INCLUDES]              = [];
  this[ASM_COMPILER]          = "clang";
  this[ASM_FLAGS]             = [];
  this[ASM_FLAGS_DEBUG]       = [ "-DNDEBUG" ];
  this[ASM_FLAGS_RELEASE]     = [];
  this[C_COMPILER]            = "clang";
  this[C_FLAGS]               = [];
  this[C_FLAGS_DEBUG]         = [ "-DNDEBUG" ];
  this[C_FLAGS_RELEASE]       = [];
  this[CXX_COMPILER]          = "clang++";
  this[CXX_FLAGS]             = [];
  this[CXX_FLAGS_DEBUG]       = [ "-DNDEBUG" ];
  this[CXX_FLAGS_RELEASE]     = [];
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
}

Scope.create = function(other) {
  return Object.seal(new Scope(other));
}

Scope.prototype = Object.create(Object.prototype, {
  constructor: {
    value: Scope,
    enumerable: false,
  },
  SYSTEM_NAME: {
    get () { return this[SYSTEM_NAME]; },
    enumerable: true,
  },
  PROJECT_NAME: {
    get () { return this[PROJECT_NAME]; },
    enumerable: true,
  },
  PROJECT_VERSION: {
    get () { return this[PROJECT_VERSION]; },
    enumerable: true,
  },
  PROJECT_SOURCE_DIR: {
    get () { return this[PROJECT_SOURCE_DIR]; },
    enumerable: true,
  },
  PROJECT_BINARY_DIR: {
    get () { return this[PROJECT_BINARY_DIR]; },
    enumerable: true,
  },
  BUILD_TYPE: {
    get () { return this[BUILD_TYPE]; },
    enumerable: true,
  },
  DESTDIR: {
    get () { return this[DESTDIR]; },
    enumerable: true,
  },
  INSTALL_PREFIX: {
    get () { return this[INSTALL_PREFIX]; },
    set(value) { this[INSTALL_PREFIX] = DirPath.create(value); },
    enumerable: true,
  },
  SCRIPT_FILE: {
    get () { return this[SCRIPT_FILE]; },
    enumerable: true,
  },
  SOURCE_DIR: {
    get () { return this[SOURCE_DIR]; },
    enumerable: true,
  },
  BINARY_DIR: {
    get () { return this[BINARY_DIR]; },
    enumerable: true,
  },
  MODULE_PATH: {
    get () { return this[MODULE_PATH]; },
    enumerable: true,
  },
  ASM_COMPILER: {
    get () { return this[ASM_COMPILER]; },
    enumerable: true,
  },
  ASM_FLAGS: {
    get () { return this[ASM_FLAGS]; },
    enumerable: true,
  },
  ASM_FLAGS_DEBUG: {
    get () { return this[ASM_FLAGS_DEBUG]; },
    enumerable: true,
  },
  ASM_FLAGS_RELEASE: {
    get () { return this[ASM_FLAGS_RELEASE]; },
    enumerable: true,
  },
  C_COMPILER: {
    get () { return this[C_COMPILER]; },
    enumerable: true,
  },
  C_FLAGS: {
    get () { return this[C_FLAGS]; },
    enumerable: true,
  },
  C_FLAGS_DEBUG: {
    get () { return this[C_FLAGS_DEBUG]; },
    enumerable: true,
  },
  C_FLAGS_RELEASE: {
    get () { return this[C_FLAGS_RELEASE]; },
    enumerable: true,
  },
  CXX_COMPILER: {
    get () { return this[CXX_COMPILER]; },
    enumerable: true,
  },
  CXX_FLAGS: {
    get () { return this[CXX_FLAGS]; },
    enumerable: true,
  },
  CXX_FLAGS_DEBUG: {
    get () { return this[CXX_FLAGS_DEBUG]; },
    enumerable: true,
  },
  CXX_FLAGS_RELEASE: {
    get () { return this[CXX_FLAGS_RELEASE]; },
    enumerable: true,
  },
  AR: {
    get () { return this[AR]; },
    enumerable: true,
  },
  RANLIB: {
    get () { return this[RANLIB]; },
    enumerable: true,
  },
  LINKER: {
    get () { return this[LINKER]; },
    enumerable: true,
  },
  NM: {
    get () { return this[NM]; },
    enumerable: true,
  },
  OBJCOPY: {
    get () { return this[OBJCOPY]; },
    enumerable: true,
  },
  OBJDUMP: {
    get () { return this[OBJDUMP]; },
    enumerable: true,
  },
  STRIP: {
    get () { return this[STRIP]; },
    enumerable: true,
  },
  INCLUDES: {
    get () { return this[INCLUDES]; },
    enumerable: true,
  },
  OBJECT_LIBRARY_PREFIX: {
    get () { return this[OBJECT_LIBRARY_PREFIX]; },
    enumerable: true,
  },
  OBJECT_LIBRARY_SUFFIX: {
    get () { return this[OBJECT_LIBRARY_SUFFIX]; },
    enumerable: true,
  },
  OBJECT_LINKER_FLAGS: {
    get() { return this[OBJECT_LINKER_FLAGS]; },
    enumerable: true,
  },
  STATIC_LIBRARY_PREFIX: {
    get () { return this[STATIC_LIBRARY_PREFIX]; },
    enumerable: true,
  },
  STATIC_LIBRARY_SUFFIX: {
    get () { return this[STATIC_LIBRARY_SUFFIX]; },
    enumerable: true,
  },
  STATIC_LINKER_FLAGS: {
    get() { return this[STATIC_LINKER_FLAGS]; },
    enumerable: true,
  },
  SHARED_LIBRARY_PREFIX: {
    get() { return this[SHARED_LIBRARY_PREFIX]; },
    enumerable: true,
  },
  SHARED_LIBRARY_SUFFIX: {
    get() { return this[SHARED_LIBRARY_SUFFIX]; },
    enumerable: true,
  },
  SHARED_LINKER_FLAGS: {
    get() { return this[SHARED_LINKER_FLAGS]; },
    enumerable: true,
  },
  EXECUTABLE_SUFFIX: {
    get() { return this[EXECUTABLE_SUFFIX]; },
    enumerable: true,
  },
  EXE_LINKER_FLAGS: {
    get() { return this[EXE_LINKER_FLAGS]; },
    enumerable: true,
  },
});

Scope.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

Scope.prototype.clone = function() {
  const o = new Scope;

  o[SYSTEM_NAME]           = this.SYSTEM_NAME;
  o[PROJECT_NAME]          = this.PROJECT_NAME;
  o[PROJECT_VERSION]       = this.PROJECT_VERSION;
  o[PROJECT_SOURCE_DIR]    = AbsolutePath.create(this.PROJECT_SOURCE_DIR);
  o[PROJECT_BINARY_DIR]    = AbsolutePath.create(this.PROJECT_BINARY_DIR);
  o[BUILD_TYPE]            = this.BUILD_TYPE;
  o[DESTDIR]               = AbsolutePath.create(this.DESTDIR);
  o[INSTALL_PREFIX]        = this.INSTALL_PREFIX;
  o[SCRIPT_FILE]           = AbsolutePath.create(this.SCRIPT_FILE);
  o[SOURCE_DIR]            = AbsolutePath.create(this.SOURCE_DIR);
  o[BINARY_DIR]            = AbsolutePath.create(this.BINARY_DIR);
  o[MODULE_PATH]           = this.MODULE_PATH;
  o[INCLUDES]              = this.INCLUDES;
  o[ASM_COMPILER]          = this.ASM_COMPILER;
  o[ASM_FLAGS]             = this.ASM_FLAGS;
  o[ASM_FLAGS_DEBUG]       = this.ASM_FLAGS_DEBUG;
  o[ASM_FLAGS_RELEASE]     = this.ASM_FLAGS_RELEASE;
  o[C_COMPILER]            = this.C_COMPILER;
  o[C_FLAGS]               = this.C_FLAGS;
  o[C_FLAGS_DEBUG]         = this.C_FLAGS_DEBUG;
  o[C_FLAGS_RELEASE]       = this.C_FLAGS_RELEASE;
  o[CXX_COMPILER]          = this.CXX_COMPILER;
  o[CXX_FLAGS]             = this.CXX_FLAGS;
  o[CXX_FLAGS_DEBUG]       = this.CXX_FLAGS_DEBUG;
  o[CXX_FLAGS_RELEASE]     = this.CXX_FLAGS_RELEASE;
  o[AR]                    = this.AR;
  o[RANLIB]                = this.RANLIB;
  o[LINKER]                = this.LINKER;
  o[NM]                    = this.NM;
  o[OBJCOPY]               = this.OBJCOPY;
  o[OBJDUMP]               = this.OBJDUMP;
  o[STRIP]                 = this.STRIP;
  o[OBJECT_LIBRARY_PREFIX] = this.OBJECT_LIBRARY_PREFIX;
  o[OBJECT_LIBRARY_SUFFIX] = this.OBJECT_LIBRARY_SUFFIX;
  o[OBJECT_LINKER_FLAGS]   = this.OBJECT_LINKER_FLAGS;
  o[STATIC_LIBRARY_PREFIX] = this.STATIC_LIBRARY_PREFIX;
  o[STATIC_LIBRARY_SUFFIX] = this.STATIC_LIBRARY_SUFFIX;
  o[STATIC_LINKER_FLAGS]   = this.STATIC_LINKER_FLAGS;
  o[SHARED_LIBRARY_PREFIX] = this.SHARED_LIBRARY_PREFIX;
  o[SHARED_LIBRARY_SUFFIX] = this.SHARED_LIBRARY_SUFFIX;
  o[SHARED_LINKER_FLAGS]   = this.SHARED_LINKER_FLAGS;
  o[EXECUTABLE_SUFFIX]     = this.EXECUTABLE_SUFFIX;
  o[EXE_LINKER_FLAGS]      = this.EXE_LINKER_FLAGS;

  return Object.seal(o);
}

module.exports = {
  Scope,
};
