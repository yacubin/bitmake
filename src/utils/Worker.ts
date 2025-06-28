/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { Worker } from "node:worker_threads";
import { currentScriptURL } from "@/utils/Module";

export function createWorker() {
  if (require.main)
    return new Worker(currentScriptURL());
  throw new Error("Unknown current filename");
}
