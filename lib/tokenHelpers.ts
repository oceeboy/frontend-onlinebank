export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.exp * 1000 < Date.now(); // Compare expiration time with current time
  } catch {
    return true; // Treat invalid tokens as expired
  }
};
