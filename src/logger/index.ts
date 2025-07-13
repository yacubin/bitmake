/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

export interface ILogger {
  debug(message?: any, ...params: any[]): void;
  info(message?: any, ...params: any[]): void;
  notice(message?: any, ...params: any[]): void;
  warn(message?: any, ...params: any[]): void;
  error(message?: any, ...params: any[]): void;
  fatal(message?: any, ...params: any[]): void;
};

type LoggerHandler = (message?: any, ...params: any[]) => void;;

interface EntryLogger {
  tagName: string;
  filter: string;
  logger: ILogger;
};

const SEPARATOR = " ";
const MESSAGE_MAX = 240;

function toMessageString(o: any) {
  return (typeof o === "string") ? o : JSON.stringify(o);
}

function* messageGenerator(messages: string[], maxLength: number) {
  let length = 0;
  const msgList: string[] = [];

  for (;;) {
    const iter = messages.shift();
    if (!iter)
      break;

    if (msgList.length)
      length += SEPARATOR.length;

    msgList.push(iter);
    length += iter.length;

    while (length > maxLength) {
      const msg = msgList.join(SEPARATOR);
      const nextMsg = msg.substring(maxLength);
      msgList.length = 0;
      msgList.push(nextMsg);
      length = nextMsg.length;
      yield msg.substring(0, maxLength);
    }
  }

  yield msgList.join(SEPARATOR);
}

function makeLogMethod(withPrefix: boolean, type: string, tagName: string, target: any, handler: LoggerHandler) {
  return (...args: any[]) => {
    const now = new Date();
    const messages = args.map(i => toMessageString(i))

    if (!withPrefix) {
      handler.call(target, messages.join(SEPARATOR));
      return;
    }

    const prefix = [ now.toISOString(), type, tagName ].join(SEPARATOR);
    for (const iter of messageGenerator(messages, MESSAGE_MAX - prefix.length - SEPARATOR.length)) {
      handler.call(target, [prefix, iter].join(SEPARATOR));
    }
  };
}

let _defaultPattern = "";
const _loggerMap = new Map<string, EntryLogger>();

const stub = () => {};

function initLogger(logger: ILogger, tagName: string, filter: string) {
  logger.debug = stub;
  logger.info = stub;
  logger.notice = stub;
  logger.warn = stub;
  logger.error = stub;
  logger.fatal = stub;

  let level = 0;
  const flags: any = {};
  for (const iter of filter.split(",")) {
    if (iter === "*") {
      level = 5;
      break;
    }
    if (/^\d+$/.test(iter))
      level = Math.max(level, parseInt(iter));
    else
      flags[iter] = true;
  }

  logger.fatal = makeLogMethod(level > 2, "F", tagName, console, console.error);

  if (level > 1 || flags.error)
    logger.error = makeLogMethod(level > 2, "E", tagName, console, console.error);

  if (level > 2 || flags.warn)
    logger.warn = makeLogMethod(level > 2, "W", tagName, console, console.warn);

  logger.notice = makeLogMethod(level > 2, "N", tagName, console, console.log);

  if (level > 3 || flags.info)
    logger.info = makeLogMethod(level > 2, "I", tagName, console, console.info);

  if (level > 4 || flags.debug)
    logger.debug = makeLogMethod(level > 2, "D", tagName, console, console.debug);
}

function createEntry(tagName: string, filter: string) {
  const entry = { tagName, filter, logger: {} as ILogger };
  initLogger(entry.logger, tagName, filter);
  return entry;
}

function entrySetFilter(entry: EntryLogger, filter: string) {
  if (entry.filter !== filter) {
    initLogger(entry.logger, entry.tagName, filter);
    entry.filter = filter;
  }
}

function allSetFilter(filter: string) {
  _defaultPattern = filter;
  for (const entry of _loggerMap.values())
    entrySetFilter(entry, filter);
}

export namespace Logger {

export function create(url: string): ILogger {
  const tagName = url.startsWith(HOST_SOURCE_URL + "/") ? url.substring(HOST_SOURCE_URL.length + 1) : url;
  if (!tagName || tagName === "*")
    throw new Error(`Logger ${url} not allowed`);

  let entry = _loggerMap.get(tagName);
  if (!entry) {
    entry = createEntry(tagName, _defaultPattern);
    _loggerMap.set(tagName, entry);
  }

  return entry.logger;
}

export function enable(filter: string) {
  if (filter === "*") {
    allSetFilter("*");
    return;
  }

  const pair = filter.split(":");
  if (pair.length < 2)
    return;

  if (pair[0] === "*") {
    allSetFilter(pair[1]);
    return;
  }

  let entry = _loggerMap.get(pair[0]);
  if (!entry) {
    entry = createEntry(pair[0], pair[1]);
    _loggerMap.set(filter, entry);
  }
  else  {
    entrySetFilter(entry, pair[1]);
  }
}

} // namespace Logger

for (const iter of LOGGER_DEBUG) {
  Logger.enable(iter);
}
