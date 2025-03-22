import fs from "node:fs";
import path from "node:path";

import { fileList } from "###/utils/FileSystem.js";

export async function makePatch(srcDir, destDir)
{
  console.log(`Make patch ${srcDir} to ${destDir}`);
  const list = await fileList(srcDir, { relative: srcDir, recursive: true });
  for (const iter of list) {
    const source = path.resolve(srcDir, iter);
    const destination = path.resolve(destDir, iter);
    await fs.promises.cp(source, destination, { force: true });
    console.log(` Replaced ${iter}`);
  }
}
