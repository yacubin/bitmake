/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const NAME                = Symbol("NAME");
const TYPE                = Symbol("TYPE");
const PREFIX              = Symbol("PREFIX");
const SUFFIX              = Symbol("SUFFIX");
const OUTPUT_NAME         = Symbol("OUTPUT_NAME");

export enum TargetType {
  Unknown = "Unknown",
  StaticLibrary = "StaticLibrary",
  SharedLibrary = "SharedLibrary",
  ObjectLibrary = "ObjectLibrary",
  Executable = "Executable",
};

export class TargetStruct {
  private [NAME]: string;
  private [TYPE]: TargetType;
  private [OUTPUT_NAME]: string;
  private [PREFIX]: string;
  private [SUFFIX]: string

  constructor(name: string) {
    this[NAME] = name;
    this[TYPE] = TargetType.Unknown;
    this[OUTPUT_NAME] = name;
    this[PREFIX] = "";
    this[SUFFIX] = "";
  }

  get NAME() {
    return this[NAME];
  }

  get TYPE() {
    return this[TYPE];
  }

  set TYPE(value: TargetType) {
    if (this[TYPE] === value)
      return;
    if (this[TYPE] !== TargetType.Unknown)
      throw new Error(`${this[TYPE]} "${this[NAME]}" target cannot be change to ${value}`);
    this[TYPE] = value;
  }

  public get OUTPUT_NAME() {
    return this[OUTPUT_NAME];
  }

  public set OUTPUT_NAME(value: string) {
    this[OUTPUT_NAME] = value;
  }

  public get PREFIX() {
    return this[PREFIX];
  }

  public set PREFIX(value: string) {
    this[PREFIX] = value;
  }

  public get SUFFIX() {
    return this[SUFFIX];
  }

  public set SUFFIX(value: string) {
    this[SUFFIX] = value;
  }

  public get FILE_NAME(): string {
    return this[PREFIX] + this[OUTPUT_NAME] + this[SUFFIX];
  }

  public toJSON(): object {
    return {
      NAME: this[NAME],
      OUTPUT_NAME: this[OUTPUT_NAME],
      PREFIX: this[PREFIX],
      SUFFIX: this[SUFFIX],
      FILE_NAME: this.FILE_NAME,
    }
  }
};
