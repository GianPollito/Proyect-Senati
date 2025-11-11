import { useAuth } from '../context/AuthProvider';

function MainPage() {
  const { token, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-[#1F2123] p-8 text-white">
      <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-[#FF0000]">Bienvenido a Go Games</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold bg-[#FF0000] text-white rounded-lg 
                     hover:bg-red-700 transition duration-150 shadow-md border-2 border-[#FF0000]"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-[#2B2D30] p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-white">Estado de la Aplicación</h2>
          <p className="text-gray-400">¡La protección de rutas está funcionando! Esta página es privada.</p>
        </div>

        <div className="bg-[#2B2D30] p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-white">Detalles de Sesión</h2>
          <div className="p-3 bg-[#3A3D40] rounded-lg border border-gray-600 break-all text-sm">
            <p className="text-gray-400">Token Almacenado (para verificación):</p>
            <p className="text-gray-300 mt-1">{token || "No se encontró token, pero la ruta está activa."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;