/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { ensureBoolean } from "@/utils/StrictType";
import { AbsolutePath } from "@/core/Path";

const NAME                = Symbol("NAME");
const LANGUAGE            = Symbol("LANGUAGE");
const HEADER_FILE_ONLY    = Symbol("HEADER_FILE_ONLY");
const DEFINES             = Symbol("DEFINES");
const COMPILE_FLAGS       = Symbol("COMPILE_FLAGS");
const FILE                = Symbol("FILE");
const OBJECT_FILE         = Symbol("OBJECT_FILE");

const _languageExtensions = {
  ASM: [ ".asm", ".s" ],
  C:   [ ".c" ],
  CXX: [".cpp", ".cc", ".cxx" ],
};

function isSupportLanguage(language: string) {
  return _languageExtensions.hasOwnProperty(language);
}

function getFileLanguage(filename: any) {
  const filenameLowerCase = filename.toString().toLowerCase();
  for (const [language, extensions] of Object.entries(_languageExtensions)) {
    for (const iter of extensions) {
      if (filenameLowerCase.endsWith(iter))
        return language;
    }
  }
  return "";
}

function makeLanguage(value: string) {
  if (isSupportLanguage(value))
    return value;
  throw new Error(`Language "${value}" is not supported`);
}

export class SourceFile {
  private [NAME]: string;
  private [LANGUAGE]: string;
  private [HEADER_FILE_ONLY]: boolean;
  private [FILE]: AbsolutePath;
  private [OBJECT_FILE]: AbsolutePath | null;
  private [DEFINES]: string[];
  private [COMPILE_FLAGS]: string[];

  private constructor(scope: any, filename: string) {
    this[NAME] = filename.toString();
    const fname = scope.SOURCE_DIR.resolve(filename);
  
    const language = getFileLanguage(fname);
    this[LANGUAGE] = language;
    this[HEADER_FILE_ONLY] = !language;
    this[FILE] = fname;
    this[OBJECT_FILE] = null;
    this[DEFINES] = [];
    this[COMPILE_FLAGS] = !language ? [] : [
      ...scope[language + "_FLAGS"],
      ...scope[language + "_FLAGS_" + scope.BUILD_TYPE.toUpperCase()],
    ];
  }

  public static create(scope: any, filename: string) {
    return Object.seal(new SourceFile(scope, filename));
  }

  public get NAME(): string {
    return this[NAME];
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

  public get DEFINES() {
    return this[DEFINES]
  }

  public get COMPILE_FLAGS() {
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

  public get OBJECT_FILE(): AbsolutePath | null {
    return this[OBJECT_FILE];
  }

  public set OBJECT_FILE(value: AbsolutePath) {
    this[OBJECT_FILE] = value;
  }

  public get OBJECT_FILE_DIR(): AbsolutePath | null {
    return this[OBJECT_FILE] ? this[OBJECT_FILE].dirname() : null;
  }

  public get OBJECT_FILE_NAME(): string | null {
    return this[OBJECT_FILE] ? this[OBJECT_FILE].basename() : null;
  }

  public toJSON(): object {
    const json: any = {};
    for (const key in this)
      json[key] = this[key];
    return json;
  }
}
