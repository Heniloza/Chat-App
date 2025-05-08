import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");

      set({ users: response.data.filterUsers });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);

      set({ messages: response.data.messages });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (message) => {
    const { selectedUser, messages } = get();

    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        message
      );
      console.log(response, "its response");

      const newMessage = response.data;

      set({ messages: [...messages, newMessage] });
    } catch (error) {
      console.log(error);
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
