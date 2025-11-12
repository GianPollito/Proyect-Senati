import React, { useState } from 'react'; 
import { useAuth } from '../context/AuthProvider'; 
import { useNavigate } from 'react-router-dom';
import DownloadsPopup from '../components/DownloadsPopup';
import FeedbackModal from '../components/FeedbackModal';

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

const GAME_COVERS = {
    "Mobile Legends: Bang Bang": "/image11.svg", 
    "Wuthering Waves": "/image12.svg", 
    "Geometry Dash Lite": "/image13.svg", 
    "Lichess": "/image14.svg", 
    "Geometry Dash SubZero": "/image15.svg", 
    "Geometry Dash World": "/image16.svg",
    "BombSquad": "/image17.svg",
    "Bloody Bastards": "/image18.svg",
};

const WUTHERING_WAVES_COVER = "https://images.unsplash.com/photo-1627916694663-7e4e0d9b4c0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Función para obtener la ruta de la imagen, con fallback a PLACEHOLDER_IMG si no está mapeada.
const getGameImagePath = (title) => GAME_COVERS[title] || PLACEHOLDER_IMG;

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

const PLACEHOLDER_IMG = "https://placehold.co/250x100/374151/FFF?text=GAME+IMAGE+FALLBACK";
const FREEFIRE_IMAGE_PATH = '/image10.svg';

const WUTHERING_WAVES_BANNER_IMAGE = "/image12.svg"; // <--- Tu imagen grande (image12.svg)
const WUTHERING_WAVES_ICON = "/image19.svg"; // <--- Tu imagen pequeña (image19.svg)

