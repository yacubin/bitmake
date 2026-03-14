/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import fs from "node:fs";
import url from "node:url";
import path from "node:path";
import http from "node:http";
import child_process from "node:child_process";

import { randInt } from "@/utils/Random";
import { CommandOptions } from "@/core/CommandOptions";
import { Logger } from "@/utils/Logger";
import { currentScriptURL } from "@/utils/Module";
import { WebServer } from "@/server/WebServer";

const logger = Logger.create(import.meta.url);
abstract class HttpRequestExecuter {
  protected _contentType?: string;

  public setContentType(contentType: string) {
    this._contentType = contentType;
  }

  protected sendResult(req: http.IncomingMessage, res: http.ServerResponse, data: any) {
    res.statusCode = 200;

    if (this._contentType)
      res.setHeader("Content-Type", this._contentType);

    res.end(data);
  }

  protected sendError(req: http.IncomingMessage, res: http.ServerResponse, message: string) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end(message);
  }

  abstract requestHandler(req: http.IncomingMessage, res: http.ServerResponse): void;
};

class StaticDataExecuter<T> extends HttpRequestExecuter {
  private _data: T;

  public constructor(data: T) {
    super();
    this._data = data;
  }

  public requestHandler(req: http.IncomingMessage, res: http.ServerResponse): void {
    super.sendResult(req, res, this._data);
  }
};

class AcquireDataExecuter extends HttpRequestExecuter {
  private _callback: () => any | Promise<any>;
  private _transforms: Array<(data: any) => any> = [];

  public constructor(callback: () => any | Promise<any>) {
    super();
    this._callback = callback;
  }

  public requestHandler(req: http.IncomingMessage, res: http.ServerResponse): void {
    const data = this._callback();
    if (data instanceof Promise)
      data.then(() => this.onRequest(req, res, data));
    else
      this.onRequest(req, res, data);
  }

  private onRequest(req: http.IncomingMessage, res: http.ServerResponse, data: any) {
    for (const transform of this._transforms)
      data = transform(data);
    super.sendResult(req, res, data);
  }

  public addTransform(transform: (data: any) => any) {
    this._transforms.push(transform);
  }
};

class FilenameExecuter extends HttpRequestExecuter {
  private _filename: string;

  public constructor(filename: string) {
    super();
    this._filename = filename;
  }

  public requestHandler(req: http.IncomingMessage, res: http.ServerResponse): void {
    fs.readFile(this._filename, 'utf8', (err, data) => {
      if (err)
        super.sendError(req, res, 'Error loading' + this._filename);
      else
        super.sendResult(req, res, data);
    });
  }
};

function registerJsonHandler(server: WebServer, path: string, callback: () => any | Promise<any>) {
  const executer = new AcquireDataExecuter(callback);
  executer.setContentType("application/json");
  executer.addTransform(JSON.stringify);
  server.registerRequest(path, (req, res) => executer.requestHandler(req, res));
}

function registerHtmlData(server: WebServer, path: string, data: string) {
  const executer = new StaticDataExecuter(data);
  executer.setContentType("text/html");
  server.registerRequest(path, (req, res) => executer.requestHandler(req, res));
}

function registerFilename(server: WebServer, path: string, filename: string) {
  const executer = new FilenameExecuter(filename);
  if (filename.match(/\.m?js$/))
    executer.setContentType("application/javascript");
  else
    executer.setContentType("text/plain");
  server.registerRequest(path, (req, res) => executer.requestHandler(req, res));
}

export default async (options: CommandOptions) => {
  let successCallback!: () => void;
  let errorCallback!: (reasone: any) => void;
  const promise = new Promise<void>((resolve, reject) => {
    successCallback = resolve;
    errorCallback = reject;
  });

  const server = WebServer.create("localhost", randInt(49152, 65535));

  registerHtmlData(server, "/",`
    <!DOCTYPE html>
    <html>
      <head>
        <title>BitMake</title>
        <style>
          body { font-family: Arial; background: #f0f0f0; text-align: center; padding: 50px; }
          h1 { color: #007acc; }
        </style>
        <script src="script.js"></script>
      </head>
      <body>
        <h1>BitMake</h1>
        <p>This is a Main Page</p>
        <a href="tree-config.json">Build Tree Config</a>
      </body>
    </html>
  `);

  const dirUrl = url.fileURLToPath(currentScriptURL());
  const filename = path.join(path.dirname(dirUrl), "script.js");
  registerFilename(server, "/script.js", filename);

  let clientCount = 0;
  const timerId = setTimeout(() => errorCallback("Connection via websocket failed"), 60000);
  server.registerSocket("/", ws => {
    clientCount++;
    clearTimeout(timerId);
    ws.addEventListener("message", e => logger.info(">>>", e.data));
    ws.addEventListener("close", e => --clientCount === 0 && successCallback());
    ws.addEventListener("error", e => errorCallback(e));
    ws.send("Hello from build.ts");
  });

  const startCommand = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";
  child_process.exec(`${startCommand} ${server.rootURL}`, (error, stdout, stderr) => {
    error && logger.warn(`Code ${error.code} for command ${error.cmd}`);
  });

  return promise;
}
