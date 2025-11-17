import React, { useState } from 'react';

// NOTA: Estas constantes son copiadas de MainPage.jsx para que el componente sea autónomo.

const PLACEHOLDER_IMG = "https://placehold.co/250x100/374151/FFF?text=GAME+IMAGE+FALLBACK";

// Datos MOCK necesarios para la vista Explorar
const EXPLORER_GAMES = [
    { title: "Clash Royale", category: "Estrategia", rating: "4.7", installed: true, image: "/image27.svg" },
    { title: "Clash of Clans", category: "Estrategia", rating: "4.5", installed: true, image: "/image30.svg" },
    { title: "CookieRun: Kingdom", category: "Juegos de rol", rating: "4.8", installed: false, image: "/image34.svg" },
    { title: "Mobile Legends: Bang Bang", category: "Acción", rating: "4.0", installed: true, image: "/image11.svg" },
    { title: "Arknights", category: "Estrategia", rating: "4.4", installed: false, image: "/image32.svg" },
    { title: "DRAGON BALL LEGENDS", category: "Acción", rating: "4.3", installed: true, image: "/image33.svg" },
    { title: "Epic Seven", category: "Juegos de rol", rating: "4.4", installed: false, image: "/image31.svg" },
    { title: "Sonic Rumble", category: "Acción", rating: "4.4", installed: true, image: "/image29.svg" },
];

const GAME_COVERS_EXPLORER = {
    "Clash Royale": "/image27.svg",
    "Clash of Clans": "/image30.svg",
    "CookieRun: Kingdom": "/image34.svg",
    "Mobile Legends: Bang Bang": "/image11.svg", 
    "Arknights": "/image32.svg",
    "DRAGON BALL LEGENDS": "/image33.svg",
    "Epic Seven": "/image31.svg",
    "Sonic Rumble": "/image29.svg",
};

const getGameImagePath = (title) => GAME_COVERS_EXPLORER[title] || PLACEHOLDER_IMG;

const StarIcon = () => (
    <svg className="w-3 h-3 text-yellow-400 mr-1" fill="#ff9900ff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.178 3.614a1 1 0 00.95.691h3.805c.969 0 1.371 1.24.588 1.81l-3.082 2.242a1 1 0 00-.364 1.118l1.178 3.614c.3.921-.755 1.688-1.541 1.118l-3.082-2.242a1 1 0 00-1.178 0l-3.082 2.242c-.786.57-1.841-.197-1.541-1.118l1.178-3.614a1 1 0 00-.364-1.118L2.012 9.042c-.783-.57-.381-1.81.588-1.81h3.805a1 1 0 00.95-.691l1.178-3.614z"/>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9.5l-8 8z"/></svg>
);

const GameCard = ({ game }) => {
    const subtext = game.subtitle || game.category;
    const gameImagePath = getGameImagePath(game.title);

    return (
        <div className="rounded-lg overflow-hidden cursor-pointer transform hover:scale-[1.03] transition duration-200 shadow-xl bg-gray-900/50 relative">
            <div className="relative w-full aspect-[4/3]"> 
                <img 
                    src={gameImagePath} 
                    alt={`Carátula de ${game.title}`} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}
                />
            </div>
            {/* Contenedor del texto debajo de la imagen (ajustado para la vista Explorar) */}
            <div className="p-3 text-white">
                <h3 className="text-base font-semibold truncate">{game.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5 flex items-center">
                    <StarIcon />
                    {game.rating} | {game.tags ? game.tags.join(', ')[0] : ''} 
                </p>
            </div>
            {/* INDICADOR DE INSTALADO (Green Checkmark) */}
            {game.installed && (
                    <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                        <CheckIcon />
                    </div>
            )}
        </div>
    );
};


// --- COMPONENTE ActiveFilterCloseButton (SIN CAMBIOS) ---
const ActiveFilterCloseButton = ({ filterLabel, onRemove, className = '' }) => {
    return (
        <div 
            className={`flex items-center justify-center w-8 h-8 rounded-full bg-red-600 
                        transition-colors duration-200 cursor-pointer hover:bg-red-700 ${className}`}
            onClick={(e) => { e.stopPropagation(); onRemove(filterLabel); }} 
        >
             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
    );
};


