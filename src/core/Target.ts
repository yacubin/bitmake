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
import { AbsolutePath } from "@/core/AbsolutePath";
import { SimpleObject } from "./SimpleObject";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export interface TargetCommand {
  command: string | AbsolutePath | TargetFile;
  args: Array<string | AbsolutePath | TargetFile>;
};

interface TargetValue<T> {
  value: T;
  publicOnly: boolean;
};

type TargetValueList<T> = Array<TargetValue<T>>;

export abstract class BaseTarget {
  protected _name: string;
  protected _includes: TargetValueList<AbsolutePath | TargetIncludes>;
  protected _definitions: TargetValueList<string>;
  protected _compileOptions: TargetValueList<string | string[]>;
  protected _linkOptions: TargetValueList<string | string[]>;
  protected _libraries: TargetValueList<TargetName>;
  protected _sources: TargetValueList<TargetObjects | SourceFile>;
  protected _preBuildList: TargetCommand[];
  protected _postBuildList: TargetCommand[];
  protected _language = "";
  protected _compilerPath = "";
  protected _compilerFlags = new Array<string>;

  protected constructor(name: string) {
    this._name = name;
    this._includes = [];
    this._definitions = [];
    this._compileOptions = [];
    this._linkOptions = [];
    this._libraries = [];
    this._sources = [];
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

  public getIncludes(): Array<AbsolutePath | TargetIncludes> {
    return this._includes.map(i => i.value);
  }

  public getPublicIncludes(): Array<AbsolutePath | TargetIncludes> {
    return this._includes.filter(i => i.publicOnly).map(i => i.value);
  }

  public addInclude(publicOnly: boolean, value: AbsolutePath | TargetIncludes): void {
    this._includes.push({publicOnly, value});
  }

  public getDefinitions(): Array<string> {
    return this._definitions.map(i => i.value);
  }

  public getPublicDefinitions(): Array<string> {
    return this._definitions.filter(i => i.publicOnly).map(i => i.value);
  }

  public addDefinition(publicOnly: boolean, value: string): void {
    this._definitions.push({publicOnly, value});
  }

  public getCompileOptions(): Array<string | string[]> {
    return this._compileOptions.map(i => i.value);
  }
  
  public getPublicCompileOptions(): Array<string|string[]> {
    return this._compileOptions.filter(i => i.publicOnly).map(i => i.value);
  }

  public addCompileOptions(...options: Array<string | string[]>): void {
    this.addCompileOptionsImpl(false, ...options);
  }

  public addPublicCompileOptions(...options: Array<string | string[]>): void {
    this.addCompileOptionsImpl(true, ...options);
  }

  public addCompileOptionsImpl(publicOnly: boolean, ...options: Array<string | string[]>): void {
    for (const value of options.flat())
      this._compileOptions.push({publicOnly, value});
  }

  public getLinkOptions(): Array<string | string[]> {
    return this._linkOptions.map(i => i.value);
  }

  public getPublicLinkOptions(): Array<string | string[]> {
    return this._linkOptions.filter(i => i.publicOnly).map(i => i.value);
  }

  public addLinkOptions(...options: Array<string | string[]>) {
    this.addLinkOptionsImpl(false, ...options);
  }

  public addPublicLinkOptions(...options: Array<string | string[]>) {
    this.addLinkOptionsImpl(true, ...options);
  }

  public addLinkOptionsImpl(publicOnly: boolean, ...options: Array<string | string[]>) {
    for (const value of options.flat())
      this._linkOptions.push({publicOnly, value});
  }

  public getLibraries() {
    return this._libraries.map(i => i.value);
  }

  public getPublicLibraries() {
    return this._libraries.filter(i => i.publicOnly).map(i => i.value);
  }

  public addLibraries(...libraries: PostTarget[]) {
    this.addLibrariesImpl(false, ...libraries);
  }

  public addPublicLibraries(...libraries: PostTarget[]) {
    this.addLibrariesImpl(true, ...libraries);
  }

  public addLibrariesImpl(publicOnly: boolean, ...libraries: PostTarget[]) {
    for (const iter of libraries.flat())
      this._libraries.push({publicOnly, value: TargetName.create(iter.targetName)});
  }

  public getHeaders(): SourceFile[] {
    const result = new Array<SourceFile>;
    for (const iter of this._sources) {
      if (iter.value instanceof SourceFile && iter.value.HEADER_FILE_ONLY)
        result.push(iter.value);
    }
    return result;
  }

  public getAllSources() {
    return this._sources;
  }

  public getSourceFiles(): SourceFile[] {
    return this._sources.map(i => i.value).filter(i => i instanceof SourceFile);
  }

  public getTargetObjects(): TargetObjects[] {
    return this._sources.map(i => i.value).filter(i => i instanceof TargetObjects);
  }

  public addSource(source: TargetObjects | SourceFile) {
    this._sources.push({publicOnly: false, value: source});
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

  public toJSON(): object {
    return {
      name: this._name,
      preBuildList: this._preBuildList,
      postBuildList: this._postBuildList,
      includes: this._includes,
      compileOptions: this._compileOptions,
      linkOptions: this._linkOptions,
      sources: this._sources,
      libraries: this._libraries,
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

  public get INCLUDES() {
    return this._includes;
  }

  public get DEFINITIONS() {
    return this._definitions;
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
    const result: any = super.toJSON();

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

export enum TargetType {
  ObjectLibrary = 0,
  StaticLibrary = 1,
  SharedLibrary = 2,
  Executable = 3,
};

export namespace TargetType {

export function toString(type: TargetType) {
  switch (type) {
  case TargetType.ObjectLibrary:
    return "ObjectLibrary";
  case TargetType.StaticLibrary:
    return "StaticLibrary";
  case TargetType.SharedLibrary:
    return "SharedLibrary";
  case TargetType.Executable:
    return "Executable";
  }
  throw new Error(`Uknown target type ${type}`);
}

} // namespace TargetType

export class MainTarget extends BaseTarget {
  private _targetType: TargetType;
  private _sourceDir: AbsolutePath;
  private _binaryDir: AbsolutePath;
  private _prefix = "";
  private _suffix = "";
  private _outputName: string;
  private _positionIndependentCode = false;

  protected constructor(type: TargetType, name: string, sourceDir: AbsolutePath, binaryDir: AbsolutePath) {
    super(name);

    this._sourceDir = sourceDir;
    this._binaryDir = binaryDir;
    this._targetType = type;
    this._outputName = name;
  }

  public static create(type: TargetType, name: string, sourceDir: AbsolutePath, binaryDir: AbsolutePath) {
    return Object.seal(new MainTarget(type, name, sourceDir, binaryDir));
  }

  public get isObjectLibrary() {
    return this._targetType === TargetType.ObjectLibrary;
  }

  public get isStaticLibrary() {
    return this._targetType === TargetType.StaticLibrary;
  }

  public get isSharedLibrary() {
    return this._targetType === TargetType.SharedLibrary;
  }

  public get isExecutable() {
    return this._targetType === TargetType.Executable;
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
    if (target.prefix !== undefined)
      this._prefix = target.prefix;
    if (target.outputName !== undefined)
      this._outputName = target.outputName;
    if (target.suffix !== undefined)
      this._suffix = target.suffix;
    if (target.positionIndependentCode !== undefined)
      this._positionIndependentCode = target.positionIndependentCode;
    this._includes.push(...target.INCLUDES);
    this._definitions.push(...target.DEFINITIONS);
    this._compileOptions.push(...target.COMPILE_OPTIONS);
    this._linkOptions.push(...target.LINK_OPTIONS);
    this._libraries.push(...target.LIBRARIES);
    this._sources.push(...target.SOURCES);
    this._preBuildList.push(...target.preBuildList);
    this._postBuildList.push(...target.postBuildList);
  }

  public toJSON(): SimpleObject {
    const result: any = super.toJSON();

    result.type = BaseTarget.name;
    result.targetType = TargetType.toString(this._targetType);
    result.sourceDir = this._sourceDir;
    result.binaryDir = this._binaryDir;
    result.prefix = this._prefix;
    result.suffix = this._suffix;
    result.outputName = this._outputName;
    result.positionIndependentCode = this._positionIndependentCode;

    return result;
  }
};
