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

import { spawnAsync } from "@/utils/ChildProcess";
import { requestGet, downloadFile } from "@/utils/HttpRequest";
import initHandler from "@/InitHandler";
import buildHandler from "@/BuildHandler";

export default {
  cxx,
  handlers: {
    default: buildHandler,
    init: initHandler,
    build: buildHandler,
  },
  process: {
    spawn: spawnAsync,
  },
  utils: {
    requestGet,
    downloadFile,
  },
};
