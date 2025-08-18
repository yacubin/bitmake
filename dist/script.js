/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/

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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7O0dBT0c7QUFFSCxvQ0FBb0M7QUFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUUzQixNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxRQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM3RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztJQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRTtJQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNwRSxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7SUFDdkMsSUFBSSxLQUFLLENBQUMsUUFBUTtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxLQUFLLENBQUMsSUFBSSxXQUFXLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOztRQUU1RixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYml0bWFrZS8uL3NyYy9zY3JpcHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDI1ICBZdXJpaSBZYWt1YmluICh5dXJpaS55YWt1YmluQGdtYWlsLmNvbSlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZCBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmVcbiAqIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiZ2xvYmFsLmQudHNcIiAvPlxuXG5jb25zb2xlLmxvZyhcIkhlbGxvIFdvcmxkXCIpO1xuXG5jb25zdCBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KGB3czovLyR7d2luZG93LmxvY2F0aW9uLmhvc3R9YCk7XG5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgZXZlbnQgPT4ge1xuICBjb25zb2xlLmxvZyhcIltvcGVuXSBDb25uZWN0aW9uIGVzdGFibGlzaGVkXCIpO1xuICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgdG8gc2VydmVyXCIpO1xuICBzb2NrZXQuc2VuZChcIk15IG5hbWUgaXMgSm9oblwiKTtcbn0pO1xuXG5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZXZlbnQgPT4ge1xuICBjb25zb2xlLmxvZyhgW21lc3NhZ2VdIERhdGEgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXI6ICR7ZXZlbnQuZGF0YX1gKTtcbn0pO1xuXG5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsIGV2ZW50ID0+IHtcbiAgaWYgKGV2ZW50Lndhc0NsZWFuKVxuICAgIGNvbnNvbGUubG9nKGBbY2xvc2VdIENvbm5lY3Rpb24gY2xvc2VkIGNsZWFubHksIGNvZGU9JHtldmVudC5jb2RlfSByZWFzb249JHtldmVudC5yZWFzb259YCk7XG4gIGVsc2VcbiAgICBjb25zb2xlLmxvZygnW2Nsb3NlXSBDb25uZWN0aW9uIGRpZWQnKTtcbn0pO1xuXG5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yID0+IHtcbiAgY29uc29sZS5sb2coYFtlcnJvcl0gJHtlcnJvcn1gKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9