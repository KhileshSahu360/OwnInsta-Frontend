import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <div className=''>
        <Outlet/> 
      </div>
      <div>
      <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </>
  )
}

export default App
