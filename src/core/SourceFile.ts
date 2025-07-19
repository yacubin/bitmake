/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { AbsolutePath } from "@/core/AbsolutePath";
import { SimpleObject } from "@/core/SimpleObject";

export class SourceFile {
  private _language: string;
  private _headerOnly: boolean;
  private _filename: AbsolutePath;
  private _baseDir: AbsolutePath;
  private _definitions: string[];
  private _compilePath: string;
  private _compileOptions: Array<string | string[]>;

  private constructor(filename: AbsolutePath, baseDir: AbsolutePath, language: string, compilerPath: string, compileFlags: Array<string | string[]>) {
    this._filename = filename;
    this._baseDir = baseDir;
    this._language = language;
    this._headerOnly = !language;
    this._definitions = [];
    this._compilePath = compilerPath;
    this._compileOptions = [ ...compileFlags ];
  }

  public static create(filename: AbsolutePath, baseDir: AbsolutePath, language: string, compilerPath: string, compileFlags: Array<string | string[]>) {
    return Object.seal(new SourceFile(filename, baseDir, language, compilerPath, compileFlags));
  }

  public get LANGUAGE(): string {
    return this._language;
  }

  public get HEADER_FILE_ONLY(): boolean {
    return this._headerOnly;
  }

  public get DEFINES(): string[] {
    return this._definitions;
  }

  public addDefinition(definition: string) {
    this._definitions.push(definition);
  }

  public get COMPILE_PATH(): string {
    return this._compilePath;
  }

  public get COMPILE_FLAGS(): Array<string | string[]> {
    return this._compileOptions;
  }

  public get FILE(): AbsolutePath {
    return this._filename;
  }

  public get FILE_DIR(): AbsolutePath {
    return this._filename.dirname();
  }

  public get FILE_NAME(): string {
    return this._filename.basename();
  }

  public toJSON(): SimpleObject {
    const json: SimpleObject = {
      type: SourceFile.name,
      filename: this._filename,
      baseDir: this._baseDir,
    };
    if (this._headerOnly)
      json.headerOnly = this._headerOnly;
    else {
      if (this._language)
        json.language = this._language;
      if (this._definitions.length)
        json.definitions = this._definitions;
      if (this._compilePath)
        json.compilePath = this._compilePath;
      if (this._compileOptions.length)
        json.compileOptions = this._compileOptions;
    }
    return json;
  }
}
