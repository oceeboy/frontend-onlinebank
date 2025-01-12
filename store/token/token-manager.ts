export const TOKEN_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

// Utility to check if the environment is browser
const isBrowser = typeof window !== "undefined";

// Utility to log any potential issues
const logTokenError = (message: string) => {
  if (!isBrowser) {
    console.warn("Attempted to access tokens on the server.");
  }
  console.warn(message);
};

// Retrieve access token from localStorage
export const getAccessToken = (): string | null => {
  if (!isBrowser) {
    logTokenError("Attempted to retrieve access token on the server.");
    return null; // Return null gracefully for server
  }

  const token = localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  console.log("Retrieved access token:", token); // Debugging line
  return token;
};

// Retrieve refresh token from localStorage
export const getRefreshToken = (): string | null => {
  if (!isBrowser) {
    logTokenError("Attempted to retrieve refresh token on the server.");
    return null; // Return null gracefully for server
  }

  const token = localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
  console.log("Retrieved refresh token:", token); // Debugging line
  return token;
};

// Set access token to localStorage
export const setAccessToken = (token: string): void => {
  if (!isBrowser) {
    logTokenError("Attempted to set access token on the server.");
    return;
  }

  console.log("Setting access token:", token); // Debugging line
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
};

// Set refresh token to localStorage
export const setRefreshToken = (token: string): void => {
  if (!isBrowser) {
    logTokenError("Attempted to set refresh token on the server.");
    return;
  }

  console.log("Setting refresh token:", token); // Debugging line
  localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, token);
};

// Clear both tokens from localStorage
export const clearTokens = (): void => {
  if (!isBrowser) {
    logTokenError("Attempted to clear tokens on the server.");
    return;
  }

  console.log("Clearing tokens..."); // Debugging line
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
};

// Test the functionality
const testTokenFunctions = () => {
  if (typeof window !== "undefined") {
    // Set tokens for testing
    setAccessToken("test-access-token");
    setRefreshToken("test-refresh-token");

    // Retrieve tokens
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    // Check if tokens are retrieved correctly
    console.log("Access Token after setting:", accessToken);
    console.log("Refresh Token after setting:", refreshToken);

    // Clear tokens
    clearTokens();

    // Check if tokens were cleared
    const clearedAccessToken = getAccessToken();
    const clearedRefreshToken = getRefreshToken();

    console.log("Access Token after clearing:", clearedAccessToken);
    console.log("Refresh Token after clearing:", clearedRefreshToken);
  }
};

// Call the test function to check if everything is working correctly
// testTokenFunctions();
