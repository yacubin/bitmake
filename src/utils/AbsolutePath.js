const path = require("node:path");
const url = require("node:url");

class AbsolutePath {
  _filepath;

  constructor(filepath) {
    if (!path.isAbsolute(filepath))
      throw new Error(`Not supported relative path of "${filepath}"`);
    this._filepath = filepath;
  }

  join(...paths) {
    const filepath = path.posix.join(this._filepath, ...paths.map(i => i.toString()));
    return new AbsolutePath(filepath);
  }

  dirname() {
    return new AbsolutePath(path.posix.dirname(this._filepath));
  }

  basename() {
    return path.basename(this._filepath);
  }

  relative(to) {
    if (to instanceof AbsolutePath)
      to = to._filepath;
    const filepath = path.posix.relative(this._filepath, to);
    return filepath;
  }

  resolve(...paths) {
    return new AbsolutePath(path.posix.resolve(this._filepath, ...paths.map(i => i.toString())));
  }

  isParentDir(dirpath) {
    const dir = AbsolutePath.create(dirpath);
    return this._filepath.startsWith(dir._filepath);
  }

  toURL() {
    return url.pathToFileURL(this._filepath);
  }

  toURLString() {
    return this.toURL().toString();
  }

  toString() {
    return this._filepath;
  }

  valueOf() {
    return this._filepath;
  }

  toJSON() {
    return this._filepath;
  }

  static isAbsolute(filepath) {
    return path.isAbsolute(filepath.toString());
  }

  static create(filepath) {
    if (filepath instanceof AbsolutePath)
      return filepath;
    if (typeof filepath !== "string")
      throw new Error(`Not correct type of ${filepath}`);
    return new AbsolutePath(filepath);
  }
};

function cloneAbsolutePath(value) {
  if (value instanceof AbsolutePath)
    return value;
  throw new Error(`The '${value}' is not a AbsolutePath`);
}

module.exports = {
  AbsolutePath,
  cloneAbsolutePath,
};
