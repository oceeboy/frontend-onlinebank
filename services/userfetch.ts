import http from "@/lib/ky";
import { User } from "@/types";
import { HTTPError } from "ky";

const fetchUser = async (): Promise<User> => {
  try {
    // Perform the API request
    const response = await http.get("auth/me");

    // Parse and return the JSON data
    return await response.json();
  } catch (error) {
    // Handle specific HTTP errors
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || "Failed to fetch user data");
    }

    // Re-throw other errors
    throw error;
  }
};

export const UserService = { fetchUser };
