"use strict";

const path = require("node:path");
const url = require("node:url");

const PATH = Symbol("PATH");

const _paths = new Map;

function BasePath(_path) {
  if (!path.isAbsolute(_path))
    throw new Error(`Not supported relative path of "${_path}"`);
  this[PATH] = _path;
}

BasePath.create = (path) => {
  return Object.seal(new BasePath(path)); // ?
}

BasePath.prototype = Object.create(Object.prototype, {
  constructor: {
    value: BasePath,
    enumerable: false,
  },
  PATH: {
    get() { return this[PATH]; },
    enumerable: true,
  },
});

BasePath.prototype.toString = function() {
  return this[PATH];
}

BasePath.prototype.toJSON = function() {
  return this[PATH];
}

BasePath.prototype.join = function(...paths) {
  return path.posix.join(this[PATH], ...paths.map(i => i.toString()));
}

BasePath.prototype.dirname = function() {
  return path.posix.dirname(this[PATH]);
}

BasePath.prototype.basename = function() {
  return path.basename(this[PATH]);
}

BasePath.prototype.relative = function(to) {
  return path.posix.relative(this[PATH], to.toString());
}

BasePath.prototype.resolve = function(...paths) {
  return path.posix.resolve(this[PATH], ...paths.map(i => i.toString()));
}

BasePath.prototype.isParentDir = function(dirpath) {
  return this[PATH].startsWith(dirpath.toString());
}

BasePath.prototype.toURL = function() {
  return url.pathToFileURL(this[PATH]);
}

function FilePath(path) {
  BasePath.call(this, path);
}

FilePath.create = (path) => {
  let filePath = _paths.get(path);
  if (filePath)
    return FilePath.ensureInstance(filePath);

  filePath = Object.seal(new FilePath(path));
  _paths.set(path, filePath);

  return filePath;
}

FilePath.ensureInstance = (value) => {
  if (value instanceof FilePath)
    return value;
  throw new Error(`The '${value}' is not a FilePath`);
}

FilePath.prototype = Object.create(BasePath.prototype, {
  constructor: {
    value: FilePath,
    enumerable: false,
  },
});

function DirPath(path) {
  BasePath.call(this, path);
}

DirPath.create = (path) => {
  let dirPath = _paths.get(path);
  if (dirPath)
    return DirPath.ensureInstance(dirPath);

  dirPath = Object.seal(new DirPath(path));
  _paths.set(path, dirPath);

  return dirPath;
}

DirPath.ensureInstance = (value) => {
  if (value instanceof DirPath)
    return value;
  throw new Error(`The '${value}' is not a DirPath`);
}

DirPath.prototype = Object.create(BasePath.prototype, {
  constructor: {
    value: DirPath,
    enumerable: false,
  },
});

module.exports = {
  FilePath,
  DirPath,
};
