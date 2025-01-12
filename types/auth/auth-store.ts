import { User } from "..";

// Types for the Auth store
export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export type AuthToken = string;

export type AuthState = {
  data: User | null;
  token: AuthToken | null;
  status: AuthStatus;
};

export type AuthActions = {
  setData: (data: User) => void;
  setToken: (token: AuthToken) => void;
  setStatus: (status: AuthStatus) => void;
  resetStore: () => void;
};

export type AuthStore = AuthState & AuthActions;
