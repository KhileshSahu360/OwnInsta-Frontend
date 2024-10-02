import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault();

        if(!username || !password) return alert('please enter username and password!')

        const data = {
            username,
            password
        }

        localStorage.setItem('auth', JSON.stringify(data));
        navigate('/')
    }

  return (
    <div className='h-[calc(100vh-56px)] flex justify-center items-center'>
          <form onSubmit={handleLogin} className='grid grid-rows-5 p-10 pb-5 bg-slate-300 h-[400px] w-[400px] rounded-md shadow-lg'>
            <div className='row-span-4 flex pt-5 flex-col gap-8'>
                <input type="text" value={username} placeholder='IG - Username' className='outline-none border-2 border-white rounded-sm py-2 px-2 focus:border-pink-500 focus-border-2' onChange={(event)=>setUsername(event.target.value)}/>
                <input type="password" value={password} placeholder='IG - Password' className='outline-none border-2 border-white rounded-sm py-2 px-2 focus:border-pink-500 focus-border-2' onChange={(event)=>setPassword(event.target.value)}/>
            </div>
            <Button type="submit" className="row-span-1 bg-pink-600 hover:bg-pink-400 active:scale-95 transition-all">Login</Button>
        </form>
    </div>
  )
}

export default Login