import { io, Socket } from "socket.io-client";

let socket: Socket;

declare global {
  var _socket: Socket | undefined;
}

if (!globalThis._socket) {
  globalThis._socket = io(
    "http://localhost:3001"
  );
}

socket = globalThis._socket;

export { socket };