// AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (credentials) => {
    // Mock login implementation (replace with your actual authentication logic)
    if (
      credentials.email === "test@example.com" &&
      credentials.password === "password"
    ) {
      const mockUser = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        // ... other user properties
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setIsAuthenticated(true);
      return true; // Indicate successful login
    } else {
      return false; // Indicate failed login
    }
  };

  const signup = (formData) => {
    // Mock signup implementation (replace with your actual signup logic)
    // For now, just store the form data in local storage
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    setIsAuthenticated(true);
    return true;
  };

  const updateUser = (updatedUser) => {
    // Update the user data in local storage
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    return true; // Indicate successful update
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
