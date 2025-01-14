import { UpdateTransactionDto } from "@/types/transaction/transaction.dto";
import http from "@/lib/ky";
import { Transaction, User } from "@/types";
import { HTTPError } from "ky";
import { UpdateProfile } from "@/types/admin";

// this to get all users
const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await http.get("admin/users/findAll");

    return await response.json();
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || "Failed to fetch users");
    }

    throw error;
  }
};

// this is to get transactions by the user
const fetchUserTrasactions = async (userId: string): Promise<Transaction[]> => {
  try {
    const response = await http.get(
      `admin/transactions/getAll?userId=${userId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    const responseData: { transactions: Transaction[] } = await response.json();

    const { transactions } = responseData;

    return transactions;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || "Failed to fetch transactions");
    }
    throw error;
  }
};

const updateUserTransaction = async (
  transactionId: string,
  updates: UpdateTransactionDto
): Promise<Transaction> => {
  try {
    // Perform the PUT request
    const response = await http.put(`admin/transactions/update`, {
      json: { transactionId, updates },
    });

    // Ensure the response is OK
    if (!response.ok) {
      const errorBody: { message?: string } = await response.json();
      throw new Error(errorBody.message || "Failed to update transaction");
    }

    // Parse and return the updated transaction
    return await response.json();
  } catch (error) {
    if (error instanceof HTTPError) {
      // Handle specific HTTP errors
      const errorBody: { message?: string } = await error.response.json();
      throw new Error(errorBody.message || "Failed to update transaction");
    }

    if (error instanceof Error) {
      // Log and rethrow generic errors
      throw error;
    }

    // Fallback for unknown errors
    throw new Error("An unknown error occurred");
  }
};

const deleteUserTransaction = async (transactionId: string): Promise<void> => {
  try {
    // Make the DELETE request
    const response = await http.delete(`admin/transactions/delete`, {
      json: { transactionId },
    });

    // Check for unsuccessful responses
    if (!response.ok) {
      const errorBody: { message?: string } = await response.json();
      throw new Error(errorBody.message || "Failed to delete transaction");
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      // Handle specific HTTP errors
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || "Failed to delete transaction");
    }

    // Handle other errors
    if (error instanceof Error) {
      throw error;
    }

    // Fallback for unknown errors
    throw new Error("An unknown error occurred");
  }
};

const fetchUserById = async (userId: string): Promise<User> => {
  try {
    const response = await http.get(`admin/users/findOne?id=${userId}`);

    // Check for unsuccessful responses
    if (!response.ok) {
      const errorBody: { message: string } = await response.json();
      throw new Error(errorBody.message || "Failed to fetch user");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || "Failed to fetch user");
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unknown error occurred");
  }
};

const updateUserFreezeStatus = async (
  userId: string,
  frozen: boolean
): Promise<User> => {
  try {
    const response = await http.put("admin/users/freezeAccount", {
      json: { userId, frozen },
    });

    // Handle errors from the API response
    if (!response.ok) {
      const errorBody: { message: string } = await response.json();
      throw new Error(
        errorBody.message || "Failed to update user freeze status"
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(
        errorBody.message || "Failed to update user freeze status"
      );
    }
    throw error;
  }
};
const updateUserKycVerificationStatus = async (
  userId: string,
  kycVerified: boolean
): Promise<User> => {
  try {
    const response = await http.put("admin/users/kycVerification", {
      json: { userId, kycVerified },
    });

    // Handle errors from the API response
    if (!response.ok) {
      const errorBody: { message: string } = await response.json();
      throw new Error(
        errorBody.message || "Failed to update user freeze status"
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(
        errorBody.message || "Failed to update user freeze status"
      );
    }
    throw error;
  }
};

const updateUserDetails = async (
  userId: string,
  updates: UpdateProfile
): Promise<User> => {
  try {
    const response = await http.put("admin/users/update", {
      json: { userId, updates },
    });

    // Handle API response errors
    if (!response.ok) {
      const errorBody: { message: string } = await response.json();
      throw new Error(errorBody.message || "Failed to update user");
    }

    // Return the updated user
    return await response.json();
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || "Failed to update user");
    }
    throw error;
  }
};

export const AdminService = {
  fetchUsers,
  fetchUserTrasactions,
  updateUserTransaction,
  deleteUserTransaction,
  fetchUserById,
  updateUserFreezeStatus,
  updateUserDetails,
  updateUserKycVerificationStatus,
};
