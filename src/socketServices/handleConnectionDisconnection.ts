import io, { Socket } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

let socket: any = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(BACKEND_URL, {
      transports: ["websocket"],
      autoConnect: false,
    });

    // Attach listeners once
    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log(`❌ Socket disconnected `);
    });

  }

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
  }
};

export const getSocket = () => socket;
