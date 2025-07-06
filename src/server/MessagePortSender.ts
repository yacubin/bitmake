/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { MessagePort } from "node:worker_threads";
import { IMessageSender } from "@/server/Transport";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export class MessagePortSender implements IMessageSender {
  private _name: string;
  private _messagePort: MessagePort;

  public constructor(name: string, messagePort: MessagePort) {
    this._name = name;
    this._messagePort = messagePort;
  }

  public sendMessage(message: any): void {
    logger.debug(this._name, "<--", JSON.stringify(message));
    this._messagePort.postMessage(message);
  }
};
