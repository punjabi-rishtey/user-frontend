import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
        setShowLoginModal(false);
    };

    const signup = () => {
        setIsAuthenticated(true);
        setShowLoginModal(false);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const toggleLoginModal = () => {
        setShowLoginModal(!showLoginModal);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, showLoginModal, login, signup, logout, toggleLoginModal }}>
            {children}
        </AuthContext.Provider>
    );
};