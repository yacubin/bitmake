/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { Locator } from "@/utils/Locator";

export interface CommandOptions {
  argv: string[];
  nodePath: string;
  handler: string;
  workDir: Locator;
  env: {
    buildType?: string;
    config?: string;
    preset?: string;
    webui?: boolean;
  };
};
