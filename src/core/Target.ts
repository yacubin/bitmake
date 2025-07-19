/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { SourceFile } from "@/core/SourceFile";
import { TargetName } from "@/core/TargetName";
import { TargetFile } from "@/core/TargetFile";
import { TargetIncludes } from "@/core/TargetIncludes";
import { TargetObjects } from "@/core/TargetObjects";
import { DirPath, AbsolutePath } from "@/core/AbsolutePath";
import { SimpleObject } from "./SimpleObject";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export interface TargetCommand {
  command: string | AbsolutePath | TargetFile;
  args: Array<string | AbsolutePath | TargetFile>;
};

interface TargetElement<T> {
  value: T;
  isPublic?: boolean;
};

class TargetElements<T> {
  private _list = new Array<TargetElement<T>>;

  public add(value: T, isPublic?: boolean) {
    this._list.push({value, isPublic});
  }

  public concat(other: TargetElements<T>) {
    const result = new TargetElements<T>;
    for (const iter of this._list)
      result._list.push(iter);
    for (const iter of other._list)
      result._list.push(iter);
    return result;
  }

  public getAllValues(): T[] {
    return this._list.map(i => i.value);
  }

  public getPublicValues() {
    return this._list.filter(i => i.isPublic).map(i => i.value);
  }

  public toJSON() {
    const result: any = [];
    for (const iter of this._list) {
      const name = iter.isPublic ? "public" : "private";
      result.push({ [name] : iter.value});
    }
    return result;
  }
};

export abstract class BaseTarget {
  protected _name: string;
  protected _includes = new TargetElements<DirPath | TargetIncludes>;
  protected _definitions = new TargetElements<string>;
  protected _compileOptions = new TargetElements<string | string[]>;
  protected _linkOptions = new TargetElements<string | string[]>;
  protected _libraries = new TargetElements<TargetName>;
  protected _sources = new Array<TargetObjects | SourceFile>;
  protected _preBuildList: TargetCommand[];
  protected _postBuildList: TargetCommand[];
  protected _language = "";
  protected _compilerPath = "";
  protected _compilerFlags = new Array<string>;

  protected constructor(name: string) {
    this._name = name;
    this._preBuildList = [];
    this._postBuildList = [];
  }

  abstract setPrefix(value: string) : void;
  abstract setOutputName(value: any) : void;
  abstract setSuffix(value: string) : void;
  abstract setPositionIndependentCode(value: boolean) : void;

  public get targetName() {
    return this._name;
  }

  public get name() { // DELME
    return this._name;
  }

  public get includes(): TargetIncludes {
    return TargetIncludes.create(this._name);
  }

  public get objects(): TargetObjects {
    return TargetObjects.create(this._name);
  }

  public get targetFile(): TargetFile {
    return TargetFile.create(this._name);
  }

  public getIncludes(): Array<DirPath | TargetIncludes> {
    return this._includes.getAllValues();
  }

  public getPublicIncludes(): Array<DirPath | TargetIncludes> {
    return this._includes.getPublicValues();
  }

  public addInclude(publicOnly: boolean, value: DirPath | TargetIncludes): void {
    this._includes.add(value, publicOnly);
  }

  public getDefinitions(): Array<string> {
    return this._definitions.getAllValues();
  }

  public getPublicDefinitions(): Array<string> {
    return this._definitions.getPublicValues();
  }

  public addDefinition(publicOnly: boolean, value: string): void {
    this._definitions.add(value, publicOnly);
  }

  public getCompileOptions(): Array<string | string[]> {
    return this._compileOptions.getAllValues();
  }
  
  public getPublicCompileOptions(): Array<string|string[]> {
    return this._compileOptions.getPublicValues();
  }

  public addCompileOptions(...options: Array<string | string[]>): void {
    this.addCompileOptionsImpl(false, ...options);
  }

  public addPublicCompileOptions(...options: Array<string | string[]>): void {
    this.addCompileOptionsImpl(true, ...options);
  }

  public addCompileOptionsImpl(publicOnly: boolean, ...options: Array<string | string[]>): void {
    for (const value of options.flat())
      this._compileOptions.add(value, publicOnly);
  }

  public getLinkOptions(): Array<string | string[]> {
    return this._linkOptions.getAllValues();
  }

  public getPublicLinkOptions(): Array<string | string[]> {
    return this._linkOptions.getPublicValues();
  }

  public addLinkOptions(...options: Array<string | string[]>) {
    this.addLinkOptionsImpl(false, ...options);
  }

