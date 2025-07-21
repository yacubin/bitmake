/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { findProgram } from "@/core/FindProgram";
import { SystemScope } from "@/core/SystemScope";
import { clang } from "@/clang/index";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export async function determineCompiler(scope: SystemScope) {
  const clangPath = await findProgram("clang");
  if (clangPath) {
    let version = "Uknown";
    try {
      version = await clang.readVersion(clangPath);
    }
    catch (e) {
      logger.error("Cannot read version from", clangPath);
    }
    logger.info("The C compiler identification is Clang", version);
    scope.ASM_COMPILER = "clang";
    scope.C_COMPILER = "clang";
    scope.CXX_COMPILER = "clang++";
    scope.AR = "llvm-ar";
    scope.RANLIB = "llvm-ranlib";
    scope.LINKER = "lld";
    scope.NM = "llvm-nm";
    scope.OBJCOPY = "llvm-objcopy";
    scope.OBJDUMP = "llvm-objdump";
    scope.STRIP = "llvm-strip";
    return;
  }

  const gccPath = await findProgram("gcc");
  if (gccPath) {
    logger.info("The C compiler identification is GNU a.b.c");
    scope.ASM_COMPILER = "gcc";
    scope.C_COMPILER = "gcc";
    scope.CXX_COMPILER = "g++";
    scope.AR = "ar";
    scope.RANLIB = "ranlib";
    scope.LINKER = "ld";
    scope.NM = "nm";
    scope.OBJCOPY = "objcopy";
    scope.OBJDUMP = "objdump";
    scope.STRIP = "strip";
    return;
  }

  throw `Can not determine compiler`;
}
