import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggedin: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");
      set({ authUser: response.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({
        authUser: null,
      });
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    set({ isLoggedin: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      toast.success("Logged in successfully.");
      set({ authUser: response.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggedin: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: response?.data });
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error in upoading image", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
