/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { AbsolutePath } from "@/core/AbsolutePath";
import { InterfaceIncludes } from "@/core/InterfaceIncludes";
import { InterfaceObjects } from "@/core/InterfaceObjects";
import { UserIndirectTarget } from "@/core/Target";
import { SourceFile } from "@/core/SourceFile";

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

export class TargetFile {
  private _fileDir?: AbsolutePath

  private _prefix = "";
  private _outputName = "";
  private _suffix = "";

  private constructor() {
  }

  public static create(): TargetFile {
    return Object.seal(new TargetFile);
  }

  public get prefix(): string {
    return this._prefix;
  }

  public setPrefix(value: string) {
    this._prefix = value;
  }

  public get outputName(): string {
    return this._outputName;
  }

  public setOutputName(value: string) {
    this._outputName = value;
  }

  public get suffix(): string {
    return this._suffix;
  }

  public setSuffix(value: string) {
    this._suffix = value;
  }

  public get fileName(): string | undefined {
    if (this.prefix === undefined || this.outputName === undefined || this.suffix === undefined)
      return undefined;
    return this.prefix + this.outputName + this.suffix;
  }

  public get fileDir(): AbsolutePath | undefined {
    return this._fileDir;
  }

  public set fileDir(value: AbsolutePath) {
    this._fileDir = value;
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
      suffix: this.suffix,
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
  else if (_command instanceof AbsolutePath)
    command = _command.toString();
  else
    throw new TypeError(`Wrong type ${_command} for command`);

  const args = new Array<string | LiveString>;
  for (const iter of _args) {
    if (typeof iter === "string")
      args.push(iter);
    else if (iter instanceof LiveString)
      args.push(iter);
    else if (iter instanceof AbsolutePath)
      args.push(iter.toString());
    else if (iter instanceof AbsolutePath)
      args.push(iter.toString());
    else
      throw new TypeError(`Wrong type ${iter} for argument`);
  }

  return { command, args };
}

type TargetItemOrigin = "initialize" | "indirectly" | "directly";

interface TargetItem<T> {
  origin: TargetItemOrigin;
  value: T;
  publicOnly: boolean;
};

class TargetItems<T> {
  private _items = new Array<TargetItem<T>>();

  public addItem(origin: TargetItemOrigin, publicOnly: boolean, value: T) {
    this._items.push({ origin, publicOnly, value });
  }

  public getItems(): Array<T> {
    const firstList = new Array<T>();
    const lastList = new Array<T>();
    for (const iter of this._items) {
      if (iter.origin !== "indirectly")
        firstList.push(iter.value);
      else
        lastList.push(iter.value);
    }
    return firstList.concat(lastList);
  }

  public getPublicItems(): Array<T> {
    const firstList = new Array<T>();
    const lastList = new Array<T>();
    for (const iter of this._items) {
      if (!iter.publicOnly)
        continue;
      if (iter.origin !== "indirectly")
        firstList.push(iter.value);
      else
        lastList.push(iter.value);
    }
    return firstList.concat(lastList);
  }

  get items() {
    return this._items;
  }

  public toJSON(): object {
    return this._items;
  }
};

export class TargetStruct {
  private _name: string;
  private _type: TargetType;
  private _targetFile: TargetFile;
  private _preBuildList = new Array<TargetCommand>;
  private _postBuildList = new Array<TargetCommand>;
  private _defines = new TargetItems<string>;
  private _includes = new TargetItems<AbsolutePath | InterfaceIncludes>;
  private _compileOptions = new TargetItems<string | string[]>;
  private _linkOptions = new TargetItems<string | string[]>;
  private _sources = new TargetItems<InterfaceObjects | SourceFile>;
  private _libraries = new TargetItems<UserIndirectTarget>;
  private _positionIndependentCode = false;

  constructor(name: string) {
    this._name = name;
    this._type = TargetType.Unknown;
    this._targetFile = TargetFile.create();
  }

  public get name() {
    return this._name;
  }

  public get type() {
    return this._type;
  }

  public set type(value: TargetType) {
    if (this._type === value)
      return;
    if (this._type !== TargetType.Unknown)
      throw new Error(`${this._type} "${this._name}" target cannot be change to ${value}`);
    this._type = value;
  }

