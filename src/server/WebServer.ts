/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

import http from "node:http";
import crypto from "node:crypto";
import { Stream } from "node:stream";

import { randUint8 } from "@/utils/Random";
import { Logger } from "@/utils/Logger";

const logger = Logger.create(import.meta.url);

const WEBSOCKET_SEC_MAGIC = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

interface _CloseEvent {
  code: number;
  reason: string;
  wasClean: boolean;
};

interface WebSocketEventMap {
  close: _CloseEvent;
  error: Error;
  message: MessageEvent;
};

const WS_FIN_MASK = 0x80;
const WS_RSV_MASK = 0x70;
const WS_OPCODE_MASK = 0x0f;
const WS_MASK_MASK = 0x80;
const WS_LEN1_MASK = 0x7f;

enum FrameType {
  Continuation = 0,
  Text = 1,
  Binary = 2,
  ConnectionClose = 8,
  Ping = 9,
  Pong = 10,
};

interface TextFrame {
  type: FrameType.Text;
  fin: boolean;
  mask?: number[];

  text: string;
};

interface ConnectionCloseFrame {
  type: FrameType.ConnectionClose;
  fin: boolean;
  mask?: number[];

  code: number;
  reason: string;
};

type UnionFrame = TextFrame | ConnectionCloseFrame;

namespace Frame {
export function fromString(str: string, hasMask?: boolean): Buffer {
  const encoder = new TextEncoder;
  const data = encoder.encode(str);

  let mask: [number, number, number, number] | undefined;
  const flag1 = WS_FIN_MASK | FrameType.Text;
  let flag2 = 0;
  let len2 = 0;

  let headerSize = 2;

  if (data.byteLength < 126) {
    flag2 = (WS_LEN1_MASK & data.byteLength);
  }
  else if (data.byteLength <= Uint8Array.BYTES_PER_ELEMENT) {
    flag2 = (WS_LEN1_MASK & 126);
    len2 = data.byteLength;
    headerSize += 2;
  }
  else {
    throw new Error(`Length ${data.byteLength} exceeded for message`);
  }

  if (hasMask) {
    headerSize += 4;
    flag2 |= WS_MASK_MASK;
  }

  const buf = Buffer.alloc(headerSize + data.byteLength);
  buf.writeUInt8(flag1, 0);
  buf.writeUInt8(flag2, 1);
  let pos = 2;

  if (len2 != 0) {
    buf.writeUInt16BE(len2, pos);
  }

  if (hasMask) {
    mask = [
      randUint8(),
      randUint8(),
      randUint8(),
      randUint8(),
    ];
    buf.writeUInt8(mask[0], pos++);
    buf.writeUInt8(mask[1], pos++);
    buf.writeUInt8(mask[2], pos++);
    buf.writeUInt8(mask[3], pos++);
  }

  if (mask) {
    for (let i = 0; i < data.byteLength; i++) {
      buf.writeUInt8(data[i] ^ mask[i & 3], pos++);
    }
  }
  else {
    buf.set(data, pos);
  }

  return buf;
}

export function parse(buf: Buffer): UnionFrame {
  let size = buf.length;
  if (size < 2) {
    throw new Error("The message is tiny");
  }

  const flags1 = buf.readUint8(0);
  const flags2 = buf.readUint8(1);

  size -= 2;
  let offset = 2;

  const fin = !!(flags1 & WS_FIN_MASK);
  if (!fin) {
    throw new Error("Multi frames not supported");
  }
  if (flags1 & WS_RSV_MASK) {
    throw new Error("RSV mask is not supported");
  }

  const opcode = flags1 & WS_OPCODE_MASK;
  const hasMask = (flags2 & WS_MASK_MASK) ? true : false;

  let length = flags2 & WS_LEN1_MASK;

  if (length == 126) {
    if (size < 2) {
      throw new Error("The message length could not be retrieved");
    }

    length = buf.readUint16BE(offset);
    size -= 2;
    offset += 2;
  }
  else if (length == 127) {
    throw new Error("The message length has 127");
  }

  let mask: [number, number, number, number] | undefined;
  if (hasMask) {
    if (size < 4) {
      throw new Error("Not enough data to read the mask");
    }
    mask = [
      buf.readUint8(offset + 0),
      buf.readUint8(offset + 1),
      buf.readUint8(offset + 2),
      buf.readUint8(offset + 3),
    ];
    size -= 4;
    offset += 4;
  }

  if (length != size) {
    throw new Error(`The message contains redundant data ${size - length}`);
  }

  const bytes = new Uint8Array(buf.buffer, offset, length);
  if (mask) {
    for (let i = 0; i < length; i++)
      bytes[i] ^= mask[i & 3];
  }

  if (opcode == FrameType.Text) {
    const decoder = new TextDecoder("utf-8");
    const text = decoder.decode(bytes);
    return { type: FrameType.Text, fin, mask, text };
  }
  else if (opcode == FrameType.ConnectionClose) {
    if (length < 2)
      throw new Error("The closing frame does not contain an error code")
    const code = buf.readUint16BE(offset);
    let reason = "";
    if (length > 2) {
      const decoder = new TextDecoder("utf-8");
      reason = decoder.decode(bytes.subarray(2));
    }
    return { type: FrameType.ConnectionClose, fin, mask, code, reason };
  }

  throw new Error(`Opcode ${opcode} is not supported`);
}
} // namespace Frame

