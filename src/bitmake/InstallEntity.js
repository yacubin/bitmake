"use strict";

const { InterfaceTarget } = require("./InterfaceTarget.js");
const { AbsolutePath } = require("@/utils/AbsolutePath.js");
const { FilePath, DirPath } = require("@/core/Path");

const VALUE       = Symbol("VALUE");
const DESTINATION = Symbol("DESTINATION");
const BASE_DIR    = Symbol("BASE_DIR");

function InstallEntity(scope, value, params) {
  let destination;
  let baseDir;
  if (typeof params === "string")
    destination = params;
  else if (params) {
    destination = params.destination;
    baseDir = params.baseDir;
  }

  if (!destination)
    throw new Error(`Parameter destination is not specified`);

  if (baseDir)
    baseDir = scope.SOURCE_DIR.resolve(baseDir);

  if (typeof value === "string" || value instanceof AbsolutePath) {
    value = scope.SOURCE_DIR.resolve(value.toString());
    value = FilePath.create(value.toString());
    baseDir = baseDir || value.dirname();
  }
  else if (!(value instanceof InterfaceTarget)) {
    throw new Error(`Not supportet value of ${value}`);
  }

  this[VALUE] = value;
  this[DESTINATION] = DirPath.create(scope.INSTALL_PREFIX.resolve(destination.toString()));
  this[BASE_DIR] = baseDir ? DirPath.create(baseDir.toString()) : null;
}

InstallEntity.create = (scope, value, params) => {
  return Object.seal(new InstallEntity(scope, value, params));
}

InstallEntity.prototype = Object.create(Object.prototype, {
  constructor: {
    value: InstallEntity,
    enumerable: false,
  },
  VALUE: {
    get () { return this[VALUE]; },
    enumerable: true,
  },
  DESTINATION: {
    get () { return this[DESTINATION]; },
    enumerable: true,
  },
  BASE_DIR: {
    get () { return this[BASE_DIR]; },
    enumerable: true,
  },
});

InstallEntity.prototype.toJSON = function() {
  const json = {};
  for (const key in this)
    json[key] = this[key];
  return json;
}

module.exports = {
  InstallEntity,
};
