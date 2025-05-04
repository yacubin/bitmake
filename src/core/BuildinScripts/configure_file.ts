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

export default async function(mk: any, params: any) {
  let content = await fs.promises.readFile(mk.SCRIPT_INPUT.toString(), "utf-8");
  content = content.replace(/@([_A-Za-z][_A-Za-z0-9]+)@/g, (match, v1) => {
    const res = params[v1] || mk[v1] || "";
    if (Array.isArray(res))
      return res.join("\n");
    return res.toString();
  });
  content = content.replace(/#cmakedefine +([_A-Za-z][_A-Za-z0-9]+) *(.*)/g, (match, v1, v2) => {
    return params[v1] || mk[v1] ? `#define ${v1} ${v2}` : `/* #undef ${v1} */`;
  });
  await fs.promises.mkdir(path.dirname(mk.SCRIPT_OUTPUT.toString()), { recursive: true });
  await fs.promises.writeFile(mk.SCRIPT_OUTPUT.toString(), content, "utf-8");
}
