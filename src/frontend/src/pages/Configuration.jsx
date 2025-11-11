import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function Configuration() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/welcome', { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#1F2123] p-8 text-white">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Configuración de Cuenta</h1>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 text-sm font-semibold text-gray-300 rounded-lg hover:bg-[#2B2D30] transition duration-150"
          >
            &larr; Volver
          </button>
        </div>

        <div className="space-y-6">
          
          <div className="bg-[#2B2D30] p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-[#FF0000]">General</h2>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-600">
              <span className="text-gray-300">Notificaciones de Juego</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-300">Sincronización de Datos</span>
              <span className="text-sm text-gray-500">Activado</span>
            </div>
          </div>

          {isAuthenticated && (
            <div className="bg-[#2B2D30] p-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-[#FF0000]">Cuenta</h2>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-300">Estado</span>
                <span className="text-green-400 font-medium">Autenticado</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-sm font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default Configuration;