/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";
import fs from "node:fs";
import { spawn, execFile } from "node:child_process";
import util from "node:util";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

type Result = {
  status: number;
};

export function spawnAsync(command: string, args: string[], options?: any): Promise<Result> {
  let fd = null;
  let verbose = false;
  if (options && options.extra) {
    if (options.extra.verbose)
      verbose = true;
    if (options.extra.output) {
      let logfile = options.extra.output;
      if (!path.isAbsolute(logfile) && options.cwd) {
        logfile = path.resolve(options.cwd, logfile);
      }
      fd = fs.openSync(logfile, "w+", 0o666);
    }
  }
  return new Promise((resolve, reject) => {
    if (fd || verbose) {
      verbose && logger.notice([ path.basename(command), ...args ].join(" "));
      fd && fs.writeSync(fd, JSON.stringify({command, args, options }, null, 2) + "\n");
    }
    const exec = spawn(command, args, options);
    exec.stdout.on("data", (data) => {
      process.stdout.write(data);
      fd && fs.writeSync(fd, data);
    });
    exec.stderr.on("data", (data) => {
      process.stderr.write(data);
      fd && fs.writeSync(fd, data);
    });
    exec.on("close", (status: number) => {
      fd && fs.closeSync(fd);
      resolve({status});
    });
  });
}

export const execFileAsync = util.promisify(execFile);
