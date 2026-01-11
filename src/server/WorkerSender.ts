/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { Worker } from "node:worker_threads";
import { IMessageSender } from "@/server/Transport";
import { Logger } from "@/utils/Logger";

const logger = Logger.create(import.meta.url);

export class WorkerSender implements IMessageSender {
  private _worker: Worker;

  public constructor(worker: Worker) {
    this._worker = worker;
  }

  public sendMessage(message: any): void {
    logger.debug("<--", message);
    this._worker.postMessage(message);
  }
};
