import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };
  
  const isAuthenticated = useMemo(() => !!token, [token]);

  const value = {
    isAuthenticated,
    token,
    logout,
    setToken, 
    loading
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1F2123] text-white">
        <h1 className="text-2xl">Cargando aplicación...</h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}