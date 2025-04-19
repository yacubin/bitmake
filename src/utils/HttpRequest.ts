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

export function requestGet(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {

    const onError = (err: any) => {
      const message = "Encountered an error trying to make a request: " + err.message;
      logger.error(message, err);
      reject(message);
    };

    const onTimeout = (request: any) => {
      request.destroy();
      logger.error("  Timeout", url);
      reject("Timeout");
    }

    const onRequest = (response: any) => {
      switch (response.statusCode) {
      case 200:
        const chunks: Array<Buffer> = [];
        response.on("data", (chunk: Buffer) => chunks.push(chunk));
        response.on("end", () => resolve(Buffer.concat(chunks)));
        response.on('close', () => logger.info('  Close'));
        break;

      case 301:
      case 302:
        response.resume();
        logger.info(`Redirect to ${response.headers.location}`);
        const request = httpRequest(response.headers.location, httpOptions, onRequest);
        request.on('timeout', onTimeout.bind(null, request));
        request.on('error', onError);
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
    request.on('timeout', onTimeout.bind(null, request));
    request.on('error', onError);
    request.end();
  });
};

export function downloadFile(url: string, file: string) {
  return new Promise((resolve, reject) => {
    const filename = path.basename(url);

    const client = (() => {
      if (file) {
        const fd = fs.openSync(file, "w");
        return {
          onData: (chunk: Buffer) => {
            fs.writeSync(fd, chunk);
          },
          onEnd: () => {
            fs.closeSync(fd);
            resolve(undefined);
          },
        };
      }
      else {
        const chunks: Array<Buffer> = [];
        return {
          onData: (chunk: Buffer) => {
            chunks.push(chunk);
          },
          onEnd: () => {
            resolve(Buffer.concat(chunks));
          },
        };
      }
    })();
  
    const startRequest = (url: string, callback: any) => {
      const request = https.request(url, httpOptions, callback);
      if (request) {
        request.on('error', (error) => reject(error));
        request.end(); 
      }
      else {
        reject(`Url scheme not supported for ${url}`);
      }
    };

    const onRequest = (response: any) => {
      switch (response.statusCode) {
      case 200:
        logger.info(`Conncted to ${response.req.host}`);
        logger.info(`Downloading ${filename}`);
        response.on('data', client.onData);
        response.on('end', client.onEnd);
        response.on('close', () => logger.info(`Done`));
        break;

      case 301:
      case 302:
        response.resume();
        logger.info(`Resolving ${response.headers.location}`);
        startRequest(response.headers.location, onRequest);
        break;

      default:
        response.resume();
        reject(`Did not get an OK from the server. Code: ${response.statusCode}`);
        break;
      }
    };

    logger.info(`Request to ${url}`);
    startRequest(url, onRequest);
  });
}
