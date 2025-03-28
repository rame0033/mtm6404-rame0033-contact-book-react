// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {

  //function to check if bootstrap is working
  return (
    <>
    <div className="App">
      <h1>Contact Book</h1>
    </div>
    <Outlet />
    </>
  )
}

export default App
