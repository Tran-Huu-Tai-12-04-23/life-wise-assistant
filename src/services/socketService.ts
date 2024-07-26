import { getAccessToken } from "@/helper";
import { io } from "socket.io-client";

const token = await getAccessToken();

const socket = io("http://localhost:3300", {
  query: {
    token,
  },
  autoConnect: false,
});

const connect = async () => {
  socket.connect();
};

const disconnect = () => {
  socket?.disconnect();
};

const subscribeToChat = (callback: (message: string) => void) => {
  const eventHandler = (message: string) => {
    callback(message);
  };

  socket?.on("chat message", eventHandler);

  return () => {
    socket?.off("chat message", eventHandler);
  };
};

const sendMessage = (message: string) => {
  socket?.emit("chat message", message);
};

export { connect, disconnect, sendMessage, subscribeToChat };
