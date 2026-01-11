/*
 * MIT License
 *
 * Copyright (c) 2025-2026  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { InterfaceTask } from "@/core/MakeInterfaces";
import { SimpleObject } from "@/core/SimpleObject";
import { spawnAsync } from "@/utils/ChildProcess";
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

  public async execute(): Promise<void> {
    logger.debug("spawnAsync");
    logger.debug("  command", this._command);
    logger.debug("  cwd", this._cwd);
    for (let i = 0; i < this._args.length; i++)
      logger.debug(`  args[${i}]`, this._args[i]);

    const result = await spawnAsync(this._command, this._args, { cwd: this._cwd, encoding: "utf-8", nostdout: true });
    if (result.error || result.status !== 0) {
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
