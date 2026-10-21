import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './page/Login'
import Register from './page/Register'
import Home from './page/Home'
import {Toaster} from 'react-hot-toast'
import ChattingArea from './page/ChattingArea'

const App = () => {
  return (
    <div className='max-h-screen'>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/chat"} element={<ChattingArea />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App