import { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";
export type AuthUserData = User; // Update as per your user data structure
export type AuthToken = string;

export type AuthState = {
  data: User | null;
  accessToken: AuthToken | null;
  refreshToken: AuthToken | null;
  status: AuthStatus;
};

export type AuthActions = {
  setData: (data: User) => void;
  setAccessToken: (token: AuthToken) => void;
  setRefreshToken: (token: AuthToken) => void;
  setStatus: (status: AuthStatus) => void;
  resetStore: () => void;
};

export type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      data: null,
      accessToken: null,
      refreshToken: null,
      status: "unauthenticated",
      setData: (data) => set({ data }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setStatus: (status) => set({ status }),
      resetStore: () =>
        set({
          data: null,
          accessToken: null,
          refreshToken: null,
          status: "unauthenticated",
        }),
    }),
    {
      name: "auth-store",
    }
  )
);

export default useAuthStore;
