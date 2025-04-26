/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { SourceFile } from "@/core/SourceFile";
import { SystemScope } from "@/core/SystemScope";

const SOURCES = Symbol("SOURCES");

export class SourceFileList {
  private [SOURCES]: SourceFile[];

  private constructor(scope: SystemScope, sources: SourceFile[]) {
    this[SOURCES] = [];
    for (const iter of sources) {
      if (!(iter instanceof SourceFile))
        throw new Error(`Item ${iter} is not SourceFile`);
      this[SOURCES].push(iter);
    }
  }

  public static create(scope: SystemScope, sources: SourceFile[]) {
    return Object.seal(new SourceFileList(scope, sources));
  }

  public addDefinitions(...definitions: string[]) {
    for (const iter of definitions.flat())
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
