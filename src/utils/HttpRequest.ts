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

interface IResultFactory {
  createBuilder(): IResultBuilder;
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

function httpRequest(url: string, options: http.RequestOptions | https.RequestOptions, callback: any): http.ClientRequest {
  if (url.startsWith("https://"))
    return https.request(url, options, callback);
  return http.request(url, options, callback);
};

interface FetchOptions {
  attempts?: number;
};

function fetchImpl(url: string, file: string | undefined, options: FetchOptions): Promise<Buffer|undefined> {
  return new Promise((resolve, reject) => {
    const doRequest = (url: string, redirect: boolean) => {
      logger.info((redirect ? "Redirect to " : "wget ") + url);
      const httpOptions = {
        method: 'GET',
        timeout: 5000,
        headers: {
          "User-Agent": PROJECT_NAME + "/" + PROJECT_VERSION,
          "Accept": "*/*",
        },
      };
      const request = httpRequest(url, httpOptions, onRequest);
      request.on("timeout", onTimeout.bind(null, request));
      request.on("error", onError);
      request.end();
    };

    let attempts = options.attempts || 0;

    const onError = (err: any) => {
      const message = "Encountered an error trying to make a request: " + err.message;
      if (attempts > 0) {
        logger.warn(message, err);
        attempts--;
        doRequest(url, false);
      }
      else {
        reject(new Error(message));
      }
    };

    const onTimeout = (request: any) => {
      request.destroy();
      const message = "Timeout for " + url;
      if (attempts > 0) {
        logger.warn(message);
        attempts--;
        doRequest(url, false);
      }
      else {
        reject(new Error(message));
      }
    }

    const filename = path.basename(url);
    const onRequest = (response: http.IncomingMessage) => {
      switch (response.statusCode) {
      case 200:
        logger.debug(`Conncted to ${(response as any).req.host}`);
        logger.debug(`Downloading ${filename}`);
        const builder = createBuilder(file);
        response.on("data", (chunk: Buffer) => builder.append(chunk));
        response.on("end", () => resolve(builder.toResult()));
        response.on('close', () => logger.debug("Close"));
        break;

      case 301:
      case 302:
        response.resume();
        if (response.headers.location)
          doRequest(response.headers.location, true);
        break;

      default:
        response.resume();
        const message = "Did not get an OK from the server. Code: " + response.statusCode;
        logger.error(message);
        reject(message);
        break;
      }
    };

    doRequest(url, false);
  });
};

export function requestGet(url: string, options?: FetchOptions) {
  return fetchImpl(url, undefined, options || {}) as Promise<Buffer>;
}

export function downloadFile(url: string, file: string, options?: FetchOptions) {
  return fetchImpl(url, file, options || {}) as Promise<undefined>;
}
