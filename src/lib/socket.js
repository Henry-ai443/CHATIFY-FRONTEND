iimport { io } from "socket.io-client";

// Use your backend in production, localhost in development
const SOCKET_URL ="https://chatify-backend-4p7g.onrender.com";

let socket = null;

export const initSocket = () => {
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    withCredentials: true, // needed for cookie-based auth
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};