import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import LoginSuccess from "./pages/LoginSuccess.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } /> 
        <Route path="/register" element={ <Register /> } /> 
        <Route path="/login" element={ <Login /> } /> 
        <Route path="/login-success" element={ <LoginSuccess /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;