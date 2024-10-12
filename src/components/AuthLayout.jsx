import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, auth }) => {
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