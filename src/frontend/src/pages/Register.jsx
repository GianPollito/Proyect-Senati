import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError(null);
    setIsLoading(true); 

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar el usuario');
      }

      console.log('Usuario registrado:', data);
      navigate('/login-success');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleCancel = () => {
    navigate('/');
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


      <div className="relative z-10 w-full max-w-md p-8 space-y-7 bg-[#F5F5F5] rounded-xl shadow-2xl border border-gray-700">
        
        <h1 className="text-4xl font-extrabold text-center text-black">
          Crear una cuenta
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-solid border-gray-300 rounded-lg shadow-sm focus:outline-none bg-[#F5F5F5] text-black transition duration-150 placeholder-gray-500 hover:border-red-500"
              placeholder="Ingresa tu nombre"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-solid border-gray-300 rounded-lg shadow-sm focus:outline-none bg-[#F5F5F5] text-black transition duration-150 placeholder-gray-500 hover:border-red-500"
              placeholder="nombre@ejemplo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-solid border-gray-300 rounded-lg shadow-sm focus:outline-none bg-[#F5F5F5] text-black transition duration-150 placeholder-gray-500 hover:border-red-500"
              placeholder="Crea tu contraseña"
            />
          </div>

          {error && <p className="text-sm text-center text-red-400 font-semibold">{error}</p>}

          <div className="space-y-3">
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-4 py-3 font-bold rounded-lg shadow-lg focus:outline-none transition duration-200 text-lg border-2 border-[#FF0000]
                  ${isLoading 
                    ? 'bg-red-500 text-white cursor-not-allowed' 
                    : 'bg-[#FF0000] text-white hover:bg-red-700'}`
                }
              >
                {isLoading ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className={`w-full px-4 py-3 font-bold rounded-lg shadow-lg focus:outline-none transition duration-200 text-lg border-2 border-[#FF0000]
                  ${isLoading 
                    ? 'bg-transparent text-gray-500 cursor-not-allowed' 
                    : 'bg-transparent text-[#FF0000] hover:bg-gray-200'}`
                }
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>

        <p className="text-sm text-center text-gray-400 pt-2">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-semibold text-[#FF0000] hover:text-[#CF0E0E] transition duration-150 underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;