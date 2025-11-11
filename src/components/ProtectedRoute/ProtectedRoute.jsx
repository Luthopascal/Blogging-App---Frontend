import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const token = JSON.parse(localStorage.getItem('user')).token;   /*Makes a string into an object */
  return token ? children: <navigate to ={'/login'}/> /*If the token is valid show child (under protected) */
}

export default ProtectedRoute