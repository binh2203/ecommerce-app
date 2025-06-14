import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import Login from './page/Login';       // đổi sang đúng folder nếu cần
// import Register from './page/Register'; // nếu bạn có Register.jsx

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
    </Routes>
    
  );
}

export default App;
