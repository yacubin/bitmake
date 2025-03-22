"use strict";

const NAME         = Symbol("NAME");
const PATH         = Symbol("PATH");

function IncludeDirectory(scope, dir) {
  this[NAME] = dir.toString();
  this[PATH] = scope.SOURCE_DIR.resolve(dir);
}

IncludeDirectory.create = function(scope, dir) {
  return Object.seal(new IncludeDirectory(scope, dir));
}

IncludeDirectory.prototype = Object.create(Object.prototype, {
  constructor: {
    value: IncludeDirectory,
    enumerable: false,
  },
  NAME: {
    get() { return this[NAME]; },
    enumerable: true,
  },
  PATH: {
    get() { return this[PATH]; },
    enumerable: true,
  },
});

IncludeDirectory.prototype.toString = function() {
  return this[PATH].toString();
}

IncludeDirectory.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

module.exports = {
  IncludeDirectory,
};
