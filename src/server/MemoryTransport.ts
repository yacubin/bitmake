/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import { IMessageSender, IRequestSync } from "@/server/Transport";
import { Logger } from "@/logger";

const logger = Logger.create(import.meta.url);

export class MemoryMessageSender implements IMessageSender {
  private _buffer: SharedArrayBuffer;
  private _memory: MemoryTransport.Buffer;

  public constructor(buffer: SharedArrayBuffer) {
    this._buffer = buffer;
    this._memory = new MemoryTransport.Buffer(buffer);
  }

  public sendMessage(message: any): void {
    this._memory.set(message, true);
  }

  public readMessage(): any {
    return this._memory.get();
  }
};

export class MemoryTransport implements IRequestSync {
  private _sender: IMessageSender;
  private _buffer: SharedArrayBuffer;
  private _memory: MemoryTransport.Buffer;

  public constructor(sender: IMessageSender, buffer: SharedArrayBuffer) {
    this._sender = sender;
    this._buffer = buffer;
    this._memory = new MemoryTransport.Buffer(buffer);
  }

  public requestSync(data: any): any {
    this._memory.set(data);
    this._sender.sendMessage(this._buffer);
    return this._memory.get(true);
  }
};

export namespace MemoryTransport {

const MAGIC_OFFSET = 0;

export class Buffer {
  private _signal: Int32Array;
  private _data: Uint8Array;
  private _magic: number;

  public constructor(buffer: SharedArrayBuffer) {
    this._signal = new Int32Array(buffer, MAGIC_OFFSET, 1);
    this._data = new Uint8Array(buffer, this._signal.BYTES_PER_ELEMENT);
    this._magic = 0;
  }

  public get(sync = false): any {
    if (sync) {
      Atomics.wait(this._signal, MAGIC_OFFSET, this._magic);
    }

    this._magic = this._signal[0];
    const length = this._magic >> 8;
    const bytes = this._data.slice(0, length);
    const message = (new TextDecoder()).decode(bytes);

    return JSON.parse(message);
  }

  public set(json: any, notify = false) {
    const message = JSON.stringify(json);
    const bytes = (new TextEncoder()).encode(message);
    this._data.set(bytes);
    this._magic = (bytes.length << 8) | ((this._magic + 1) & 255);
    this._signal[0] = this._magic;

    if (notify) {
      Atomics.notify(this._signal, MAGIC_OFFSET, 1);
    }
  }
};

} // namespace MemoryTransport
