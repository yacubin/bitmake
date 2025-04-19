/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const NAME = Symbol("NAME");

export class InterfaceIncludes {
  private [NAME]: string;

  private constructor(name: string) {
    this[NAME] = name;
  }

  public get targetName() {
    return this[NAME];
  }

  public toString(): string {
    return "${" + this[NAME] + ".includes}";
  }

  public toJSON() {
    return this.toString();
  }

  public static create(name: string) {
    return Object.seal(new InterfaceIncludes(name));
  }

  public static ensureInstance(value: any) {
    if (value instanceof InterfaceIncludes)
      return value;
    throw new Error(`The '${value}' is not a InterfaceIncludes`);
  }
};