const GameCard = ({ game, index }) => {
    const gameImagePath = getGameImagePath(game.title);

    return (
        <div className="rounded-xl overflow-hidden cursor-pointer transform hover:scale-[1.03] transition duration-200 shadow-xl bg-gray-900/50">
            {/* Contenedor de la Imagen: Usamos aspect-[4/3] para el formato de carátula */}
            <div className="relative w-full aspect-[4/3]"> 
                <img 
                    src={gameImagePath} 
                    alt={`Carátula de ${game.title}`} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}
                />

                {/* Overlay Degradado en la parte inferior para legibilidad del texto */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                {/* Texto de Subtítulo y Rating */}
                <div className="absolute bottom-0 left-0 p-3 text-white">
                    <h3 className="text-sm font-bold truncate">{game.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center">
                        {/* INICIO DEL CÓDIGO DE LA ESTRELLA */}
                        <svg className="w-3 h-3 text-yellow-400 mr-1" fill="#ff9900ff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.178 3.614a1 1 0 00.95.691h3.805c.969 0 1.371 1.24.588 1.81l-3.082 2.242a1 1 0 00-.364 1.118l1.178 3.614c.3.921-.755 1.688-1.541 1.118l-3.082-2.242a1 1 0 00-1.178 0l-3.082 2.242c-.786.57-1.841-.197-1.541-1.118l1.178-3.614a1 1 0 00-.364-1.118L2.012 9.042c-.783-.57-.381-1.81.588-1.81h3.805a1 1 0 00.95-.691l1.178-3.614z"/>
                        </svg>
                        {/* FIN DEL CÓDIGO DE LA ESTRELLA */}
                        {game.rating} | {game.subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FeaturedBanner = () => (
    <div className="bg-[#1F2123] rounded-2xl shadow-2xl p-6 md:p-10 mt-10 mb-10 overflow-hidden relative border border-gray-900 h-45">
        <div className="grid grid-cols-5 h-full">
            {/* Lado Izquierdo: Texto y Detalles */}
            <div className="col-span-3 flex flex-col justify-center relative z-10">
                <p className="text-xs text-gray-400 mb-1">Kuro Games</p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                    Sé el héroe de un<br />nuevo amanecer
                </h1>
                
                {/* Miniatura y Título del Juego */}
                <div className="flex items-center space-x-3 mb-4">
                    <img src={WUTHERING_WAVES_ICON} alt="Wuthering Waves Icon" className="w-10 h-10 rounded-lg object-cover" onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}/>
                    <div>
                        <p className="text-base font-bold text-white leading-none">Wuthering Waves</p>
                        <p className="text-xs text-gray-400">Juegos de rol</p>
                    </div>
                </div>

                {/* Estadísticas (Rating, Downloads, etc.) */}
                <div className="flex space-x-4 text-xs text-gray-400">
                    <div className="flex items-center">
                        <svg className="w-3 h-3 text-yellow-400 mr-1" fill="#FFD700" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.178 3.614a1 1 0 00.95.691h3.805c.969 0 1.371 1.24.588 1.81l-3.082 2.242a1 1 0 00-.364 1.118l1.178 3.614c.3.921-.755 1.688-1.541 1.118l-3.082-2.242a1 1 0 00-1.178 0l-3.082 2.242c-.786.57-1.841-.197-1.541-1.118l1.178-3.614a1 1 0 00-.364-1.118L2.012 9.042c-.783-.57-.381-1.81.588-1.81h3.805a1 1 0 00.95-.691l1.178-3.614z"/></svg>
                        4.5 <span className="ml-1 text-gray-500">★</span>
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        1M+ <span className="ml-1 text-gray-500">Descargas</span>
                    </div>
                </div>
            </div>

            {/* Lado Derecho: Ilustración del Personaje */}
            <div className="col-span-2 relative h-full overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-cover bg-center" 
                    style={{ 
                        backgroundImage: `url(${WUTHERING_WAVES_BANNER_IMAGE})`,
                        // Usa clip-path para lograr el corte inclinado a la izquierda
                        clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    }}
                    onError={(e) => { e.target.onerror = null; e.target.style.backgroundImage = `url(${PLACEHOLDER_IMG})` }}
                ></div>
                {/* Overlay sutil para oscurecer la imagen y mejorar el contraste con el texto de la izquierda (opcional) */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/5 to-black/80"></div>
            </div>
        </div>
    </div>
);

// --- NUEVO COMPONENTE DE DESCUENTO ESTILIZADO ---
const FreeFireDiscountCard = () => {
    // Definición de colores para el "neón"
    const NEON_COLOR = '#FF0000'; // Verde azulado brillante

        return (
        <>
            {/* INYECTAMOS EL CSS DE LA ANIMACIÓN FLOTANTE */}
            <style jsx="true">{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); } /* Sube 8px */
                    100% { transform: translateY(0px); }
                }

                .floating-image {
                    animation: float 4s ease-in-out infinite; /* Animación de 4s, suave, infinita */
                }
            `}</style>

            <div className="bg-[#1F2123] rounded-2xl shadow-2xl p-6 md:p-10 mb-10 overflow-hidden relative border border-gray-900">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    {/* Lado Izquierdo: Texto y Botón */}
                    <div className="col-span-2 space-y-3 pr-4">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
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

                    {/* Lado Derecho: Imagen Estilizada */}
                    <div className="col-span-1 flex justify-center items-center relative min-h-[150px]">
                        {/* Contenedor de la Imagen con efecto "Neon Frame" y la clase de animación */}
                        <div className="p-1 rounded-xl floating-image" // APLICAMOS LA CLASE DE ANIMACIÓN AQUÍ
                            style={{
                                backgroundImage: `linear-gradient(45deg, ${NEON_COLOR} 0%, #FF4500 100%)`, // Degradado de rojo a naranja rojizo
                                filter: `drop-shadow(0 0 10px ${NEON_COLOR})`,
                            }}
                        >
                            <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
                                {/* Icono de Plataforma (PC) - similar al controlador de Sonic */}
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
};
// --- FIN DEL NUEVO COMPONENTE ---

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
                        
                        <h2 className="text-2xl font-bold mb-5">Recomendados para ti</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                            {MOCK_GAMES.map((game, index) => (
                                <GameCard key={index} game={game} index={index} />
                            ))}
                        </div>

                        <FeaturedBanner /> {/* <--- AÑADIDO AQUÍ (después de la cuadrícula) */}
                        <div className="h-96"></div>
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
                
                {/* Sidebar */}
                <div className="bg-[#1F2123] pt-4 pb-4 flex flex-col items-center border-r border-gray-800 h-full relative">
                    
                    {/* Perfil */}
                    <div className="flex flex-col items-center mb-8" onClick={handleLogout}>
                        <div className="h-10 w-10 bg-yellow-500 rounded-full cursor-pointer transform hover:scale-110 transition duration-150"></div>
                    </div>

                    {/* Navegación */}
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

                    {/* Íconos inferiores */}
                    <div className="space-y-8 mb-4">
                        <div className="text-white hover:text-gray-400 cursor-pointer p-1 rounded-md" onClick={handleAvisosClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.37 21a2 2 0 0 0 3.26 0"/></svg>
                        </div>

                        {/* Icono 5 - Descargas */}
                        <div className="download-icon text-white hover:text-gray-400 cursor-pointer p-1 rounded-md relative" onClick={handleDownloadsClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        </div>

                        {/* Icono 6 - Feedback */}
                        <div className="text-white hover:text-gray-400 cursor-pointer p-1 rounded-md" onClick={handleFeedbackClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </div>
                    </div>

                    {/* Componentes flotantes */}
                    <DownloadsPopup isOpen={isDownloadsOpen} onClose={() => setIsDownloadsOpen(false)} />
                    <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
                </div>

                {/* Contenido principal */}
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
                            <div className="absolute right-0 top-0 h-full w-[60%] bg-cover bg-center [clip-path:polygon(20%_0%,_100%_0%,_100%_100%,_0%_100%)]"
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

                {/* Librería lateral */}
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