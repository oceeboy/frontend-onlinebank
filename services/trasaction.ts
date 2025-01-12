import http from "@/lib/ky";
import { Transaction } from "@/types";
import { CreateTransactionDto } from "@/types/transaction/transaction.dto";
import { TransactionResponse } from "@/types/transaction/types";
import { HTTPError } from "ky";

const fetchTrasactions = async (): Promise<Transaction[]> => {
  try {
    const response = await http.get("transaction/usertrans");
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

const createTransaction = async (
  transactionDto: CreateTransactionDto
): Promise<TransactionResponse> => {
  try {
    // Send the POST request to create a transaction
    const response = await http
      .post<TransactionResponse>("transaction/create", {
        json: transactionDto,
      })
      .json<TransactionResponse>();

    // Directly throw the error if there's an error field in the response
    if ("error" in response) {
      throw new Error(
        typeof response.error === "string" ? response.error : "Unknown error"
      );
    }
    return response;
  } catch (error: unknown) {
    // Handle HTTP errors specifically
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      const errorMessage = errorBody?.error || "An unexpected error occurred";
      throw new Error(errorMessage);
    }

    // For any other type of error, such as network errors
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    }

    // Fallback for unknown errors
    throw new Error("An unknown error occurred");
  }
};
{
  /** */
}

export const TransactionService = { fetchTrasactions, createTransaction };

/**
 * 
 * import http from 'your-http-library'; // Replace with your actual HTTP library, e.g., Axios.

interface CreateTransactionDto {
  type: 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
  code?: string;
  status: 'PENDING' | 'COMPLETED';
}

interface TransactionResponse {
  transaction: {
    id: string;
    type: string;
    amount: number;
    status: string;
    createdAt: string;
  };
  balance: number;
}

const createTransaction = async (
  transactionDto: CreateTransactionDto,
): Promise<{ message: string; balance?: number }> => {
  try {
    // Send the POST request to create a transaction
    const response = await http.post<TransactionResponse>(
      'transaction/create',
      transactionDto,
    );

    // Check if the response contains an error field (optional based on your API design)
    if (!response || 'error' in response) {
      throw new Error('Transaction creation failed');
    }

    // Return success message and updated balance
    return {
      message: `Transaction successful! New balance: ${response.balance}`,
      balance: response.balance,
    };
  } catch (error: any) {
    // Handle any errors and return an appropriate message
    const errorMessage = error.response?.data?.message || 'Something went wrong';
    return { message: errorMessage };
  }
};
 */
