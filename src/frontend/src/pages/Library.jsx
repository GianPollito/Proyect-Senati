import React from 'react'; 

// Constantes y datos MOCK (se mantienen)
const LIBRARY_GAMES_DATA = [
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
];

const PLACEHOLDER_IMG = "https://placehold.co/50x50/374151/FFF?text=ICON";

// Componente de Fila de Juego (Diseño Plano, SIN CASILLA)
const LibraryGameItem = ({ game }) => {
    return (
        <div className="flex items-center justify-between py-5 px-7 cursor-pointer hover:bg-gray-900 transition duration-150">
            
            {/* Ícono y Título/Subtítulo */}
            <div className="flex items-center space-x-8 flex-grow">
                
                {/* 1. TAMAÑO UNIFORME GARANTIZADO: w-56 h-28 */}
                <div className="w-56 h-28 rounded-lg overflow-hidden flex-shrink-0 shadow-xl bg-gray-900">
                    <img 
                        src={game.icon || PLACEHOLDER_IMG} 
                        alt={`Icono de ${game.title}`} 
                        className="w-full h-full object-cover" // 2. AJUSTE GARANTIZADO
                        onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}
                    />
                </div>
                <div>
                    <h3 className="text-3xl font-extrabold text-white truncate">{game.title}</h3>
                    <p className="text-xl text-gray-400 mt-0.5">{game.developer}</p>
                </div>
            </div>

            {/* Tamaño y Botones de Acción */}
            <div className="flex items-center space-x-10 flex-shrink-0 ml-10">
                
                <span className="text-xl font-medium text-gray-400 w-28 text-right">{game.size}</span>

                <button className="text-gray-400 hover:text-red-500 transition duration-150 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                </button>
                
                <button className="text-gray-400 hover:text-red-500 transition duration-150 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="17" r="1"/></svg>
                </button>
            </div>
        </div>
    );
};

// Componente Principal de la Biblioteca
const Library = () => {
    return (
        <div className="py-14"> 
            <div> 

                <div className="flex justify-between items-center mb-8 px-7">
                    <h1 className="text-4xl font-extrabold text-white">Biblioteca</h1>
                    <span className="text-base text-gray-500 cursor-pointer hover:text-gray-300">
                        Historial de pedidos
                    </span>
                </div>
                
                <div className="divide-y divide-gray-800">
                    {LIBRARY_GAMES_DATA.map((game, index) => (
                        <LibraryGameItem key={index} game={game} />
                    ))}
                </div>
                
                <div className="mt-12 p-6 text-center text-gray-400 border border-dashed border-gray-700 rounded-lg mx-7">
                    <p className="text-lg">Tu biblioteca contiene {LIBRARY_GAMES_DATA.length} juegos.</p>
                </div>
            </div>
        </div>
    );
};

export default Library;