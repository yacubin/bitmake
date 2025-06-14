/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { DirPath, FilePath, AbsolutePath } from "@/core/Path";
import { InterfaceIncludes } from "@/core/InterfaceIncludes";
import { InterfaceObjects } from "@/core/InterfaceObjects";
import { InterfaceTarget } from "@/core/Target";
import { SourceFile } from "@/core/SourceFile";
import { normalizeDefinitions } from "@/core/DefinitionHelper";

export function normalizeIncludes(baseDir: DirPath, ...includes: any[]): Array<DirPath|InterfaceIncludes> {
  const result = [];
  for (const iter of includes.flat()) {
    if (iter instanceof InterfaceIncludes)
      result.push(iter);
    else if (typeof iter === "string")
      result.push(DirPath.create(baseDir.resolve(iter)));
    else if (iter instanceof AbsolutePath)
      result.push(DirPath.create(iter));
    else
      throw new Error(`Not support instance ${iter}`);
  }
  return result;
}

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
  private _fileDir?: DirPath

  private _initPrefix?: string;
  private _targetPrefix?: string;
  private _forcePrefix?: string;
  private _initOutputName?: string;
  private _targetOutputName?: string;
  private _forceOutputName?: string;
  private _initSuffix?: string;
  private _targetSuffix?: string;
  private _forceSuffix?: string;

  private constructor() {
  }

  public static create(): TargetFile {
    return Object.seal(new TargetFile);
  }

  public getInitOutputName() {
    return this._initOutputName;
  }

  public setInitOutputName(value: string) {
    this._initOutputName = value;
  }

  public getTargetOutputName() {
    return this._targetOutputName;
  }

  public setTargetOutputName(value: string) {
    this._targetOutputName = value;
  }

  public getForceOutputName() {
    return this._forceOutputName;
  }

  public setForceOutputName(value: string) {
    this._forceOutputName = value;
  }

  public get outputName(): string | undefined {
    if (this._forceOutputName !== undefined)
      return this._forceOutputName;
    if (this._targetOutputName !== undefined)
      return this._targetOutputName;
    return this._initOutputName;
  }

  public getInitPrefix() {
    return this._initPrefix;
  }

  public setInitPrefix(value: string) {
    this._initPrefix = value;
  }

  public getTargetPrefix() {
    return this._targetPrefix;
  }

  public setTargetPrefix(value: string) {
    this._targetPrefix = value;
  }

  public getForcePrefix() {
    return this._forcePrefix;
  }

  public setForcePrefix(value: string) {
    this._forcePrefix = value;
  }

  public get prefix(): string | undefined {
    if (this._forcePrefix !== undefined)
      return this._forcePrefix;
    if (this._targetPrefix !== undefined)
      return this._targetPrefix;
    return this._initPrefix;
  }

  public getInitSuffix() {
    return this._initSuffix;
  }

  public setInitSuffix(value: string) {
    this._initSuffix = value;
  }

  public getTargetSuffix() {
    return this._targetSuffix;
  }

  public setTargetSuffix(value: string) {
    this._targetSuffix = value;
  }

  public getForceSuffix() {
    return this._forceSuffix;
  }

  public setForceSuffix(value: string) {
    this._forceSuffix = value;
  }

  public get suffix(): string | undefined {
    if (this._forceSuffix !== undefined)
      return this._forceSuffix;
    if (this._targetSuffix != undefined)
      return this._targetSuffix;
    return this._initSuffix;
  }

  public get fileName(): string | undefined {
    if (this.prefix === undefined || this.outputName === undefined || this.suffix === undefined)
      return undefined;
    return this.prefix + this.outputName + this.suffix;
  }

  public get fileDir(): DirPath | undefined {
    return this._fileDir;
  }

  public set fileDir(value: DirPath) {
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

type TargetItemOrigin = "initialize" | "indirectly" | "directly";

interface TargetItem<T> {
  origin: TargetItemOrigin;
  value: T;
  publicOnly: boolean;
};

const ITEMS = Symbol("ITEMS");

class TargetItems<T> {
  private [ITEMS] = new Array<TargetItem<T>>();

  public addItem(origin: TargetItemOrigin, publicOnly: boolean, value: T) {
    this[ITEMS].push({ origin, publicOnly, value });
  }

  public getItems(): Array<T> {
    const firstList = new Array<T>();
    const lastList = new Array<T>();
    for (const iter of this[ITEMS]) {
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
    for (const iter of this[ITEMS]) {
      if (!iter.publicOnly)
        continue;
      if (iter.origin !== "indirectly")
        firstList.push(iter.value);
      else
        lastList.push(iter.value);
    }
    return firstList.concat(lastList);
  }

  get ITEMS() {
    return this[ITEMS];
  }
};

const NAME            = Symbol("NAME");
const TYPE            = Symbol("TYPE");
const TARGET_FILE     = Symbol("TARGET_FILE");
const PRE_BUILD       = Symbol("PRE_BUILD");
const POST_BUILD      = Symbol("POST_BUILD");
const DEFINES         = Symbol("DEFINES");
const INCLUDES        = Symbol("INCLUDES");
const COMPILE_OPTIONS = Symbol("COMPILE_OPTIONS");
const LINK_OPTIONS    = Symbol("LINK_OPTIONS");
const SOURCES         = Symbol("SOURCES");
const LIBRARIES       = Symbol("LIBRARIES");
const POSITION_INDEPENDENT_CODE = Symbol("POSITION_INDEPENDENT_CODE");

export class TargetStruct {
  private [NAME]: string;
  private [TYPE]: TargetType;
  private [TARGET_FILE]: TargetFile;
  private [PRE_BUILD] = new Array<TargetCommand>;
  private [POST_BUILD] = new Array<TargetCommand>;
  private [DEFINES] = new TargetItems<string>;
  private [INCLUDES] = new TargetItems<DirPath | InterfaceIncludes>;
  private [COMPILE_OPTIONS] = new TargetItems<string | string[]>;
  private [LINK_OPTIONS] = new TargetItems<string | string[]>;
  private [SOURCES] = new TargetItems<InterfaceObjects | SourceFile>;
  private [LIBRARIES] = new TargetItems<InterfaceTarget>;
  private [POSITION_INDEPENDENT_CODE] = false;

  constructor(name: string) {
    this[NAME] = name;
    this[TYPE] = TargetType.Unknown;
    this[TARGET_FILE] = TargetFile.create();
  }

  public get name() {
    return this[NAME];
  }

  public get type() {
    return this[TYPE];
  }

  public set type(value: TargetType) {
    if (this[TYPE] === value)
      return;
    if (this[TYPE] !== TargetType.Unknown)
      throw new Error(`${this[TYPE]} "${this[NAME]}" target cannot be change to ${value}`);
    this[TYPE] = value;
  }

  public get targetFile() {
    return this[TARGET_FILE];
  }

  public get positionIndependentCode() {
    return this[POSITION_INDEPENDENT_CODE];
  }

  public set positionIndependentCode(value: boolean) {
    this[POSITION_INDEPENDENT_CODE] = value;
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

  public addCompileOption(origin: TargetItemOrigin, publicOnly: boolean, value: string | string[]) {
    this[COMPILE_OPTIONS].addItem(origin, publicOnly, value);
  }

  public addCompileOptions(origin: TargetItemOrigin, publicOnly: boolean, ...options: Array<string|string[]>) {
    for (const iter of options.flat())
      this.addCompileOption(origin, publicOnly, iter);
  }

  public getCompileOptions(): Array<string|string[]> {
    return this[COMPILE_OPTIONS].getItems();
  }
  
  public getPublicCompileOptions(): Array<string|string[]> {
    return this[COMPILE_OPTIONS].getPublicItems();
  }

  public addLinkOption(origin: TargetItemOrigin, publicOnly: boolean, value: string | string[]) {
    return this[LINK_OPTIONS].addItem(origin, publicOnly, value);
  }

  public addLinkOptions(origin: TargetItemOrigin, publicOnly: boolean, ...options: Array<string|string[]>) {
    for (const iter of options.flat())
      this.addLinkOption(origin, publicOnly, iter);
  }

  public getLinkOptions(): Array<string|string[]> {
    return this[LINK_OPTIONS].getItems();
  }

  public getPublicLinkOptions(): Array<string|string[]> {
    return this[LINK_OPTIONS].getPublicItems();
  }

  public addDefinition(origin: TargetItemOrigin, publicOnly: boolean, value: string) {
    this[DEFINES].addItem(origin, publicOnly, value);
  }

  public addDefinitions(origin: TargetItemOrigin, publicOnly: boolean, ...definitions: any) {
    for (const iter of normalizeDefinitions(...definitions))
      this.addDefinition(origin, publicOnly, iter);
  }

  public getDefinitions(): Array<string> {
    return this[DEFINES].getItems();
  }

  public getPublicDefinitions(): Array<string> {
    return this[DEFINES].getPublicItems();
  }

  public addInclude(origin: TargetItemOrigin, publicOnly: boolean, value: DirPath|InterfaceIncludes) {
    this[INCLUDES].addItem(origin, publicOnly, value);
  }

  public addIncludes(origin: TargetItemOrigin, publicOnly: boolean, baseDir: DirPath, ...includes: any[]) {
    for (const iter of normalizeIncludes(baseDir, ...includes))
      this.addInclude(origin, publicOnly, iter);
  }

  public getIncludes(): Array<DirPath|InterfaceIncludes> {
    return this[INCLUDES].getItems();
  }

  public getPublicIncludes(): Array<DirPath|InterfaceIncludes> {
    return this[INCLUDES].getPublicItems();
  }

  public addSource(origin: TargetItemOrigin, publicOnly: boolean, value: InterfaceObjects|SourceFile) {
    this[SOURCES].addItem(origin, publicOnly, value);
  }

  public addSources(origin: TargetItemOrigin, ...sources: any[]) {
    for (const iter of sources.flat())
      this.addSource(origin, false, iter);
  }

  public getSourceFiles(): SourceFile[] {
    return this[SOURCES].ITEMS.map(i => i.value).filter(i => i instanceof SourceFile);
  }

  public getInterfaceObjectsList(): InterfaceObjects[] {
    return this[SOURCES].ITEMS.map(i => i.value).filter(i => i instanceof InterfaceObjects);
  }

  public getHeaders(): SourceFile[] {
    const result = new Array<SourceFile>;
    for (const iter of this[SOURCES].ITEMS) {
      if (iter.value instanceof SourceFile && iter.value.HEADER_FILE_ONLY)
        result.push(iter.value);
    }
    return result;
  }

  public addLibrary(origin: TargetItemOrigin, publicOnly: boolean, value: InterfaceTarget) {
    this[LIBRARIES].addItem(origin, publicOnly, InterfaceTarget.ensureInstance(value));
  }

  public addLibraries(origin: TargetItemOrigin, publicOnly: boolean, ...libraries: InterfaceTarget[]) {
    for (const iter of libraries.flat())
      this.addLibrary(origin, publicOnly, iter);
  }

  public getLibraries(): Array<InterfaceTarget> {
    return this[LIBRARIES].getItems();
  }

  public getPublicLibraries(): Array<InterfaceTarget> {
    return this[LIBRARIES].getPublicItems();
  }

  public toJSON(): object {
    return {
      name: this.name,
      targetFile: this.targetFile,
      preBuildList: this.preBuildList,
      postBuildList: this.postBuildList,
      definitions: this[DEFINES],
      includes: this[INCLUDES],
      compileOptions: this[COMPILE_OPTIONS],
      linkOptions: this[LINK_OPTIONS],
      sources: this[SOURCES],
      libraries: this[LIBRARIES],
      positionIndependentCode: this[POSITION_INDEPENDENT_CODE],
    }
  }
};