export class WebSocket {
  private _stream: Stream.Duplex;
  private _origin?: string;
  private _listeners = {
    close: [] as Array<(this: WebSocket, event: _CloseEvent) => any>,
    error: [] as Array<(this: WebSocket, event: Error) => any>,
    message: [] as Array<(this: WebSocket, event: MessageEvent) => any>,
  };
  private _eventCounter = 1;

  public constructor(stream: Stream.Duplex, origin?: string) {
    this._stream = stream;
    this._origin = origin;
    this._stream.addListener("readable", () => this.onStreamReadable());
  }

  public send(message: string): void {
    const data = Frame.fromString(message);
    this._stream.write(data);
  }

  private onStreamReadable(): void {
    const buf = this._stream.read();
    logger.debug("onStreamReadable", buf);
    try {
      const frame = Frame.parse(buf);
      this.onFrameRecived(frame);
    }
    catch (e) {
      this.onError(e as Error);
      this._stream.destroy();
    }
  }

  private onFrameRecived(frame: UnionFrame) {
    logger.debug("Success", frame);
    if (frame.type === FrameType.Text) {
      const event = new MessageEvent<string>("message", {
        data: frame.text,
        origin: this._origin,
        lastEventId: `${this._eventCounter++}`,
        source: null,
        ports: [],
      });
      this._listeners.message.forEach(i => i.call(this, event));
    }
    else if (frame.type === FrameType.ConnectionClose) {
      const event = {
        code: frame.code,
        reason: frame.reason,
        wasClean: true,
      };
      this._listeners.close.forEach(i => i.call(this, event));
      // this._stream.sendCloseFrame
      this._stream.destroy();
    }
  }

  private onError(error: Error) {
    logger.error(error);
    this._listeners.error.forEach(i => i.call(this, error));
  }

  public addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, event: WebSocketEventMap[K]) => any): void {
    this._listeners[type].push(listener as any);
  }
};

type RequestListener = (req: http.IncomingMessage, res: http.ServerResponse) => void;
type SocketListener = (ws: WebSocket) => void;

export class WebServer {
  private _httpServer: http.Server;
  private _rootURL: URL;
  private _requestListeners = new Map<string, RequestListener>;
  private _socketListeners = new Map<string, SocketListener>;
  private _wsList: WebSocket[] = [];
  
  private constructor(hostname: string, port: number) {
    this._rootURL = new URL(`http://${hostname}:${port}`);
    this._httpServer = http.createServer((req, res) => this.onServerRequest(req, res));
    this._httpServer.listen(port, hostname, () => this.onServerListening());
    this._httpServer.addListener("upgrade", (req, sock, head) => this.onServerUpgrade(req, sock, head));
    this._httpServer.addListener("close", () => this.onServerClose());
  }

  private onServerUpgrade(req: http.IncomingMessage, socket: Stream.Duplex, head: Buffer) {
    logger.debug("Server Upgrade", req.url);

    const listener = req.url ? this._socketListeners.get(req.url) : undefined;
    if (!listener) {
      logger.info(`Not supported websocket ${req.url}`)
      socket.destroy();
      return;
    }

    const { "sec-websocket-key": secKey } = req.headers;
    const hash = crypto.createHash("sha1");
    hash.update(secKey + WEBSOCKET_SEC_MAGIC);
    const secAccept = hash.digest("base64");
    const lines = [
      "HTTP/1.1 101 Switching Protocols",
      "Upgrade: websocket",
      "Connection: Upgrade",
      "sec-webSocket-accept: " + secAccept,
      ""
    ];
    socket.write(lines.map(i => i + "\r\n").join(""));

    const ws = new WebSocket(socket, req.headers.origin);
    this._wsList.push(ws);

    listener(ws);
  }

  public close() {
    this._httpServer.close();
  }

  public get rootURL() {
    return this._rootURL;
  }

  public registerRequest(path: string,listener: RequestListener) {
    this._requestListeners.set(path, listener);
  }

  public registerSocket(path: string,listener: SocketListener) {
    this._socketListeners.set(path, listener);
  }

  private onServerListening() {
    logger.info(`Server running at ${this._rootURL}`);
  }

  private onServerClose() {
    logger.info(`Connection is closed`);
  }

  private onServerRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    const listener = req.url ? this._requestListeners.get(req.url) : undefined;
    if (!listener) {
      logger.info(`Not supported request ${req.url}`)
      res.destroy();
      return;
    }
    
    listener(req, res);
  }

  public static create(hostname: string, port: number): WebServer {
    return new WebServer(hostname, port);
  }
};
