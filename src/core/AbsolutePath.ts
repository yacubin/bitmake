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
import { FILE_SCHEME } from "@/utils/UrlScheme";
import { SimpleObject } from "@/core/SimpleObject";

const PATH = Symbol("PATH");

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
    return AbsolutePath.create(path.posix.dirname(this[PATH]));
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

  public toPath() {
    if (this[PATH].startsWith(FILE_SCHEME))
      return url.fileURLToPath(this[PATH]);
    throw new Error(`URL ${this[PATH]} can't convert to path`);
  }

  public valueOf() {
    return url.fileURLToPath(this[PATH]);
  }

  public toURLString() {
    return this[PATH];
  }

  public toJSON(): any {
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

  public static create(path: AbsolutePath | string): AbsolutePath {
    if (path instanceof AbsolutePath)
      return path;

    return Object.seal(new AbsolutePath(path));
  }
};

export class DirPath extends AbsolutePath {
  constructor(dirname: string) {
    super(dirname);
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
  constructor(filepath: string) {
    super(filepath);
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
