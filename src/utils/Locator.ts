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

import { FILE_SCHEME, IMPORT_SCHEME } from "@/utils/UrlScheme";
import { SimpleObject } from "@/core/SimpleObject";
import { requireResolve } from "@/utils/Module";

const PATH = Symbol("PATH");

function isAbsolute(str: string): boolean {
  if (str.startsWith("/"))
    return true;
  if (str.match(/^[a-zA-Z]:[\\/]/))
    return true;
  /* \\localhost */
  /* \\wsl.localhost\Ubuntu\opt */
  return false;
}

function isLocator(str: string): boolean {
  if (str.startsWith(FILE_SCHEME) || str.startsWith(IMPORT_SCHEME))
    return true;
  return isAbsolute(str);
}

function toURLString(str: string) {
  if (str.startsWith(FILE_SCHEME) || str.startsWith(IMPORT_SCHEME))
   return str;

  if (isAbsolute(str))
    return url.pathToFileURL(str).toString();
  
  throw new Error(`Not supported relative path of "${str}"`);
}

export class Locator {
  private [PATH]: string;

  protected constructor(urlString: string) {
    this[PATH] = urlString;
  }

  public join(...paths: Locator[] | string[]): Locator {
    const url = new URL(this[PATH]);
    url.pathname = path.posix.join(url.pathname, ...paths.map(i => {
      if (i instanceof Locator)
        return new URL(i[PATH]).pathname;
      if (typeof i === "string")
        return i.replaceAll(path.win32.sep, path.posix.sep);
      throw new Error(`Attempted to join to wrong type ${i} type`);
    }));
    return new Locator(url.toString());
  }

  public dirname() {
    const dirname = path.posix.dirname(this[PATH]);
    return new Locator(dirname);
  }

  public basename(): string {
    return path.posix.basename(this[PATH]);
  }

  public extname(): string {
    return path.posix.extname(this[PATH]);
  }

  public relative(to: Locator | string) {
    if (to instanceof Locator)
      to = to[PATH];

    const leftUrl = new URL(this[PATH]);
    const rightUrl = new URL(toURLString(to));

    if (leftUrl.protocol !== rightUrl.protocol)
        throw new Error(`Protocol ${leftUrl.protocol} did not match for ${to}`);

    if (leftUrl.host !== rightUrl.host)
        throw new Error(`Host ${leftUrl.host} did not match for ${to}`);

    return path.posix.relative(leftUrl.pathname, rightUrl.pathname);
  }

  public resolve(...paths: Array<Locator | string>): Locator {
    if (paths.length === 0)
      return this;

    let rootPath: string = this[PATH];
    const pathStrings: string[] = [];

    for (let i = paths.length - 1; i >= 0; i--) {
      const iter = paths[i];
      if (iter instanceof Locator) {
        rootPath = iter[PATH];
        break;
      }
      if (Locator.isLocator(iter)) {
        rootPath = toURLString(iter);
        break;
      }
      pathStrings.push(iter.replaceAll("\\", "/"));
    }

    const url = new URL(rootPath);
    url.pathname = path.posix.resolve(url.pathname, ...pathStrings);

    return new Locator(url.toString());
  }

  public match(regexp: RegExp) {
    return this[PATH].match(regexp);
  }

  public startsWith(searchString: string, position?: number): boolean {
    return this[PATH].startsWith(searchString, position);
  }

  public endsWith(searchString: string, endPosition?: number): boolean {
    return this[PATH].endsWith(searchString, endPosition);
  }

  public toString(): string {
    return url.fileURLToPath(this[PATH]);
  }

  public isPath() {
    if (this[PATH].startsWith(FILE_SCHEME))
      return true;
    if (this[PATH].startsWith(IMPORT_SCHEME))
      return true;
    return false;
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

  public static isLocator(value: any): boolean {
    if (value instanceof Locator)
      return true;
    if (typeof value === "string")
      return isLocator(value);
    return false;
  }

  public static ensureInstance(value: any): Locator {
    if (value instanceof Locator)
      return value;
    throw new Error(`The '${value}' is not a Locator`);
  }

  public static create(path: Locator | string): Locator {
    if (path instanceof Locator)
      return path;

    return Object.seal(new Locator(toURLString(path)));
  }
};

export class DirPath extends Locator {
  private constructor(dirname: string) {
    super(dirname);
  }

  public static create(dirname: Locator | string): DirPath {
    if (typeof dirname !== "string")
      dirname = dirname.toURLString();
    return new DirPath(toURLString(dirname));
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

export class FilePath extends Locator {
  private constructor(filepath: string) {
    super(filepath);
  }

  public static create(filepath: Locator | string): FilePath {
    if (typeof filepath !== "string")
      filepath = filepath.toURLString();
    return new FilePath(toURLString(filepath));
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
