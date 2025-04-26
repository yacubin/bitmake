/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

/// <reference path="global.d.ts" />

import path from "node:path";

import { Args }  from "@/utils/Args";
import { importModule }  from "@/utils/Module";

async function runScript() {
  const handlerMap = (await importModule("./bitmake.js") as any).default.handlers;
  const options: any = {
    handler: "default",
    nodeExecutable: null,
    currentScript: null,
    workDir: process.cwd(),
    env: {},
  };

  if (process.argv.length > 0)
    options.nodeExecutable = process.argv[0];
  if (process.argv.length > 1)
    options.currentScript = process.argv[1];

  let argsIndex = process.argv.length;
  if (process.argv.length > 2) {
    argsIndex = 2;
    const handler = process.argv[argsIndex];
    if (!handler.startsWith("--")) {
      options.handler = handler;
      argsIndex++;
    }
  }

  if (!handlerMap.hasOwnProperty(options.handler)) {
    const scriptName = options.currentScript ? path.basename(options.currentScript) : "wasmux";
    throw Error(`The ${scriptName} does not support the ${options.handler} command`);
  }

  options.env = Args.toObject(process.argv.slice(argsIndex));

  const handler = handlerMap[options.handler];
  const res = handler(options);
  if (res instanceof Promise) {
    await res;
  }
}

runScript().then(() => process.exit(0)).catch((e) => {
  if (e instanceof Error)
    console.error(e.stack);
  else
    console.error(e);
  process.exit(1);
});
