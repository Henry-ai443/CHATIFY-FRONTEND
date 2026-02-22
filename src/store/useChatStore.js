import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { initSocket, getSocket, disconnectSocket } from "../lib/socket";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: 'chats',
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem('isSoundEnabled') === 'true',
    onlineUsers: new Set(),
    isSendingMessage: false,
    typingUsers: new Set(),

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({ isSoundEnabled: !get().isSoundEnabled });
    },

    setActiveTab: (tab) => set({ activeTab: tab }),

    setSelectedUser: (user) => set({ selectedUser: user }),

    getAllContacts: async () => {
        try {
            set({ isUsersLoading: true });
            const res = await axiosInstance.get("messages/contacts/");
            set({ allContacts: res.data.filteredUsers });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load contacts");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("messages/chats");
            set({ chats: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load chats");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        try {
            set({ isMessagesLoading: true });
            const res = await axiosInstance.get(`messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            console.error("Failed to load messages:", error);
            toast.error("Failed to load messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (receiverId, text, image) => {
        try {
            set({ isSendingMessage: true });
            const formData = { text };
            if (image) formData.image = image;

            const res = await axiosInstance.post(`messages/send/${receiverId}`, formData);
            
            // Add message to state immediately
            set({ messages: [...get().messages, res.data] });
            
            // Emit via socket for realtime
            const socket = getSocket();
            if (socket) {
                socket.emit("send_message", {
                    ...res.data,
                    receiverId
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        } finally {
            set({ isSendingMessage: false });
        }
    },

    initializeSocket: (userId) => {
        const socket = initSocket();

        // Notify server that user is online
        socket.emit("user_online", userId);

        // Listen for incoming messages
        socket.on("receive_message", (message) => {
            const { selectedUser, isSoundEnabled } = get();
            
            // Only add if it's from the currently selected user
            if (selectedUser && (message.senderId === selectedUser._id || message.senderId._id === selectedUser._id)) {
                set({ messages: [...get().messages, message] });
            }

            // Play sound if enabled
            if (isSoundEnabled) {
                const audio = new Audio("/sounds/message-notification.mp3");
                audio.play().catch((err) => console.log("Failed to play sound:", err));
            }
        });

        // Listen for user status changes
        socket.on("user_status_changed", (data) => {
            const { userId, status } = data;
            set((state) => {
                const newOnlineUsers = new Set(state.onlineUsers);
                if (status === "online") {
                    newOnlineUsers.add(userId);
                } else {
                    newOnlineUsers.delete(userId);
                }
                return { onlineUsers: newOnlineUsers };
            });
        });

        // Listen for new messages for other conversations
        socket.on("new_message", (message) => {
            const { selectedUser, messages } = get();
            
            // Don't duplicate if already added via send
            if (selectedUser && 
                (message.senderId === selectedUser._id || message.senderId._id === selectedUser._id) &&
                !messages.some((m) => m._id === message._id)
            ) {
                set({ messages: [...messages, message] });
            }
        });

        // Listen for typing indicators
        socket.on("user_typing", (data) => {
            const { senderId } = data;
            set((state) => {
                const newTypingUsers = new Set(state.typingUsers);
                newTypingUsers.add(senderId);
                return { typingUsers: newTypingUsers };
            });
        });

        socket.on("user_stopped_typing", (data) => {
            const { senderId } = data;
            set((state) => {
                const newTypingUsers = new Set(state.typingUsers);
                newTypingUsers.delete(senderId);
                return { typingUsers: newTypingUsers };
            });
        });
    },

    emitTyping: (receiverId, senderId) => {
        const socket = getSocket();
        if (socket) {
            socket.emit("user_typing", { receiverId, senderId });
        }
    },

    emitStoppedTyping: (receiverId, senderId) => {
        const socket = getSocket();
        if (socket) {
            socket.emit("user_stopped_typing", { receiverId, senderId });
        }
    },

    disconnectSocket: () => {
        disconnectSocket();
    }
}));