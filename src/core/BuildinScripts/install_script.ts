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
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

export default async function(params: any) {
  logger.info("Installing: " + params.dest);
  await fs.promises.mkdir(path.dirname(params.dest), { recursive: true });
  await fs.promises.cp(params.src, params.dest, { force: true });
}
