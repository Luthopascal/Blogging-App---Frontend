// src/components/AuthNavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/Authcontext'; 
import './AuthNavBar.css'; // Assuming you have some CSS for styling

const AuthNavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirects to login page after clearing token
  };

  return (
    <nav>
      <Link to="/" className="logo">Bloggify</Link>
      
      <div className="nav-links">
        {/* Required Links */}
        <Link to="/home-page" className="nav-link">Home</Link>
        <Link to="/new-post" className="nav-link">Add New Post</Link>
        
        <button onClick={handleLogout} className="nav-link logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AuthNavBar;