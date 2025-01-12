import { UserService } from "@/services/userfetch";
import { useQuery } from "@tanstack/react-query";

export const useAccount = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userAccount"],
    queryFn: () => UserService.fetchUser(),
  });
  return { data, error, isLoading };
};

// this works with localhost but has a cors block for the backend domain

// import { User } from "@/types"; // Ensure this matches the expected structure of your user data
// import { UserService } from "@/services/userfetch";
// import { useQuery, UseQueryResult } from "@tanstack/react-query";

// export const useAccount = (): UseQueryResult<User, Error> => {
//   return useQuery<User, Error>({
//     queryKey: ["userAccount"],
//     queryFn: () => UserService.fetchUser(),
//   });
// };
