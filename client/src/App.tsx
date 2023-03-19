import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {AuthProvider} from './contexts/authContext'
import Register from './components/auth/AuthContainer'

function App() {

  return (
    <AuthProvider>
    <div className="">
     <Register/>
    </div>
    </AuthProvider>
  )
}

export default App
