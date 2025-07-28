/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";
import { Locator } from "@/utils/Locator";
import { importModule } from "@/utils/Module";

export async function loadJSValue(filename: Locator) {
  if (filename.endsWith(".json")) {
    const content = await fs.promises.readFile(filename.toPath(), "utf8");
    return JSON.parse(content);
  }

  const module = await importModule(filename.toURLString());
  if (!module.default)
    throw new Error(`Script "${filename}" has not contain a default function`);

  return module.default;
}
