import http from "@/lib/ky";
import { Transaction } from "@/types";
import { CreateTransactionDto } from "@/types/transaction/transaction.dto";
import { TransactionResponse } from "@/types/transaction/types";
import { HTTPError } from "ky";

const fetchTrasactions = async (): Promise<Transaction[]> => {
  try {
    const response = await http.get("transaction/all");
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
      .post<TransactionResponse>("transaction/withdraw", {
        json: transactionDto,
      })
      .json<TransactionResponse>();

    if ("error" in response) {
      throw new Error("something went wrong");
    }
    return response;
  } catch (error: unknown) {
    // Handle errors gracefully
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(
        errorBody.message ||
          `Failed to create transaction ${error.response.status}`
      );
    }

    // For any other type of error
    throw error;
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
