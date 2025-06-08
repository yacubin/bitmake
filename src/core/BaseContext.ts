/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { findProgramSync } from "@/core/FindProgram";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

export class BaseContext {
  protected constructor() {
  }

  public findProgram(name: string): string | undefined {
    return findProgramSync(name);
  }
};
