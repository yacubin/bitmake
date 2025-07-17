/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceSourceFiles } from "@/core/MakeInterfaces";
import { SourceFile } from "@/core/SourceFile";
import { normalizeDefinitions } from "@/core/DefinitionHelper";
import { BaseTarget } from "@/core/Target";

const TARGET = Symbol("TARGET");
const SOURCES = Symbol("SOURCES");

export class UserSourceFiles extends InterfaceSourceFiles {
  private [TARGET]: BaseTarget;
  private [SOURCES]: SourceFile[];

  private constructor(target: BaseTarget, sources: SourceFile[]) {
    super();
    this[TARGET] = target;
    this[SOURCES] = [];
    for (const iter of sources) {
      if (!(iter instanceof SourceFile))
        throw new Error(`Item ${iter} is not SourceFile`);
      this[SOURCES].push(iter);
    }
  }

  public static create(target: BaseTarget, sources: SourceFile[]) {
    return Object.seal(new UserSourceFiles(target, sources));
  }

  public setLanguage(language: string): void {
    throw new Error("Not Implemented");
  }

  public addDefinitions(...definitions: string[]) {
    for (const iter of normalizeDefinitions(...definitions))
      this[SOURCES].forEach(i => i.DEFINES.push(iter));
  }

  public addCompileFlags(...flags: string[]) {
    for (const iter of flags.flat())
      this[SOURCES].forEach(i => i.COMPILE_FLAGS.push(iter));
  }

  public sourceAt(index: number): SourceFile {
    return this[SOURCES][index];
  }

  public sourceCount(index: number): number {
    return this[SOURCES].length;
  }

  public toJSON(): object {
    return this[SOURCES];
  }
};
