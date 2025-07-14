/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { spawnSync } from "node:child_process";

import { InterfaceTask } from "@/core/MakeInterfaces";
import { SimpleObject } from "@/core/SimpleObject";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

interface Options {
  command: string;
  args: string[];
  cwd: string;
};

export class SpawnSyncTask extends InterfaceTask {
  private _command: string;
  private _args: string[];
  private _cwd: string;

  public constructor(command: string, args: string[], cwd: string) {
    super();

    this._command = command;
    this._args = args;
    this._cwd = cwd;
  }

  public execute(): void {
    logger.debug("spawnSync");
    logger.debug("  command", this._command);
    logger.debug("  cwd", this._cwd);
    for (let i = 0; i < this._args.length; i++)
      logger.debug(`  args[${i}]`, this._args[i]);

    const result = spawnSync(this._command, this._args, { cwd: this._cwd, encoding: "utf-8" });
    if (result.error || result.status) {
      logger.notice("cd " + this._cwd);
      let cmd = this._args.join(" ");
      cmd = this._command + (cmd ? " " : "") + cmd;
      logger.notice(cmd);
      logger.notice("");

      logger.fatal(result.stderr);

      if (result.error)
          throw result.error;

      throw new Error(result.error as any || "Status " + result.status);
    }
    if (result.stdout) {
      for (const line of result.stdout.trim().split("\n")) {
        logger.notice(line);
      }
    }
  }

  public static fromJSON(o: SimpleObject) {
    const options: Options & SimpleObject = o as any;
    return new SpawnSyncTask(options.command, options.args, options.cwd);
  }

  public toJSON(): Options & SimpleObject {
    return {
      type: SpawnSyncTask.name,
      command: this._command,
      args: this._args,
      cwd: this._cwd,
    }
  }
};

SimpleObject.registerInstanceCreator(SpawnSyncTask.name, SpawnSyncTask.fromJSON);
