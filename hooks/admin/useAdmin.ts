import { UpdateProfile } from "@/types/admin";
import { useToaster } from "@/context/toast/ToastContext";
import { AdminService } from "@/services/adminmanger";
import { Transaction } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminUsers = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["useAdminUsers"],
    queryFn: () => AdminService.fetchUsers(),
  });
  return { data, error, isLoading };
};

// manage transactions

export const useAdminUserTransactions = (userId: string) => {
  return useQuery({
    queryKey: ["useAdminUserTransactions", userId], // Include userId in the key for caching
    queryFn: () => AdminService.fetchUserTrasactions(userId),
    enabled: !!userId, // Prevent query execution if userId is falsy
    retry: 1, // Retry only once in case of failure
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToaster();

  return useMutation({
    mutationFn: (data: {
      transactionId: string;
      updates: Partial<Transaction>;
    }) => AdminService.updateUserTransaction(data.transactionId, data.updates),
    onSuccess: () => {
      //Toaster function

      addToast(
        {
          title: "Success",
          description: `Transaction Successfully update`,
        },
        "success"
      );
      // Invalidate queries related to transactions to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["useAdminUserTransactions"] });
    },
    onError: (error: Error) => {
      addToast(
        {
          title: "Error",
          description: `Failed to Update transaction: ${error.message}`,
        },
        "error"
      );
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToaster();
  return useMutation({
    mutationFn: (data: { transactionId: string }) =>
      AdminService.deleteUserTransaction(data.transactionId),
    onSuccess: () => {
      addToast(
        {
          title: "Success",
          description: `Transaction Deleted Successfully`,
        },
        "success"
      );
      // Invalidate queries related to transactions to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["useAdminUserTransactions"] });
    },
    onError: (error: Error) => {
      addToast(
        {
          title: "Error",
          description: `Failed to Delete transaction: ${error.message}`,
        },
        "error"
      );
    },
  });
};

export const useFetchUserById = (userId: string) => {
  const {
    data = null,
    error = null,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["userFetchById", userId], // Scope by userId
    queryFn: () => AdminService.fetchUserById(userId),
    enabled: !!userId, // Only run if userId is provided
    staleTime: 5 * 60 * 1000, // Optional: Cache results for 5 minutes
  });

  return { data, error, isLoading, isFetching, isError };
};

export const useUpdateUserFreezeStatus = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToaster();
  return useMutation({
    mutationFn: (data: { userId: string; frozen: boolean }) =>
      AdminService.updateUserFreezeStatus(data.userId, data.frozen),
    onSuccess: () => {
      addToast(
        {
          title: "Success",
          description: `User freeze status updated Successfully`,
        },
        "success"
      );
      // Invalidate any queries related to the user
      queryClient.invalidateQueries({
        queryKey: ["userFetchById"],
      });
    },
    onError: (error: Error) => {
      addToast(
        {
          title: "Error",
          description: `Failed to update user freeze status: ${error.message}`,
        },
        "error"
      );
    },
  });
};
export const useUpdateUserKycStatus = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToaster();
  return useMutation({
    mutationFn: (data: { userId: string; kycVerified: boolean }) =>
      AdminService.updateUserKycVerificationStatus(
        data.userId,
        data.kycVerified
      ),
    onSuccess: () => {
      // Invalidate any queries related to the user
      queryClient.invalidateQueries({
        queryKey: ["userFetchById"],
      });
      addToast(
        {
          title: "Success",
          description: `User Kyc status updated Successfully`,
        },
        "success"
      );
    },
    onError: (error: Error) => {
      addToast(
        {
          title: "Error",
          description: `Failed to update user Kyc status: ${error.message}`,
        },
        "error"
      );
    },
  });
};

export const useUpdateUserDetails = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToaster();
  return useMutation({
    mutationFn: (data: { userId: string; updateProfile: UpdateProfile }) =>
      AdminService.updateUserDetails(data.userId, data.updateProfile),
    onSuccess: () => {
      //
      addToast(
        {
          title: "Success",
          description: `User Details Updated Successfully`,
        },
        "success"
      );
      queryClient.invalidateQueries({
        queryKey: ["useAdminUsers", "userFetchById"],
      });
    },

    onError: (error: Error) => {
      //
      addToast(
        {
          title: "Error",
          description: `Failed to update User Details: ${error.message}`,
        },
        "error"
      );
    },
  });
};
