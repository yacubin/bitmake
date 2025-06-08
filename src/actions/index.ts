/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { SettingsStorage } from "@/utils/SettingsStorage";

import none from "@/actions/none";
import process from "@/actions/process";
import configure from "@/actions/configure";
import make from "@/actions/make";
import cmake from "@/actions/cmake";
import bitmake from "@/actions/bitmake";

interface ActionHandlers {
  [name: string]: (config: any, environment: any, settings: SettingsStorage) => Promise<void>;
}

export default <ActionHandlers> {
  none,
  process,
  configure,
  make,
  cmake,
  bitmake,
};