  public get targetFile() {
    return this._targetFile;
  }

  public get positionIndependentCode() {
    return this._positionIndependentCode;
  }

  public setPositionIndependentCode(value: boolean) {
    this._positionIndependentCode = value;
  }

  public addPreBuild(command: any, args: any[]) {
    this._preBuildList.push(makeTargetCommand(command, args));
  }

  public addPostBuild(command: any, args: any[]) {
    this._postBuildList.push(makeTargetCommand(command, args));
  }

  public get preBuildList() {
    return this._preBuildList;
  }

  public get postBuildList() {
    return this._postBuildList;
  }

  public addCompileOption(origin: TargetItemOrigin, publicOnly: boolean, value: string | string[]) {
    this._compileOptions.addItem(origin, publicOnly, value);
  }

  public getCompileOptions(): Array<string|string[]> {
    return this._compileOptions.getItems();
  }
  
  public getPublicCompileOptions(): Array<string|string[]> {
    return this._compileOptions.getPublicItems();
  }

  public addLinkOption(origin: TargetItemOrigin, publicOnly: boolean, value: string | string[]) {
    return this._linkOptions.addItem(origin, publicOnly, value);
  }

  public getLinkOptions(): Array<string|string[]> {
    return this._linkOptions.getItems();
  }

  public getPublicLinkOptions(): Array<string|string[]> {
    return this._linkOptions.getPublicItems();
  }

  public addDefinition(origin: TargetItemOrigin, publicOnly: boolean, value: string) {
    this._defines.addItem(origin, publicOnly, value);
  }

  public getDefinitions(): Array<string> {
    return this._defines.getItems();
  }

  public getPublicDefinitions(): Array<string> {
    return this._defines.getPublicItems();
  }

  public addInclude(origin: TargetItemOrigin, publicOnly: boolean, value: AbsolutePath|InterfaceIncludes) {
    this._includes.addItem(origin, publicOnly, value);
  }

  public getIncludes(): Array<AbsolutePath|InterfaceIncludes> {
    return this._includes.getItems();
  }

  public getPublicIncludes(): Array<AbsolutePath|InterfaceIncludes> {
    return this._includes.getPublicItems();
  }

  public addSource(origin: TargetItemOrigin, publicOnly: boolean, value: InterfaceObjects | SourceFile) {
    this._sources.addItem(origin, publicOnly, value);
  }

  public addSources(origin: TargetItemOrigin, ...sources: any[]) {
    for (const iter of sources.flat())
      this.addSource(origin, false, iter);
  }

  public getSourceFiles(): SourceFile[] {
    return this._sources.items.map(i => i.value).filter(i => i instanceof SourceFile);
  }

  public getInterfaceObjectsList(): InterfaceObjects[] {
    return this._sources.items.map(i => i.value).filter(i => i instanceof InterfaceObjects);
  }

  public getHeaders(): SourceFile[] {
    const result = new Array<SourceFile>;
    for (const iter of this._sources.items) {
      if (iter.value instanceof SourceFile && iter.value.HEADER_FILE_ONLY)
        result.push(iter.value);
    }
    return result;
  }

  public addLibrary(origin: TargetItemOrigin, publicOnly: boolean, value: UserIndirectTarget) {
    this._libraries.addItem(origin, publicOnly, UserIndirectTarget.ensureInstance(value));
  }

  public addLibraries(origin: TargetItemOrigin, publicOnly: boolean, ...libraries: UserIndirectTarget[]) {
    for (const iter of libraries.flat())
      this.addLibrary(origin, publicOnly, iter);
  }

  public getLibraries(): Array<UserIndirectTarget> {
    return this._libraries.getItems();
  }

  public getPublicLibraries(): Array<UserIndirectTarget> {
    return this._libraries.getPublicItems();
  }

  public toJSON(): object {
    return {
      name: this._name,
      type: this._type,
      targetFile: this._targetFile,
      preBuildList: this._preBuildList,
      postBuildList: this._postBuildList,
      definitions: this._defines,
      includes: this._includes,
      compileOptions: this._compileOptions,
      linkOptions: this._linkOptions,
      sources: this._sources,
      libraries: this._libraries,
      positionIndependentCode: this._positionIndependentCode,
    }
  }
};
