/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";

import { InterfaceTask } from "@/core/MakeInterfaces";
import { Locator } from "@/utils/Locator";
import { SimpleObject } from "@/core/SimpleObject";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

interface Entry {
  src: Locator;
  dest: Locator;
};

export class FileInstallationTask extends InterfaceTask {
  private _entries: Entry[];

  public constructor() {
    super();
    this._entries = [];
  }

  public async execute(): Promise<void> {
    for (const {src, dest} of this._entries) {
      logger.notice("Installing: " + dest);
      await fs.promises.mkdir(dest.dirname().toPath(), { recursive: true });
      await fs.promises.cp(src.toPath(), dest.toPath(), { force: true });
    }
  }

  public add(src: Locator, dest: Locator) {
    this._entries.push({src, dest});
  }

  public static fromJSON(o: SimpleObject) {
    const task = new FileInstallationTask;
    for (const iter of (o as any).entries as Entry[])
      task._entries.push(iter);
    return task;
  }

  public toJSON(): SimpleObject {
    return {
      type: FileInstallationTask.name,
      entries: this._entries,
    }
  }
};
