import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider'; // RESTAURADA
import { useNavigate } from 'react-router-dom'; // RESTAURADA

// Datos Mock para los juegos
const MOCK_GAMES = [
    { title: "Mobile Legends: Bang Bang", subtitle: "MOBA", rating: "4.0" },
    { title: "Wuthering Waves", subtitle: "Acción", rating: "4.5" },
    { title: "Geometry Dash Lite", subtitle: "Arcade", rating: "4.3" },
    { title: "Lichess", subtitle: "Mesa", rating: "3.8" },
    { title: "Geometry Dash SubZero", subtitle: "Arcade/SubZero", rating: "4.4" },
    { title: "Geometry Dash World", "subtitle": "Arcade", rating: "4.3" },
    { title: "BombSquad", subtitle: "Fiesta", rating: "4.8" },
    { title: "Bloody Bastards", subtitle: "Acción", rating: "4.6" },
];

// Rutas de Imágenes para la Librería (8 elementos, Ruta corregida: /public/imageX.svg)
const LIBRARY_IMAGES = [
    '/public/image1.svg', 
    '/public/image2.svg',
    '/public/image3.svg', 
    '/public/image4.svg', 
    '/public/image5.svg', 
    '/public/image6.svg', 
    '/public/image7.svg', 
    '/public/image8.svg', 
];

// Fallback image source (placeholder)
const PLACEHOLDER_IMG = "https://placehold.co/250x100/374151/FFF?text=GAME+IMAGE+FALLBACK";

