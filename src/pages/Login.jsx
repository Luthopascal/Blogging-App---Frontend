import React, {useState} from "react";
import './login.css'
import {Link} from 'react-router-dom';
import NonAuthBlogPosts from "./NonAuthBlogPosts";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function LoginPage() {

   const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const navigate = useNavigate();

 async function handleClick(){
  console.log(email,password)
  const res = await axios.post('http://localhost:3000/api/v1/auth/login',
    {
      email: email,
      password: password
    }
  )
localStorage.setItem('user',JSON.stringify(res.data))  /*LOCAL STORAGE only takes string */
navigate('/protected-route')
 }
    return (
        <div className="login-page-container">
   <div></div>

<div className="login-main-container">  {/* Main container begin */}


   <div className="login-container">

   <img src="/src/assets/bloggify logo (1).jpg" alt="Logo" className="logo" /> {/* LOGO */}
   <h2>WELCOME BACK</h2> {/*LOGO*/}
   <p>Login</p>


   <div className="email-form">

  <div className="form-row">
    <label htmlFor="email">Email Address:                    </label>
    <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)}/> {/*e is the data being kept*/}
  </div>

  <div className="form-row">
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="Enter your password"  value={password} onChange={(e)=> setPassword(e.target.value)} />
  </div>

<div className="button-row">
  <button onClick={handleClick} className="LoginButton">Log in</button>
  <button className="SignUp">Sign Up</button>
  </div>
</div>



   </div>
   </div> {/* Main container end */}

        </div>

     
    )
}

export default LoginPage;