// Componente de Botón de Filtro individual (con estilos de borde y hover)
// 💡 CAMBIO PRINCIPAL AQUÍ: Usamos opacity para el hover de la sombra
const FilterButton = ({ label, isActive, isGroupStart, isGroupEnd, onClick, isGroupHovered }) => {
    
    // Define las clases de estilo base
    const baseStyle = `
        flex items-center px-6 py-2 text-sm font-semibold whitespace-nowrap 
        transition-colors duration-200 cursor-pointer 
        // 🚨 CAMBIO CLAVE: Agregamos relative y una transición en opacity
        relative transition-opacity duration-200
    `;

    // Clases para color activo (Fondo red-600, Hover red-700, Texto blanco)
    const activeColors = 'bg-red-600 hover:bg-red-700 text-white border-none';
    
    // Clases para color inactivo (Fondo y Texto original)
    const inactiveColors = 'bg-[#1F2123] text-[#A0A0A0]';

    // Clases de color base (fondo, texto, y hover del ACTIVO)
    const colorClasses = isActive ? activeColors : inactiveColors;
    
    let borderColor = '#991b1b'; 
    
    if (!isActive) {
        // Usamos el color más claro (#dc2626) para la sombra y borde de un botón inactivo
        borderColor = '#dc2626'; 
    }


    // Estilos dinámicos para los botones segmentados y colores
    const dynamicStyle = {
        border: isActive ? 'none' : `1px solid ${borderColor}`,
        borderRadius: '9999px',
        borderLeft: !isActive && !isGroupStart ? 'none' : `1px solid ${borderColor}`,
        marginLeft: !isActive && !isGroupStart ? '-1px' : '0',
        
        // 🎯 SOLUCIÓN CLAVE AL JITTER: Forzar estabilidad con aceleración de hardware
        transform: 'translateZ(0)', 
        
        // 💡 CAMBIO CLAVE: Mantenemos la sombra FUERTE (opacity 0.8) CONSTANTE en inactivos.
        // El cambio de brillo se simula con la opacidad del div padre.
        boxShadow: isActive 
            ? 'none' 
            : '0 0 4px rgba(220, 38, 38, 0.8)', 
    };
    
    if (!isActive) {
        dynamicStyle.borderRadius = (isGroupStart && isGroupEnd) ? '9999px' : 
                                     isGroupStart ? '9999px 0 0 9999px' : 
                                     isGroupEnd ? '0 9999px 9999px 0' : 
                                     '0';
    }


    return (
        <div 
            className={`${baseStyle} ${colorClasses} flex items-center 
            // 🚨 APLICACIÓN DE SOLUCIÓN: Si es inactivo, iniciamos con opacidad más baja (70%) 
            // y la clase 'group-hover:opacity-100' hará el efecto de brillo sin mover el layout.
            ${!isActive ? 'opacity-70 group-hover:opacity-100' : ''}
            `}
            style={dynamicStyle}
            onClick={() => { onClick(label); }}
        >
            <span>{label}</span>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DE BÚSQUEDA/EXPLORACIÓN ---
const Search = () => {
    
    const filterGroupsDefinition = [
        ["Acción", "Aventura", "Carreras", "Deportes", "Educativos", "Estrategia", "Simulación"], 
        ["4 ★", "4.2 ★", "4.5 ★", "4.7 ★"], // Grupo 1: Calificación (Unidos)
        ["Sin anuncios", "Sin compras adicionales"], // Grupo 2: Monetización (Unidos)
        ["Un jugador", "Multijugador"], // Grupo 3: Un Jugador/Multijugador (Unidos)
        "Optimizados para PC", 
        "Ocultar no probados", 
        "Lo mejor para esta PC"
    ];
    
    const initialActiveFilters = ["Ocultar no probados"]; 
    const [activeFilters, setActiveFilters] = useState(initialActiveFilters);
    
    // Ya no es estrictamente necesario, pero lo mantenemos para el onMouseEnter/onMouseLeave
    const [hoveredGroup, setHoveredGroup] = useState(null); 

    const [isSearchFocused, setIsSearchFocused] = useState(false);
    
    const removeFilter = (filter) => {
        setActiveFilters(activeFilters.filter(f => f !== filter));
    };
    
    const toggleFilter = (filter) => {
        if (activeFilters.includes(filter)) {
            removeFilter(filter);
        } else {
            setActiveFilters([...activeFilters, filter]);
        }
    };
    
    const clearAllFilters = () => {
        setActiveFilters([]); 
    };

    const hasMultipleActiveFilters = activeFilters.length > 1;

    // Función para renderizar los grupos de filtros
    const renderFilterButtons = () => {
        let activeElements = []; 
        let inactiveElements = []; 

        activeFilters.forEach((label, index) => {
            
            const isFirstActiveElement = index === 0;
            const shouldRenderIndividualCloseButton = isFirstActiveElement && !hasMultipleActiveFilters;

            activeElements.push(
                <div key={`active-label-${label}`} className="flex mr-3 items-center">
                    
                    {shouldRenderIndividualCloseButton && (
                           <ActiveFilterCloseButton 
                                filterLabel={label} 
                                onRemove={removeFilter} 
                                className="mr-2"
                           />
                    )}

                    <FilterButton 
                        label={label} 
                        isActive={true}
                        isGroupStart={true}
                        isGroupEnd={true} 
                        onClick={toggleFilter}
                    />
                </div>
            );
        });
        
        filterGroupsDefinition.forEach((groupOrFilter) => {
            
            const members = Array.isArray(groupOrFilter) ? groupOrFilter : [groupOrFilter];
            const isActiveGroup = members.some(label => activeFilters.includes(label));
            
            if (!isActiveGroup) {
                
                if (Array.isArray(groupOrFilter)) {
                    const groupKey = groupOrFilter.toString();
                    const isGroupHovered = hoveredGroup === groupKey; 

                    const groupElements = groupOrFilter.map((label, index) => { 
                        return (
                            <FilterButton
                                key={label} 
                                label={label}
                                isActive={false}
                                isGroupStart={index === 0}
                                isGroupEnd={index === groupOrFilter.length - 1}
                                onClick={toggleFilter}
                                isGroupHovered={isGroupHovered} 
                            />
                        );
                    });
                    
                    inactiveElements.push(
                        <div 
                            key={groupKey} 
                            className="flex mr-3 group" // 👈 CAMBIO: Clase 'group' agregada
                            onMouseEnter={() => setHoveredGroup(groupKey)}
                            onMouseLeave={() => setHoveredGroup(null)}
                        >
                            {groupElements}
                        </div>
                    );
                } else if (typeof groupOrFilter === 'string') {
                    const isHovered = hoveredGroup === groupOrFilter; 
                    inactiveElements.push(
                        <div 
                            key={groupOrFilter} 
                            className="flex mr-3 group" // 👈 CAMBIO: Clase 'group' agregada
                            onMouseEnter={() => setHoveredGroup(groupOrFilter)}
                            onMouseLeave={() => setHoveredGroup(null)}
                        >
                            <FilterButton 
                                label={groupOrFilter} 
                                isActive={false}
                                isGroupStart={true}
                                isGroupEnd={true}
                                onClick={toggleFilter}
                                isGroupHovered={isHovered} 
                            />
                        </div>
                    );
                }
            }
        });

        return [...activeElements, ...inactiveElements];
    };


    return (
        // El padding superior se mantiene
        <div className="p-6 pt-8"> 
            
            {/* BARRA SUPERIOR: TÍTULO y BUSCADOR INTEGRADO */}
            <div className="flex justify-between items-center mb-10"> 
                {/* 🔒 REVERTIDO: Vuelvo a la configuración que pediste */}
                <h1 className="text-5xl font-extrabold text-white -mt-4">Explorar</h1>
                
                {/* BUSCADOR */}
                <div 
                    className={`relative flex items-center rounded-full transition-all duration-200 
                                w-80                            
                                ${isSearchFocused 
                                    ? 'bg-red-600 border border-white shadow-red-glow' 
                                    : 'bg-transparent border border-red-700 hover:border-red-500 shadow-red-sm'}` 
                                }
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    tabIndex="0" 
                    style={{ 
                        boxShadow: isSearchFocused ? '0 0 8px rgba(220, 38, 38, 0.8)' : '0 0 4px rgba(220, 38, 38, 0.4)' 
                    }}
                >
                    {/* Icono de búsqueda */}
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`w-5 h-5 absolute left-3 transition-colors duration-200 
                                    ${isSearchFocused ? 'text-white' : 'text-gray-400'}`} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    
                    {/* Input de búsqueda */}
                    <input 
                        type="text" 
                        placeholder="Buscar"
                        className={`bg-transparent pl-10 pr-4 py-2 rounded-full border-none 
                                     focus:outline-none text-base w-full                            
                                    ${isSearchFocused 
                                        ? 'text-white placeholder-white' 
                                        : 'text-white placeholder-gray-400'}`
                                    }
                    />
                </div>
            </div>
            
            {/* BARRA DE FILTROS SELECCIONABLES Y ACTIVOS */}
            <div className="flex space-x-3 mb-8 flex-wrap gap-y-4 pb-2"> 

                {/* BOTÓN 'X' GLOBAL: Solo aparece si hay más de un filtro activo */}
                {hasMultipleActiveFilters && (
                    <ActiveFilterCloseButton 
                        filterLabel="Limpiar Todo" 
                        onRemove={clearAllFilters} 
                        className="" 
                    />
                )}
                
                {renderFilterButtons()}
            </div>


            {/* SECCIÓN DE JUEGOS PRINCIPAL */}
            
            {/* CUADRÍCULA DE JUEGOS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 pt-2">
                {EXPLORER_GAMES.map((game, index) => (
                    <GameCard 
                        key={index} 
                        game={game} 
                    />
                ))}
            </div>
            
            <div className="h-10"></div>
        </div>
    );
};

export default Search;