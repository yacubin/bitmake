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
import cmake from "@/cmake";

import { spawnAsync } from "@/utils/ChildProcess";
import { requestGet, downloadFile } from "@/utils/HttpRequest";
import commands from "@/commands";

export default {
  cxx,
  cmake,
  commands,
  process: {
    spawn: spawnAsync,
  },
  utils: {
    requestGet,
    downloadFile,
  },
};
