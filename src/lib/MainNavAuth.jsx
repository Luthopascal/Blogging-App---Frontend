import React from 'react';
import { useAuth } from '../lib/Authcontext'; // Assuming path to your context
import AuthNavBar from '../components/AuthNavBar';
import NonAuthNavBar from '../components/NonAuthNavBar';

const MainNavAuth= () => {
  const { isAuthenticated } = useAuth();
  
  // Render the appropriate NavBar based on the authentication status
  return isAuthenticated ? <AuthNavBar /> : <NonAuthNavBar />;
};

export default MainNavAuth;