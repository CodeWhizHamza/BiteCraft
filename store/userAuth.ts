import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserAuth {
  isLoggedIn: boolean;
  authToken: string;
}

export const useUserAuth = create(
  persist<UserAuth>(
    (set) => ({
      isLoggedIn: false,
      authToken: "",
      login: (token: string) => set({ isLoggedIn: true, authToken: token }),
      logout: () => set({ isLoggedIn: false, authToken: "" }),
    }),
    {
      name: "user-auth",
    }
  )
);
