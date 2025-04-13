"use strict";

const { SourceFile } = require("@/bitmake/SourceFile.js");

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

SourceFileList.prototype.addDefinitions = function(...definitions) {
  for (const iter of definitions.flat())
    this[SOURCES].forEach(i => i.DEFINES.push(iter));
}

SourceFileList.prototype.addCompileFlags = function(...flags) {
  for (const iter of flags.flat())
    this[SOURCES].forEach(i => i.COMPILE_FLAGS.push(iter));
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
