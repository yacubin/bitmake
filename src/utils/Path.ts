/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import os from "node:os";
import nodepath from "node:path";
import url from "node:url";

let nativeSep =  nodepath.posix.sep;
let otherSep = nodepath.win32.sep;

if (os.platform() === "win32") {
  [ nativeSep, otherSep ] = [ otherSep, nativeSep ];
}

export namespace Path {

export const sep = nodepath.posix.sep;
export const delimiter = nodepath.delimiter;

export function nativePath(path: string): string {
  return path.replaceAll(otherSep, nativeSep);
}

export function representPath(path: string): string {
  return path.replaceAll(nodepath.win32.sep, nodepath.posix.sep);
}

export function isAbsolute(path: string): boolean {
  return nodepath.isAbsolute(nativePath(path));
}

export function join(...paths: string[]): string {
  return representPath(nodepath.join(...paths.map(i => nativePath(i))));
}

export function resolve(...paths: string[]): string {
  return representPath(nodepath.resolve(...paths.map(i => nativePath(i))));
}

export function dirname(path: string): string {
  return representPath(nodepath.dirname(nativePath(path)));
}

export function basename(path: string, suffix?: string): string {
  return representPath(nodepath.basename(nativePath(path), suffix));
}

export function relative(from: string, to: string): string {
  return representPath(nodepath.relative(nativePath(from), nativePath(to)));
}

export function toFileURL(path: string, options?: url.PathToFileUrlOptions) {
  return url.pathToFileURL(path, options);
}

} // namespace Path
