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

type LoggerHandler = (message?: any, ...params: any[]) => void;;

interface EntryLogger {
  tagName: string;
  enable: boolean;
  logger: ILogger;
};

function truncate(str: string, maxLength: number) {
  if (str.length > maxLength)
    return str.slice(0, maxLength - 3) + "...";
  return str;
}

function makeLogMethod(type: string, tagName: string, target: any, handler: LoggerHandler) {
  return (...args: any[]) => {
    const now = new Date();
    const strList = [ now.toISOString(), type, tagName ];
    for (const iter of args)
      strList.push((typeof iter === "string") ? iter : JSON.stringify(iter));
    const message = strList.join(" ");
    handler.call(target, truncate(message, 400));
  };
}

let _enableDefault = false;
const _loggerMap = new Map<string, EntryLogger>();

function initLogger(logger: ILogger, tagName: string, enable: boolean) {
  if (enable) {
    logger.trace = makeLogMethod("D", tagName, console, console.trace);
    logger.debug = makeLogMethod("D", tagName, console, console.debug);
    logger.info = makeLogMethod("I", tagName, console, console.info);
    logger.warn = makeLogMethod("W", tagName, console, console.warn);
    logger.error = makeLogMethod("E", tagName, console, console.error);
  }
  else {
    logger.trace = () => {};
    logger.debug = () => {};
    logger.info = () => {};
    logger.warn = () => {};
    logger.error = () => {};
  }
}

function createEntry(tagName: string, enable: boolean) {
  const entry = { tagName, enable, logger: {} as ILogger };
  initLogger(entry.logger, tagName, enable);
  return entry;
}

function entrySetEnable(entry: EntryLogger, enable: boolean) {
  if (entry.enable !== enable) {
    initLogger(entry.logger, entry.tagName, enable);
    entry.enable = enable;
  }
}

function enableImpl(tagName: string) {
  let entry = _loggerMap.get(tagName);
  if (!entry) {
    entry = createEntry(tagName, true);
    _loggerMap.set(tagName, entry);
  }
  else  {
    entrySetEnable(entry, true);
  }
}

for (const iter of LOGGER_DEBUG) {
  enableImpl(iter);
}

export namespace Logger {

export function create(url: string): ILogger {
  const tagName = url.startsWith(HOST_SOURCE_URL + "/") ? url.substring(HOST_SOURCE_URL.length + 1) : url;
  if (!tagName)
    throw new Error(`Logger ${url} ot allowed`);

  let entry = _loggerMap.get(tagName);
  if (!entry) {
    entry = createEntry(tagName, _enableDefault);
    _loggerMap.set(tagName, entry);
  }

  return entry.logger;
}

export function enableAll() {
  for (const entry of _loggerMap.values())
    entrySetEnable(entry, true);
  _enableDefault = true;
}

export function enable(pattern: string) {
  if (pattern === "*")
    enableAll();
  else
    enableImpl(pattern);
}

} // namespace Logger
