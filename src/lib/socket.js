import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

let socket = null;

export const initSocket = () => {
    if (socket) return socket;
    
    socket = io(SOCKET_URL, {
        withCredentials: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
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
