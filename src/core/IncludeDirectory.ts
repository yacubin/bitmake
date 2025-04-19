/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const NAME = Symbol("NAME");
const PATH = Symbol("PATH");

export class IncludeDirectory {
  private [NAME]: any;
  private [PATH]: any;

  private constructor(dirname: any, baseDir: any) {
    this[NAME] = dirname.toString();
    this[PATH] = baseDir.resolve(dirname);
  }

  public static create(dirname: any, baseDir: any) {
    return Object.seal(new IncludeDirectory(dirname, baseDir));
  }

  get NAME() {
    return this[NAME];
  }

  get PATH() {
    return this[PATH];
  }

  toString() {
    return this[PATH].toString();
  }

  toJSON(): object {
    return {
      NAME: this.NAME,
      PATH: this.PATH,
    }
  }
};
