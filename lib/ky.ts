import ky from "ky";
import { isTokenExpired } from "@/lib/tokenHelpers";
import useAuthStore from "@/store/auth/auth";

// Define your ky instance
const http = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const { accessToken, refreshTokenFlow } = useAuthStore.getState();

        // Check if the access token exists and is expired
        if (accessToken && isTokenExpired(accessToken)) {
          console.log("Access token expired, refreshing...");
          await refreshTokenFlow();
        }

        // Attach the refreshed or existing access token to the request
        const updatedAccessToken = useAuthStore.getState().accessToken;
        if (updatedAccessToken) {
          request.headers.set("Authorization", `Bearer ${updatedAccessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          console.warn("Unauthorized, attempting token refresh...");
          const { refreshTokenFlow, resetStore } = useAuthStore.getState();

          try {
            // Refresh the token and retry the request
            await refreshTokenFlow();
            const updatedAccessToken = useAuthStore.getState().accessToken;

            if (updatedAccessToken) {
              request.headers.set(
                "Authorization",
                `Bearer ${updatedAccessToken}`
              );
              return ky(request, options); // Retry the request
            }
          } catch {
            console.error("Token refresh failed, resetting auth store.");
            resetStore(); // Reset auth state if token refresh fails
          }
        }
      },
    ],
  },
});

export default http;
