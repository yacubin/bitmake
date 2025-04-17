/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

const NAME       = Symbol("NAME");
const PROPERTIES = Symbol("PROPERTIES");

export class InterfaceScript {
  private [NAME]: string;
  private [PROPERTIES]: any;

  private constructor(name: string) {
    this[NAME] = name;
    this[PROPERTIES] = {};
  }

  public get NAME() {
    return this[NAME];
  }

  public get PROPERTIES() {
    return this[PROPERTIES];
  }
  
  public addProperty(key: string, ...vals: any[]) {
    let property = this[PROPERTIES][key];
    if (!property) {
      property = [];
      this[PROPERTIES][key] = property;
    }
    vals.forEach(v => property.push(v));
  }

  public toJSON(): object {
    return {
      NAME: this.NAME,
      PROPERTIES: this.PROPERTIES,
    };
  }
  
  public toString(): string {
    return this[NAME];
  }

  public static create(name: string) {
    return Object.seal(new InterfaceScript(name));
  }

  public static ensureInstance(value: any) {
    if (value instanceof InterfaceScript)
      return value;
    throw new Error(`The '${value}' is not a InterfaceScript`);
  }
};
