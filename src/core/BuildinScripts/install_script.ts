/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";
import path from "node:path";

export default function(params: any) {
  console.log("Installing: " + params.dest);
  fs.mkdirSync(path.dirname(params.dest), { recursive: true });
  fs.cpSync(params.src, params.dest, { force: true });
}
