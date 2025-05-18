/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

/// <reference path="global.d.ts" />

// @ts-ignore
import bitmake from "bitmake";

import { Args }  from "@/utils/Args";

async function runScript() {
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

  const handler = bitmake.commands[options.handler];
  if (!handler)
    throw Error(`The ${PROJECT_NAME} does not support the ${options.handler} command`);

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
