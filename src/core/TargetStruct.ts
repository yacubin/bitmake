/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { AbsolutePath } from "@/core/AbsolutePath";
import { TargetFile } from "@/core/TargetFile";
import { TargetIncludes } from "@/core/TargetIncludes";
import { TargetObjects } from "@/core/TargetObjects";
import { UserIndirectTarget } from "@/core/Target";
import { SourceFile } from "@/core/SourceFile";

export enum TargetType {
  Unknown = "Unknown",
  StaticLibrary = "StaticLibrary",
  SharedLibrary = "SharedLibrary",
  ObjectLibrary = "ObjectLibrary",
  Executable = "Executable",
};

export interface TargetCommand {
  command: string | AbsolutePath | TargetFile;
  args: Array<string | AbsolutePath | TargetFile>;
};

export class TargetFileStruct {
  private _fileDir?: AbsolutePath

  private _prefix = "";
  private _outputName = "";
  private _suffix = "";

  private constructor() {
  }

  public static create(): TargetFileStruct {
    return Object.seal(new TargetFileStruct);
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

interface TargetItem<T> {
  value: T;
  publicOnly: boolean;
};

class TargetItems<T> {
  private _items = new Array<TargetItem<T>>();

  public addItem(publicOnly: boolean, value: T) {
    this._items.push({ publicOnly, value });
  }

  public getItems(): Array<T> {
    return this._items.map( i => i.value);
  }

  public getPublicItems(): Array<T> {
    return this._items.filter(i => i.publicOnly).map( i => i.value);
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
  private _targetFile: TargetFileStruct;
  private _preBuildList = new Array<TargetCommand>;
  private _postBuildList = new Array<TargetCommand>;
  private _defines = new TargetItems<string>;
  private _includes = new TargetItems<AbsolutePath | TargetIncludes>;
  private _compileOptions = new TargetItems<string | string[]>;
  private _linkOptions = new TargetItems<string | string[]>;
  private _sources = new TargetItems<TargetObjects | SourceFile>;
  private _libraries = new TargetItems<UserIndirectTarget>;
  private _positionIndependentCode = false;

  constructor(name: string) {
    this._name = name;
    this._type = TargetType.Unknown;
    this._targetFile = TargetFileStruct.create();
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

  public addPreBuild(tc: TargetCommand) {
    this._preBuildList.push(tc);
  }

  public addPostBuild(tc: TargetCommand) {
    this._postBuildList.push(tc);
  }

  public get preBuildList() {
    return this._preBuildList;
  }

  public get postBuildList() {
    return this._postBuildList;
  }

  public addCompileOption(publicOnly: boolean, value: string | string[]) {
    this._compileOptions.addItem(publicOnly, value);
  }

  public getCompileOptions(): Array<string|string[]> {
    return this._compileOptions.getItems();
  }
  
  public getPublicCompileOptions(): Array<string|string[]> {
    return this._compileOptions.getPublicItems();
  }

  public addLinkOption(publicOnly: boolean, value: string | string[]) {
    return this._linkOptions.addItem(publicOnly, value);
  }

  public getLinkOptions(): Array<string|string[]> {
    return this._linkOptions.getItems();
  }

  public getPublicLinkOptions(): Array<string|string[]> {
    return this._linkOptions.getPublicItems();
  }

  public addDefinition(publicOnly: boolean, value: string) {
    this._defines.addItem(publicOnly, value);
  }

  public getDefinitions(): Array<string> {
    return this._defines.getItems();
  }

  public getPublicDefinitions(): Array<string> {
    return this._defines.getPublicItems();
  }

  public addInclude(publicOnly: boolean, value: AbsolutePath | TargetIncludes) {
    this._includes.addItem(publicOnly, value);
  }

  public getIncludes(): Array<AbsolutePath | TargetIncludes> {
    return this._includes.getItems();
  }

  public getPublicIncludes(): Array<AbsolutePath | TargetIncludes> {
    return this._includes.getPublicItems();
  }

  public addSource(publicOnly: boolean, value: TargetObjects | SourceFile) {
    this._sources.addItem(publicOnly, value);
  }

  public getSourceFiles(): SourceFile[] {
    return this._sources.items.map(i => i.value).filter(i => i instanceof SourceFile);
  }

  public getTargetObjectsList(): TargetObjects[] {
    return this._sources.items.map(i => i.value).filter(i => i instanceof TargetObjects);
  }

  public getHeaders(): SourceFile[] {
    const result = new Array<SourceFile>;
    for (const iter of this._sources.items) {
      if (iter.value instanceof SourceFile && iter.value.HEADER_FILE_ONLY)
        result.push(iter.value);
    }
    return result;
  }

  public addLibrary(publicOnly: boolean, value: UserIndirectTarget) {
    this._libraries.addItem(publicOnly, UserIndirectTarget.ensureInstance(value));
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
