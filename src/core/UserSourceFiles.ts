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
import { TargetHelper } from "@/core/TargetHelper";
import { BaseTarget } from "@/core/Target";

const TARGET = Symbol("TARGET");
const SOURCES = Symbol("SOURCES");

export class UserSourceFiles extends InterfaceSourceFiles {
  private [TARGET]: BaseTarget;
  private [SOURCES]: SourceFile[];

  private constructor(target: BaseTarget, sources: SourceFile[]) {
    super();
    this[TARGET] = target;
    this[SOURCES] = [ ...sources ];
  }

  public static create(target: BaseTarget, sources: SourceFile[]) {
    return Object.seal(new UserSourceFiles(target, sources));
  }

  public setLanguage(language: string): void {
    throw new Error("Not Implemented");
  }

  public addDefinitions(...definitions: string[]) {
    for (const iter of TargetHelper.normalizeDefinitions(definitions.flat()))
      this[SOURCES].forEach(i => i.addDefinition(iter));
  }

  public addCompileFlags(...options: string[]) {
    for (const iter of TargetHelper.normalizeCompileOptions(options.flat()))
      this[SOURCES].forEach(i => i.addCompileOption(iter));
  }

  public toJSON(): object {
    return this[SOURCES];
  }
};
