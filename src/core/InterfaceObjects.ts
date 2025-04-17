/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const NAME = Symbol("NAME");

export class InterfaceObjects {
  private [NAME]: string;

  private constructor(name: string) {
    this[NAME] = name;
  }

  public static create(name: string) {
    return Object.seal(new InterfaceObjects(name));
  }

  public static ensureInstance(value: any): InterfaceObjects {
    if (value instanceof InterfaceObjects)
      return value;
    throw new Error(`The '${value}' is not a InterfaceObjects`);
  }

  public get targetName(): string {
    return this[NAME];
  }

  public toString(): string {
    return "${" + this[NAME] + ".objects}";
  }

  public toJSON(): string {
    return this.toString();
  }
};
