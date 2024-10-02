import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, auth }) => {
    console.log('hiii')
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('auth');
        // if(!auth) navigate('/login')
    },[auth])
  return (
    <>{ children }</>
  )
}

export default AuthLayout