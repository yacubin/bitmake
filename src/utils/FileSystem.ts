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

import { requireResolve } from "@/utils/Module";

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

export async function fileExists(path: string) {
  try {
    return (await fs.promises.stat(path)).isFile();
  } catch {
    return false;
  }
}

export function fileExistsSync(path: string) {
  try {
    return fs.statSync(path).isFile();
  } catch {
    return false;
  } 
}

export async function directoryExists(path: string) {
  try {
    return (await fs.promises.stat(path)).isDirectory();
  } catch {
    return false;
  }
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

export const FILE_SCHEME = "file://";
export const IMPORT_SCHEME = "import://";
export const HTTP_SCHEME = "http://";
export const HTTPS_SCHEME = "https://";

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

export async function fetchBuffer(str: string): Promise<Buffer> {
  if (str.startsWith(HTTP_SCHEME) || str.startsWith(HTTPS_SCHEME)) {
    const response = await fetch(str);
    return Buffer.from(await response.arrayBuffer());
  }
  return await fs.promises.readFile(getURLString(str));
}
