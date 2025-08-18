/*
 * MIT License
 *
 * Copyright (c) 2025  Yurii Yakubin (yurii.yakubin@gmail.com)
 *
 * Permission is granted to use, copy, modify, and distribute this software
 * under the MIT License. See LICENSE file for details.
 */

/// <reference path="global.d.ts" />

console.log("Hello World");

const socket = new WebSocket(`ws://${window.location.host}`);
socket.addEventListener("open", event => {
  console.log("[open] Connection established");
  console.log("Sending to server");
  socket.send("My name is John");
});

socket.addEventListener("message", event => {
  console.log(`[message] Data received from server: ${event.data}`);
});

socket.addEventListener("close", event => {
  if (event.wasClean)
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  else
    console.log('[close] Connection died');
});

socket.addEventListener("error", error => {
  console.log(`[error] ${error}`);
});
