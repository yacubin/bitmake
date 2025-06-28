/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

/// <reference path="global.d.ts" />

import { isEntryPoint } from "@/utils/Module";
import * as cxx from "@/cxx";
import { CMakeProcess, CTestProcess, ScriptModeOptions, getProjectInfo } from "@/cmake";

import { spawnAsync } from "@/utils/ChildProcess";
import { requestGet, downloadFile } from "@/utils/HttpRequest";
import { Path } from "@/utils/Path";
import commands from "@/commands";

export default {
  cxx,
  cmake: {
    scriptMode: (scriptFile: string, variables: object, options?: ScriptModeOptions) => CMakeProcess.getInstance().scriptMode(scriptFile, variables, options),
    configure: (args: any) => CMakeProcess.getInstance().configure(args),
    build: (args: any) => CMakeProcess.getInstance().build(args),
    install: (args: any) => CMakeProcess.getInstance().install(args),
    extract: (args: any) => CMakeProcess.getInstance().extract(args),
    ctest: (args: any) => CTestProcess.getInstance().ctest(args),
    getProjectInfo,
  },
  commands,
  process: {
    spawn: spawnAsync,
  },
  utils: {
    requestGet,
    downloadFile,
  },
  path: Path,
};

if (isEntryPoint()) {
  console.log(">>> Is Entry Point")
}
