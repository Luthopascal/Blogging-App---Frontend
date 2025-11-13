import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NonAuthNavBar from './components/NonAuthNavBar';
import AuthNavBar from './components/AuthNavBar';
import MainNavAuth from './lib/MainNavAuth';
import Welcome from './pages/Welcome';
import './App.css';
import Footer from './components/Footer';
import LoginPage from './pages/Login';
import SignupPage from './pages/signup';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HomePage from './pages/homePage';
import { AuthProvider } from './lib/Authcontext';
import NewPost from './pages/NewPost';
import EditPost from './pages/editPost';
import ViewPost from './pages/ViewPost';


function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <div className="container">
        <MainNavAuth />
        
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

           <Route path="/New-Post" element={
            <ProtectedRoute>
              <NewPost/>
            </ProtectedRoute>
          } />
          
          <Route path="/Edit-Post/:id" element={
     <ProtectedRoute>
       <EditPost />
     </ProtectedRoute>
   } />
   
   <Route path="/View-Post/:id" element={
     <ProtectedRoute>
       <ViewPost />
     </ProtectedRoute>
   } />

        </Routes>

        

        <Footer />
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;