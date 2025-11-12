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
                        <div className="mb-10 p-5 bg-[#2B2D30] rounded-xl shadow-lg border border-white">
                            <div className="flex justify-between items-center">
                                <p className="text-xl font-semibold">
                                    Obtén 15% de descuento en Free Fire Max para PC
                                </p>
                                <button className="px-4 py-1 border bg-red-600 text-sm rounded-lg hover:bg-red-800 transition duration-150">
                                    Guardar
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Hasta el 16 de noviembre de 2025.</p>
                        </div>

                        <h2 className="text-2xl font-bold mb-5">Recomendados para ti</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            {MOCK_GAMES.map((game, index) => (
                                <GameCard key={index} game={game} index={index} />
                            ))}
                        </div>
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

