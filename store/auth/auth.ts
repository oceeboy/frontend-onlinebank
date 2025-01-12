import { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import http from "@/lib/ky";
import ky from "ky";

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
  refreshTokenFlow: () => Promise<void>;
};

export type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      data: null,
      accessToken: null,
      refreshToken: null,
      status: "loading",

      // Update user data
      setData: (data) => set({ data }),

      // Set the access token
      setAccessToken: (accessToken) => set({ accessToken }),
      // Set the refresh token
      setRefreshToken: (refreshToken) => set({ refreshToken }),

      // Update the authentication status
      setStatus: (status) => set({ status }),

      // Reset the store to its initial state
      resetStore: () =>
        set({
          data: null,
          accessToken: null,
          refreshToken: null,
          status: "unauthenticated",
        }),

      // Refresh token flow: uses the refresh token to get a new access token
      refreshTokenFlow: async () => {
        const {
          refreshToken,
          setAccessToken,
          setRefreshToken,
          resetStore,
          setStatus,
        } = get();

        if (!refreshToken) {
          resetStore();
          return;
        }

        try {
          // Make API call to refresh the access token
          const result = await ky.post("auth/refresh-token", {
            json: { refreshToken },
          });

          const response: {
            access_token: AuthToken;
            refresh_token: AuthToken;
          } = await result.json();

          // Update tokens in the store
          setAccessToken(response.access_token);
          setRefreshToken(response.refresh_token);

          // Update the authentication status
          setStatus("authenticated");
        } catch {
          resetStore();
        }
      },
    }),
    {
      name: "auth-store", // Key for Zustand's persisted storage
      onRehydrateStorage: () => (state) => {
        console.log("hydrating zustand state:", state);
      },
    }
  )
);

export default useAuthStore;
