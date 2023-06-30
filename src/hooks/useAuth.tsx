import { useEffect, useState } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the JWT token exists in the storage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode and verify the token
        const decodedToken = jwt_decode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken?.exp && decodedToken.exp > currentTime) {
          // Token is valid and not expired
          setIsLoggedIn(true);
        } else {
          // Token is expired
          setIsLoggedIn(false);
          // Clear the expired token from the storage
          // localStorage.removeItem("token");
        }
      } catch (error) {
        // Error occurred while decoding or verifying the token
        setIsLoggedIn(false);
        // Clear the invalid token from the storage
        localStorage.removeItem("token");
      }
    } else {
      // Token does not exist in storage
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
};

export default useAuth;
