import { create } from "zustand";

export const useStore = create((set) => ({
  username: "",
  setUsername: (username) => set({ username }),

  setUsername: (username) => set({ username }),
}));