  public addPublicLinkOptions(...options: Array<string | string[]>) {
    this.addLinkOptionsImpl(true, ...options);
  }

  public addLinkOptionsImpl(publicOnly: boolean, ...options: Array<string | string[]>) {
    for (const value of options.flat())
      this._linkOptions.add(value, publicOnly);
  }

  public getLibraries() {
    return this._libraries.getAllValues()
  }

  public getPublicLibraries() {
    return this._libraries.getPublicValues();
  }

  public addLibraries(...libraries: PostTarget[]) {
    this.addLibrariesImpl(false, ...libraries);
  }

  public addPublicLibraries(...libraries: PostTarget[]) {
    this.addLibrariesImpl(true, ...libraries);
  }

  public addLibrariesImpl(publicOnly: boolean, ...libraries: PostTarget[]) {
    for (const iter of libraries.flat())
      this._libraries.add(TargetName.create(iter.targetName), publicOnly);
  }

  public getHeaders(): SourceFile[] {
    return this.getSourceFiles().filter(i => i.HEADER_FILE_ONLY);
  }

  public getAllSources() {
    return this._sources;
  }

  public getSourceFiles(): SourceFile[] {
    return this._sources.filter(i => i instanceof SourceFile);
  }

  public getTargetObjects(): TargetObjects[] {
    return this._sources.filter(i => i instanceof TargetObjects);
  }

  public addSource(source: TargetObjects | SourceFile) {
    this._sources.push(source);
  }

  public get preBuildList() {
    return this._preBuildList;
  }

  public addPreBuild(command: string | AbsolutePath | TargetFile, args: Array<string | AbsolutePath | TargetFile>) {
    this._preBuildList.push({command, args});
  }

  public get postBuildList() {
    return this._postBuildList;
  }

  public addPostBuild(command: string | AbsolutePath | TargetFile, args: Array<string | AbsolutePath | TargetFile>) {
    this._postBuildList.push({command, args});
  }

  public get language(): string {
    return this._language;
  }

  public set language(value: string) {
    this._language = value;
  }

  public get compilerPath(): string {
    return this._compilerPath;
  }

  public set compilerPath(value: string) {
    this._compilerPath = value;
  }

  public get compilerFlags(): string[] {
    return this._compilerFlags;
  }

  public set compilerFlags(value: string[]) {
    this._compilerFlags = value;
  }

  public postUpdate(target: BaseTarget) {
    this._includes = this._includes.concat(target._includes);
    this._definitions = this._definitions.concat(target._definitions);
    this._compileOptions = this._compileOptions.concat(target._compileOptions);
    this._linkOptions = this._linkOptions.concat(target._linkOptions);
    this._libraries = this._libraries.concat(target._libraries);
    this._sources.push(...target._sources);
    this._preBuildList.push(...target._preBuildList);
    this._postBuildList.push(...target._postBuildList);
  }

  protected toJSON(): SimpleObject {
    return {
      type: BaseTarget.name,
      name: this._name,
      preBuildList: SimpleObject.toJSON(this._preBuildList),
      postBuildList: SimpleObject.toJSON(this._postBuildList),
      includes: this._includes.toJSON(),
      compileOptions: this._compileOptions.toJSON(),
      linkOptions: this._linkOptions.toJSON(),
      sources: SimpleObject.toJSON(this._sources),
      libraries: this._libraries.toJSON(),
    }
  }
};

export class PostTarget extends BaseTarget {
  private _prefix?: string;
  private _outputName?: string;
  private _suffix?: string;
  private _positionIndependentCode?: boolean;

  private constructor(name: string) {
    super(name);
  }

  public static create(name: string) {
    return Object.seal(new PostTarget(name));
  }

  public get prefix() {
    return this._prefix;
  }

  public setPrefix(value: string) {
    this._prefix = value;
  }

  public get outputName() {
    return this._outputName;
  }

  public setOutputName(value: any) {
    this._outputName = value;
  }

  public get suffix() {
    return this._suffix;
  }

  public setSuffix(value: string) {
    this._suffix = value;
  }

  public get positionIndependentCode() {
    return this._positionIndependentCode;
  }

  public setPositionIndependentCode(value: boolean) {
    this._positionIndependentCode = value;
  }

  public get COMPILE_OPTIONS() {
    return this._compileOptions;
  }

  public get LINK_OPTIONS() {
    return this._linkOptions;
  }

  public get LIBRARIES() {
    return this._libraries;
  }

  public get SOURCES() {
    return this._sources;
  }

