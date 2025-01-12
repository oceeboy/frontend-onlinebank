import http from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";

// Example of a protected endpoint request
const fetchUserData = async () => {
  const response = await http.get("auth/logout");

  // Check if response is OK
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  // Return parsed JSON
  return response;
};

// Custom React Query Hook
export const useLogOut = () => {
  return useQuery({
    queryKey: ["logOut"], // Unique query key for caching
    queryFn: fetchUserData, // Function to fetch data
    refetchOnWindowFocus: false, // Avoid automatic refetching on focus
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};
