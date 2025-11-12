// src/pages/LoginPage.jsx
import React, { useState } from "react";
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../lib/Authcontext'; // Import useAuth hook

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/login', {
        email,
        password
      });

      const token =
        res.data?.token ??
        res.data?.data?.token ??
        res.data?.data?.accessToken ??
        res.data?.accessToken ??
        res.data?.user?.token;

      const user =
        res.data?.user ?? res.data?.data?.user ?? res.data;

      if (!token) {
        console.warn('Login response did not include token:', res.data);
        // Note: The context login function handles saving the data now.
        navigate('/home-page');
        return;
      }

      // 🌟 Use the context login function to update global state and localStorage
      login(token, user);

      // redirect to protected page
      navigate('/home-page');
    } catch (err) {
      console.error('Login error', err);
      const msg =
        err.response?.data?.message ??
        err.response?.data?.error ??
        err.message ??
        'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-main-container">
        <div className="login-container">
          <img src="/src/assets/bloggify logo (1).jpg" alt="Logo" className="logo" />
          <h2>WELCOME BACK</h2>
          <p>Login</p>

          <div className="email-form">
            <div className="form-row">
              <label htmlFor="email">Email Address:</label>
              <input type="email" id="email" name="email" placeholder="Enter your email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-row">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" placeholder="Enter your password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {error && <div className="error">{error}</div>}

            <div className="button-row">
              <button onClick={handleClick} className="LoginButton" disabled={loading}>
                {loading ? 'Logging in...' : 'Log in'}
              </button>
              <Link to="/signup"><button className="SignUp">Sign Up</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;