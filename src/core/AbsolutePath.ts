/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import os from "node:os";
import path from "node:path";
import url from "node:url";

import { FILE_SCHEME, IMPORT_SCHEME } from "@/utils/UrlScheme";
import { SimpleObject } from "@/core/SimpleObject";
import { requireResolve } from "@/utils/Module";

const PATH = Symbol("PATH");

const nativeSep = os.platform() === "win32" ? path.win32.sep : path.posix.sep;
const otherSep = os.platform() === "win32" ? path.posix.sep : path.win32.sep;

function isAbsolute(filepath: string): boolean {
  if (filepath.startsWith(FILE_SCHEME))
    return true;
  if (filepath.startsWith(IMPORT_SCHEME))
    return true;
  if (filepath.startsWith("/"))
    return true;
  if (filepath.match(/^[a-zA-Z]:[\\/]/))
    return true;
  /* \\localhost */
  /* \\wsl.localhost\Ubuntu\opt */
  return false;
}

function normalizePathSep(str: string) {
  return str.replaceAll(otherSep, nativeSep);
}

function toPathString(obj: string | AbsolutePath) {
  if (typeof obj !== "string")
    return obj.toPath();
  if (obj.startsWith(FILE_SCHEME))
    return url.fileURLToPath(obj);
  if (obj.startsWith(IMPORT_SCHEME))
    return requireResolve(obj.slice(IMPORT_SCHEME.length));
  return normalizePathSep(obj);
}

export class AbsolutePath {
  private [PATH]: string;

  protected constructor(filepath: string) {
    if (filepath.startsWith(FILE_SCHEME) || filepath.startsWith(IMPORT_SCHEME)) {
      this[PATH] = filepath;
    }
    else if (isAbsolute(filepath)) {
      this[PATH] = url.pathToFileURL(filepath).toString();
    }
    else {
      throw new Error(`Not supported relative path of "${filepath}"`);
    }
  }

  public join(...paths: Array<AbsolutePath | string>): AbsolutePath {
    const url = new URL(this[PATH]);
    url.pathname = path.posix.join(url.pathname, ...paths.map(i => {
      if (i instanceof AbsolutePath)
        return new URL(i[PATH]).pathname;
      if (typeof i === "string")
        return i.replaceAll(path.win32.sep, path.posix.sep);
      throw new Error(`Attempted to join to wrong type ${i} type`);
    }));
    return new AbsolutePath(url.toString());
  }

  public dirname() {
    const dirname = path.posix.dirname(this[PATH]);
    return new AbsolutePath(dirname);
  }

  public basename(): string {
    return path.posix.basename(this[PATH]);
  }

  public relative(to: AbsolutePath | string) {
    if (typeof to === "string")
      to = AbsolutePath.create(to);

    const leftUrl = new URL(this[PATH]);
    const rightUrl = new URL(to[PATH]);

    if (leftUrl.protocol !== rightUrl.protocol)
        throw new Error(`Protocol ${leftUrl.protocol} did not match for ${to}`);

    if (leftUrl.host !== rightUrl.host)
        throw new Error(`Host ${leftUrl.host} did not match for ${to}`);

    return path.posix.relative(leftUrl.pathname, rightUrl.pathname);
  }

  public resolve(...paths: Array<AbsolutePath | string>): AbsolutePath {
    if (paths.length === 0)
      return this;

    let rootPath: AbsolutePath = this;
    const pathStrings: string[] = [];

    for (let i = paths.length - 1; i >= 0; i--) {
      const iter = paths[i];
      if (iter instanceof AbsolutePath) {
        rootPath = iter;
        break;
      }
      if (AbsolutePath.isAbsolute(iter)) {
        rootPath = AbsolutePath.create(iter);
        break;
      }
      pathStrings.push(iter.replaceAll("\\", "/"));
    }

    const url = new URL(rootPath[PATH]);
    url.pathname = path.posix.resolve(url.pathname, ...pathStrings);

    return AbsolutePath.create(url.toString());
    // return AbsolutePath.create(Path.resolve(this.toPath(), ...paths.map(i => toPathString(i))));
  }

  public match(regexp: RegExp) {
    return this[PATH].match(regexp);
  }

  public toString(): string {
    return url.fileURLToPath(this[PATH]);
  }

  public toPath() {
    if (this[PATH].startsWith(FILE_SCHEME))
      return url.fileURLToPath(this[PATH]);
    if (this[PATH].startsWith(IMPORT_SCHEME))
      return requireResolve(this[PATH].slice(IMPORT_SCHEME.length));
    throw new Error(`URL ${this[PATH]} can't convert to path`);
  }

  public valueOf() {
    return url.fileURLToPath(this[PATH]);
  }

  public toURLString(): string {
    if (this[PATH].startsWith(IMPORT_SCHEME))
      return url.pathToFileURL(requireResolve(this[PATH].slice(IMPORT_SCHEME.length))).toString();
    return this[PATH];
  }

  public toJSON(): any {
    return this[PATH];
  }

  public static isAbsolute(filepath: AbsolutePath | string) {
    if (filepath instanceof AbsolutePath)
      return true;
    return isAbsolute(filepath);
  }

  public static ensureInstance(value: any): AbsolutePath {
    if (value instanceof AbsolutePath)
      return value;
    throw new Error(`The '${value}' is not a AbsolutePath`);
  }

  public static create(path: AbsolutePath | string): AbsolutePath {
    if (path instanceof AbsolutePath)
      return path;

    return Object.seal(new AbsolutePath(path));
  }
};

export class DirPath extends AbsolutePath {
  private constructor(dirname: string) {
    super(dirname);
  }

  public static create(dirname: AbsolutePath | string): DirPath {
    if (typeof dirname !== "string")
      dirname = dirname.toURLString();
    return new DirPath(dirname);
  }

  public static fromJSON(object: SimpleObject) {
    return DirPath.create(object.url as string);
  }

  public toJSON(): SimpleObject {
    return {
      type: DirPath.name,
      url: this.toURLString(),
    };
  }
};

export class FilePath extends AbsolutePath {
  private constructor(filepath: string) {
    super(filepath);
  }

  public static create(filepath: AbsolutePath | string): FilePath {
    if (typeof filepath !== "string")
      filepath = filepath.toURLString();
    return new FilePath(filepath);
  }

  public static fromJSON(object: SimpleObject) {
    return FilePath.create(object.url as string);
  }

  public toJSON(): SimpleObject {
    return {
      type: FilePath.name,
      url: this.toURLString(),
    };
  }
};