  public toJSON(): SimpleObject {
    const result = super.toJSON();

    result.type = PostTarget.name;
    
    if (this._prefix !== undefined)
      result.prefix = this._prefix;

    if (this._outputName !== undefined)
      result.outputName = this._outputName;

    if (this._suffix !== undefined)
      result.suffix = this._suffix;

    if (this._positionIndependentCode !== undefined)
      result.positionIndependentCode = this._positionIndependentCode;

    return result;
  }
};

export abstract class MainTarget extends BaseTarget {
  private _sourceDir: AbsolutePath;
  private _binaryDir: AbsolutePath;
  private _prefix = "";
  private _suffix = "";
  private _outputName: string;
  private _positionIndependentCode = false;

  protected constructor(name: string, sourceDir: AbsolutePath, binaryDir: AbsolutePath) {
    super(name);

    this._sourceDir = sourceDir;
    this._binaryDir = binaryDir;
    this._outputName = name;
  }

  public get isObjectLibrary(): boolean {
    return false;
  }

  public get isStaticLibrary(): boolean {
    return false;
  }

  public get isSharedLibrary(): boolean {
    return false;
  }

  public get isExecutable(): boolean {
    return false;
  }

  public get sourceDir() {
    return this._sourceDir;
  }

  public get binaryDir() {
    return this._binaryDir;
  }

  public getFileDir() {
    return this._binaryDir;
  }

  public getFileName() {
    return this.prefix + this.outputName + this.suffix;
  }

  public getFile() {
    return this._binaryDir.join(this.getFileName());
  }

  public get prefix() {
    return this._prefix;
  }

  public setPrefix(value: string) {
    this._prefix = value;
  }

  public get suffix() {
    return this._suffix;
  }

  public setSuffix(value: any) {
    this._suffix = value;
  }

  public get outputName() {
    return this._outputName;
  }

  public setOutputName(value: any) {
    this._outputName = value;
  }

  public get positionIndependentCode() {
    return this._positionIndependentCode;
  }

  public setPositionIndependentCode(value: boolean) {
    this._positionIndependentCode = value;
  }

  public postUpdate(target: PostTarget) {
    super.postUpdate(target);

    if (target.prefix !== undefined)
      this._prefix = target.prefix;
    if (target.outputName !== undefined)
      this._outputName = target.outputName;
    if (target.suffix !== undefined)
      this._suffix = target.suffix;
    if (target.positionIndependentCode !== undefined)
      this._positionIndependentCode = target.positionIndependentCode;
  }

  protected toJSON(): SimpleObject {
    const result = super.toJSON();

    result.type = BaseTarget.name;
    result.sourceDir = this._sourceDir;
    result.binaryDir = this._binaryDir;
    result.prefix = this._prefix;
    result.suffix = this._suffix;
    result.outputName = this._outputName;
    result.positionIndependentCode = this._positionIndependentCode;

    return result;
  }
};

export class ObjectLibrary extends MainTarget {
  public constructor(name: string, sourceDir: AbsolutePath, binaryDir: AbsolutePath) {
    super(name, sourceDir, binaryDir);
  }

  public get isObjectLibrary(): boolean {
    return true;
  }

  public toJSON(): SimpleObject {
    const result = super.toJSON();
    result.type = ObjectLibrary.name;
    return result;
  }
};

export class StaticLibrary extends MainTarget {
  public constructor(name: string, sourceDir: AbsolutePath, binaryDir: AbsolutePath) {
    super(name, sourceDir, binaryDir);
  }

  public get isStaticLibrary(): boolean {
    return true;
  }

  public toJSON(): SimpleObject {
    const result = super.toJSON();
    result.type = StaticLibrary.name;
    return result;
  }
};

export class SharedLibrary extends MainTarget {
  public constructor(name: string, sourceDir: AbsolutePath, binaryDir: AbsolutePath) {
    super(name, sourceDir, binaryDir);
  }

  public get isSharedLibrary(): boolean {
    return true;
  }

  public toJSON(): SimpleObject {
    const result = super.toJSON();
    result.type = SharedLibrary.name;
    return result;
  }
};

export class Executable extends MainTarget {
  public constructor(name: string, sourceDir: AbsolutePath, binaryDir: AbsolutePath) {
    super(name, sourceDir, binaryDir);
  }

  public get isExecutable(): boolean {
    return true;
  }

  public toJSON(): SimpleObject {
    const result = super.toJSON();
    result.type = Executable.name;
    return result;
  }
};
