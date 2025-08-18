/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { isEntryPoint } from "@/utils/Module";
import { isMainThread, parentPort, workerData, threadId } from "node:worker_threads";
import { Args }  from "@/utils/Args";
import commands from "@/commands";
import { Logger } from "@/logger";
import { runScriptInit } from "@/app/RunScriptInit";
import { MessagePortSender } from "@/server/MessagePortSender";
import { WorkerMessageDispatcher } from "@/server/WorkerMessageDispatcher";
import { CommandOptions } from "@/core/CommandOptions";
import { Locator } from "@/utils/Locator";

const logger = Logger.create(import.meta.url);

export async function runMainScript() {
  logger.info("Main thread started");

  let nodePath = "";
  if (process.argv.length > 0)
    nodePath = process.argv[0];

  let currentScript: string | undefined;
  if (process.argv.length > 1)
    currentScript = process.argv[1];

  const options: CommandOptions = {
    argv: process.argv,
    nodePath,
    handler: "default",
    workDir: Locator.create(process.cwd()),
    env: {},
  };

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

export async function runWorkerScript() {
  logger.debug(`Worker thread #${threadId} started`, workerData);

  if (!parentPort) {
    throw new Error(`Worker not supported parentPort`);
  }

  const sender = new MessagePortSender(parentPort);
  const dispatcher = new WorkerMessageDispatcher("w" + threadId, sender);
  parentPort.on("message", (message) => {
    dispatcher.prerformMessage(message).then(data => sender.sendMessage(data));
  });
}

export function runScript() {
  if (!isEntryPoint())
    return;

  runScriptInit();

  if (!isMainThread) {
    runWorkerScript();
    return;
  }

  runMainScript().then(() => process.exit(0)).catch((e) => {
    if (e instanceof Error)
      logger.fatal(e.stack);
    else
      logger.fatal(e);
    process.exit(1);
  });
}
