import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // `user` is `null` when not logged in

    const login = (userData) => {
        setUser(userData); // Set user details upon login
    };

    const logout = () => {
        setUser(null); // Clear user on logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
