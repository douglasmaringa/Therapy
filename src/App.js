import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Chat from './screens/Chat';
import ClientDetails from './screens/ClientDetails';
import Connections from './screens/Connections';
import Details from './screens/Details';
import Home from './screens/Home';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Register from './screens/Register';
import RegisterClient from './screens/RegisterClient';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/connections" element={<Connections />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/clientdetails" element={<ClientDetails />} />
    <Route path="/details" element={<Details />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/registerclient" element={<RegisterClient />} />
    <Route path="/" element={<Landing/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App