import React, {useState} from "react";
import './login.css'
import NonAuthBlogPosts from "./NonAuthBlogPosts";
import axios from "axios";



function SignupPage() {

  useEffect(() => {
     const FetchSignUp = async() => {
      // Fetching logic for signup can be added here
     
      const res = await axios.get('http://localhost:3000/api/v1/auth/register');

      console.log(res);
     };
   
    FetchSignUp()
}, []);

    return (
        <div className="login-page-container">
   <div></div>

<div className="login-main-container">  {/* Main container begin */}


   <div className="login-container">

   <img src="/src/assets/bloggify logo (1).jpg" alt="Logo" className="logo" /> {/* LOGO */}
   <h2>WELCOME </h2> {/*LOGO*/}
   <p>Sign up</p>


   <div className="email-form">

  <div className="form-row">
    <label htmlFor="username">Username:</label>
    <input type="text" id="username" name="username" placeholder="Enter your username" />
  </div>

  <div className="form-row">
    <label htmlFor="email">Email Address:                    </label>
    <input type="email" id="email" name="email" placeholder="Enter your email" />
  </div>

  <div className="form-row">
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="Enter your password" />
  </div>

<div className="button-row">
  <button className="LoginButton">Log in</button>
  <button className="SignUp">Sign Up</button>
  </div>
</div>



   </div>
   </div> {/* Main container end */}

        </div>

     
    )
}

export default SignupPage;