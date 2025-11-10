import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginSuccess() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    let receivedToken = null;
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');

    if (tokenFromUrl) {
      receivedToken = tokenFromUrl;
      localStorage.setItem('authToken', receivedToken); 
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
      navigate('/'); 
    }, 3000); 

    return () => clearTimeout(timer); 

  }, [location, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1F2123] text-gray-200">
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1F2123]">
      <div className="p-8 bg-[#2B2D30] rounded-xl shadow-2xl text-center w-full max-w-md">
        {token ? (
          <>
            <h1 className="text-3xl font-bold mb-4 text-[#1CD760]">¡Inicio de Sesión Exitoso!</h1>
            <p className="mb-6 text-gray-200">Has sido autenticado correctamente.</p>
            <div className="p-3 bg-[#3A3D40] rounded-lg border border-gray-600">
                <p className="text-xs text-gray-400 break-all"><strong>Token:</strong> {token}</p>
            </div>
            <p className="mt-4 text-sm text-gray-400">Serás redirigido en unos segundos...</p>
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