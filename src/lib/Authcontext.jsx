import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; // 🌟 Import Axios

// 1. Create the Context
export const AuthContext = createContext();

// Hook for easy use of context
export const useAuth = () => {
  return useContext(AuthContext);
};

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  // Check localStorage initially
  const initialUser = JSON.parse(localStorage.getItem('user'));
  const initialToken = localStorage.getItem('token');
  
  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(initialToken);

  // Derived state to check if the user is logged in
  const isAuthenticated = !!token;

  // 3. Define the login function
  const login = (tokenData, userData) => {
    localStorage.setItem('token', tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(tokenData);
    setUser(userData);
  };

  // 4. Define the logout function
  // 🌟 Made asynchronous to handle the API call
  const logout = async () => {
    // 1. Attempt to call the backend logout API
    try {
      await axios.post('http://localhost:3000/api/v1/auth/logout');
      console.log('Backend logout successful.');
    } catch (error) {
      // Log the error but continue to ensure client-side logout
      console.error('Error calling backend logout API, but proceeding with local cleanup:', error);
    }
    
    // 2. Clear Local State (Frontend Logout - essential regardless of API success)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };
  
  // The context value
  const value = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};