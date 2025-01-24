import { SignInSchema, SignUpSchema, VerifyOtp } from "@/types/validation";
import { HTTPError } from "ky";

import http from "../ky";
import useAuthStore from "@/store/auth/auth";
import { User } from "@/types";
import { useToaster } from "@/context/toast/ToastContext";

interface TokenResponse {
  user_details: User;
  access_token: string;
  refresh_token: string;
}

export const useAuthentication = () => {
  const setAccessToken = useAuthStore.getState().setAccessToken;
  const setRefreshToken = useAuthStore.getState().setRefreshToken;
  const setAuthStatus = useAuthStore.getState().setStatus;
  const setData = useAuthStore.getState().setData;

  const { addToast } = useToaster();

  async function register({ ...data }: SignUpSchema) {
    if (!data) {
      return { success: false, message: "Invalid request" };
    }
    try {
      const result = await http.post("auth/signup", { json: data });
      const response: TokenResponse = await result.json();

      // Store access token, refresh token, and user data in Zustand store
      setAccessToken(response.access_token);
      setRefreshToken(response.refresh_token);
      setAuthStatus("authenticated");
      setData(response.user_details);
      addToast(
        {
          title: "Registration Successful",
          description: "You have successfully registered.",
        },
        "success"
      );
      return {
        // will add toaster
        success: true,
        message: "User registered successfully",
        data: response,
      };
    } catch (error) {
      const errorMessage =
        error instanceof HTTPError && error.response?.status === 400
          ? "Invalid registration details"
          : "Failed to register user";

      addToast(
        {
          title: "Registration Failed",
          description: errorMessage,
        },
        "error"
      );

      return { success: false, message: errorMessage };
    }
  }

  // login
  async function login({ ...data }: SignInSchema) {
    if (!data) {
      return { success: false, message: "Invalid request" };
    }

    try {
      // Send login request
      const result = await http.post("auth/login", { json: data });
      const response: { message: string } = await result.json();

      // Store access token, refresh token, and user data in Zustand store

      addToast(
        {
          title: "Login Successful",
          description: response.message,
        },
        "success"
      );
      return { success: true, message: "Login successful", data: response };
    } catch (error) {
      const errorMessage =
        error instanceof HTTPError && error.response?.status === 401
          ? "Invalid credentials"
          : "Failed to login";

      addToast(
        {
          title: "Login Failed",
          description: errorMessage,
        },
        "error"
      );

      return { success: false, message: errorMessage };
    }
  }
  //  verify otp

  async function verifyOtp({ ...data }: VerifyOtp) {
    try {
      const result = await http.post("auth/verify-otp", { json: data });
      const response: TokenResponse = await result.json();

      // Store access token, refresh token, and user data in Zustand store
      setAccessToken(response.access_token);
      setRefreshToken(response.refresh_token);
      setAuthStatus("authenticated");
      setData(response.user_details);
      addToast(
        {
          title: "Login Successful",
          description: "Welcome back!",
        },
        "success"
      );
      return { success: true, message: "Login successful", data: response };
    } catch (error) {
      const errorMessage =
        error instanceof HTTPError && error.response?.status === 401
          ? "Invalid credentials"
          : "Failed to Verify Otp";

      addToast(
        {
          title: "OTP verification Failed",
          description: errorMessage,
        },
        "error"
      );

      return { success: false, message: errorMessage };
    }
  }
  // generate otp

  async function generateOtp(email: string) {
    if (!email) {
      return { success: false, message: "Invalid request" };
    }
    try {
      const result = await http.post("auth/generate-otp", { json: { email } });
      const response: { message: string } = await result.json();
      addToast(
        {
          title: "Resent Successfull",
          description: response.message,
        },
        "success"
      );
      return { success: true, message: "OTP sent successful", data: response };
    } catch (error) {
      const errorMessage =
        error instanceof HTTPError && error.response?.status === 401
          ? "Invalid credentials"
          : "Failed to send OTP";

      addToast(
        {
          title: "OTP Failed",
          description: errorMessage,
        },
        "error"
      );

      return { success: false, message: errorMessage };
    }
  }
  // logout

  async function logout() {
    const resetStore = useAuthStore.getState().resetStore;

    resetStore();

    addToast(
      {
        title: "Logged Out",
        description: "You have successfully logged out.",
      },
      "info"
    );
  }

  return { register, login, logout, verifyOtp, generateOtp };
};

async function register({ ...data }: SignUpSchema) {
  const setAccessToken = useAuthStore.getState().setAccessToken;
  const setRefreshToken = useAuthStore.getState().setRefreshToken;
  const setAuthStatus = useAuthStore.getState().setStatus;
  const setData = useAuthStore.getState().setData;

  if (!data) {
    return { success: false, message: "Invalid request" };
  }
  try {
    const result = await http.post("auth/signup", { json: data });
    const response: TokenResponse = await result.json();

    // Store access token, refresh token, and user data in Zustand store
    setAccessToken(response.access_token);
    setRefreshToken(response.refresh_token);
    setAuthStatus("authenticated");
    setData(response.user_details);
    return {
      // will add toaster
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

// have to add toaster in these page
