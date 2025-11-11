import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';
import { PublicRoute, PrivateRoute } from './routes/PrivateRoute'; 

import Home from "./pages/Home.jsx"; 
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import LoginSuccess from "./pages/LoginSuccess.jsx";
import Dashboard from "./pages/Dashboard.jsx"; 
import Configuration from "./pages/Configuration.jsx"; 


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/config" element={ <Configuration /> } />
          
          <Route element={<PublicRoute />}>
            <Route path="/login" element={ <Login /> } /> 
            <Route path="/register" element={ <Register /> } />
            <Route path="/login-success" element={ <LoginSuccess /> } />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/" element={ <Dashboard /> } /> 
          </Route>

          <Route path="*" element={ <Navigate to="/" replace /> } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;