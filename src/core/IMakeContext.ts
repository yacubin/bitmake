/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { VariantMap } from "@/core/Scope";

export interface IMakeObject {
  getProperty(name: string): any;
  setProperty(name: string, value: any): boolean;
  hasProperty(name: string): boolean;
  getPropertyNames(): string[];
  deleteProperty(name: string): boolean;
};

export interface IMakeContext {
  addCacheVariables(params: string | VariantMap): void;
};
