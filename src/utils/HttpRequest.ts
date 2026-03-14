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

import { HTTPS_SCHEME } from "@/utils/UrlScheme";
import { Logger } from "@/utils/Logger";

const logger = Logger.create(import.meta.url);

interface IResolveBuilder {
  append(data: Buffer): void;
  toResult(): Buffer | undefined;
};

class BufferBuilder implements IResolveBuilder {
  private _chunks: Array<Buffer> = [];

  public append(chunk: Buffer): void {
    this._chunks.push(chunk);
  }

  public toResult(): Buffer {
    return Buffer.concat(this._chunks);
  }
};

class FileSyncWriter implements IResolveBuilder {
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

function createBuilder(file?: string): IResolveBuilder {
  if (file)
    return new FileSyncWriter(file);
  return new BufferBuilder;
}

function httpRequest(url: string, options: http.RequestOptions | https.RequestOptions, callback: any): http.ClientRequest {
  if (url.startsWith(HTTPS_SCHEME))
    return https.request(url, options, callback);
  return http.request(url, options, callback);
};

interface FetchOptions {
  attempts?: number;
};

function fetchImpl(url: string, file: string | undefined, options: FetchOptions): Promise<Buffer|undefined> {
  return new Promise((resolve, reject) => {
    const httpOptions = {
      method: 'GET',
      timeout: 25000,
      headers: {
        "User-Agent": PROJECT_NAME + "/" + PROJECT_VERSION,
        "Accept": "*/*",
      },
    };

    let attempts = options.attempts || 0;
    const doRequest = (url: string) => {
      const request = httpRequest(url, httpOptions, onRequest);

      let hasError = false;
      const onError = (err: Error) => {
        request.destroy();
        if (!hasError) {
          hasError = true;
          if (attempts > 0) {
            logger.warn(err.message);
            logger.info(`re-wget ${url} attempts ${attempts}`);
            attempts--;
            doRequest(url);
          }
          else {
            reject(err);
          }
        }
      };

      request.on("timeout", () => {
        onError(new Error("Timeout for " + url));
      });

      request.on("error", (err: Error) => {
        onError(err);
      });

      request.end();
    };

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
        if (response.headers.location) {
          logger.info("Redirect to " + response.headers.location);
          doRequest(response.headers.location);
        }
        break;

      default:
        response.resume();
        const message = "Did not get an OK from the server. Code: " + response.statusCode;
        logger.error(message);
        reject(message);
        break;
      }
    };

    logger.info("wget " + url);
    doRequest(url);
  });
};

export function requestGet(url: string, options?: FetchOptions) {
  return fetchImpl(url, undefined, options || {}) as Promise<Buffer>;
}

export function downloadFile(url: string, file: string, options?: FetchOptions) {
  return fetchImpl(url, file, options || {}) as Promise<undefined>;
}
