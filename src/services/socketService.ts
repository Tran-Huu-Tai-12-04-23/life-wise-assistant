/* eslint-disable @typescript-eslint/no-explicit-any */
import io from "socket.io-client";

const socket = io("http://[::1]:3300"); // Replace with your NestJS server URL

const connect = () => {
  socket.connect();
};

const disconnect = () => {
  socket.disconnect();
};

const subscribeToChat = (callback: (mess: any) => void) => {
  socket.on("chat message", (message) => {
    callback(message);
  });
};

const sendMessage = (message: any) => {
  socket.emit("chat message", message);
};

export { connect, disconnect, subscribeToChat, sendMessage };
