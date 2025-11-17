import React, { useState, useMemo } from 'react';

// NOTA: El requisito de "máximo 24 juegos por categoría" se interpreta aquí como
// "exactamente 24 juegos por cada categoría de género (Acción, Estrategia, etc.)" para asegurar densidad.

const PLACEHOLDER_IMG = "https://placehold.co/250x100/374151/FFF?text=GAME+IMAGE+FALLBACK";

// --- DEFINICIÓN DE CATEGORÍAS Y JUEGOS BASE (24 ÚNICOS) ---

// 1. Las 8 categorías de género que deben tener 24 juegos cada una.
const GAME_GENRE_CATEGORIES = [
    "Acción", 
    "Aventura", 
    "Carreras", 
    "Deportes", 
    "Educativos", 
    "Estrategia", 
    "Simulación", 
    "Juegos de rol"
];

// 2. Base de 24 juegos con propiedades variadas (se clonarán 8 veces).
const BASE_24_GAMES = [
    { title: "Clash Royale", rating: "4.7", installed: true, tags: ["Multijugador", "Sin anuncios"], image: "/image27.svg" },
    { title: "Clash of Clans", rating: "4.5", installed: true, tags: ["Multijugador", "Sin compras adicionales"], image: "/image30.svg" },
    { title: "CookieRun: Kingdom", rating: "4.8", installed: false, tags: ["Un jugador", "Sin compras adicionales"], image: "/image34.svg" },
    { title: "Mobile Legends: BB", rating: "4.0", installed: true, tags: ["Multijugador"], image: "/image11.svg" },
    { title: "Arknights", rating: "4.4", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image32.svg" },
    { title: "DRAGON BALL LEGENDS", rating: "4.3", installed: true, tags: ["Multijugador"], image: "/image33.svg" },
    { title: "Epic Seven", rating: "4.4", installed: false, tags: ["Un jugador"], image: "/image31.svg" },
    { title: "Sonic Rumble", rating: "4.4", installed: true, tags: ["Multijugador"], image: "/image29.svg" },
    { title: "Star Wars: GoH", rating: "4.2", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image35.svg" },
    { title: "Candy Crush Saga", rating: "4.5", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image36.svg" },
    { title: "Pokémon GO", rating: "4.7", installed: false, tags: ["Multijugador"], image: "/image37.svg" },
    { title: "Final Fantasy BE", rating: "4.3", installed: false, tags: ["Un jugador", "Optimizados para PC"], image: "/image38.svg" },
    { title: "Asphalt 9", rating: "4.7", installed: false, tags: ["Multijugador"], image: "/image39.svg" },
    { title: "Real Racing 3", rating: "4.4", installed: true, tags: ["Un jugador"], image: "/image40.svg" },
    { title: "The Sims Mobile", rating: "4.3", installed: true, tags: ["Un jugador", "Sin compras adicionales"], image: "/image41.svg" },
    { title: "Minecraft", rating: "4.8", installed: true, tags: ["Multijugador", "Sin compras adicionales"], image: "/image42.svg" },
    { title: "Subway Surfers", rating: "4.5", installed: true, tags: ["Un jugador", "Sin anuncios"], image: "/image43.svg" },
    { title: "Temple Run 2", rating: "4.2", installed: false, tags: ["Un jugador"], image: "/image44.svg" },
    { title: "FIFA Mobile", rating: "4.6", installed: true, tags: ["Multijugador"], image: "/image45.svg" },
    { title: "NBA 2K Mobile", rating: "4.3", installed: false, tags: ["Multijugador"], image: "/image46.svg" },
    { title: "Brain Test", rating: "4.5", installed: false, tags: ["Un jugador", "Sin anuncios"], image: "/image47.svg" },
    { title: "Call of Duty Mobile", rating: "4.7", installed: false, tags: ["Multijugador", "Optimizados para PC"], image: "/image48.svg" },
    { title: "PUBG Mobile", rating: "4.2", installed: true, tags: ["Multijugador", "Optimizados para PC"], image: "/image49.svg" },
    { title: "Free Fire", rating: "4.5", installed: false, tags: ["Multijugador"], image: "/image50.svg" },
];

// --- GENERACIÓN DEL CONJUNTO DE DATOS FINAL (8 categorías x 24 juegos = 192 JUEGOS) ---
const ALL_GAMES = [];

GAME_GENRE_CATEGORIES.forEach(category => {
    BASE_24_GAMES.forEach((baseGame) => {
        // Clonar el juego base y asignarle la categoría y un título dinámico
        const newGame = {
            ...baseGame,
            category: category,
            // Ejemplo de título: "Clash Royale (A)" o "Clash Royale (E)"
            title: `${baseGame.title} (${category.substring(0, 1)})`, 
        };
        ALL_GAMES.push(newGame);
    });
});

const getGameImagePath = (title, imagePath) => imagePath || PLACEHOLDER_IMG;


// --- COMPONENTES AUXILIARES ---

// MODIFICACIÓN: StarIcon con color naranja predeterminado
const StarIcon = ({ className = '', fill = '#ff9900' }) => (
    <svg className={`w-3 h-3 ${className}`} fill={fill} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.178 3.614a1 1 0 00.95.691h3.805c.969 0 1.371 1.24.588 1.81l-3.082 2.242a1 1 0 00-.364 1.118l1.178 3.614c.3.921-.755 1.688-1.541 1.118l-3.082-2.242a1 1 0 00-1.178 0l-3.082 2.242c-.786.57-1.841-.197-1.541-1.118l1.178-3.614a1 1 0 00-.364-1.118L2.012 9.042c-.783-.57-.381-1.81.588-1.81h3.805a1 1 0 00.95-.691l1.178-3.614z"/>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9.5l-8 8z"/></svg>
);

const GameCard = ({ game }) => {
    // Usamos game.image directamente ya que el título es dinámico.
    const gameImagePath = getGameImagePath(game.title, game.image); 

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
            {/* Contenedor del texto debajo de la imagen */}
            <div className="p-3 text-white">
                <h3 className="text-base font-semibold truncate">{game.title}</h3>
                {/* Se muestra el rating y la categoría */}
                <p className="text-xs text-gray-400 mt-0.5 flex items-center">
                    {game.rating} 
                    <StarIcon className="ml-1" />
                    <span className="mx-1">|</span>
                    {/* Muestra la categoría del juego */}
                    <span className="text-gray-300 font-medium">{game.category}</span>
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


// --- COMPONENTES DE FILTRO (Sin cambios en lógica/estilo) ---
const ActiveFilterCloseButton = ({ onRemove, className = '' }) => {
    return (
        <div 
            // Se usa el mismo estilo del componente de filtro, pero sin etiqueta, simulando un botón "Limpiar Todo"
            className={`flex items-center justify-center w-8 h-8 rounded-full bg-red-600 
                        transition-colors duration-200 cursor-pointer hover:bg-red-700 ${className}`}
            onClick={(e) => { e.stopPropagation(); onRemove(); }} // Llama a onRemove sin argumento para limpiar todo
        >
             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
    );
};

const FilterButton = ({ label, isActive, isGroupStart, isGroupEnd, onClick }) => { 
    
    const baseStyle = `
        flex items-center px-6 py-2 text-sm font-semibold whitespace-nowrap 
        transition-colors duration-200 cursor-pointer 
        relative
    `;

    const activeColors = 'bg-red-600 hover:bg-red-700 text-white border-none';
    const inactiveColors = 'bg-[#1F2123] text-white'; 

    const colorClasses = isActive ? activeColors : inactiveColors;
    
    let borderColor = '#991b1b'; 
    if (!isActive) {
        borderColor = '#dc2626'; 
    }

    const dynamicStyle = {
        border: isActive ? 'none' : `1px solid ${borderColor}`,
        borderRadius: '9999px',
        borderLeft: !isActive && !isGroupStart ? 'none' : `1px solid ${borderColor}`,
        marginLeft: !isActive && !isGroupStart ? '-1px' : '0',
        
        transform: 'translateZ(0)', 
        
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

    const hasStarInLabel = label.includes('★'); 
    const textWithoutStar = hasStarInLabel ? label.replace('★', '').trim() : label;


    return (
        <div 
            className={`${baseStyle} ${colorClasses} flex items-center group
            ${!isActive ? 'opacity-70 group-hover:opacity-100' : ''}
            `}
            style={dynamicStyle}
            onClick={() => { onClick(label); }}
        >
            {/* SPAN para el texto (primero) */}
            <span className={!isActive ? 'hover:text-[#A0A0A0] transition-colors duration-200' : ''}>
                {textWithoutStar} 
            </span>

            {/* ICONO DE ESTRELLA CONDICIONAL (después del texto) */}
            {hasStarInLabel && (
                <StarIcon className="ml-1" fill="#ff9900" />
            )}
            
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DE BÚSQUEDA/EXPLORACIÓN ---
const Search = () => {
    
    // 3. Definición de filtros (Grupos para la lógica)
    const filterGroupsDefinition = {
        // FILTROS DE CATEGORÍA DE GÉNERO (Lógica OR - Acumulativa)
        genre: GAME_GENRE_CATEGORIES,
        
        // OTROS FILTROS (Lógica aplicada individualmente)
        rating: ["4 ★", "4.2 ★", "4.5 ★", "4.7 ★"], 
        monetization: ["Sin anuncios", "Sin compras adicionales"], 
        players: ["Un jugador", "Multijugador"],
        system: ["Optimizados para PC", "Lo mejor para esta PC"],
        status: ["Ocultar no probados"], 
    };
    
    // 4. Definición del orden de los grupos para el renderizado (basado en la imagen)
    const filterGroupsRenderDefinition = [
        filterGroupsDefinition.status[0],
        filterGroupsDefinition.genre,
        filterGroupsDefinition.rating,
        filterGroupsDefinition.monetization[0],
        filterGroupsDefinition.monetization[1],
        filterGroupsDefinition.players,
        filterGroupsDefinition.system[0],
        filterGroupsDefinition.system[1]
    ];
    
    const initialActiveFilters = ["Ocultar no probados"]; 
    const [activeFilters, setActiveFilters] = useState(initialActiveFilters);
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
    
    // Función para limpiar todos los filtros
    const clearAllFilters = () => { setActiveFilters([]); };

    // --- LÓGICA DE FILTRADO DINÁMICO Y ACUMULATIVO (useMemo) ---
    const getFilteredGames = useMemo(() => {
        // 1. Pre-filtrado por Categoría de Género (Lógica OR - Acumulativa)
        const genreFilters = activeFilters.filter(f => filterGroupsDefinition.genre.includes(f));
        const nonGenreFilters = activeFilters.filter(f => !filterGroupsDefinition.genre.includes(f));
        
        let filteredByGenre = ALL_GAMES;
        if (genreFilters.length > 0) {
            filteredByGenre = ALL_GAMES.filter(game => 
                genreFilters.includes(game.category)
            );
        }

        // 2. Aplicar los demás filtros (Tags, Status, Rating)
        let finalFilteredGames = filteredByGenre.filter(game => {
            
            // a. Filtro "Ocultar no probados" (AND lógico)
            if (activeFilters.includes("Ocultar no probados") && !game.installed) {
                return false;
            }

            // b. Filtros de Rating (AND lógico: Aplicar el rating MÁS restrictivo (el más alto))
            const activeRatingFilters = nonGenreFilters
                .filter(f => filterGroupsDefinition.rating.includes(f))
                .map(f => parseFloat(f.split(' ')[0])); 

            if (activeRatingFilters.length > 0) {
                const requiredRating = Math.max(...activeRatingFilters); 
                const gameRating = parseFloat(game.rating);
                if (gameRating < requiredRating) {
                    return false;
                }
            }


            // c. Otros filtros de Tags (Monetización, Jugadores, Sistema)
            const tagFilters = nonGenreFilters.filter(f => 
                filterGroupsDefinition.monetization.includes(f) || 
                filterGroupsDefinition.players.includes(f) ||
                filterGroupsDefinition.system.includes(f)
            );

            if (tagFilters.length > 0) {
                // Aplicamos lógica OR a los tags: el juego debe tener AL MENOS UNO de los tags activos.
                const gameTags = game.tags || [];
                const hasAnyTag = tagFilters.some(requiredTag => gameTags.includes(requiredTag));
                
                if (!hasAnyTag) {
                    return false;
                }
            }
            
            return true;
        });

        // 🚨 LÓGICA DE RESPALDO (FALLBACK) CRÍTICA: Garantiza que la cuadrícula nunca esté vacía.
        if (finalFilteredGames.length === 0 && activeFilters.length > 0) {
            // Si el resultado es cero, volvemos al conjunto más grande posible:
            // los juegos filtrados solo por Categoría de Género (o todos si no se eligió ninguna).
            return filteredByGenre; 
        }

        return finalFilteredGames;

    }, [activeFilters]); 

    // Función para renderizar los grupos de filtros
    const renderFilterButtons = () => {
        let activeElements = []; 
        let inactiveElements = []; 
        
        
        // 🚨 CAMBIO DE MARGEN AQUÍ: Se reduce de mr-3 a mr-1.
        if (activeFilters.length > 0) {
            activeElements.push(
                <div key="global-clear-button" className="flex mr-1 items-center"> 
                    <ActiveFilterCloseButton onRemove={clearAllFilters} className="" />
                </div>
            );
        }

        // Renderizamos los filtros activos (botones rojos) después del botón "Limpiar Todo"
        const renderedActiveLabels = new Set();
        
        activeFilters.forEach((label) => {
            if (!renderedActiveLabels.has(label)) {
                 activeElements.push(
                    <div key={`active-label-${label}`} className="flex mr-3 items-center">
                        {/* El botón 'X' individual se ha eliminado, solo queda el global */}
                        <FilterButton 
                            label={label} 
                            isActive={true}
                            isGroupStart={true}
                            isGroupEnd={true} 
                            onClick={toggleFilter}
                        />
                    </div>
                );
                renderedActiveLabels.add(label);
            }
        });
        
        // Luego, renderizamos los filtros inactivos (botones grises)
        filterGroupsRenderDefinition.forEach((groupOrFilter) => {
            
            const members = Array.isArray(groupOrFilter) ? groupOrFilter : [groupOrFilter];
            const isActiveGroup = members.some(label => activeFilters.includes(label));
            
            if (!isActiveGroup) {
                
                if (Array.isArray(groupOrFilter)) {
                    // Renderizar grupo de botones
                    const groupKey = members.join('-'); 

                    const groupElements = members.map((label, index) => { 
                        if (!activeFilters.includes(label)) {
                            return (
                                <FilterButton
                                    key={label} 
                                    label={label}
                                    isActive={false}
                                    isGroupStart={index === 0}
                                    isGroupEnd={index === members.length - 1}
                                    onClick={toggleFilter}
                                />
                            );
                        }
                        return null;
                    }).filter(Boolean); 

                    if(groupElements.length > 0) {
                        inactiveElements.push(
                            <div 
                                key={groupKey} 
                                className="flex mr-3 group" 
                            >
                                {groupElements}
                            </div>
                        );
                    }
                } else if (typeof groupOrFilter === 'string' && !activeFilters.includes(groupOrFilter)) {
                    // Renderizar botón individual (si no está activo)
                    inactiveElements.push(
                        <div 
                            key={groupOrFilter} 
                            className="flex mr-3 group" 
                        >
                            <FilterButton 
                                label={groupOrFilter} 
                                isActive={false}
                                isGroupStart={true}
                                isGroupEnd={true}
                                onClick={toggleFilter}
                            />
                        </div>
                    );
                }
            }
        });

        return [...activeElements, ...inactiveElements];
    };


    return (
        <div className="p-6 pt-8 bg-[#111] min-h-screen"> 
            
            {/* BARRA SUPERIOR: TÍTULO y BUSCADOR INTEGRADO */}
            <div className="flex justify-between items-center mb-10"> 
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
                
                {renderFilterButtons()}
            </div>


            {/* SECCIÓN DE JUEGOS PRINCIPAL */}
            
            {/* CUADRÍCULA DE JUEGOS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 pt-2">
                {getFilteredGames.map((game, index) => (
                    <GameCard 
                        key={index} 
                        game={game} 
                    />
                ))}
            </div>
            
            {/* Mensaje si no hay juegos */}
            {getFilteredGames.length === 0 && (
                <div className="text-center p-20 text-gray-400 text-xl font-semibold">
                    No se encontraron juegos que coincidan con los filtros seleccionados.
                </div>
            )}
            
            <div className="h-10"></div>
        </div>
    );
};

export default Search;