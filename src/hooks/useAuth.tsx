import jwt_decode, { JwtPayload } from "jwt-decode";

export function useAuth() {
  let isLoggedIn = false;
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwt_decode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken?.exp && decodedToken.exp > currentTime) {
      // Token is valid and not expired
      isLoggedIn = true;
    } else {
      // Token is expired
      isLoggedIn = false;
      // Clear the expired token from the storage
      localStorage.removeItem("token");
    }
  }

  return isLoggedIn;
}
