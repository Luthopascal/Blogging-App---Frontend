import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NonAuthNavBar from './components/NonAuthNavBar';
import Welcome from './pages/Welcome';
import './App.css';
import Footer from './components/Footer';
import LoginPage from './pages/Login';
import SignupPage from './pages/signup';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HomePage from './pages/homePage';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <NonAuthNavBar />
        
        <Routes>
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Signup" element={<SignupPage />} />
          
          <Route path="/home-page" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;