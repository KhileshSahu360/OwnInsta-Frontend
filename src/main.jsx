import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllPosts from './pages/AllPosts.jsx'
import Login from './pages/Login.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children : [
      { path : '/', element : <AuthLayout auth={true}><AllPosts/></AuthLayout> },
      { path : '/login', element : <Login/> }
    ]
  },
 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
  </StrictMode>,
)
