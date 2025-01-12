import { useToaster } from "@/context/toast/ToastContext";
import { TransactionService } from "@/services/trasaction";
import { CreateTransactionDto } from "@/types/transaction/transaction.dto";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTransaction = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["useTransaction"],
    queryFn: () => TransactionService.fetchTrasactions(),
  });
  return { data, error, isLoading };
};
export const useCreateTransaction = () => {
  const { addToast } = useToaster();
  const mutation = useMutation({
    mutationFn: (transactionDto: CreateTransactionDto) =>
      TransactionService.createTransaction(transactionDto),
    onSuccess: (data) => {
      // console.log("Transaction success:", data); // Log success
      addToast(
        {
          title: "Success!",
          description: `Transaction success:${data.balance}`,
        },
        "success"
      );
    },
    onError: (error) => {
      // Handle error: Check if error is an instance of HTTPError
      if (error instanceof Error) {
        addToast(
          {
            title: "Error",
            description: error.message,
          },
          "error"
        );
      } else {
        addToast(
          {
            title: "Error",
            description: `An unexpected error occurred:" ${error}`,
          },
          "error"
        );
      }
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.status === "pending",
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
};

// Check if the response status is not OK (e.g., 4xx or 5xx)

// // Return success message and updated balance
// return {
//   message: `Transaction successful! New balance: ${responseData.balance}`,
//   balance: responseData.balance,
// };
