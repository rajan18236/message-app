import React from 'react'
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <>
      <Routes>
        <Route to={"/"} element={<Home />} />
      </Routes>
    </>
  )
}

export default App