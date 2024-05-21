import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtVerify } from "jose";

interface User {
  _id: string;
  name: string;
  role: string;
}
interface UserAuth {
  isLoggedIn: boolean;
  user?: User;
  authToken: string;
  login: (token: string) => void;
  logout: () => void;
}

export const useUserAuth = create(
  persist<UserAuth>(
    (set) => ({
      isLoggedIn: false,
      authToken: "",
      login: (token: string) => {
        (async () => {
          const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;
          const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(secret)
          );

          set({ isLoggedIn: true, authToken: token, user: payload as any });
        })();
      },
      logout: () => set({ isLoggedIn: false, authToken: "" }),
    }),
    {
      name: "user-auth",
    }
  )
);
