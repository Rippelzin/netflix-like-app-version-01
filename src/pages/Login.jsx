import React from 'react'
import LoginForm from '../components/LoginForm'
import { Navigate } from 'react-router-dom'

const Login = () => {

  function isLogged(){
    return localStorage.getItem('token') !== null
  }
  return (
    <div>
      { isLogged() ? (  
       <Navigate to='/'/>
      ) : ( 
      <LoginForm/>
      )
      }
        
    </div>
  )
}

export default Login