import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './page/Login'
import Register from './page/Register'
import Home from './page/Home'

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </>
  )
}

export default App