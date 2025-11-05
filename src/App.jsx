import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NonAuthNavBar from './components/NonAuthNavBar';
import Welcome from './pages/Welcome';
import './App.css';
import Footer from './components/Footer';


function App () {  // initialize App component
  return (
     <div>
    <div className = "container"> {/*header container div*/}

    <BrowserRouter> {/* Wrap the application in BrowserRouter to enable routing */}
    <NonAuthNavBar /> {/* Render the NonAuthNavBar component */}
  
      <Routes>
        <Route path="/" element={<Welcome/>} />
      {/* <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />*/}
      </Routes>

      <Footer/> {/* Render the Footer component */}
    </BrowserRouter>
   

    </div>

    </div>

  );
}
export default App;


//React Router DOM is an npm package that enables you to implement dynamic routing in a web application built with React. It allows you to define multiple routes in your application, each corresponding to a specific component or view. When a user navigates to a particular URL, the router matches the URL to the defined routes and renders the appropriate component without requiring a full page reload. This creates a seamless and responsive user experience similar to that of a single-page application (SPA). React Router DOM provides various components and hooks to manage navigation, route parameters, nested routes, and more, making it easier to build complex and interactive web applications with React.
//makes it seem as if there's multiple pages, but really it's just one page that updates based on the URL.

//TWO TYPES OF NAV BARS
  // AUTHENTICATED AND NON AUTHENTICATED