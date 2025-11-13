    import { useState } from 'react'; 
    import { useAuth } from '../context/AuthProvider'; 
    import { useNavigate } from 'react-router-dom';
    import DownloadsPopup from '../components/DownloadsPopup';
    import FeedbackModal from '../components/FeedbackModal';

    // ----------------------------------------------------------------------
    // 1. CONSTANTES Y DATOS MOCK
    // ----------------------------------------------------------------------

    const PLACEHOLDER_IMG = "https://placehold.co/250x100/374151/FFF?text=GAME+IMAGE+FALLBACK";
    const FREEFIRE_IMAGE_PATH = '/image10.svg';
    const WUTHERING_WAVES_BANNER_IMAGE = "/image12.svg"; 
    const WUTHERING_WAVES_ICON = "/image19.svg"; 
    const FARM_HEROES_BANNER = "/image20.svg"; 

    // Datos Mock para los juegos
    const MOCK_GAMES = [
        { title: "Mobile Legends: Bang Bang", subtitle: "MOBA", rating: "4.0" },
        { title: "Wuthering Waves", subtitle: "Acción", rating: "4.5" },
        { title: "Geometry Dash Lite", subtitle: "Arcade", rating: "4.3" },
        { title: "Lichess", subtitle: "Mesa", rating: "3.8" },
        { title: "Geometry Dash SubZero", subtitle: "Arcade/SubZero", rating: "4.4" },
        { title: "Geometry Dash World", subtitle: "Arcade", rating: "4.3" },
        { title: "BombSquad", subtitle: "Fiesta", rating: "4.8" },
        { title: "Bloody Bastards", subtitle: "Acción", rating: "4.6" },
    ];

    const CASUAL_GAMES = [
        { title: "Star Chef 2: Juego culinario", subtitle: "Simulación", rating: "4.4", icon: "/image21.svg" },
        { title: "Casa Adorable", subtitle: "Simulación", rating: "4.1", icon: "/image24.svg" },
        { title: "Taonga Island Adventure: Farm", subtitle: "Farm", rating: "4.3", icon: "/image22.svg" },
        { title: "PickCrafter - Idle Craft Game", subtitle: "Simulación", rating: "4.5", icon: "/image25.svg" },
        { title: "KPop Reinas Ídolos", subtitle: "Simulación", rating: "4.5", icon: "/image23.svg" },
        { title: "¡Jumo Clicker!", subtitle: "Simulación", rating: "4.7", icon: "/image26.svg" },
    ];

    const COMPETITIVE_GAMES = [
        { title: "Clash Royale", category: "Estrategia", rating: "4.7" },
        { title: "Disney Speedstorm", category: "Carreras", rating: "4.5" },
        { title: "Mobile Legends: Bang Bang", category: "Acción", rating: "4.0" },
        { title: "Sonic Rumble", category: "Acción", rating: "4.4" },
    ];

    const TOP_GAMES = [
        { title: "Clash of Clans", category: "Estrategia", rating: "4.5" },
        { title: "Clash Royale", category: "Estrategia", rating: "4.4" },
        { title: "Epic Seven", category: "Juegos de rol", rating: "4.4" },
        { title: "Mobile Legends: Bang Bang", category: "Acción", rating: "4.8" },
        { title: "Arknights", category: "Estrategia", rating: "4.4" },
        { title: "DRAGON BALL LEGENDS", category: "Acción", rating: "4.3" },
        { title: "CookieRun: Kingdom", category: "Juegos de rol", rating: "4.8" },
        { title: "Avatar World", category: "Juegos de rol", rating: "4.7" },
    ];

    const JUST_ADDED_GAMES = [
        { title: "Blade Idle", category: "Simulación", rating: "4.4" },
        { title: "Top Eleven: Manager de Fútbol", category: "Deportes", rating: "4.6" },
        { title: "War and Magic: Kingdom Reborn", category: "Estrategia", rating: "4.4" },
    ];

    const HEROES_TIME_GAMES = [
        { title: "Eversoul", category: "Juegos de rol", rating: "4.5" },
        { title: "Summoners' War: Sky Arena", category: "Juegos de rol", rating: "4.1" },
        { title: "Journey of Monarch", category: "Juegos de rol", rating: "4.0" },
        { title: "ASTRA: Knights of Veda", category: "Juegos de rol", rating: "4.2" },
        { title: "Last Fortress: Underground", category: "Estrategia", rating: "4.0" },
        { title: "Evony - The King's Return", category: "Estrategia", rating: "4.0" },
    ];

    const PC_STRATEGY_GAMES = [
        { title: "Clash Royale", category: "Estrategia", rating: "4.4" },
        { title: "Clash of Clans", category: "Estrategia", rating: "4.5" },
        { title: "Arknights", category: "Estrategia", rating: "4.4" },
        { title: "Whiteout Survival", category: "Estrategia", rating: "4.4" },
    ];


    const GAME_COVERS = {
        // Juegos base
        "Mobile Legends: Bang Bang": "/image11.svg", 
        "Wuthering Waves": "/image12.svg", 
        "Geometry Dash Lite": "/image13.svg", 
        "Lichess": "/image14.svg", 
        "Geometry Dash SubZero": "/image15.svg", 
        "Geometry Dash World": "/image16.svg",
        "BombSquad": "/image17.svg",
        "Bloody Bastards": "/image18.svg",
        // Competitivo
        "Clash Royale": "/image27.svg",
        "Disney Speedstorm": "/image28.svg",
        "Sonic Rumble": "/image29.svg",
        // Top Games
        "Clash of Clans": "/image30.svg",
        "Epic Seven": "/image31.svg",
        "Arknights": "/image32.svg",
        "DRAGON BALL LEGENDS": "/image33.svg",
        "CookieRun: Kingdom": "/image34.svg",
        "Avatar World": "/image35.svg",
        // Just Added
        "Blade Idle": "/image36.svg",
        "Top Eleven: Manager de Fútbol": "/image37.svg",
        "War and Magic: Kingdom Reborn": "/image38.svg",
        // Heroes Time 
        "Eversoul": "/image39.svg",
        "Summoners' War: Sky Arena": "/image40.svg",
        "Journey of Monarch": "/image41.svg",
        "ASTRA: Knights of Veda": "/image42.svg", 
        "Last Fortress: Underground": "/image43.svg", 
        "Evony - The King's Return": "/image44.svg",
        // PC Strategy
        "Whiteout Survival": "/image45.svg", 
    };

    const getCasualGameIcon = (iconPath) => iconPath || PLACEHOLDER_IMG;
    const getGameImagePath = (title) => GAME_COVERS[title] || PLACEHOLDER_IMG;

    const LIBRARY_IMAGES = [
        '/image1.svg', '/image2.svg', '/image3.svg', '/image4.svg',
        '/image5.svg', '/image6.svg', '/image7.svg', '/image8.svg',
    ];


    // ----------------------------------------------------------------------
    // 2. COMPONENTES REUTILIZABLES
    // ----------------------------------------------------------------------

    const StarIcon = () => (
        <svg className="w-3 h-3 text-yellow-400 mr-1" fill="#ff9900ff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.178 3.614a1 1 0 00.95.691h3.805c.969 0 1.371 1.24.588 1.81l-3.082 2.242a1 1 0 00-.364 1.118l1.178 3.614c.3.921-.755 1.688-1.541 1.118l-3.082-2.242a1 1 0 00-1.178 0l-3.082 2.242c-.786.57-1.841-.197-1.541-1.118l1.178-3.614a1 1 0 00-.364-1.118L2.012 9.042c-.783-.57-.381-1.81.588-1.81h3.805a1 1 0 00.95-.691l1.178-3.614z"/>
        </svg>
    );


    const GameCard = ({ game, index }) => {
        const subtext = game.subtitle || game.category;
        const gameImagePath = getGameImagePath(game.title);

        return (
            <div className="rounded-xl overflow-hidden cursor-pointer transform hover:scale-[1.03] transition duration-200 shadow-xl bg-gray-900/50">
                <div className="relative w-full aspect-[4/3]"> 
                    <img 
                        src={gameImagePath} 
                        alt={`Carátula de ${game.title}`} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}
                    />

                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                        <h3 className="text-sm font-bold truncate">{game.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center">
                            <StarIcon />
                            {game.rating} | {subtext}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const GameListItem = ({ game }) => (
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition duration-150 cursor-pointer">
            <img src={getCasualGameIcon(game.icon)} alt={game.title} className="w-10 h-10 rounded-lg object-cover" onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}/>
            
            <div className="flex-grow">
                <p className="text-sm font-semibold text-white truncate">{game.title}</p>
                <div className="flex items-center text-xs text-gray-400 mt-0.5">
                    <StarIcon />
                    {game.rating} | {game.subtitle}
                </div>
            </div>
        </div>
    );


    // ----------------------------------------------------------------------
    // 3. SECCIONES DE LA PÁGINA (PÁGINA HOME)
    // ----------------------------------------------------------------------

    const CategoryGrid = () => (
        <div className="pt-6 mb-10">
            <h2 className="text-2xl font-bold mb-5 pt-0">Vivir en una simulación</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="relative col-span-1 bg-[#1F2123] rounded-2xl p-6 shadow-2xl overflow-hidden h-70">
                    
                    <div className="relative z-10 flex flex-col justify-start">
                        <p className="text-2xl font-bold text-white mb-2">Farm Heroes Saga</p>
                        <div className="flex items-center text-sm text-gray-400">
                            4.6 <span className="ml-1 mr-2">★</span> | Casuales
                        </div>
                    </div>

                    <div className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: `url(${FARM_HEROES_BANNER})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100%', 
                            backgroundPosition: '50% 50%',
                            clipPath: 'polygon(40% 0%, 100% 0%, 100% 100%, 25% 100%)',
                        }}
                    ></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1F2123] to-transparent z-0"
                        style={{ clipPath: 'polygon(0% 0%, 0% 100%, 25% 100%, 0% 100%)' }}
                    ></div>

                </div>

                <div className="bg-[#1F2123] rounded-2xl p-6 shadow-2xl">
                    <h3 className="text-2xl font-bold text-white mb-12">Experiencias envolventes</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {CASUAL_GAMES.map((game, index) => (
                            <GameListItem key={index} game={game} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const CompetitiveSection = () => (
        <div className="pt-6 mb-10">
            <h2 className="text-2xl font-bold mb-5 pt-0">Saca tu lado competitivo</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {COMPETITIVE_GAMES.map((game, index) => (
                    <GameCard 
                        key={index} 
                        game={game} 
                        index={index} 
                    />
                ))}
            </div>
        </div>
    );

    const TopGamesSection = () => (
        <div className="pt-6 mb-10">
            <h2 className="text-2xl font-bold mb-5 pt-0">Top games</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {TOP_GAMES.map((game, index) => (
                    <GameCard 
                        key={index} 
                        game={game} 
                        index={index} 
                    />
                ))}
            </div>
        </div>
    );

    const JustAddedSection = () => (
        <div className="pt-6 mb-10">
            <h2 className="text-2xl font-bold mb-5 pt-0">Just added</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {JUST_ADDED_GAMES.map((game, index) => (
                    <GameCard 
                        key={index} 
                        game={game} 
                        index={index} 
                    />
                ))}
            </div>
        </div>
    );

    const HeroesTimeSection = () => (
        <div className="pt-6 mb-10">
            <h2 className="text-2xl font-bold mb-5 pt-0">Es la hora de los héroes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {HEROES_TIME_GAMES.map((game, index) => (
                    <GameCard 
                        key={index} 
                        game={game} 
                        index={index} 
                    />
                ))}
            </div>
        </div>
    );

    const PCStrategyGamesSection = () => (
        <div className="pt-6 mb-10">
            <h2 className="text-2xl font-bold mb-5 pt-0">Juegos de estrategia optimizados para PC</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {PC_STRATEGY_GAMES.map((game, index) => (
                    <GameCard 
                        key={index} 
                        game={game} 
                        index={index} 
                    />
                ))}
            </div>
        </div>
    );

    // --- COMPONENTE DE SECCIÓN 'CallToActionBanner' (CON CLASES TAILWIND PERSONALIZADAS) ---
    const CallToActionBanner = () => {
        // Usamos el color definido en tailwind.config.js
        const NEON_COLOR = '#FF0000'; 
        
        return (
            <div className="p-0 pt-10 mb-10">
                <div 
                    // APLICAMOS LAS NUEVAS CLASES PERSONALIZADAS
                    className="relative bg-[#121212] text-white rounded-[4rem] p-10 md:p-20 overflow-hidden 
                            flex items-center justify-start " // <-- CLASES CLAVE DE TAILWIND
                    style={{
                        // El borde y el filtro drop-shadow se combinan con el shadow-neon-border
                        border: `1px solid ${NEON_COLOR}`, 
                        filter: `drop-shadow(0 0 0px rgba(255, 0, 0, 1))`,
                    }}
                >
                    {/* Capa de fondo para profundidad (opcional) */}
                    <div 
                        className="absolute inset-0 opacity-50 pointer-events-none" 
                        style={{
                            background: `radial-gradient(circle at 100% 0%, rgba(255, 0, 0, 1), transparent 50%)`,
                            mixBlendMode: 'screen',
                        }}
                    />

                    {/* Contenido del Texto y Botón */}
                    <div className="relative z-10 max-w-2xl">
                        <p className="text-sm text-gray-400 mb-2">Encuentra tu nuevo juego favorito</p>
                        <h2 className="text-5xl md:text-6xl font-black leading-tight mb-8">
                            Consulta todos <br/>nuestros juegos
                        </h2>
                        
                        {/* Botón 'Ver' */}
                        <button 
                            className="px-8 py-3 text-lg font-bold rounded-xl transition duration-300 
                                    text-white bg-[--neon-cyan]" // Usamos el color si Tailwind no lo procesa directamente
                            style={{
                                backgroundColor: NEON_COLOR, // Usamos la variable para asegurar
                                boxShadow: `0 0 15px ${NEON_COLOR}, 0 0 30px ${NEON_COLOR}`,
                            }}
                        >
                            Ver
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    // ----------------------------------------------------------------------
    // 4. OTROS COMPONENTES Y MAINPAGE
    // ----------------------------------------------------------------------

    const FeaturedBanner = () => (
        <div className="bg-[#1F2123] rounded-2xl shadow-2xl p-6 md:p-10 mt-20 mb-10 overflow-hidden relative border border-gray-900 h-90">
            <div className="grid grid-cols-5 h-full">
                <div className="col-span-3 flex flex-col justify-center relative z-10">
                    <p className="text-xs text-gray-400 mb-1">Kuro Games</p>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                        Sé el héroe de un<br />nuevo amanecer
                    </h1>
                    
                    <div className="flex items-center space-x-3 mb-4">
                        <img src={WUTHERING_WAVES_ICON} alt="Wuthering Waves Icon" className="w-10 h-10 rounded-lg object-cover" onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}/>
                        <div>
                            <p className="text-base font-bold text-white leading-none">Wuthering Waves</p>
                            <p className="text-xs text-gray-400">Juegos de rol</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                        <div className="flex flex-col items-start justify-center">
                            <div className="flex items-center text-sm font-bold text-white">
                                <StarIcon />
                                4.5 <span className="ml-1 text-gray-500">★</span>
                            </div>
                            <p className="text-gray-500 mt-1">131 mil reseñas</p> 
                        </div>

                        <div className="flex flex-col items-start justify-center">
                            <div className="text-sm font-bold text-white">
                                1M+
                            </div>
                            <p className="text-gray-500 mt-1">Descargas</p>
                        </div>

                        <div className="flex flex-col items-start justify-center">
                            <div className="text-sm font-bold text-white">
                                <div className="border border-gray-500 text-gray-400 p-0.5 rounded-sm">
                                    13+
                                </div>
                            </div>
                            <p className="text-gray-500 mt-1">Para mayores de 13 años</p>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                        [Campo Comandante] Robadon! Urek Mazino <br />
                        Invocación de llegada devuelve.
                    </p>

                </div>

                <div className="col-span-2 relative h-full overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-cover bg-center" 
                        style={{ 
                            backgroundImage: `url(${WUTHERING_WAVES_BANNER_IMAGE})`, 
                            clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        }}
                        onError={(e) => { e.target.onerror = null; e.target.style.backgroundImage = `url(${PLACEHOLDER_IMG})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-l from-black/5"></div>
                </div>
            </div>
        </div>
    );

    const FreeFireDiscountCard = () => {
        const NEON_COLOR = '#FF0000'; 

            return (
                <>
                    <style jsx="true">{`
                        @keyframes float {
                            0% { transform: translateY(0px); }
                            50% { transform: translateY(-8px); }
                            100% { transform: translateY(0px); }
                        }

                        .floating-image {
                            animation: float 4s ease-in-out infinite;
                        }
                    `}</style>

                    <div className="bg-[#1F2123] rounded-2xl shadow-2xl p-6 md:p-10 mb-10 overflow-hidden relative border border-gray-900">
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            <div className="col-span-2 space-y-3 pr-4">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                                    Obtén 15% de descuento en<br /><span style={{ color: NEON_COLOR }}>Free FireMax para PC</span>
                                </h1>
                                
                                <button 
                                    className={`px-6 py-2 mt-4 text-sm font-semibold rounded-lg transition duration-200 
                                        border-2 border-transparent text-white
                                        hover:bg-opacity-10`}
                                    style={{ 
                                        borderColor: NEON_COLOR,
                                        boxShadow: `0 0 10px ${NEON_COLOR}, inset 0 0 5px ${NEON_COLOR}`,
                                        backgroundColor: 'transparent',
                                    }}
                                >
                                    Guardar
                                </button>

                                <p className="text-xs text-gray-400 pt-2">
                                    Hasta S/ 55 de ahorro. Aplica el descuento a más tardar el 18 de noviembre de 2025.
                                </p>
                            </div>

                            <div className="col-span-1 flex justify-center items-center relative min-h-[150px]">
                                <div className="p-1 rounded-xl floating-image" 
                                    style={{
                                        backgroundImage: `linear-gradient(45deg, ${NEON_COLOR} 0%, #FF4500 100%)`, 
                                        filter: `drop-shadow(0 0 10px ${NEON_COLOR})`,
                                    }}
                                >
                                    <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
                                        <div className="absolute top-2 right-2 p-1.5 bg-gray-800/80 backdrop-blur-sm rounded-full"
                                            style={{ boxShadow: `0 0 5px ${NEON_COLOR}` }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NEON_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor-dot"><circle cx="12" cy="12" r="1"/><rect width="20" height="15" x="2" y="3" rx="2"/><path d="M12 19v3"/><path d="M5 22h14"/></svg>
                                        </div>

                                        <img 
                                            src={FREEFIRE_IMAGE_PATH} 
                                            alt="Personajes de Free Fire Max" 
                                            className="w-full h-auto object-cover max-h-48 md:max-h-64 rounded-xl"
                                            onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
    }

    const LibraryPage = () => {
        const FULL_LIBRARY_IMAGES = [
            '/image1.svg', '/image2.svg', '/image3.svg', '/image4.svg',
            '/image5.svg', '/image6.svg', '/image7.svg', '/image8.svg',
            '/image9.svg', '/image10.svg', '/image11.svg', '/image12.svg',
            '/image13.svg', '/image14.svg', '/image15.svg', '/image16.svg', 
        ];

        return (
            <div className="p-6 h-full flex flex-col">
                <h2 className="text-3xl font-bold mb-4 text-white">De tu biblioteca</h2>
                <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                    {FULL_LIBRARY_IMAGES.map((src, i) => (
                        <div key={i} className="flex-1 min-h-0 w-full rounded-lg overflow-hidden shadow-xl cursor-pointer hover:opacity-90 transition duration-200">
                            <img 
                                src={src} 
                                alt={`Juego ${i + 1}`} 
                                className="w-full h-full" 
                                onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

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
        const { logout } = useAuth(); 
        const navigate = useNavigate(); 
        const [activeSection, setActiveSection] = useState('home'); 
        const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
        const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

        const handleLogout = () => {
            logout();
            navigate('/');
        };

        const handleViewDetails = () => console.log("¡Navegando a los detalles de Free Fire Max!");
        const handleAvisosClick = () => console.log("Abrir Vista de Avisos/Notificaciones.");
        const handleDownloadsClick = () => setIsDownloadsOpen(!isDownloadsOpen);
        const handleFeedbackClick = () => setIsFeedbackOpen(true);

        const renderContent = () => {
            switch (activeSection) {
                case 'search': return <SearchPage />;
                case 'games': return <GamesPage />;
                case 'library': return <LibraryPage />;
                default:
                    return (
                        <div className="p-7 pt-20">
                            <FreeFireDiscountCard /> 
                            
                            <h2 className="text-2xl font-bold mb-5 pt-6">Recomendados para ti</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-10">
                                {MOCK_GAMES.map((game, index) => (
                                    <GameCard key={index} game={game} index={index} />
                                ))}
                            </div>

                            <FeaturedBanner /> 
                            <CategoryGrid />
                            <CompetitiveSection /> 
                            <TopGamesSection /> 
                            <JustAddedSection />
                            <HeroesTimeSection />
                            <PCStrategyGamesSection /> 
                            
                            <CallToActionBanner /> 
                            
                            <div className="h-0"></div>
                        </div>
                    );
            }
        };

        const getIconClass = (section) => (
            activeSection === section ? 'text-red-500' : 'text-white hover:text-gray-400 active:text-gray-600'
        );

        return (
            <div className="h-screen bg-[#1F2123] text-white font-sans overflow-hidden relative">
                <div className="grid grid-cols-[90px_1fr_250px] h-full"> 
                    
                    <div className="bg-[#1F2123] pt-4 pb-4 flex flex-col items-center border-r border-gray-800 h-full relative">
                        
                        <div className="flex flex-col items-center mb-8" onClick={handleLogout}>
                            <div className="h-10 w-10 bg-yellow-500 rounded-full cursor-pointer transform hover:scale-110 transition duration-150"></div>
                        </div>

                        <div className="space-y-8"> 
                            <div className={getIconClass('home') + ' cursor-pointer p-1 rounded-md'} onClick={() => setActiveSection('home')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9.5L12 3l9 6.5V21h-6v-6H9v6H3V9.5z"/></svg>
                            </div>
                            <div className={getIconClass('library') + ' cursor-pointer p-1 rounded-md'} onClick={() => setActiveSection('library')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            </div>
                            <div className={getIconClass('search') + ' cursor-pointer p-1 rounded-md'} onClick={() => setActiveSection('search')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                        </div>

                        <div className="flex-grow"></div> 

                        <div className="space-y-8 mb-4">
                            <div className="text-white hover:text-gray-400 cursor-pointer p-1 rounded-md" onClick={handleAvisosClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.37 21a2 2 0 0 0 3.26 0"/></svg>
                            </div>

                            <div className="download-icon text-white hover:text-gray-400 cursor-pointer p-1 rounded-md relative" onClick={handleDownloadsClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            </div>

                            <div className="text-white hover:text-gray-400 cursor-pointer p-1 rounded-md" onClick={handleFeedbackClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            </div>
                        </div>

                        <DownloadsPopup isOpen={isDownloadsOpen} onClose={() => setIsDownloadsOpen(false)} />
                        <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
                    </div>

                    <div className="bg-[#121212] overflow-y-auto h-full">
                        <header className="p-6 pb-2 sticky top-0 z-30 bg-[#121212]">
                            <input 
                                type="text" 
                                placeholder="Buscar juegos y contenido..."
                                className="w-full bg-[#2B2D30] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                            />
                        </header>

                        {activeSection === 'home' && (
                            <div className="relative bg-[#1F2123] h-96 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#1f2123] via-black to-[#ff0000] opacity-80"></div>
                                <div className="absolute right-0 top-0 h-full w-[70%] bg-cover bg-center [clip-path:polygon(20%_0%,_100%_0%,_100%_100%,_0%_100%)]"
                                    style={{ backgroundImage: "url('/image9.svg')" }}>
                                </div>
                                <div className="relative z-10 p-10 max-w-xl h-full flex flex-col justify-end">
                                    <h2 className="text-5xl font-black mb-3 text-[#FF0000]">FREE FIRE MAX</h2> 
                                    <h3 className="text-xl font-semibold text-gray-300">Sobrevive y domina en el campo de batalla</h3>
                                    <p className="text-xs text-gray-400 mt-2">Free Fire Max | Garena International</p>
                                    <div className="mt-6">
                                        <button 
                                            onClick={handleViewDetails}
                                            className="px-6 py-2 bg-[#FF0000] text-white font-bold rounded-lg hover:bg-red-800 transition duration-150"
                                        >
                                            Ver detalles
                                        </button>
                                        <p className="text-xs text-gray-500 mt-2">Contiene anuncios · Compras directas desde la app</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="p-6 pt-0">
                            {renderContent()}
                        </div>
                    </div>

                    <div className="bg-[#1F2123] px-2 py-4 border-l border-gray-800 h-full"> 
                        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 mx-2 text-red-500">En tu biblioteca</h3>
                        <div className="space-y-3 px-2"> 
                            {LIBRARY_IMAGES.map((src, i) => (
                                <div key={i} className="cursor-pointer transform hover:scale-[1.05] transition duration-200 shadow-lg mx-auto">
                                    <div className="w-full h-24 rounded-lg overflow-hidden shadow-lg"> 
                                        <img 
                                            src={src} 
                                            alt={`Carátula del juego ${i + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default MainPage;