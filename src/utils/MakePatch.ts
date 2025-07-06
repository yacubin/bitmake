import fs from "node:fs";
import path from "node:path";

import { fileList } from "@/utils/FileSystem";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export async function makePatch(srcDir: string, destDir: string) {
  logger.info(`Make patch ${srcDir} to ${destDir}`);
  const list = await fileList(srcDir, { relative: srcDir, recursive: true });
  for (const iter of list) {
    const source = path.resolve(srcDir, iter);
    const destination = path.resolve(destDir, iter);
    await fs.promises.cp(source, destination, { force: true });
    logger.info(` Replaced ${iter}`);
  }
}
