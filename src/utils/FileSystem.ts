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
import url from "node:url";

import { FILE_SCHEME, IMPORT_SCHEME, HTTP_SCHEME, HTTPS_SCHEME } from "@/utils/UrlScheme";
import { requireResolve } from "@/utils/Module";
import { Locator } from "@/utils/Locator";
import { Logger } from "@/utils/Logger";

const logger = Logger.create(import.meta.url);

export async function pathExists(path: string) {
  try {
    return !!(await fs.promises.stat(path));
  } catch {
    return false;
  }
}

export function pathExistsSync(path: string) {
  try {
    return !!fs.statSync(path);
  } catch {
    return false;
  }
}

export async function fileExists(file: fs.PathLike | Locator): Promise<boolean> {
  const path = (file instanceof Locator) ? file.toPath() : file;
  try {
    const stat = await fs.promises.stat(path);
    if (stat.isFile())
      return true;
    logger.warn(`Mode ${stat.mode} for ${file} is not a file`);
  } catch { }
  return false;
}

export function fileExistsSync(path: string) {
  try {
    return fs.statSync(path).isFile();
  } catch {
    return false;
  } 
}

export async function directoryExists(file: fs.PathLike | Locator): Promise<boolean> {
  const path = (file instanceof Locator) ? file.toPath() : file;
  try {
    const stat = await fs.promises.stat(path);
    if (stat.isDirectory())
      return true;
    logger.warn(`Mode ${stat.mode} for ${file} is not a directory`);
  } catch { }
  return false;
}

export function directoryExistsSync(path: string) {
  try {
   return fs.statSync(path).isDirectory();
  } catch {
    return false;
  }
}

export function extname(fullpath: string, options: any) {
  if (options?.longest) {
    const filename = path.basename(fullpath);
    const index = filename.indexOf('.');
    return index != -1 ? filename.substring(index) : '';
  }

  return path.extname(fullpath);
}

export async function fileList(dirname: string, options: any): Promise<Array<string>> {
  const list = new Array<string>;
  if (await directoryExists(dirname)) {
    for (const iter of await fs.promises.readdir(dirname)) {
      const filepath = path.resolve(dirname, iter);
      const stat = await fs.promises.stat(filepath);
      if (stat.isFile()) {
        list.push(options.relative ? path.relative(options.relative, filepath) : filepath);
      }
      else if (options.recursive && stat.isDirectory()) {
        for (const fname of await fileList(filepath, options))
          list.push(fname);
      }
    }
  }
  return list;
}

export async function saveIfDifferent(filename: string, content: string) {
  if (await fileExists(filename)) {
    const oldContent = await fs.promises.readFile(filename, { encoding: "utf8" });
    if (content == oldContent)
      return false;
  }

  await fs.promises.mkdir(path.dirname(filename), { recursive: true });
  await fs.promises.writeFile(filename, content, { encoding: "utf8" });

  return true;
}

export function getPathString(str: string) {
  if (str.startsWith(IMPORT_SCHEME))
    str = requireResolve(str.slice(IMPORT_SCHEME.length));
  if (str.startsWith(FILE_SCHEME))
    return url.fileURLToPath(str);
  return str;
}

export function isURL(str: string) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function getURLString(str: string) {
  if (str.startsWith(IMPORT_SCHEME))
    return requireResolve(str.slice(IMPORT_SCHEME.length));
  if (isURL(str))
    return url.fileURLToPath(str);
  return str;
}

export function resolveURLString(str: string) {
  if (str.startsWith(IMPORT_SCHEME))
    return requireResolve(str.slice(IMPORT_SCHEME.length));
  return isURL(str) ? str : url.pathToFileURL(str);
}

export async function fetchBuffer(str: string): Promise<Buffer> {
  if (str.startsWith(HTTP_SCHEME) || str.startsWith(HTTPS_SCHEME)) {
    const response = await fetch(str);
    return Buffer.from(await response.arrayBuffer());
  }
  return await fs.promises.readFile(getURLString(str));
}

export async function saveAsJSON(filename: string, value: any, options?: { pretty: boolean }) {
  const content = JSON.stringify(value, null, options && options.pretty ? 2 : 0);
  await fs.promises.mkdir(path.dirname(filename), { recursive: true });
  await fs.promises.writeFile(filename, content, { encoding: "utf8" });
}

export namespace FileSystem {

export function rm(path: fs.PathLike | Locator, options?: fs.RmOptions): Promise<void> {
  logger.info(`rm -f${options?.recursive ? "r" : ""} ${path}`);
  if (path instanceof Locator)
    path = path.toPath();
  return fs.promises.rm(path, options);
}

export function mkdir(path: fs.PathLike | Locator, options: fs.MakeDirectoryOptions): Promise<string | undefined> {
  logger.info(`mkdir ${options?.recursive ? "-p " : ""}${path}`);
  if (path instanceof Locator)
    path = path.toPath();
  return fs.promises.mkdir(path, options); 
}

export function rename(oldPath: fs.PathLike, newPath: fs.PathLike): Promise<void> {
  logger.info(`mv ${oldPath} ${newPath}`);
  if (oldPath instanceof Locator)
    oldPath = oldPath.toPath();
  if (newPath instanceof Locator)
    newPath = newPath.toPath();
  return fs.promises.rename(oldPath, newPath);
}

export function readdir(path: fs.PathLike | Locator, options?: fs.ObjectEncodingOptions | BufferEncoding | null): Promise<string[]> {
  if (path instanceof Locator)
    path = path.toPath();
  return fs.promises.readdir(path, options);
}

export function writeFile(file: fs.PathLike | Locator, data: | string | NodeJS.ArrayBufferView, options?: fs.ObjectEncodingOptions | BufferEncoding | null): Promise<void> {
  logger.info(`echo [Buffer object] > ${file}`);
  if (file instanceof Locator)
    file = file.toPath();
  return fs.promises.writeFile(file, data, options);
}

} // namespace FileSystem
