import React, { useState } from 'react'; 

// Constantes y datos MOCK (ACTUALIZADO con 9 JUEGOS Y RUTAS NUEVAS)
const LIBRARY_GAMES_DATA = [
    // ... (Datos de juegos se mantienen igual) ...
    { 
        title: "Annelids: Guerra de Gusanos", 
        developer: "Michal Srb", 
        size: "15 MB", 
        icon: "/image46.svg" 
    },
    { 
        title: "Hustle Castle: Castillos RPG", 
        developer: "MYGAMES MENA FZ LLC", 
        size: "158 MB", 
        icon: "/image47.svg" 
    },
    { 
        title: "Last Land: War of Survival", 
        developer: "LEME GAMES", 
        size: "191 MB", 
        icon: "/image48.svg" 
    },
    { 
        title: "Legend of Mushroom", 
        developer: "Joy Nice Games", 
        size: "126 MB", 
        icon: "/image49.svg" 
    },
    { 
        title: "MultiCraft - Build and Mine!", 
        developer: "MultiCraft", 
        size: "22 MB", 
        icon: "/image50.svg" 
    },
    { 
        title: "RealmCraft 3D Mine Block World", 
        developer: "Tellurion Mobile", 
        size: "116 MB", 
        icon: "/image51.svg" 
    },
    { 
        title: "Soccer Superstar - Futbol", 
        developer: "Real Freestyle Soccer", 
        size: "106 MB", 
        icon: "/image52.svg" 
    },
    { 
        title: "The Ants: Underground Kingdom", 
        developer: "Star Union", 
        size: "1 GB", 
        icon: "/image53.svg" 
    },
    { 
        title: "Zooba: Juegos Multijugador MOBA", 
        developer: "Wildlife Studios", 
        size: "161 MB", 
        icon: "/image54.svg" 
    },
];

const PLACEHOLDER_IMG = "https://placehold.co/50x50/374151/FFF?text=ICON";

// --- MODIFICADO: ACEPTA onHistoryClick ---
const GameMenuModal = ({ isOpen, onClose, onHistoryClick }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-0 mt-2 z-20 w-48 bg-[#2B2D30] rounded-lg shadow-2xl overflow-hidden py-1 border border-gray-700">
            
            {/* Ítem 1: Descargar */}
            <div 
                className="py-2 px-4 text-sm text-white hover:bg-gray-700 cursor-pointer transition duration-100"
                onClick={() => { console.log('Descargando juego...'); onClose(); }}
            >
                Descargar el juego
            </div>

            {/* Ítem 2: Ver detalles */}
            <div 
                className="py-2 px-4 text-sm text-white hover:bg-gray-700 cursor-pointer transition duration-100"
                onClick={() => { console.log('Ver detalles del juego...'); onClose(); }}
            >
                Ver detalles del juego
            </div>

            {/* Ítem 3: VER HISTORIAL DE PEDIDOS (AHORA FUNCIONAL) */}
            <div 
                className="py-2 px-4 text-sm text-white hover:bg-gray-700 cursor-pointer transition duration-100"
                onClick={() => { 
                    onHistoryClick(); // <-- LLAMA A LA FUNCIÓN DE REDIRECCIÓN
                    onClose(); // Cierra el menú
                }}
            >
                Ver historial de pedidos
            </div>
        </div>
    );
};


// Componente de Fila de Juego (Diseño Plano, SIN CASILLA)
const LibraryGameItem = ({ game, activeMenuId, onMenuToggle, onHistoryClick }) => {
    const isMenuOpen = activeMenuId === game.title;
    
    return (
        <div className="flex items-center justify-between py-5 px-7 cursor-pointer hover:bg-gray-900 transition duration-150">
            
            {/* Ícono y Título/Subtítulo */}
            <div className="flex items-center space-x-8 flex-grow">
                
                {/* Carátula: w-56 h-28 */}
                <div className="w-56 h-28 rounded-lg overflow-hidden flex-shrink-0 shadow-xl bg-gray-900">
                    <img 
                        src={game.icon || PLACEHOLDER_IMG} 
                        alt={`Icono de ${game.title}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}
                    />
                </div>
                <div>
                    <h3 className="text-3xl font-extrabold text-white truncate">{game.title}</h3>
                    <p className="text-xl text-gray-400 mt-0.5">{game.developer}</p>
                </div>
            </div>

            {/* Tamaño y Botones de Acción */}
            <div className="flex items-center space-x-10 flex-shrink-0 ml-10 relative">
                
                <span className="text-xl font-medium text-gray-400 w-28 text-right">{game.size}</span>

                {/* Botón de Descarga/Play */}
                <button className="text-red-700 hover:text-gray-500 transition duration-150 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                </button>
                
                {/* BOTÓN DE MENÚ (3 PUNTOS) */}
                <button 
                    className="text-red-700 hover:text-gray-500 transition duration-150 p-2 z-30 relative"
                    onClick={(e) => {
                        e.stopPropagation(); 
                        onMenuToggle(game.title);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="17" r="1"/></svg>
                </button>

                {/* MODIFICADO: PASAMOS la función onHistoryClick */}
                <GameMenuModal 
                    isOpen={isMenuOpen} 
                    onClose={() => onMenuToggle(null)}
                    onHistoryClick={onHistoryClick}
                />
            </div>
        </div>
    );
};

// Componente Principal de la Biblioteca
const Library = ({ onHistoryClick }) => { // <-- RECIBE LA FUNCIÓN
    const [activeMenuId, setActiveMenuId] = useState(null);

    const handleMenuToggle = (gameTitle) => {
        setActiveMenuId(activeMenuId === gameTitle ? null : gameTitle);
    };

    const handleListClick = () => {
        if (activeMenuId !== null) {
            setActiveMenuId(null);
        }
    };


    return (
        <div className="py-7" onClick={handleListClick}>
            <div> 

                <div className="flex justify-between items-center mb-8 px-7">
                    <h1 className="text-5xl font-extrabold text-white">Biblioteca</h1>
                    <span 
                        className="text-base text-red-500 cursor-pointer hover:text-gray-500"
                        onClick={onHistoryClick} // <-- FUNCIÓN AL CLIC (Primer Botón)
                    >
                        Historial de pedidos
                    </span>
                </div>
                
                <div className="divide-y divide-gray-800">
                    {LIBRARY_GAMES_DATA.map((game, index) => (
                        // MODIFICADO: PASAMOS la función onHistoryClick a cada ítem
                        <LibraryGameItem 
                            key={index} 
                            game={game} 
                            activeMenuId={activeMenuId}
                            onMenuToggle={handleMenuToggle}
                            onHistoryClick={onHistoryClick} // <-- PASAMOS LA FUNCIÓN AQUÍ
                        />
                    ))}
                </div>
                
                <div className="mt-12 p-6 text-center text-gray-400 border border-dashed border-red-700 rounded-lg mx-7">
                    <p className="text-lg">Tu biblioteca contiene {LIBRARY_GAMES_DATA.length} juegos.</p>
                </div>
            </div>
        </div>
    );
};

export default Library;