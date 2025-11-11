// src/pages/SignupPage.jsx
import React, { useState, useEffect } from "react";
import './login.css';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import axios from "axios";

function SignupPage() {
  // 1. STATE MANAGEMENT (Copied structure from LoginPage)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Remove the useEffect block—it's not needed for initial rendering of the signup form.
  /*
  useEffect(() => {
     const FetchSignUp = async() => {
      // Fetching logic for signup can be added here
      const res = await axios.get('http://localhost:3000/api/v1/auth/register');
      console.log(res);
     };
    FetchSignUp()
  }, []);
  */

  // 2. SIGNUP HANDLER (Adapted from LoginPage's handleClick)
  async function handleSignup() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/register', {
        username, // Include username
        email,
        password
      });

      console.log('Signup successful:', res.data);

      // 3. SUCCESS ACTION: Navigate to Login page with a success message state
      navigate('/login', { 
        state: { 
          message: 'You have successfully signed up! Please log in to confirm your details.',
          type: 'success'
        }
      });
      
    } catch (err) {
      console.error('Signup error', err);
      // Show friendly message from server if available
      const msg =
        err.response?.data?.message ??
        err.response?.data?.error ??
        err.message ??
        'Signup failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page-container">
      {/* Remove the redundant <div></div> */}

      <div className="login-main-container">  {/* Main container begin */}
        <div className="login-container">

          <img src="/src/assets/bloggify logo (1).jpg" alt="Logo" className="logo" /> {/* LOGO */}
          <h2>WELCOME </h2> {/*LOGO*/}
          <p>Sign up</p>

          <div className="email-form">

            <div className="form-row">
              <label htmlFor="username">Username:</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                placeholder="Enter your username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email Address:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Enter your email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <div className="form-row">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            {/* Display error message */}
            {error && <div className="error">{error}</div>} 

            <div className="button-row">
              {/* Change the Log in button to a Link */}
              <Link to="/login">
                <button className="LoginButton">Log in</button>
              </Link>
              
              {/* Attach signup handler */}
              <button 
                className="SignUp" 
                onClick={handleSignup} 
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      </div> {/* Main container end */}
    </div>
  );
}

export default SignupPage;