/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import os from "node:os";

const sizeofVoidpBits: any =
{
  arm:     4,
  arm64:   8,
  ia32:    4,
  loong64: 8,
  mips:    4,
  mipsel:  4,
  ppc:     4,
  ppc64:   8,
  riscv64: 8,
  s390:    4,
  s390x:   8,
  x64:     4,
};

const _sizeofVoidp = sizeofVoidpBits[os.arch()];
if (!_sizeofVoidp)
  throw new Error(`Unknown ${os.arch()} arch`);

let _executableSuffix: string;

if (os.platform() === "win32") {
  _executableSuffix = ".exe";
}
else {
  _executableSuffix = "";
}

export class Host {
  static get sizeofVoidp(): 4 | 8 {
    return _sizeofVoidp;
  }
  static get executableSuffix(): string {
    return _executableSuffix;
  }
};
