/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import path from "node:path";
import fs from "node:fs";
import http from "http";
import https from "https";

import { createLogger } from "@/logger";

const logger = createLogger(import.meta.url);

interface IResultBuilder {
  append(data: Buffer): void;
  toResult(): Buffer | undefined;
};

class BufferBuilder implements IResultBuilder {
  private _chunks: Array<Buffer> = [];

  public append(chunk: Buffer): void {
    this._chunks.push(chunk);
  }

  public toResult(): Buffer {
    return Buffer.concat(this._chunks);
  }
};

class FileSyncWriter implements IResultBuilder {
  private _fd: number;

  public constructor(file: string) {
    this._fd = fs.openSync(file, "w");
  }

  public append(chunk: Buffer): void {
    fs.writeSync(this._fd, chunk);
  }

  public toResult(): undefined {
    fs.closeSync(this._fd);
  }
};

function createBuilder(file?: string): IResultBuilder {
  if (file)
    return new FileSyncWriter(file);
  return new BufferBuilder;
}

const httpOptions = {
  method: 'GET',
  timeout: 5000,
  headers: {
    "User-Agent": PROJECT_NAME + "/" + PROJECT_VERSION,
    "Accept": "*/*",
  },
};

function httpRequest(url: string, options: http.RequestOptions | https.RequestOptions, callback: any) {
  if (url.startsWith("https://"))
    return https.request(url, options, callback);
  return http.request(url, options, callback);
};

function fetchImpl(url: string): Promise<Buffer>;
function fetchImpl(url: string, file: string): Promise<undefined>;
function fetchImpl(url: string, file?: string): Promise<Buffer|undefined> {
  return new Promise((resolve, reject) => {

    const onError = (err: any) => {
      const message = "Encountered an error trying to make a request: " + err.message;
      logger.debug(message, err);
      reject(new Error(message));
    };

    const onTimeout = (request: any) => {
      request.destroy();
      logger.debug("Timeout", url);
      reject(new Error("Timeout"));
    }

    const filename = path.basename(url);
    const onRequest = (response: any) => {
      switch (response.statusCode) {
      case 200:
        logger.debug(`Conncted to ${response.req.host}`);
        logger.debug(`Downloading ${filename}`);
        const builder = createBuilder(file);
        response.on("data", (chunk: Buffer) => builder.append(chunk));
        response.on("end", () => resolve(builder.toResult()));
        response.on('close', () => logger.info('  Close'));
        break;

      case 301:
      case 302:
        response.resume();
        logger.info(`Redirect to ${response.headers.location}`);
        const request = httpRequest(response.headers.location, httpOptions, onRequest);
        request.on("timeout", onTimeout.bind(null, request));
        request.on("error", onError);
        request.end();
        break;

      default:
        response.resume();
        const message = "Did not get an OK from the server. Code: " + response.statusCode;
        logger.error(message);
        reject(message);
        break;
      }
    };

    logger.info(`wget ${url}`);
    const request = httpRequest(url, httpOptions, onRequest);
    request.on("timeout", onTimeout.bind(null, request));
    request.on("error", onError);
    request.end();
  });
};

export function requestGet(url: string): Promise<Buffer> {
  return fetchImpl(url);
}

export function downloadFile(url: string, file: string): Promise<undefined> {
  return fetchImpl(url, file);
}
