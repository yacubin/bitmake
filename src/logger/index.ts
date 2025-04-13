/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export interface ILogger {
  trace(message?: any, ...params: any[]): void;
  debug(message?: any, ...params: any[]): void;
  info(message?: any, ...params: any[]): void;
  warn(message?: any, ...params: any[]): void;
  error(message?: any, ...params: any[]): void;
};

export function createLogger(url: URL): ILogger {
  return {
    trace: console.trace.bind(console),
    debug: console.debug.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
  };
}
