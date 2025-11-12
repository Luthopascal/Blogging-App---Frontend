import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

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
    // Decode the token to get user ID
    try {
      const decoded = JSON.parse(atob(tokenData.split('.')[1]));
      
      // Create user object with _id from token
      const userWithId = {
        ...userData,
        _id: decoded.id,
        id: decoded.id
      };
      
      localStorage.setItem('token', tokenData);
      localStorage.setItem('user', JSON.stringify(userWithId));
      setToken(tokenData);
      setUser(userWithId);
    } catch (error) {
      console.error('Error decoding token:', error);
      // Fallback to original behavior
      localStorage.setItem('token', tokenData);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(tokenData);
      setUser(userData);
    }
  };

  // 4. Define the logout function
  const logout = async () => {
    // 1. Attempt to call the backend logout API
    try {
      await axios.post('http://localhost:3000/api/v1/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Backend logout successful.');
    } catch (error) {
      console.error('Error calling backend logout API, but proceeding with local cleanup:', error);
    }
    
    // 2. Clear Local State (Frontend Logout)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // On mount, check if token exists and decode it to get user info
  useEffect(() => {
    if (initialToken && !initialUser?._id) {
      try {
        const decoded = JSON.parse(atob(initialToken.split('.')[1]));
        const userWithId = {
          ...initialUser,
          _id: decoded.id,
          id: decoded.id
        };
        setUser(userWithId);
        localStorage.setItem('user', JSON.stringify(userWithId));
      } catch (error) {
        console.error('Error decoding stored token:', error);
      }
    }
  }, []);
  
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