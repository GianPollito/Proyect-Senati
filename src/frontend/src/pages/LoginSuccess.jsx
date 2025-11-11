import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function LoginSuccess() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const { setToken: setAuthToken } = useAuth();

  useEffect(() => {
    let receivedToken = null;
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');

    if (tokenFromUrl) {
      receivedToken = tokenFromUrl;
      localStorage.setItem('authToken', receivedToken); 
      if (setAuthToken) setAuthToken(receivedToken); 
    } else {
      const tokenFromStorage = localStorage.getItem('authToken');
      if (tokenFromStorage) {
        receivedToken = tokenFromStorage;
      }
    }

    if (receivedToken) {
      setToken(receivedToken);
    } else {
      console.error("LoginSuccess.jsx: No se recibió ningún token");
    }
    
    setLoading(false);

    const timer = setTimeout(() => {
      navigate('/', { replace: true }); 
    }, 3000); 

    return () => clearTimeout(timer); 

  }, [location, navigate, setAuthToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1F2123] text-gray-200">
        <h1 className="text-xl">Verificando autenticación...</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1F2123]">
      <div className="p-8 bg-[#2B2D30] rounded-xl shadow-2xl text-center w-full max-w-md">
        {token ? (
          <>
            <h1 className="text-3xl font-bold mb-4 text-[#1CD760]">¡Ingreso Exitoso!</h1>
            <p className="mb-6 text-gray-200">Serás redirigido al Dashboard en unos segundos.</p>
            <div className="p-3 bg-[#3A3D40] rounded-lg border border-gray-600 break-all text-sm">
                <p className="text-gray-400">Token:</p>
                <p className="text-gray-300 mt-1">{token}</p>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4 text-red-600">Error de Autenticación</h1>
            <p className="mb-6 text-gray-200">No se pudo obtener el token. Por favor, intenta iniciar sesión de nuevo.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginSuccess;