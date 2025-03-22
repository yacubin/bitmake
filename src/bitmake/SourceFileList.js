"use strict";

const { SourceFile } = require("###/bitmake/SourceFile.js");

const SOURCES = Symbol("SOURCES");

function SourceFileList(scope, sources) {
  this[SOURCES] = [];
  for (const iter of sources) {
    if (!(iter instanceof SourceFile))
      throw new Error(`Item ${iter} is not SourceFile`);
    this[SOURCES].push(iter);
  }
}

SourceFileList.prototype = Object.create(Object.prototype, {
  constructor: {
    value: SourceFile,
    enumerable: false,
  },
});

SourceFileList.prototype.addCompileFlags = function(flags) {
  this[SOURCES].forEach(i => i.COMPILE_FLAGS.push(flags));
}

SourceFileList.prototype.setInstallBaseDir = function(baseDir) {
  this[SOURCES].forEach(i => i.setInstallBaseDir(baseDir));
}

SourceFileList.prototype.setInstallDestination = function(destination) {
  this[SOURCES].forEach(i => i.setInstallDestination(destination));
}

SourceFileList.prototype.sourceAt = function(index) {
  return this[SOURCES][index];
}

SourceFileList.prototype.sourceCount = function(index) {
  return this[SOURCES].length;
}

SourceFileList.prototype.toJSON = function() {
  return this[SOURCES];
}

SourceFileList.create = function(scope, sources) {
  return Object.seal(new SourceFileList(scope, sources));
}

module.exports = {
  SourceFileList,
};
