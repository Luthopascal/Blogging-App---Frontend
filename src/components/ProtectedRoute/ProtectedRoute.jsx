import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const token = JSON.parse(localStorage.getItem('user')).token;   /*Makes a string into an object */
  return token ? children: <navigate to ={'/login'}/>
}

export default ProtectedRoute