/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

/// <reference path="global.d.ts" />

import * as cxx from "@/cxx";

import initHandler from "@/InitHandler";
import buildHandler from "@/BuildHandler";

export default {
  cxx,
  print: () => console.log(">>>", (globalThis as any).__bitmake),
  handlers: {
    default: buildHandler,
    init: initHandler,
    build: buildHandler,
  },
};
