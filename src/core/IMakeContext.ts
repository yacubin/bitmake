/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { VariantMap } from "@/core/Scope";

export interface IMakeContext {
  addCacheVariables(params: string | VariantMap): void;
};
