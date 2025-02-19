// AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(() => {
    // Initialize users from localStorage
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    // Check for current session
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (credentials) => {
    // Find user by email
    const foundUser = users.find(u => u.email === credentials.email);
    
    if (foundUser && foundUser.password === credentials.password) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = (formData) => {
    // Check if email already exists
    if (users.some(u => u.email === formData.email)) {
      return { success: false, message: "Email already registered" };
    }

    // Check if mobile number already exists
    if (users.some(u => u.mobile === formData.mobile)) {
      return { success: false, message: "Mobile number already registered" };
    }

    // Create new user
    const newUser = {
      ...formData,
      id: Date.now(),
      preferences: null,
    };

    // Update users array
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Set current user
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    return { success: true, message: "Signup successful" };
  };

  const updatePreferences = (preferences) => {
    if (!user) return false;

    const updatedUser = {
      ...user,
      preferences,
    };

    // Update in users array
    const updatedUsers = users.map(u => 
      u.id === user.id ? updatedUser : u
    );

    // Update all states and storage
    setUsers(updatedUsers);
    setUser(updatedUser);
    setIsAuthenticated(true);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    return true;
  };

  const updateUser = (updatedUserData) => {
    if (!user) return false;

    const updatedUser = {
      ...user,
      ...updatedUserData,
    };

    // Update in users array
    const updatedUsers = users.map(u => 
      u.id === user.id ? updatedUser : u
    );

    // Update all states and storage
    setUsers(updatedUsers);
    setUser(updatedUser);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  const value = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser,
    updatePreferences,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
