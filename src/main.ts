/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

/// <reference path="global.d.ts" />

import url from "node:url";
import path from "node:path";

import { importModule }  from "@/utils/Module";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function toOptionKey(name: string) {
  if (!name.startsWith("--"))
    return null;

  name = name.substring(2).toLowerCase();
  if (!name.length)
    return null;

  let key = name.charAt(0);
  if (!key.match(/[a-z]/))
    return null;

  let hyphen = 0;
  for (let i = 1; i < name.length; i++) {
    const ch = name.charAt(i);
    if (ch.match(/[a-z0-9]/)) {
      key += (hyphen ? ch.toUpperCase() : ch)
      hyphen = 0;
    }
    else if (ch == "-") {
      if (++hyphen > 1)
        return null;
    }
  }

  return hyphen ? null : key;
}

async function runScript() {
  const handlerMap = (await importModule("./bitmake.js") as any).default.handlers;
  const options: any = {
    handler: "default",
    nodeExecutable: null,
    currentScript: null,
    scriptDir: __dirname,
    rootDir: path.dirname(__dirname),
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

  let lastKey = null;
  while (argsIndex < process.argv.length) {
    const iter = process.argv[argsIndex++];
    if (iter.startsWith("--")) {
      const key = toOptionKey(iter);
      if (!key)
        throw Error(`Option ${iter} is not supported`);
      if (options.env.hasOwnProperty(key))
        throw Error(`Cannot specify the same option '${iter}' more than once`);
      lastKey = key;
      options.env[key] = true;
    }
    else if (lastKey) {
      const value = options.env[lastKey];
      if (typeof value === 'boolean')
        options.env[lastKey] = iter;
      else if (typeof value === 'string')
        options.env[lastKey] = [ value, iter ];
      else
        value.push(iter);
    }
    else {
      throw Error(`Need to specify the option name before '${iter}' parameter`);
    }
  }

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
