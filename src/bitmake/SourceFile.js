"use strict";

const { ensureBoolean } = require("###/bitmake/StrictType.js");

const TARGET_SCOPE        = Symbol("TARGET_SCOPE");
const NAME                = Symbol("NAME");
const LANGUAGE            = Symbol("LANGUAGE");
const HEADER_FILE_ONLY    = Symbol("HEADER_FILE_ONLY");
const COMPILE_FLAGS       = Symbol("COMPILE_FLAGS");
const FILE                = Symbol("FILE");
const OBJECT_FILE         = Symbol("OBJECT_FILE");

const _languageExtensions = {
  ASM: [ ".asm", ".s" ],
  C:   [ ".c" ],
  CXX: [".cpp", ".cc", ".cxx" ],
};

function isSupportLanguage(language) {
  return _languageExtensions.hasOwnProperty(language);
}

function getFileLanguage(filename) {
  const filenameLowerCase = filename.toString().toLowerCase();
  for (const [language, extensions] of Object.entries(_languageExtensions)) {
    for (const iter of extensions) {
      if (filenameLowerCase.endsWith(iter))
        return language;
    }
  }
  return "";
}

function makeLanguage(value) {
  if (isSupportLanguage(value))
    return value;
  throw new Error(`Language "${value}" is not supported`);
}

function SourceFile(target, filename) {
  this[TARGET_SCOPE] = target.TARGET_SCOPE;

  this[NAME] = filename.toString();
  const fname = this[TARGET_SCOPE].SOURCE_DIR.resolve(filename);

  this[LANGUAGE] = getFileLanguage(fname);
  this[HEADER_FILE_ONLY] = !this[LANGUAGE];
  this[COMPILE_FLAGS] = [];
  this[FILE] = fname;

  if (this[LANGUAGE]) {
    let rfile;
    if (this[FILE].isParentDir(this[TARGET_SCOPE].BINARY_DIR))
      rfile = this[TARGET_SCOPE].BINARY_DIR.relative(this[FILE]);
    else if (this[FILE].isParentDir(this[TARGET_SCOPE].SOURCE_DIR))
      rfile = this[TARGET_SCOPE].SOURCE_DIR.relative(this[FILE]);
    else {
      const rfile1 = this[TARGET_SCOPE].BINARY_DIR.relative(this[FILE]);
      const rfile2 = this[TARGET_SCOPE].SOURCE_DIR.relative(this[FILE]);
      rfile = (rfile2.length < rfile1.length ? rfile2 : rfile1).replace("../", "__/");
    }
    this[OBJECT_FILE] = this[TARGET_SCOPE].BINARY_DIR.join("MakeFiles", target.NAME + ".dir",  rfile + ".obj");
  }
  else {
    this[OBJECT_FILE] = null;
  }
}

SourceFile.prototype = Object.create(Object.prototype, {
  constructor: {
    value: SourceFile,
    enumerable: false,
  },
  NAME: {
    get () { return this[NAME]; },
    enumerable: true,
  },
  LANGUAGE: {
    get () { return this[LANGUAGE]; },
    set(value) { this[LANGUAGE] = makeLanguage(value); },
    enumerable: true,
  },
  HEADER_FILE_ONLY: {
    get() { return this[HEADER_FILE_ONLY]; },
    set(value) { this[HEADER_FILE_ONLY] = ensureBoolean(value); },
    enumerable: true,
  },
  COMPILE_FLAGS: {
    get() { return this[COMPILE_FLAGS]; },
    enumerable: true,
  },
  FILE: {
    get() { return this[FILE]; },
    enumerable: true,
  },
  FILE_DIR: {
    get() { return this[FILE].dirname(); },
    enumerable: true,
  },
  FILE_NAME: {
    get() { return this[FILE].basename(); },
    enumerable: true,
  },
  OBJECT_FILE: {
    get() { return this[OBJECT_FILE]; },
    enumerable: true,
  },
  OBJECT_FILE_DIR: {
    get() { return this[OBJECT_FILE] ? this[OBJECT_FILE].dirname() : null; },
    enumerable: true,
  },
  OBJECT_FILE_NAME: {
    get() { return this[OBJECT_FILE] ? this[OBJECT_FILE].basename() : null; },
    enumerable: true,
  },
});

SourceFile.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

SourceFile.create = function(target, filename) {
  return Object.seal(new SourceFile(target, filename));
}

module.exports = {
  SourceFile,
};
