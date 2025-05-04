/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { DirPath, AbsolutePath } from "@/core/Path";

const PREFIX      = Symbol("PREFIX");
const SUFFIX      = Symbol("SUFFIX");
const OUTPUT_NAME = Symbol("OUTPUT_NAME");
const FILE_DIR    = Symbol("FILE_DIR");

export enum TargetType {
  Unknown = "Unknown",
  StaticLibrary = "StaticLibrary",
  SharedLibrary = "SharedLibrary",
  ObjectLibrary = "ObjectLibrary",
  Executable = "Executable",
};

export class TargetFile {
  private [FILE_DIR]?: DirPath
  private [PREFIX]?: string;
  private [OUTPUT_NAME]?: string;
  private [SUFFIX]?: string

  private constructor() {
  }

  public static create(): TargetFile {
    return Object.seal(new TargetFile);
  }

  public get outputName(): string | undefined {
    return this[OUTPUT_NAME];
  }

  public set outputName(value: string) {
    this[OUTPUT_NAME] = value;
  }

  public get prefix(): string | undefined {
    return this[PREFIX];
  }

  public set prefix(value: string) {
    this[PREFIX] = value;
  }

  public get suffix(): string | undefined {
    return this[SUFFIX];
  }

  public set suffix(value: string) {
    this[SUFFIX] = value;
  }

  public get fileName(): string | undefined {
    if (this[PREFIX] === undefined || this[OUTPUT_NAME] === undefined || this[SUFFIX] === undefined)
      return undefined;
    return this[PREFIX] + this[OUTPUT_NAME] + this[SUFFIX];
  }

  public get fileDir(): DirPath | undefined {
    return this[FILE_DIR];
  }

  public set fileDir(value: DirPath) {
    this[FILE_DIR] = value;
  }

  public get file(): AbsolutePath | undefined {
    const fileDir = this.fileDir;
    if (fileDir === undefined)
      return undefined;
    const fileName = this.fileName;
    if (fileName === undefined)
      return undefined;
    return fileDir.join(fileName);
  }

  public toString(): string {
    const file = this.file;
    return file ? file.toString() : "";
  }

  public toJSON(): object {
    return {
      outputName: this.outputName,
      prefix: this.prefix,
      SUFFIX: this[SUFFIX],
      fileDir: this.fileDir,
      fileName: this.fileName,
      file: this.file,
    }
  }
};

const NAME        = Symbol("NAME");
const TYPE        = Symbol("TYPE");
const TARGET_FILE = Symbol("TARGET_FILE");

export class TargetStruct {
  private [NAME]: string;
  private [TYPE]: TargetType;
  private [TARGET_FILE]: TargetFile;

  constructor(name: string) {
    this[NAME] = name;
    this[TYPE] = TargetType.Unknown;
    this[TARGET_FILE] = TargetFile.create();
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

  get targetFile() {
    return this[TARGET_FILE];
  }

  public toJSON(): object {
    return {
      NAME: this[NAME],
      TARGET_FILE: this[TARGET_FILE],
    }
  }
};
