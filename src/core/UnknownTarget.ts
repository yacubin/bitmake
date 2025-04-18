/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const NAME = Symbol("NAME");
const INCLUDES = Symbol("INCLUDES");
const SOURCES = Symbol("SOURCES");
const DEFINES = Symbol("DEFINES");
const COMPILE_OPTIONS = Symbol("COMPILE_OPTIONS");
const LINK_OPTIONS = Symbol("LINK_OPTIONS");

export class UnknownTarget {
  private [NAME]: string;
  private [INCLUDES]: any[];
  private [SOURCES]: any[];
  private [DEFINES]: any[];
  private [COMPILE_OPTIONS]: any[];
  private [LINK_OPTIONS]: any[];

  private constructor(name: string) {
    this[NAME] = name;
    this[INCLUDES] = [];
    this[SOURCES] = [];
    this[DEFINES] = [];
    this[COMPILE_OPTIONS] = [];
    this[LINK_OPTIONS] = [];
  }

  public static create(name: string) {
    return Object.seal(new UnknownTarget(name));
  }

  public static ensureInstance(value: any) {
    if (value instanceof UnknownTarget)
      return value;
    throw new Error(`The '${value}' is not a UnknownTarget`);
  }

  public get NAME () {
    return this[NAME];
  }

  public get INCLUDES () {
    return this[INCLUDES];
  }

  public get SOURCES () {
    return this[SOURCES];
  }

  public get DEFINES () {
    return this[DEFINES];
  }

  public get COMPILE_OPTIONS () {
    return this[COMPILE_OPTIONS];
  }

  public get LINK_OPTIONS () {
    return this[LINK_OPTIONS];
  }

  public toJSON(): object {
    return {
      NAME: this.NAME,
      INCLUDES: this.INCLUDES,
      SOURCES: this.SOURCES,
      DEFINES: this.DEFINES,
      COMPILE_OPTIONS: this.COMPILE_OPTIONS,
      LINK_OPTIONS: this.LINK_OPTIONS,
    };
  }

  public toString(): string {
    return "${" + this[NAME] + "}";
  }
};
