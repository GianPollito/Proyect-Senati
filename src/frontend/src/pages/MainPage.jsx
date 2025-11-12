import React, { useState } from 'react';
/*
// Estas importaciones son necesarias para tu proyecto local, pero causan error de compilación aquí.
import { useAuth } from '../context/AuthProvider'; 
import { useNavigate } from 'react-router-dom';
// import FeedbackModal from '../components/FeedbackModal'; // Importación de tu modal real (comentada)
*/

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

// Rutas de Imágenes para la Librería (8 elementos, Ruta corregida: /imageX.svg)
const LIBRARY_IMAGES = [
    '/image1.svg',
    '/image2.svg',
    '/image3.svg',
    '/image4.svg',
    '/image5.svg',
    '/image6.svg',
    '/image7.svg',
    '/image8.svg',
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
    // Usamos el array de 16 imágenes para que esta vista muestre la lista completa
    const FULL_LIBRARY_IMAGES = [
        '/image1.svg', '/image2.svg', '/image3.svg', '/image4.svg',
        '/image5.svg', '/image6.svg', '/image7.svg', '/image8.svg',
        '/image9.svg', '/image10.svg', '/image11.svg', '/image12.svg',
        '/image13.svg', '/image14.svg', '/image15.svg', '/image16.svg', 
    ];

    return (
        <div className="p-6 h-full flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-white">De tu biblioteca</h2>
            {/* Contenedor principal para las 8 imágenes (h-full y flex-col) */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                {FULL_LIBRARY_IMAGES.map((src, i) => (
                    // CLAVE: flex-1 asegura que las imágenes ocupen la altura disponible uniformemente
                    <div key={i} className="flex-1 min-h-0 w-full rounded-lg overflow-hidden shadow-xl cursor-pointer hover:opacity-90 transition duration-200">
                        <img 
                            src={src} 
                            alt={`Juego ${i + 1}`} 
                            // CLAVE: Aspecto rectangular y misma medida para todas
                            className="w-full h-full" 
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
  /*
  const { logout } = useAuth(); 
  const navigate = useNavigate(); 
  */
  
  const [activeSection, setActiveSection] = useState('home'); 
  // const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false); // Estado de modal ELIMINADO

  const handleLogout = () => {
     console.log('Logout placeholder');
  };
  
  const handleViewDetails = () => {
    console.log("¡Navegando a los detalles de Sonic Rumble! (Ruta /details implementada en el futuro)");
  };

  // FUNCIONES DE MARCADOR PARA ÍCONOS INFERIORES - RESTAURADAS
  const handleAvisosClick = () => {
      console.log("Abrir Vista de Avisos/Notificaciones.");
  };
  const handleDownloadsClick = () => {
      console.log("Abrir Vista de Descargas.");
  };
  const handleSettingsOpen = () => {
      // Esta función maneja el clic en el ícono de 'Enviar Comentarios' (Globo de Mensaje)
      console.log("Abriendo Configuración/Enviar Comentarios."); 
  };


  const renderContent = () => {
    switch (activeSection) {
      case 'search':
        return <SearchPage />;
      case 'games':
        return <GamesPage />;
      case 'library': 
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


  const getIconClass = (section) => {
    if (activeSection === section) {
        return 'text-red-500'; 
    }
    return 'text-white hover:text-gray-400 active:text-gray-600'; 
  };
  

  return (
    <div className="h-screen bg-[#1F2123] text-white font-sans overflow-hidden">
        
      {/* Estructura de Tres Columnas Fijas (Sidebar, Contenido Principal, Librería Lateral) */}
      <div className="grid grid-cols-[90px_1fr_250px] h-full"> 
        
        {/* COLUMNA 1: Navegación Fija Izquierda (Sidebar) */}
        <div className="bg-[#1F2123] pt-4 pb-4 flex flex-col items-center border-r border-gray-800 h-full">
          
          {/* LOGO/USUARIO */}
          <div className="flex flex-col items-center mb-8" onClick={handleLogout}>
              <div className="h-10 w-10 bg-yellow-500 rounded-full cursor-pointer transform hover:scale-110 transition duration-150 relative">
                  {/* Icono de Usuario (o imagen de perfil) */}
              </div>
          </div>
          
          {/* ÍCONOS DE NAVEGACIÓN SUPERIOR */}
          <div className="space-y-8"> 
            {/* 1. Home/Dashboard */}
            <div className={getIconClass('home') + ' cursor-pointer p-1 rounded-md'} onClick={() => setActiveSection('home')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            
            {/* 2. Biblioteca (Libro/Ventana) */}
            <div className={getIconClass('library') + ' cursor-pointer p-1 rounded-md'} onClick={() => setActiveSection('library')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            </div>

            {/* 3. Búsqueda (Lupa) */}
            <div className={getIconClass('search') + ' cursor-pointer p-1 rounded-md'} onClick={() => setActiveSection('search')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            
          </div>
          
          {/* SEPARADOR Y ÍCONOS INFERIORES */}
          <div className="flex-grow"></div> 
          
          <div className="space-y-8 mb-4">
              
              {/* 4. Avisos (Campana) */}
              <div className="text-white hover:text-gray-400 cursor-pointer p-1 rounded-md" onClick={handleAvisosClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.37 21a2 2 0 0 0 3.26 0"></path></svg>
              </div>

              {/* 5. Descargas / Instalaciones */}
              <div className="text-white hover:text-gray-400 cursor-pointer p-1 rounded-md" onClick={handleDownloadsClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </div>
              
              {/* 6. Enviar Comentarios (Globo de Mensaje - ÚLTIMO ÍCONO) */}
              <div className="text-white hover:text-gray-400 cursor-pointer p-1 rounded-md" onClick={handleSettingsOpen}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
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
                      <h2 className="text-5xl font-black mb-3 text-[#FF0000]">SONIC RUMBLE</h2> 
                      <h3 className="text-xl font-semibold text-gray-300">Pelea con Sonic y sus amigos</h3>
                      <p className="text-xs text-gray-400 mt-2">Sonic Rumble | SEGA CORPORATION</p>
                          
                      <div className="mt-6">
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

        {/* COLUMNA 3: Librería Lateral Derecha (Fija y Estilizada) */}
        <div className="bg-[#1F2123] px-2 py-4 border-l border-gray-800 h-full"> 
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 mx-2 text-red-500">En tu biblioteca</h3>
            
            {/* Contenedor para el espaciado vertical */}
            <div className="space-y-3 px-2"> 
                {LIBRARY_IMAGES.map((src, i) => (
                    <div key={i} className="cursor-pointer transform hover:scale-[1.05] transition duration-200 shadow-lg mx-auto">
                        {/* El contenedor ahora es h-24 para mayor longitud */}
                        <div className="w-full h-24 rounded-lg overflow-hidden shadow-lg"> 
                            {/* IMPLEMENTACIÓN FINAL DE IMAGEN: ocupando todo el div padre */}
                            <img 
                                src={src} 
                                alt={`Carátula del juego ${i + 1}`}
                                className="w-full h-full object-cover"
                                // Fallback placeholder para si la imagen no carga
                                onError={(e) => { e.target.onerror = null; e.target.src=PLACEHOLDER_IMG }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>

      {/* MODAL DE FEEDBACK (Se muestra en la capa superior) */}
      {/* <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} /> */}

    </div>
  );
}

export default MainPage;