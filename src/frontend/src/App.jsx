import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';
import { PublicRoute, PrivateRoute } from './routes/PrivateRoute'; 

import Home from "./pages/Home.jsx"; 
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import LoginSuccess from "./pages/LoginSuccess.jsx";
import MainPage from "./pages/MainPage.jsx"; 
import ConfigurationModal from "./components/ConfigurationModal.jsx"; 


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/config" element={ <ConfigurationModal /> } />
          <Route path="/welcome" element={ <Home /> } /> 
          
          <Route element={<PublicRoute />}>
            <Route path="/login" element={ <Login /> } /> 
            <Route path="/register" element={ <Register /> } />
            <Route path="/login-success" element={ <LoginSuccess /> } />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/" element={ <MainPage /> } /> 
          </Route>

          <Route path="*" element={ <Navigate to="/" replace /> } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;