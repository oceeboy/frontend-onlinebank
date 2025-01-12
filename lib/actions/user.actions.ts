import { SignInSchema, SignUpSchema } from "@/types/validation";
import { HTTPError } from "ky";

import http from "../ky";
import useAuthStore from "@/store/auth/auth";
import { User } from "@/types";

interface TokenResponse {
  user_details: User;
  access_token: string;
  refresh_token: string;
}

async function register({ ...data }: SignUpSchema) {
  const setAccessToken = useAuthStore.getState().setAccessToken;
  const setRefreshToken = useAuthStore.getState().setRefreshToken;
  const setAuthStatus = useAuthStore.getState().setStatus;
  const setData = useAuthStore.getState().setData;
  if (!data) {
    return { success: false, message: "Invalid request" };
  }
  try {
    const result = await http.post("auth/register", { json: data });
    const response: TokenResponse = await result.json();

    // Store access token, refresh token, and user data in Zustand store
    setAccessToken(response.access_token);
    setRefreshToken(response.refresh_token);
    setAuthStatus("authenticated");
    setData(response.user_details);
    return {
      success: true,
      message: "User registered successfully",
      data: response,
    };
  } catch (error) {
    if ((error as HTTPError).response?.status === 400) {
      return { success: false, message: "Invalid registration details" };
    }
    return { success: false, message: "Failed to register user" };
  }
}

async function login({ ...data }: SignInSchema) {
  const setAccessToken = useAuthStore.getState().setAccessToken;
  const setRefreshToken = useAuthStore.getState().setRefreshToken;
  const setAuthStatus = useAuthStore.getState().setStatus;
  const setData = useAuthStore.getState().setData;

  if (!data) {
    return { success: false, message: "Invalid request" };
  }

  try {
    // Send login request
    const result = await http.post("auth/login", { json: data });
    const response: TokenResponse = await result.json();

    // Store access token, refresh token, and user data in Zustand store
    setAccessToken(response.access_token);
    setRefreshToken(response.refresh_token);
    setAuthStatus("authenticated");
    setData(response.user_details);
    return { success: true, message: "Login successful", data: response };
  } catch (error) {
    if ((error as HTTPError).response?.status === 401) {
      return { success: false, message: "Invalid credentials" };
    }
    return { success: false, message: "Failed to login" };
  }
}

// logout
async function logout() {
  const resetStore = useAuthStore.getState().resetStore;

  resetStore();
}
export { register, login, logout };
