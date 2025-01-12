import useAuthStore from "@/store/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuthRedirect = () => {
  const { status, data } = useAuthStore();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false); // Track if a redirection has occurred

  useEffect(() => {
    if (hasRedirected) return; // Prevent multiple redirects

    if (status === "unauthenticated") {
      setHasRedirected(true);
      router.replace("/sign-in");
    } else if (status === "authenticated") {
      if (data?.role === "admin") {
        setHasRedirected(true);
        router.replace("/admin");
      } else {
        setHasRedirected(true);
        router.replace("/dashboard");
      }
    }
  }, [status, data, router, hasRedirected]);
};
