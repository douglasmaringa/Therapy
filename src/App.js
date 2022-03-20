import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Details from './screens/Details';
import Home from './screens/Home';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Register from './screens/Register';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/profile" element={<Profile />} />
    <Route path="/details" element={<Details />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Landing/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App