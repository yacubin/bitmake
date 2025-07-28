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

interface SpawnAsyncOptions {
  cwd?: string;
  encoding?: BufferEncoding;
  env?: any;
  nostdout?: boolean;
  extra?: {
    verbose?: boolean;
    output?: string;
  };
};

interface SpawnAsyncReturns {
  status: number;
  stdout: string;
  stderr: string;
  output: string;
  error?: Error | undefined;
};

export function spawnAsync(command: string, args: string[], options?: SpawnAsyncOptions): Promise<SpawnAsyncReturns> {
  let fd = null;
  let verbose = false;
  const encoding = options?.encoding;

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
    verbose && logger.notice([ path.basename(command), ...args ].join(" "));

    if (fd) {
      fs.writeSync(fd, JSON.stringify({command, args, options }, null, 2) + "\n");
    }

    const stdout: Buffer[] = [];
    const stderr: Buffer[] = [];
    const output: Buffer[] = [];

    const exec = spawn(command, args, options);

    if (fd) {
      exec.stdout.addListener("data", chunk => fs.writeSync(fd, chunk));
      exec.stderr.addListener("data", chunk => fs.writeSync(fd, chunk));
      exec.addListener("close", () => fs.closeSync(fd));
    }
    else {
      exec.stdout.addListener("data", chunk => {
        stdout.push(chunk);
        output.push(chunk);
      });
      exec.stderr.addListener("data", chunk => {
        stderr.push(chunk);
        output.push(chunk);
      });
    }

    if (!options?.nostdout) {
      exec.stdout.addListener("data", chunk => process.stdout.write(chunk));
      exec.stderr.addListener("data", chunk => process.stderr.write(chunk));
    }

    exec.addListener("close", (status: number) => resolve({
      status,
      stdout: Buffer.concat(stdout).toString(encoding),
      stderr: Buffer.concat(stderr).toString(encoding),
      output: Buffer.concat(output).toString(encoding),
    }));
  });
}

export const execFileAsync = util.promisify(execFile);
