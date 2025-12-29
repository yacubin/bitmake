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
  socket.send("Hello BitMake");
});

socket.addEventListener("message", event => {
  console.log(event.data);
});

socket.addEventListener("close", event => {
  if (event.wasClean)
    console.log("Connection closed", event.code, event.reason);
  else
    console.log("Connection died");
});

socket.addEventListener("error", error => {
  console.log(error);
});
