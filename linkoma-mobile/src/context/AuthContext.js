import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const current = await authService.getCurrentUser();
      setUser(current);
      setLoading(false);
    })();
  }, []);

  const login = async (email, password) => {
    try {
      console.log("AuthContext: Bắt đầu gọi authService.login");
      const user = await authService.login(email, password);
      console.log("AuthContext: authService.login trả về:", user);

      setUser(user);
      return user;
    } catch (error) {
      console.log("AuthContext: Lỗi trong login:", error);
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
