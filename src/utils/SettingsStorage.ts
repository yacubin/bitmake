/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";

export class SettingsStorage {
  private _filename: string;
  private _settings: any;
  private _current: any;

  constructor(filename: string) {
    this._filename = filename;
  }

  public async push(name: string) {
    if (!this._settings)
      await this.load();
    let object = this._current.object[name];
    if (!object)
      object = this._current.object[name] = {};
    this._current = { parent: this._current, object };
  }

  public async pop() {
    if (!this._settings)
      await this.load();
    console.assert(this._current.parent);
    this._current = this._current.parent;
  }

  public async get(name: string) {
    if (!this._settings)
      await this.load();
    return this._current.object[name];
  }

  public async set(name: string, value: any) {
    if (!this._settings)
      await this.load();
    this._current.object[name] = value;
    await this.save();
  }

  public async load() {
    try {
      const content = await fs.promises.readFile(this._filename, "utf-8");
      this._settings = JSON.parse(content);
    }
    catch (e) {
      this._settings = {};
    }
    this._current =
    {
      parent: null,
      object: this._settings,
    };
  }

  public async save() {
    const space = 2;
    const content = JSON.stringify(this._settings, undefined, space);
    await fs.promises.writeFile(this._filename, content, { encoding: "utf-8", flag: "w", flush: true });
  }
};
