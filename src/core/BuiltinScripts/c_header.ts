/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";

import { generatedScriptNameComment } from "@/cxx";

export default async function(mk: any) {
  const lines = [];

  lines.push(generatedScriptNameComment(import.meta.filename));
  lines.push("");

  for (const [name, entry] of Object.entries(mk.SCRIPT_INPUT) as any) {
    if (entry.description) {
      lines.push(`/* ${entry.description} */`);
    }
    if (typeof entry.value === "boolean") {
      lines.push(`#define ${name} ${entry.value ? 1 : 0}`);
    }
    else if (typeof entry.value === "number") {
      lines.push(`#define ${name} ${entry.value}`);
    }
    else if (typeof entry.value === "string") {
      lines.push(`#define ${name} "${entry.value}"`);
    }
    else if (Array.isArray(entry.value)) {
      lines.push(`#define ${name} "${entry.value.join(";")}"`);
    }
    else {
      throw new Error(`"${name}" has ${entry.value} value`);
    }
    lines.push("");
  }

  await fs.promises.mkdir(mk.SCRIPT_OUTPUT.dirname().toString(), { recursive: true });
  await fs.promises.writeFile(mk.SCRIPT_OUTPUT.toString(), lines.join("\n"), "utf-8");
}
