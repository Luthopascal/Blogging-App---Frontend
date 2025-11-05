// rfce generates minimum code

import React from 'react'
import { Link } from 'react-router-dom' //import Link component to create navigation links from one page to another.
import './NonAuthNavBar.css' //import CSS file for styling
function NonAuthNavBar() {
  return (
    <nav>
       <div className="logo-nav-container">
          <h2>Bloggify</h2>
       </div>
             <div className="main-nav-container">
  
      <Link to="/Welcome">Welcome</Link>
    
      <Link to="/Login">Login</Link>
    
    <button>
      <Link to="/Signup">Signup</Link>
      </button>
  
</div>

    </nav>
  )
}

export default NonAuthNavBar