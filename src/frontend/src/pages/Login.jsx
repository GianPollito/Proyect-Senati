import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
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
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciales inválidas');
      }

      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      console.log('Inicio de sesión exitoso:', data);
      navigate('/login-success');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1F2123]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#2B2D30] rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white">Iniciar Sesión</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
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
              className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#1CD760] focus:border-[#1CD760] bg-[#3A3D40] text-white transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
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
              className="w-full px-4 py-2 mt-1 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#1CD760] focus:border-[#1CD760] bg-[#3A3D40] text-white transition duration-150"
            />
          </div>

          {error && <p className="text-sm text-center text-red-400">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 font-semibold text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1CD760] transition duration-200 
                ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#1CD760] hover:bg-[#15A64D]'}`}
            >
              {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-400">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="font-medium text-[#1CD760] hover:text-[#15A64D] transition duration-150">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;