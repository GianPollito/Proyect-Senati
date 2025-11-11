import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function ConfigurationModal({ isOpen, onClose }) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/welcome', { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 md:p-8 z-50">
      <div className="w-full max-w-md bg-[#F5F5F5] rounded-xl shadow-2xl border border-gray-700 text-white">
        
        <div className="flex items-center justify-between border-b border-gray-700 p-10">
          <h1 className="text-xl font-bold text-black">Configuración de Cuenta</h1>
          <button
            onClick={onClose}
            className="px-4 py-1 text-sm font-semibold text-red-500 rounded-lg hover:bg-gray-300 transition duration-150"
          >
            Cerrar
          </button>
        </div>

        <div className="space-y-10 p-10">
          
          <div className="rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-[#FF0000]">General</h2>
            
            <div className="flex justify-between items-center py-4 border-b border-gray-600">
              <span className="text-black text-sm">Notificaciones de Juego</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center py-4">
              <span className="text-black text-sm">Sincronización de Datos</span>
              <span className="text-xs text-red-500">Activado</span>
            </div>
          </div>

          {isAuthenticated && (
            <div className="pt-4">
              <h2 className="text-lg font-semibold mb-4 text-[#FF0000]">Cuenta</h2>
              
              <div className="flex justify-between items-center py-4">
                <span className="text-gray-300 text-sm">Estado</span>
                <span className="text-green-400 font-medium text-sm">Autenticado</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
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

export default ConfigurationModal;