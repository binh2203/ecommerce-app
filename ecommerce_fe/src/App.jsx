import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import Login from './page/Login';      
import AfterLoginPage from './page/AfterLoginPage'; // Import the AfterLoginPage component
import User from './page/User';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} />
      <Route path="/after-login" element={<AfterLoginPage />} />
      <Route path="/user" element={<User />} />
    </Routes>
    
  );
}

export default App;
