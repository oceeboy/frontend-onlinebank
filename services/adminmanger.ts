import http from "@/lib/ky";
import { Transaction, User } from "@/types";
import { HTTPError } from "ky";

// this to get all users
const fetchUsers = async (): Promise<User[]> => {
  try {
    // Perform the API request
    const response = await http.get("admin/users");

    // Parse and return the JSON data
    return await response.json();
  } catch (error) {
    // Handle specific HTTP errors
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || "Failed to fetch users");
    }

    // Re-throw other errors
    throw error;
  }
};

// this is to get transactions by the user
const fetchUserTrasactions = async (userId: string): Promise<Transaction[]> => {
  try {
    const response = await http.get(`admin/transactions/${userId}`);
    if ("error" in response) {
      throw new Error("something went wrong");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || "Failed to fetch transactions");
    }
    throw error;
  }
};

export const AdminService = {
  fetchUsers,
  fetchUserTrasactions,
};
