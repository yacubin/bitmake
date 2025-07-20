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
  private _filename: AbsolutePath;
  private _baseDir: AbsolutePath;
  
  private _headerOnly: boolean;

  private _language: string;
  private _definitions: string[];
  private _compilerPath: string;
  private _compilerOptions: Array<string | string[]>;

  private constructor(filename: AbsolutePath, baseDir: AbsolutePath, headerOnly: boolean, language: string, compilerPath: string, compilerOptions: Array<string | string[]>) {
    this._filename = filename;
    this._baseDir = baseDir;

    this._headerOnly = headerOnly;

    this._language = language;
    this._definitions = [];
    this._compilerPath = compilerPath;
    this._compilerOptions = [ ...compilerOptions ];
  }

  public static create(filename: AbsolutePath, baseDir: AbsolutePath, headerOnly: boolean, language: string, compilerPath: string, compilerOptions: Array<string | string[]>) {
    return new SourceFile(filename, baseDir, headerOnly, language, compilerPath, compilerOptions);
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

  public addCompileOption(option: string | [ string, string ]): void {
    this._compilerOptions.push(option);
  }

  public get COMPILE_PATH(): string {
    return this._compilerPath;
  }

  public get COMPILE_FLAGS(): Array<string | string[]> {
    return this._compilerOptions;
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

  public static fromJSON(json: any): SourceFile {
    const filename = AbsolutePath.create(json.filename);
    const baseDir = AbsolutePath.create(json.baseDir);
    const headerOnly = json.headerOnly || false;
    const language = json.language || "";
    const compilerPath = json.compilerPath || "";
    const compilerOptions = json.compilerOptions || [];
    const result = new SourceFile(filename, baseDir, headerOnly, language, compilerPath, compilerOptions);
    if (json.definitions)
      result._definitions = Array.from(json.definitions);
    return result;
  }

  public toJSON(): SimpleObject {
    const json: SimpleObject = {
      type: SourceFile.name,
      filename: this._filename.toURLString(),
      baseDir: this._baseDir.toURLString(),
    };
    if (this._headerOnly)
      json.headerOnly = true;
    else {
      if (this._language)
        json.language = this._language;
      if (this._compilerPath)
        json.compilerPath = this._compilerPath;
      if (this._definitions.length)
        json.definitions = [ ...this._definitions ];
      if (this._compilerOptions.length)
        json.compilerOptions = [ ...this._compilerOptions ];
    }
    return json;
  }
}
