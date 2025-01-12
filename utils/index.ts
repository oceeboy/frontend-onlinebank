import { transactionsData } from "@/constants";
import { getRefreshToken, setAccessToken } from "@/store/token/token-manager";
import { Transaction } from "@/types";

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      console.log("No refresh token found.");
      return null;
    }

    const response = await fetch("/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      console.error("Failed to refresh token. Response:", response);
      return null;
    }

    const { accessToken } = await response.json();
    setAccessToken(accessToken); // Update the new access token in cookies
    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

export function getTRansa() {
  const finddata = transactionsData.find(
    (t) => t._id === "64a1b5c3b7d4f3e2a8c9d0f2"
  );

  if (!finddata) {
    console.log("transaction not found");
  }

  return finddata as Transaction;
}
