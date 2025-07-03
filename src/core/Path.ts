/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import url from "node:url";
import { Path } from "@/utils/Path";
import { FILE_SCHEME } from "@/utils/UrlScheme";
import path from "node:path";

const PATH = Symbol("PATH");

const _paths = new Map<string, DirPath | FilePath>();

export class AbsolutePath {
  private [PATH]: string;

  protected constructor(filepath: string) {
    if (filepath.startsWith(FILE_SCHEME)) {
      this[PATH] = filepath;
    }
    else if (Path.isAbsolute(filepath)) {
      this[PATH] = url.pathToFileURL(filepath).toString();
    }
    else {
      throw new Error(`Not supported relative path of "${filepath}"`);
    }
  }

  public join(...paths: Array<AbsolutePath | string>) {
    const filepath = Path.join(url.fileURLToPath(this[PATH]), ...paths.map(i => i.toString()));
    return AbsolutePath.create(filepath);
  }

  public dirname() {
    return DirPath.create(path.posix.dirname(this[PATH]));
  }

  public basename() {
    return path.posix.basename(this[PATH]);
  }

  public relative(to: AbsolutePath | string) {
    return Path.relative(url.fileURLToPath(this[PATH]), AbsolutePath.create(to).toString());
  }

  public resolve(...paths: Array<AbsolutePath | string>) {
    return AbsolutePath.create(Path.resolve(url.fileURLToPath(this[PATH]), ...paths.map(i => i.toString())));
  }

  public match(regexp: RegExp) {
    return this[PATH].match(regexp);
  }

  public toString() {
    return url.fileURLToPath(this[PATH]);
  }

  public valueOf() {
    return url.fileURLToPath(this[PATH]);
  }

  public toJSON() {
    return this[PATH];
  }

  public static isAbsolute(filepath: AbsolutePath | string) {
    if (filepath instanceof AbsolutePath)
      return true;
    return Path.isAbsolute(filepath);
  }

  public static ensureInstance(value: any): AbsolutePath {
    if (value instanceof AbsolutePath)
      return value;
    throw new Error(`The '${value}' is not a AbsolutePath`);
  }

  public static create(path: AbsolutePath | string): AbsolutePath | DirPath | FilePath {
    const result = _paths.get(path.toString());
    if (result)
      return result;

    if (path instanceof AbsolutePath)
      return path;

    return Object.seal(new AbsolutePath(path));
  }
};

export class FilePath extends AbsolutePath {
  private constructor(pathStr: string) {
    super(pathStr);
  }

  public static ensureInstance(value: any): FilePath {
    if (value instanceof FilePath)
      return value;
    throw new Error(`The '${value}' is not a FilePath`);
  }
  
  public static create(path: any): FilePath {
    if (path instanceof FilePath)
      return path;

    if (path instanceof AbsolutePath)
      path = path.toString();

    if (typeof path !== "string")
      throw new Error(`The '${path}' is not a string`);

    let filePath = _paths.get(path);
    if (filePath)
      return FilePath.ensureInstance(filePath);

    filePath = Object.seal(new FilePath(path));
    _paths.set(path, filePath);

    return filePath;
  }
}

export class DirPath extends AbsolutePath {
  private constructor(pathStr: string) {
    super(pathStr);
  }

  public static ensureInstance(value: any): DirPath {
    if (value instanceof DirPath)
      return value;
    throw new Error(`The '${value}' is not a DirPath`);
  }

  public static create(path: any): DirPath {
    if (path instanceof DirPath)
      return path;

    if (path instanceof AbsolutePath)
      path = path.toString();

    if (typeof path !== "string")
      throw new Error(`The '${path}' is not a string`);

    let dirPath = _paths.get(path);
    if (dirPath)
      return DirPath.ensureInstance(dirPath);

    dirPath = Object.seal(new DirPath(path));
    _paths.set(path, dirPath);

    return dirPath;
  }
};
