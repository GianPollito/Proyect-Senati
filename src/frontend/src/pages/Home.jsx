import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackModal from '../components/FeedbackModal';
import ConfigurationModal from '../components/ConfigurationModal'; // CLAVE: Importar la nueva modal

function Home() {
  const navigate = useNavigate();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false); // NUEVO ESTADO

  const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;

  const handleGoogleLoginClick = () => {
    if (GOOGLE_AUTH_URL) {
      window.location.href = GOOGLE_AUTH_URL;
    } else {
      console.error("VITE_GOOGLE_AUTH_URL no está definido en el entorno.");
      navigate('/login'); 
    }
  };

  const handleInternalLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#1F2123] text-white flex items-center justify-center p-8 md:p-12 relative overflow-hidden font-sans">
      
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-1/4 left-[-100px] w-[500px] h-[150px] bg-white rounded-full opacity-100 transform -rotate-12"></div>
        <div className="absolute top-0 right-[-50px] w-[300px] h-[100px] bg-white rounded-full opacity-100"></div>
        
        <div className="absolute bottom-10 right-10 w-[200px] h-[30px] bg-[#F5F5F5] rotate-[-5deg] rounded-md"></div>
        <div className="absolute bottom-20 right-14 w-[250px] h-[30px] bg-[#F5F5F5] rotate-[-2deg] rounded-md"></div>

        <div className="absolute right-10 md:right-40 top-1/4 w-40 h-40 bg-white rounded-full opacity-100 transform -translate-y-1/2">
            <div className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl border-2 border-red-500">
                <svg className="w-8 h-8 text-red-500 ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </div>
        </div>
        
        <div className="absolute top-5 left-5 w-4 h-4 bg-red-600 opacity-60 animate-pulse"></div>
        <div className="absolute top-20 left-20 w-8 h-8 bg-blue-600 opacity-40 transform rotate-45"></div>
        <div className="absolute bottom-5 right-5 w-6 h-6 bg-yellow-500 opacity-50 animate-pulse delay-500"></div>
        <div className="absolute top-3/4 left-1/4 w-32 h-32 bg-cyan-400 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-fuchsia-400 rounded-full opacity-10 blur-xl transform rotate-12"></div>
        
        <div className="absolute top-16 right-16 w-3 h-3 bg-purple-500 opacity-50 transform rotate-45"></div>
        <div className="absolute bottom-10 left-32 w-7 h-7 bg-green-400 opacity-40 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 left-40 w-10 h-10 bg-orange-400 opacity-30 transform -rotate-12 blur-xs"></div>
        <div className="absolute bottom-32 right-20 w-4 h-4 bg-red-400 opacity-60 transform rotate-60"></div>
        <div className="absolute top-10 left-1/2 w-2 h-2 bg-blue-300 opacity-70 animate-pulse delay-700"></div>
        <div className="absolute bottom-5 right-50 w-8 h-8 bg-pink-500 opacity-45 transform -rotate-30"></div>
        <div className="absolute top-1/2 right-10 w-5 h-5 bg-cyan-500 opacity-35 transform rotate-15"></div>
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-red-300 opacity-80"></div>
        <div className="absolute bottom-1/4 left-10 w-3 h-3 bg-yellow-300 opacity-50 transform -rotate-30"></div>
        <div className="absolute bottom-20 left-10 w-6 h-6 bg-purple-400 opacity-40 transform rotate-75 animate-bounce" style={{ animationDuration: '5s' }}></div>

      </div>


      <div className="relative z-10 p-10 bg-white rounded-xl shadow-2xl w-full max-w-lg">
        
        
        <div className="flex justify-between items-center mb-12 space-x-4 text-black">
          
          <div 
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition duration-150 cursor-pointer"
            onClick={() => setIsFeedbackModalOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Enviar comentarios
          </div>
          
          <div 
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition duration-150 cursor-pointer"
            onClick={() => setIsConfigModalOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.46l-.54.27a2 2 0 0 0-1.2.98L7 8.52l-2.73.57a2 2 0 0 0-1.74 2.37l.45 1.55a2 2 0 0 0 1.2 1.2l.57.27a2 2 0 0 0 1.94 0l.57-.27a2 2 0 0 0 1.2-1.2l.45-1.55a2 2 0 0 0-1.74-2.37zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
            Configuración
          </div>
        </div>


        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-black mb-10">
            Te damos la bienvenida a<br />
            Google Play Go Games
          </h1>

          <div className="flex flex-col space-y-3 items-center justify-center">
            
            <button 
              onClick={handleGoogleLoginClick}
              className="flex items-center px-6 py-3 bg-gray-100 text-black rounded-lg shadow-md 
                        hover:bg-gray-200 transition duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full min-w-[280px] justify-center border border-gray-300"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.343c-1.897,2.715-5.004,4.717-8.917,4.717c-6.196,0-11.229-5.033-11.229-11.229c0-6.196,5.033-11.229,11.229-11.229c3.344,0,6.468,1.385,8.513,3.618l5.275-5.276C34.505,5.276,29.742,3,24,3C12.389,3,3,12.389,3,24c0,11.611,9.389,21,21,21c10.843,0,20.443-8.174,20.917-18.917V20.083z"></path>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,13,24,13c3.344,0,6.468,1.385,8.513,3.618l5.275-5.276C34.505,5.276,29.742,3,24,3C16.923,3,10.606,7.234,7.408,13.078L13.979,17.897"></path>
                  <path fill="#4CAF50" d="M24,45c-6.186,0-11.218-5.032-11.218-11.218c0-1.841,0.485-3.557,1.332-5.086L6.306,14.691C3.109,20.535,3,24,3,24c0,11.611,9.389,21,21,21c4.761,0,9.262-1.574,12.981-4.664L32.227,33.43c-2.045,2.233-5.17,3.618-8.513,3.618c-6.196,0-11.229-5.033-11.229-11.229H42v8H24V45z"></path>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.343c-1.897,2.715-5.004,4.717-8.917,4.717c-4.482,0-8.23-2.433-10.297-6.007L13.979,17.897C15.93,14.663,19.679,13,24,13c4.761,0,9.262,1.574,12.981,4.664L32.227,33.43C30.182,35.663,27.058,37.048,24,37.048c-3.913,0-7.02-2.002-8.917-4.717H42v-7.229V20.083z"></path>
              </svg>
              <span className="font-semibold">Acceder con Google</span>
            </button>

            <button 
              onClick={handleInternalLoginClick}
              className="flex items-center px-6 py-3 bg-gray-100 text-black rounded-lg shadow-md 
                        hover:bg-gray-200 transition duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full min-w-[280px] justify-center border border-gray-300"
            >
              <span className="font-semibold">Iniciar Sesión</span>
            </button>
          </div>

          <p className="mt-8 text-base text-gray-700">
            Para jugar en otros dispositivos, accede con la misma<br />
            Cuenta de Google que usas en tu teléfono.
          </p>
        </div>

        <div className="relative z-10 text-xs text-gray-500 mt-8 text-center">
          Tu información se usará de acuerdo con la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-500 underline">Política de Privacidad de Google.</a>
        </div>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
      <ConfigurationModal 
        isOpen={isConfigModalOpen} 
        onClose={() => setIsConfigModalOpen(false)} 
      />
    </div>
  );
}

export default Home;