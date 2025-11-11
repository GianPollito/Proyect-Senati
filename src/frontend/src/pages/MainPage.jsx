import React from 'react';
import { useAuth } from '../context/AuthProvider';

// Datos Mock para los juegos
const MOCK_GAMES = [
    { title: "Mobile Legends: Bang Bang", rating: "4.0 | MOBA" },
    { title: "Wuthering Waves", rating: "4.5 | Acción" },
    { title: "Geometry Dash Lite", rating: "4.3 | Arcade" },
    { title: "Lichess", rating: "3.8 | Mesa" },
    { title: "Geometry Dash SubZero", rating: "4.4 | Arcade/SubZero" },
    { title: "Geometry Dash World", rating: "4.3 | Arcade" },
    { title: "BombSquad", rating: "4.8 | Fiesta" },
    { title: "Bloody Bastards", rating: "4.6 | Acción" },
];

// Componente de Tarjeta de Juego (para la sección Recomendados)
const GameCard = ({ game }) => (
    <div className="bg-[#2B2D30] rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-[1.03] transition duration-200">
        <div className="h-40 bg-gray-600 flex items-center justify-center text-gray-400 text-sm">
            {/* Simulación de Imagen del Juego */}
            <span className="p-2 text-xs text-center">{game.title} (Placeholder)</span>
        </div>
        <div className="p-3">
            <h3 className="text-sm font-semibold truncate">{game.title}</h3>
            <p className="text-xs text-gray-400 mt-1">{game.rating}</p>
        </div>
    </div>
);


function MainPage() {
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout(); // Esto elimina el token y redirige automáticamente
  };

  return (
    // Dashboard con fondo oscuro
    <div className="min-h-screen bg-[#1F2123] text-white font-sans">
      
      {/* Estructura de Tres Columnas (Sidebar, Contenido Principal, Librería Lateral) */}
      <div className="grid grid-cols-[60px_1fr_250px] min-h-screen">
        
        {/* COLUMNA 1: Navegación Fija Izquierda */}
        <div className="bg-[#1F2123] p-4 flex flex-col items-center border-r border-gray-800">
          <div className="h-8 w-8 bg-yellow-500 rounded-full mb-8"></div> {/* Logo Placeholder */}
          <div className="space-y-4">
            <div className="text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div className="text-gray-400 hover:text-white cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4"/></svg>
            </div>
            <div className="text-gray-400 hover:text-white cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
            </div>
          </div>
          <button onClick={handleLogout} className="mt-auto text-xs text-gray-500 hover:text-red-500 transition duration-150">
            Salir
          </button>
        </div>

        {/* COLUMNA 2: Contenido Principal (Scrollable) */}
        <div className="bg-[#121212] overflow-y-auto p-6">
            <header className="mb-6">
                {/* Search Bar Placeholder */}
                <input 
                    type="text" 
                    placeholder="Buscar juegos y contenido..."
                    className="w-full bg-[#2B2D30] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
            </header>

            {/* SECCIÓN 1: BANNER PRINCIPAL (Sonic Rumble) */}
            <div className="bg-[#2B2D30] rounded-xl overflow-hidden mb-10 shadow-lg">
                <div className="grid grid-cols-2">
                    {/* Texto Izquierdo */}
                    <div className="p-8 flex flex-col justify-between">
                        <div>
                            <h2 className="text-4xl font-extrabold mb-3">SONIC RUMBLE</h2>
                            <h3 className="text-xl font-semibold text-gray-300">Pelea con Sonic y sus amigos</h3>
                            <p className="text-xs text-gray-500 mt-2">Sonic Rumble | SEGA CORPORATION</p>
                        </div>
                        
                        <div className="mt-8">
                            <button className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-150">
                                Ver detalles
                            </button>
                            <p className="text-xs text-gray-500 mt-2">Contiene anuncios · Compras directas desde la app</p>
                        </div>
                    </div>
                    {/* Imagen Derecha (Solo un placeholder visual) */}
                    <div className="bg-gradient-to-tr from-gray-900 to-blue-900 h-96 flex items-center justify-center">
                        {/* Aquí iría la imagen real de Sonic */}
                        <span className="text-lg text-white">Visual de Sonic</span>
                    </div>
                </div>
            </div>

            {/* SECCIÓN 2: DESCUENTO / NOTICIA */}
            <div className="mb-10 p-5 bg-[#2B2D30] rounded-xl shadow-lg border border-red-700/50">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">
                        Obtén 15% de descuento en cualquier compra en Sonic Rumble para PC
                    </p>
                    <button className="px-4 py-1 border border-white text-sm rounded-lg hover:bg-white hover:text-black transition duration-150">
                        Guardar
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Hasta el 16 de noviembre de 2025.</p>
            </div>

            {/* SECCIÓN 3: RECOMENDADOS PARA TI (GRID) */}
            <h2 className="text-2xl font-bold mb-5">Recomendados para ti</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {MOCK_GAMES.map((game, index) => (
                    <GameCard key={index} game={game} />
                ))}
            </div>
            
        </div>

        {/* COLUMNA 3: Librería Lateral Derecha (Fija) */}
        <div className="bg-[#1F2123] p-4 border-l border-gray-800 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">En tu biblioteca</h3>
            
            {/* Lista de juegos en la biblioteca */}
            {Array(10).fill().map((_, i) => (
                <div key={i} className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-[#2B2D30] rounded-lg px-2 transition duration-150">
                    <div className="w-10 h-10 bg-gray-600 rounded-lg"></div> {/* Icono del juego */}
                    <span className="text-sm">Juego {i + 1}</span>
                </div>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-700">
                <a href="#" className="text-sm text-red-500 hover:text-red-400">Ver todos</a>
            </div>
        </div>

      </div>
    </div>
  );
}

export default MainPage;