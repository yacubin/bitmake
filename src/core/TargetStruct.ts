/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { DirPath, FilePath, AbsolutePath } from "@/core/Path";

export enum TargetType {
  Unknown = "Unknown",
  StaticLibrary = "StaticLibrary",
  SharedLibrary = "SharedLibrary",
  ObjectLibrary = "ObjectLibrary",
  Executable = "Executable",
};

const FUNC = Symbol("FUNC");

export class LiveString {
  private [FUNC]: () => string;

  private constructor(func: () => string) {
    this[FUNC] = func;
  }

  public static create(func: () => string) {
    return Object.seal(new LiveString(func));
  }

  toString(): string {
    return this[FUNC]();
  }
};

const PREFIX      = Symbol("PREFIX");
const SUFFIX      = Symbol("SUFFIX");
const OUTPUT_NAME = Symbol("OUTPUT_NAME");
const FILE_DIR    = Symbol("FILE_DIR");

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

export interface TargetCommand {
  command: string | LiveString;
  args: Array<string | LiveString>;
};

function makeTargetCommand(_command: any, _args: any[]): TargetCommand {
  let command: string | LiveString;
  if (typeof _command === "string")
    command = _command;
  else if (_command instanceof LiveString)
    command = _command;
  else if (_command instanceof FilePath)
    command = _command.toString();
  else
    throw new TypeError(`Wrong type ${_command} for command`);

  const args = new Array<string | LiveString>;
  for (const iter of _args) {
    if (typeof iter === "string")
      args.push(iter);
    else if (iter instanceof LiveString)
      args.push(iter);
    else if (iter instanceof FilePath)
      args.push(iter.toString());
    else if (iter instanceof DirPath)
      args.push(iter.toString());
    else
      throw new TypeError(`Wrong type ${iter} for argument`);
  }

  return { command, args };
}

type TargetCompileOptionOrigin = "initialize" | "indirectly" | "directly";
interface TargetCompileOption {
  origin: TargetCompileOptionOrigin;
  value: string | string[];
  publicOnly: boolean;
};

const NAME            = Symbol("NAME");
const TYPE            = Symbol("TYPE");
const TARGET_FILE     = Symbol("TARGET_FILE");
const PRE_BUILD       = Symbol("PRE_BUILD");
const POST_BUILD      = Symbol("POST_BUILD");
const COMPILE_OPTIONS = Symbol("COMPILE_OPTIONS");

export class TargetStruct {
  private [NAME]: string;
  private [TYPE]: TargetType;
  private [TARGET_FILE]: TargetFile;
  private [PRE_BUILD] = new Array<TargetCommand>;
  private [POST_BUILD] = new Array<TargetCommand>;
  private [COMPILE_OPTIONS] = new Array<TargetCompileOption>;

  constructor(name: string) {
    this[NAME] = name;
    this[TYPE] = TargetType.Unknown;
    this[TARGET_FILE] = TargetFile.create();
  }

  get name() {
    return this[NAME];
  }

  get type() {
    return this[TYPE];
  }

  set type(value: TargetType) {
    if (this[TYPE] === value)
      return;
    if (this[TYPE] !== TargetType.Unknown)
      throw new Error(`${this[TYPE]} "${this[NAME]}" target cannot be change to ${value}`);
    this[TYPE] = value;
  }

  get targetFile() {
    return this[TARGET_FILE];
  }

  public addPreBuild(command: any, args: any[]) {
    this[PRE_BUILD].push(makeTargetCommand(command, args));
  }

  public addPostBuild(command: any, args: any[]) {
    this[POST_BUILD].push(makeTargetCommand(command, args));
  }

  public get preBuildList() {
    return this[PRE_BUILD];
  }

  public get postBuildList() {
    return this[POST_BUILD];
  }

  public addCompileOption(origin: TargetCompileOptionOrigin, publicOnly: boolean, value: string | string[]) {
    this[COMPILE_OPTIONS].push({ value, origin, publicOnly });
  }

  public addCompileOptions(origin: TargetCompileOptionOrigin, publicOnly: boolean, ...options: Array<string|string[]>) {
    for (const iter of options.flat())
      this.addCompileOption(origin, publicOnly, iter);
  }

  public getCompileOptions(): Array<string|string[]> {
    const firstList = new Array<string|string[]>();
    const lastList = new Array<string|string[]>();
    for (const iter of this[COMPILE_OPTIONS]) {
      if (iter.origin !== "indirectly")
        firstList.push(iter.value);
      else
        lastList.push(iter.value);
    }
    return firstList.concat(lastList);
  }
  
  public getPublicCompileOptions(): Array<string|string[]> {
    const firstList = new Array<string|string[]>();
    const lastList = new Array<string|string[]>();
    for (const iter of this[COMPILE_OPTIONS]) {
      if (!iter.publicOnly)
        continue;
      if (iter.origin !== "indirectly")
        firstList.push(iter.value);
      else
        lastList.push(iter.value);
    }
    return firstList.concat(lastList);
  }

  public toJSON(): object {
    return {
      name: this.name,
      targetFile: this.targetFile,
      preBuildList: this.preBuildList,
      postBuildList: this.postBuildList,
      compileOptions: this[COMPILE_OPTIONS],
    }
  }
};