// Componente de Tarjeta de Juego
const GameCard = ({ game, index }) => {
    const bgColors = ['bg-blue-800', 'bg-red-800', 'bg-green-800', 'bg-purple-800', 'bg-cyan-800', 'bg-pink-800'];
    const gameBg = index < bgColors.length ? bgColors[index] : 'bg-gray-800';

    return (
        <div className="bg-[#2B2D30] rounded-xl overflow-hidden cursor-pointer transform hover:scale-[1.03] transition duration-200 shadow-lg">
            <div className={`h-40 ${gameBg} flex items-center justify-center text-white text-sm p-4`}>
                <span className="text-center font-extrabold text-xs">{game.title}</span>
            </div>
            <div className="p-3 bg-[#1F2123]">
                <h3 className="text-base font-bold text-white truncate">{game.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{game.rating} | {game.subtitle}</p>
            </div>
        </div>
    );
};

// --- COMPONENTE DE PÁGINA "DE TU BIBLIOTECA" ---
const LibraryPage = () => {
    return (
        <div className="p-6 h-full flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-white">De tu biblioteca</h2>
            {/* Contenedor principal para las 8 imágenes (h-full y flex-col) */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                {LIBRARY_IMAGES.map((src, i) => (
                    // CLAVE: flex-1 asegura que las 8 imágenes ocupen la altura disponible cada una
                    // Añadimos 'min-h-0' para que el flexbox funcione correctamente en el scroll
                    <div key={i} className="flex-1 min-h-0 w-full rounded-lg overflow-hidden shadow-xl cursor-pointer hover:opacity-90 transition duration-200">
                        <img 
                            src={src} 
                            alt={`Juego ${i + 1}`} 
                            // CLAVE: Aspecto rectangular y misma medida para todas
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.onerror = null; e.target.src=PLACEHOLDER_IMG }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
// --- FIN: COMPONENTE DE PÁGINA "DE TU BIBLIOTECA" ---


// Componentes Placeholder 
const SearchPage = () => (
    <div className="p-10 text-center text-gray-400">
        <h2 className="text-3xl font-bold mb-4 text-white">Búsqueda</h2>
        <p>Aquí puedes buscar y filtrar juegos. Funcionalidad en desarrollo.</p>
    </div>
);
const GamesPage = () => (
    <div className="p-10 text-center text-gray-400">
        <h2 className="text-3xl font-bold mb-4 text-white">Juegos y Categorías</h2>
        <p>Explora diferentes categorías de juegos aquí.</p>
    </div>
);


function MainPage() {
  const { logout } = useAuth(); // Restaurado
  // Estado para la navegación interna de la sidebar
  const [activeSection, setActiveSection] = useState('home'); 
  const navigate = useNavigate(); // Restaurado

  const handleLogout = () => {
     logout();
     // navigate('/login'); // Usar si tienes la ruta de login
     console.log('Logout y navegación (funciones restauradas al descomentar las importaciones)');
  };
  
  // Función para la navegación a detalles (manteniéndose para el botón)
  const handleViewDetails = () => {
    // Usamos console.log en lugar de alert()
    console.log("¡Navegando a los detalles de Sonic Rumble! (Ruta /details implementada en el futuro)");
  };

  // NUEVA FUNCIÓN: Abre la modal de configuración
  const handleSettingsOpen = () => {
      // Usamos console.log en lugar de alert()
      console.log("Abriendo Configuración...");
  };

  // Función para renderizar el contenido central según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case 'search':
        return <SearchPage />;
      case 'games':
        // Mantenemos el componente por si se planea usar.
        return <GamesPage />;
      case 'library': // NUEVO CASO para la vista de biblioteca completa
        return <LibraryPage />;
      case 'home':
      default:
        // Renderiza el contenido principal de la tienda (Sonic, Recomendados, etc.)
        return (
            <div className="p-6 pt-0">
                
                {/* SECCIÓN 2: DESCUENTO / NOTICIA */}
                <div className="mb-10 p-5 bg-[#2B2D30] rounded-xl shadow-lg border border-red-700/50">
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-semibold">
                            Obtén 15% de descuento en cualquier compra en Sonic Rumble para PC
                        </p>
                        <button className="px-4 py-1 border border-white text-sm rounded-lg hover:bg-white/10 transition duration-150">
                            Guardar
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Hasta el 16 de noviembre de 2025.</p>
                </div>

                {/* SECCIÓN 3: RECOMENDADOS PARA TI (GRID) */}
                <h2 className="text-2xl font-bold mb-5">Recomendados para ti</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {MOCK_GAMES.map((game, index) => (
                        <GameCard key={index} game={game} index={index} />
                    ))}
                </div>
                {/* Añadimos espacio para forzar el scroll y probar */}
                <div className="h-96"></div>
            </div>
        );
    }
  };

  // Clase para el icono activo: (Siempre rojo si es la sección actual)
  const getIconClass = (section) => {
    if (activeSection === section) {
        return 'text-red-500'; // ROJO si está seleccionado
    }
    // CLAVE: Normal es blanco, hover es gris (gray-400), active (clic) es gris más oscuro (gray-600)
    return 'text-white hover:text-gray-400 active:text-gray-600'; 
  };
  
  // FUNCIONALIDADES ADICIONALES
  const handleAvisosClick = () => {
      console.log("Abrir Vista de Avisos/Notificaciones.");
  };
  const handleDownloadsClick = () => {
      console.log("Abrir Vista de Descargas.");
  };
  // La función handleSettingsOpen se mantiene para la claridad del icono.


  return (
    // CLAVE: h-screen y overflow-hidden en el contenedor principal del componente
    <div className="h-screen bg-[#1F2123] text-white font-sans overflow-hidden">
      
      {/* Estructura de Tres Columnas Fijas (Sidebar, Contenido Principal, Librería Lateral) */}
      <div className="grid grid-cols-[90px_1fr_250px] h-full"> 
        
        {/* COLUMNA 1: Navegación Fija Izquierda (Sidebar) */}
        {/* Esta columna es estática y no se desplaza */}
        <div className="bg-[#1F2123] pt-4 pb-4 flex flex-col items-center border-r border-gray-800 h-full">
          
          {/* LOGO/USUARIO RESTAURADO (Círculo Amarillo) */}
          <div className="flex flex-col items-center mb-8">
              <div className="h-10 w-10 bg-yellow-500 rounded-full cursor-pointer transform hover:scale-110 transition duration-150 relative">
                  {/* Icono de Usuario (o imagen de perfil) */}
              </div>
          </div>
          
          {/* ÍCONOS DE NAVEGACIÓN SUPERIOR */}
          <div className="space-y-8"> 
            {/* 1. Home/Dashboard */}
            {/* CLAVE: Usamos la clase corregida */}
            <div className={getIconClass('home') + ' cursor-pointer p-1 rounded-md'} onClick={() => setActiveSection('home')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            
            {/* 2. Juegos/Categorías - ÍCONO ELIMINADO */}
            {/* <div className={getIconClass('games') + ' cursor-pointer p-1 rounded-md'} onClick={() => setActiveSection('games')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4"/></svg>
            </div> 
            */}

            {/* 3. Biblioteca (Libro/Ventana) - AHORA ARRIBA DE BÚSQUEDA */}
            <div className={getIconClass('library') + ' cursor-pointer p-1 rounded-md'} onClick={() => setActiveSection('library')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            </div>

            {/* 4. Búsqueda (Lupa) - AHORA DEBAJO DE BIBLIOTECA */}
            <div className={getIconClass('search') + ' cursor-pointer p-1 rounded-md'} onClick={() => setActiveSection('search')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            
          </div>
          
          {/* SEPARADOR Y ÍCONOS INFERIORES (Utilizamos flex-grow para empujar hacia abajo) */}
          <div className="flex-grow"></div> 
          
          <div className="space-y-8 mb-4">
              {/* 5. Avisos (Campana) */}
              <div className="text-white hover:text-gray-400 cursor-pointer p-1 rounded-md" onClick={handleAvisosClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.37 21a2 2 0 0 0 3.26 0"></path></svg>
              </div>
              {/* 6. Descargas / Instalaciones */}
              <div className="text-white hover:text-gray-400 cursor-pointer p-1 rounded-md" onClick={handleDownloadsClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </div>
              {/* 7. Ajustes / Configuración */}
              <div className="text-white hover:text-gray-400 cursor-pointer p-1 rounded-md" onClick={handleSettingsOpen}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </div>
          </div>
          
        </div>

        {/* COLUMNA 2: Contenido Principal (Scrollable) */}
        <div className="bg-[#121212] overflow-y-auto h-full">

            {/* BARRA DE BÚSQUEDA FLOTANTE (Ahora relativa al scroll de esta columna) */}
            <header className="p-6 pb-2 sticky top-0 z-30 bg-[#121212]">
                <input 
                    type="text" 
                    placeholder="Buscar juegos y contenido..."
                    className="w-full bg-[#2B2D30] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
            </header>

            {/* SECCIÓN 1: BANNER PRINCIPAL (Solo visible en Home) */}
            {activeSection === 'home' && (
              <div className="relative bg-[#1F2123] h-96 overflow-hidden">
                  
                  {/* Visual de Fondo Simulado (Para parecerse al arte de Sonic) */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1f2123] via-black to-[#0047b3] opacity-80"></div>
                  
                  {/* Imagen del Banner (Simulación de la derecha) */}
                  <div className="absolute right-0 top-0 h-full w-[60%] bg-cover bg-center [clip-path:polygon(20%_0%,_100%_0%,_100%_100%,_0%_100%)]">
                      {/* Placeholder para la imagen de Sonic/Shadow */}
                      <div className="w-full h-full flex items-center justify-center bg-blue-900/40">
                          <span className="text-xl font-bold text-white/70">Visual de Sonic</span>
                      </div>
                  </div>

                  {/* Contenido de Texto y Botón (Izquierda) */}
                  <div className="relative z-10 p-10 max-w-xl h-full flex flex-col justify-end">
                      <h2 className="text-5xl font-black mb-3 text-[#FF0000]">SONIC RUMBLE</h2> {/* CLAVE: Título en Rojo */}
                      <h3 className="text-xl font-semibold text-gray-300">Pelea con Sonic y sus amigos</h3>
                      <p className="text-xs text-gray-400 mt-2">Sonic Rumble | SEGA CORPORATION</p>
                          
                      <div className="mt-6">
                          {/* CLAVE: Botón con función y estilo verde del original */}
                          <button 
                              onClick={handleViewDetails}
                              className="px-6 py-2 bg-[#00A38D] text-white font-bold rounded-lg hover:bg-[#008F7D] transition duration-150"
                          >
                              Ver detalles
                          </button>
                          <p className="text-xs text-gray-500 mt-2">Contiene anuncios · Compras directas desde la app</p>
                      </div>
                  </div>
              </div>
            )}
            
            {/* CONTENIDO RENDEREADO DINÁMICAMENTE */}
            <div className="p-6 pt-0">
                {renderContent()}
            </div>
            
        </div>

        {/* COLUMNA 3: Librería Lateral Derecha (Fija y Estilizada - EN TU BIBLIOTECA) */}
        {/* Usamos h-full y flex flex-col para forzar el contenido a ocupar la altura completa */}
        <div className="bg-[#1F2123] p-4 border-l border-gray-800 h-full flex flex-col"> 
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 text-red-500">En tu biblioteca</h3>
            
            <div className="flex-grow space-y-3 overflow-y-auto pr-1"> {/* Contenedor que permite el scroll interno */}
              {/* Mapeamos 8 elementos simulados para "En tu biblioteca" */}
              {LIBRARY_IMAGES.map((src, i) => ( // Usamos src para la imagen
                  <div key={i} className="cursor-pointer hover:bg-gray-700/50 transition duration-150 rounded-lg">
                      {/* Contenedor de la imagen */}
                      <div className="w-full h-16 rounded-lg overflow-hidden shadow-lg bg-red-700/80"> 
                          {/* CLAVE: Implementación de la imagen */}
                          <img 
                            src={src} 
                            alt={`Carátula del juego ${i + 1}`}
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.onerror = null; e.target.src=PLACEHOLDER_IMG }}
                          />
                      </div>
                      
                      {/* Simulación del texto (Solo para que se vea el G1, G2, etc. en la derecha) */}
                      <div className="absolute inset-0 p-2 flex items-center">
                          <span className="text-white font-bold text-sm">G{i + 1}</span>
                          <span className="ml-3 text-sm">Juego {i + 1}</span>
                      </div>
                  </div>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-gray-700">
                <a href="#" className="text-sm text-red-500 hover:text-red-400">Ver todos</a>
            </div>
        </div>

      </div>
    </div>
  );
}

export default MainPage;