import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { apiUrl } from "../config/constants";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const storedUser = localStorage.getItem("currentUser");
      try {
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else {
          // If no stored user, clear the token and reset auth state
          localStorage.removeItem("token");
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // If parsing fails, clear both token and user data
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        apiUrl("/api/users/login"),
        credentials,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response data:", response.data);

      if (response.data && response.data.token) {
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (updatedUserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        logout();
        return false;
      }

      const response = await axios.put(
        apiUrl(`/api/users/${user._id}`),
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        setUser(response.data);
        return true;
      } else {
        alert("Failed to update profile. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the profile.");
      return false;
    }
  };

  // We'll rely on refreshUser() after uploading/deleting pictures:
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !user) return;

      const response = await axios.get(apiUrl(`/api/users/${user._id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateUser,
    refreshUser, // make sure you destructure this where needed
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
