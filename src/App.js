import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Details from './screens/Details';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/details" element={<Details />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<>landing page</>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App