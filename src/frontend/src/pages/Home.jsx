import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleGoogleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#1F2123] text-white flex items-center justify-center p-8 md:p-12 relative overflow-hidden font-sans">
      
      {/* Elementos de fondo decorativos (ilusión de Play Juegos) */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-1/4 left-[-100px] w-[500px] h-[150px] bg-white rounded-full opacity-10 transform -rotate-12 blur-sm"></div>
        <div className="absolute top-0 right-[-50px] w-[300px] h-[100px] bg-white rounded-full opacity-10 blur-sm"></div>
        
        <div className="absolute bottom-10 right-10 w-[200px] h-[30px] bg-[#614D3F] rotate-[-5deg] rounded-md"></div>
        <div className="absolute bottom-20 right-14 w-[250px] h-[30px] bg-[#614D3F] rotate-[-2deg] rounded-md"></div>

        <div className="absolute right-10 md:right-40 top-1/4 w-40 h-40 bg-gray-500 rounded-full opacity-20 transform -translate-y-1/2">
            <div className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#1CD760] flex items-center justify-center shadow-2xl">
                <svg className="w-8 h-8 text-black ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </div>
        </div>
      </div>


      {/* CONTENIDO PRINCIPAL: EL CUADRO BLANCO CENTRADO */}
      <div className="relative z-10 p-10 bg-white rounded-xl shadow-2xl w-full max-w-lg">
        
        {/* Cabecera (Ajustes y Feedback) - Ahora visibles en fondo blanco */}
        <div className="flex justify-between items-center mb-10 space-x-4 text-black">
          
          <div className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition duration-150 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Enviar comentarios
          </div>
          
          <div className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition duration-150 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.46l-.54.27a2 2 0 0 0-1.2.98L7 8.52l-2.73.57a2 2 0 0 0-1.74 2.37l.45 1.55a2 2 0 0 0 1.2 1.2l.57.27a2 2 0 0 0 1.94 0l-.57-.27a2 2 0 0 0-1.2-1.2l-.45-1.55a2 2 0 0 0-1.74-2.37L7 8.52l2.73-.57a2 2 0 0 0 1.74-2.37l-.45-1.55a2 2 0 0 0-1.2-1.2l-.57-.27a2 2 0 0 0-1.94 0l-.57.27a2 2 0 0 0-1.2 1.2l-.45 1.55a2 2 0 0 0 1.74 2.37L7 8.52l-2.73.57a2 2 0 0 0-1.74 2.37l.45 1.55a2 2 0 0 0 1.2 1.2l-.57.27a2 2 0 0 0 1.94 0l-.57-.27a2 2 0 0 0-1.2-1.2l-.45-1.55a2 2 0 0 0-1.74-2.37zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
            Configuración
          </div>
        </div>


        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-black mb-8">
            Te damos la bienvenida a<br />
            Google Go Games
          </h1>

          <button 
            onClick={handleGoogleLoginClick}
            className="flex items-center mx-auto px-6 py-3 bg-gray-100 text-black rounded-lg shadow-md 
                       hover:bg-gray-200 transition duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300 w-fit border border-gray-300"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.343c-1.897,2.715-5.004,4.717-8.917,4.717c-6.196,0-11.229-5.033-11.229-11.229c0-6.196,5.033-11.229,11.229-11.229c3.344,0,6.468,1.385,8.513,3.618l5.275-5.276C34.505,5.276,29.742,3,24,3C12.389,3,3,12.389,3,24c0,11.611,9.389,21,21,21c10.843,0,20.443-8.174,20.917-18.917V20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,13,24,13c3.344,0,6.468,1.385,8.513,3.618l5.275-5.276C34.505,5.276,29.742,3,24,3C16.923,3,10.606,7.234,7.408,13.078L13.979,17.897"></path>
                <path fill="#4CAF50" d="M24,45c-6.186,0-11.218-5.032-11.218-11.218c0-1.841,0.485-3.557,1.332-5.086L6.306,14.691C3.109,20.535,3,24,3,24c0,11.611,9.389,21,21,21c4.761,0,9.262-1.574,12.981-4.664L32.227,33.43c-2.045,2.233-5.17,3.618-8.513,3.618c-6.196,0-11.229-5.033-11.229-11.229H42v8H24V45z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.343c-1.897,2.715-5.004,4.717-8.917,4.717c-4.482,0-8.23-2.433-10.297-6.007L13.979,17.897C15.93,14.663,19.679,13,24,13c4.761,0,9.262,1.574,12.981,4.664L32.227,33.43C30.182,35.663,27.058,37.048,24,37.048c-3.913,0-7.02-2.002-8.917-4.717H42v-7.229V20.083z"></path>
            </svg>
            <span className="font-semibold">Acceder con Google</span>
          </button>

          <p className="mt-8 text-base text-gray-400">
            Para jugar en otros dispositivos, accede con la misma<br />
            Cuenta de Google que usas en tu teléfono.
          </p>
        </div>

        <div className="relative z-10 text-xs text-gray-500 mt-8 text-center">
          Tu información se usará de acuerdo con la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 underline">Política de Privacidad de Google.</a>
        </div>
      </div>
    </div>
  );
}

export default Home;