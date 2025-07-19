/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ensureBoolean } from "@/utils/StrictType";
import { AbsolutePath } from "@/core/AbsolutePath";

const LANGUAGE         = Symbol("LANGUAGE");
const HEADER_FILE_ONLY = Symbol("HEADER_FILE_ONLY");
const DEFINES          = Symbol("DEFINES");
const COMPILE_PATH     = Symbol("COMPILE_PATH");
const COMPILE_FLAGS    = Symbol("COMPILE_FLAGS");
const FILE             = Symbol("FILE");
const BASE_DIR         = Symbol("BASE_DIR");

export class SourceFile {
  private [LANGUAGE]: string;
  private [HEADER_FILE_ONLY]: boolean;
  private [FILE]: AbsolutePath;
  private [BASE_DIR]: AbsolutePath;
  private [DEFINES]: string[];
  private [COMPILE_PATH]: string;
  private [COMPILE_FLAGS]: Array<string|string[]>;

  private constructor(filename: AbsolutePath, baseDir: AbsolutePath, language: string, compilerPath: string, compileFlags: Array<string | string[]>) {
    this[FILE] = filename;
    this[BASE_DIR] = baseDir;
    this[LANGUAGE] = language;
    this[HEADER_FILE_ONLY] = !language;
    this[DEFINES] = [];
    this[COMPILE_PATH] = compilerPath;
    this[COMPILE_FLAGS] = [ ...compileFlags ];
  }

  public static create(filename: AbsolutePath, baseDir: AbsolutePath, language: string, compilerPath: string, compileFlags: Array<string | string[]>) {
    return Object.seal(new SourceFile(filename, baseDir, language, compilerPath, compileFlags));
  }

  public get LANGUAGE(): string {
    return this[LANGUAGE];
  }

  public get HEADER_FILE_ONLY(): boolean {
    return this[HEADER_FILE_ONLY];
  }

  public set HEADER_FILE_ONLY(value: boolean) {
    this[HEADER_FILE_ONLY] = ensureBoolean(value);
  }

  public get DEFINES(): string[] {
    return this[DEFINES]
  }

  public addDefinition(definition: string) {
    this[DEFINES].push(definition);
  }

  public get COMPILE_PATH(): string {
    return this[COMPILE_PATH];
  }

  public get COMPILE_FLAGS(): Array<string | string[]> {
    return this[COMPILE_FLAGS];
  }

  public get FILE(): AbsolutePath {
    return this[FILE];
  }

  public get FILE_DIR(): AbsolutePath {
    return this[FILE].dirname();
  }

  public get FILE_NAME(): string {
    return this[FILE].basename();
  }

  public toJSON(): object {
    return {
      LANGUAGE: this[LANGUAGE],
      HEADER_FILE_ONLY: this[HEADER_FILE_ONLY],
      DEFINES: this[DEFINES],
      COMPILE_PATH: this[COMPILE_PATH],
      COMPILE_FLAGS: this[COMPILE_FLAGS],
      FILE: this[FILE],
      FILE_DIR: this.FILE_DIR,
      FILE_NAME: this.FILE_NAME,
      BASE_DIR: this[BASE_DIR],
    };
  }
}
