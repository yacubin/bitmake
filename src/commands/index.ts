/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { CommandOptions } from "@/core/CommandOptions";
import init from "@/commands/init";
import build from "@/commands/build";

export default {
  default: build,
  init,
  build,
} as { [name: string]: (options: CommandOptions) => any; };
