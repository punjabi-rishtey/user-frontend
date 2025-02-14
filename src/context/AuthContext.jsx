import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setIsAuthenticated(true);
            setUser(storedUser);
        }
    }, []);

    const login = (userData) => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = storedUsers.find(user => user.email === userData.email && user.password === userData.password);
        if (existingUser) {
            setIsAuthenticated(true);
            setUser(existingUser);
            localStorage.setItem('user', JSON.stringify(existingUser));
            return true;
        } else {
            alert('Invalid email or password');
            return false;
        }
    };

    const signup = (userData) => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = storedUsers.find(user => user.email === userData.email);
        if (existingUser) {
            alert('User already exists with this email');
        } else {
            storedUsers.push(userData);
            localStorage.setItem('users', JSON.stringify(storedUsers));
            setIsAuthenticated(true);
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};