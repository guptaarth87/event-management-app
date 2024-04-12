import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route , Routes} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import AllEvents from './pages/AllEvents'
import BookEventForm from './pages/BookEventForm'
import AddEventForm from './pages/AddEventForm'

function App() {
 
  return (
    <>
     <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/admin' element={<AddEventForm/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/events' element={<AllEvents/>} />
      <Route path='/bookform' element={<BookEventForm/>} />
     </Routes>
    </>
  )
}

export default App
