import fs from "node:fs";
import path from "node:path";

import { fileList } from "@/utils/FileSystem";
import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

export async function makePatch(srcDir, destDir) {
  logger.info(`Make patch ${srcDir} to ${destDir}`);
  const list = await fileList(srcDir, { relative: srcDir, recursive: true });
  for (const iter of list) {
    const source = path.resolve(srcDir, iter);
    const destination = path.resolve(destDir, iter);
    await fs.promises.cp(source, destination, { force: true });
    logger.info(` Replaced ${iter}`);
  }
}
