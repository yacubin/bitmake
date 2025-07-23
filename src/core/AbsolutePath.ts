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

import { Path } from "@/utils/Path";
import { FILE_SCHEME, IMPORT_SCHEME } from "@/utils/UrlScheme";
import { SimpleObject } from "@/core/SimpleObject";
import { requireResolve } from "@/utils/Module";

const PATH = Symbol("PATH");

function toPathString(pth: string | AbsolutePath) {
  if (typeof pth !== "string")
    return pth.toPath();
  if (pth.startsWith(FILE_SCHEME))
    return url.fileURLToPath(pth);
  return pth;
}

export class AbsolutePath {
  private [PATH]: string;

  protected constructor(filepath: string) {
    if (filepath.startsWith(FILE_SCHEME) || filepath.startsWith(IMPORT_SCHEME)) {
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
    const filepath = Path.join(this.toPath(), ...paths.map(i => toPathString(i)));
    return AbsolutePath.create(filepath);
  }

  public dirname() {
    return AbsolutePath.create(path.posix.dirname(this[PATH]));
  }

  public basename() {
    return path.posix.basename(this[PATH]);
  }

  public relative(to: AbsolutePath | string) {
    return Path.relative(this.toPath(), toPathString(to));
  }

  public resolve(...paths: Array<AbsolutePath | string>) {
    return AbsolutePath.create(Path.resolve(this.toPath(), ...paths.map(i => toPathString(i))));
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
    if (filepath.startsWith(FILE_SCHEME))
      return true;
    return Path.isAbsolute(filepath);
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

  public static create(dirname: DirPath | AbsolutePath | string): DirPath {
    if (typeof dirname !== "string")
      dirname = dirname.toURLString();
    return new DirPath(dirname);
  }

  public static fromJSON(object: SimpleObject) {
    return new DirPath(object.url as string);
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

  public static create(filepath: FilePath | AbsolutePath | string): FilePath {
    if (typeof filepath !== "string")
      filepath = filepath.toURLString();
    return new FilePath(filepath);
  }

  public static fromJSON(object: SimpleObject) {
    return new FilePath(object.url as string);
  }

  public toJSON(): SimpleObject {
    return {
      type: FilePath.name,
      url: this.toURLString(),
    };
  }
};
