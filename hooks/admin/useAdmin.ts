import { AdminService } from "@/services/adminmanger";
import { useQuery } from "@tanstack/react-query";

export const useAdminUsers = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["useAdminUsers"],
    queryFn: () => AdminService.fetchUsers(),
  });
  return { data, error, isLoading };
};

// manage transactions
export const useAdminUserTransactions = (userId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["useAdminUserTransactions"],
    queryFn: () => AdminService.fetchUserTrasactions(userId),
  });
  return { data, error, isLoading };
};
