import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [is2FAVerified, setIs2FAVerified] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    setIs2FAVerified(true);

    // Navigate to 2FA verification page
    navigate("/dashboard");
    return true;
  };

  const logout = () => {
    setUser(null);
    setIs2FAVerified(false);
    navigate("/", { replace: true });
  };

  const verify2FACode = async (code) => {
    // Mock verification logic
    if (code === "0000") {
      setIs2FAVerified(true);
      navigate("/dashboard"); // Navigate to a protected route after successful 2FA
      return true;
    }
    return false;
  };

  const value = {
    user,
    is2FAVerified,
    login,
    logout,
    verify2FACode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};