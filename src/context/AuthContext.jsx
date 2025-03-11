import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

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
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://backend-nm1z.onrender.com/api/users/login',
        credentials,
        {
          headers: { 'Content-Type': 'application/json' }
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
      console.error('Login error:', error);
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
        `https://backend-nm1z.onrender.com/api/users/${user._id}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // If your backend returns just the updated user object (not wrapped),
        // you might need to access response.data.user or similar. Adjust if needed.
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

  // NEW: Refresh the user data from the backend so we always have latest status, etc.
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !user) return;

      const response = await axios.get(
        `https://backend-nm1z.onrender.com/api/users/${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update context + localStorage if we got a user object back
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
    refreshUser // Expose refreshUser in the context
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
