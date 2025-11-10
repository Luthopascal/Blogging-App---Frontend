import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NonAuthNavBar from './components/NonAuthNavBar';
import Welcome from './pages/Welcome';
import './App.css';
import Footer from './components/Footer';
import LoginPage from './pages/Login';
import SignupPage from './pages/signup';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


function App () {  // initialize App component
  return (
     
    <div className = "container"> {/*header container div*/}

    <BrowserRouter> {/* Wrap the application in BrowserRouter to enable routing */}
    <NonAuthNavBar /> {/* Render the NonAuthNavBar component */}
  
      <Routes>
        <Route path="/Welcome" element={<Welcome/>} />
        <Route path="/" element={<Welcome/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/Signup" element={<SignupPage/>} />
        <Route path="/protected-route" element={
         <ProtectedRoute>
          <h2>This is a protected menu route</h2>   {/* when the token is activated the route becomes protected*/}
          </ProtectedRoute>
        } />

       {/* <Route path="/contact" element={<h1>Contact Page</h1>} />*/}
      </Routes>

      <Footer/> {/* Render the Footer component */}
    </BrowserRouter>
   

    </div>

   

  );
}
export default App;


//React Router DOM is an npm package that enables you to implement dynamic routing in a web application built with React. It allows you to define multiple routes in your application, each corresponding to a specific component or view. When a user navigates to a particular URL, the router matches the URL to the defined routes and renders the appropriate component without requiring a full page reload. This creates a seamless and responsive user experience similar to that of a single-page application (SPA). React Router DOM provides various components and hooks to manage navigation, route parameters, nested routes, and more, making it easier to build complex and interactive web applications with React.
//makes it seem as if there's multiple pages, but really it's just one page that updates based on the URL.

//TWO TYPES OF NAV BARS
  // AUTHENTICATED AND NON AUTHENTICATED