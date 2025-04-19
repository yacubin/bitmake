/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";
import url from "node:url";

const PATH = Symbol("PATH");

enum PathType {
  DirType,
  FileType,
};

const _pathMap = new Map<string, PathType>();

export class AbsolutePath {
  private [PATH]: string;

  private constructor(filepath: string) {
    if (!path.isAbsolute(filepath))
      throw new Error(`Not supported relative path of "${filepath}"`);
    this[PATH] = filepath;
  }

  public join(...paths: Array<AbsolutePath | string>) {
    const filepath = path.posix.join(this[PATH], ...paths.map(i => i.toString()));
    return AbsolutePath.create(filepath);
  }

  public dirname() {
    return AbsolutePath.create(path.posix.dirname(this[PATH]));
  }

  public basename() {
    return path.basename(this[PATH]);
  }

  public relative(to: AbsolutePath | string) {
    return path.posix.relative(this[PATH],(to instanceof AbsolutePath) ? to[PATH] : to);
  }

  public resolve(...paths: Array<AbsolutePath | string>) {
    return AbsolutePath.create(path.posix.resolve(this[PATH], ...paths.map(i => i.toString())));
  }

  public match(regexp: RegExp) {
    return this[PATH].match(regexp);
  }

  public toURL() {
    return url.pathToFileURL(this[PATH]);
  }

  public toURLString() {
    return this.toURL().toString();
  }

  public toString() {
    return this[PATH];
  }

  public valueOf() {
    return this[PATH];
  }

  public toJSON() {
    return this[PATH];
  }

  public static isAbsolute(filepath: AbsolutePath | string) {
    if (filepath instanceof AbsolutePath)
      return true;
    return path.isAbsolute(filepath);
  }

  public static create(filepath: AbsolutePath | string) {
    if (filepath instanceof AbsolutePath)
      return filepath;
    if (typeof filepath !== "string")
      throw new Error(`Not correct type of ${filepath}`);
    return new AbsolutePath(filepath);
  }

  public static ensureInstance(value: any): AbsolutePath {
    if (value instanceof AbsolutePath)
      return value;
    throw new Error(`The '${value}' is not a AbsolutePath`);
  }

  public static createDir(filepath: AbsolutePath | string) {
    const key = filepath.toString();
    const type = _pathMap.get(key);
    if (type === undefined)
      _pathMap.set(key, PathType.DirType);
    else if (type !== PathType.DirType)
      throw new Error(`The '${filepath}' is not a DirPath`);
    return AbsolutePath.create(filepath);
  }

  public static createFile(filepath: AbsolutePath | string) {
    const key = filepath.toString();
    const type = _pathMap.get(key);
    if (type === undefined)
      _pathMap.set(key, PathType.FileType);
    else if (type !== PathType.FileType)
      throw new Error(`The '${filepath}' is not a FilePath`);
    return AbsolutePath.create(filepath);
  }
};

class BasePath {
  private [PATH]: string;

  protected constructor(pathStr: string) {
    if (!path.isAbsolute(pathStr))
      throw new Error(`Not supported relative path of "${pathStr}"`);
    this[PATH] = pathStr;
  }

  public match(regexp: RegExp) {
    return this[PATH].match(regexp);
  }

  public join(...paths: Array<any>) {
    return path.posix.join(this[PATH], ...paths.map(i => i.toString()));
  }

  public dirname() {
    return path.posix.dirname(this[PATH]);
  }

  public basename() {
    return path.basename(this[PATH]);
  }

  public relative(to: any) {
    return path.posix.relative(this[PATH], to.toString());
  }

  public resolve(...paths: Array<any>) {
    return path.posix.resolve(this[PATH], ...paths.map(i => i.toString()));
  }
  
  public toURL() {
    return url.pathToFileURL(this[PATH]);
  }
  
  public get PATH(): string {
    return this[PATH];
  }

  public toString() {
    return this[PATH];
  }

  public toJSON() {
    return this[PATH];
  }
};

const _paths = new Map<string, BasePath>();

export class FilePath extends BasePath {
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

export class DirPath extends BasePath {
  private constructor(pathStr: string) {
    super(pathStr);
  }

  public static ensureInstance(value: any): DirPath {
    if (value instanceof DirPath)
      return value;
    throw new Error(`The '${value}' is not a DirPath`);
  }

  public static create(path: any) {
    if (path instanceof DirPath)
      return path;

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
