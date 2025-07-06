/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { isMainThread, parentPort, workerData } from "node:worker_threads";
import { Args }  from "@/utils/Args";
import commands from "@/commands";
import { Logger } from "@/logger";
import { MessagePortSender } from "@/server/MessagePortSender";
import { WorkerLooper } from "@/server/WorkerLooper";

const logger = Logger.create(import.meta.url);

export async function runMainScript() {
  logger.info("Main thread started")
  const options: any = {
    handler: "default",
    workDir: process.cwd(),
    env: {},
  };

  let nodeExecutable: string | undefined;
  if (process.argv.length > 0)
    nodeExecutable = process.argv[0];

  let currentScript: string | undefined;
  if (process.argv.length > 1)
    currentScript = process.argv[1];

  let argsIndex = process.argv.length;
  if (process.argv.length > 2) {
    argsIndex = 2;
    const handler = process.argv[argsIndex];
    if (!handler.startsWith("--")) {
      options.handler = handler;
      argsIndex++;
    }
  }

  options.env = Args.toObject(process.argv.slice(argsIndex));

  const handler = commands[options.handler];
  if (!handler)
    throw Error(`The ${PROJECT_NAME} does not support the ${options.handler} command`);

  const res = handler(options);
  if (res instanceof Promise) {
    await res;
  }
}

export function runWorkerScript() {
  logger.debug("Worker thread started", workerData);

  if (!parentPort) {
    throw new Error(`Worker not supported parentPort`);
  }

  const sender = new MessagePortSender(parentPort);
  const looper = new WorkerLooper(sender);

  parentPort.on("message", (message) => looper.emitMessage(sender, message));
}

export function runScript() {
  if (isMainThread) {
    runMainScript().then(() => process.exit(0)).catch((e) => {
      if (e instanceof Error)
        console.error(e.stack);
      else
        console.error(e);
      process.exit(1);
    });
  }
  else {
    runWorkerScript();
  }
}
