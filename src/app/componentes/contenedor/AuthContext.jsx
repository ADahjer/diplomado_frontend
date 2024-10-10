// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Llamada a la API para obtener los datos del perfil del usuario
      const fetchUserProfile = async () => {
        try {
          const response = await fetch('https://api.asmithdahjer.online/v1/profile', {
            headers: {
              Authorization: `Bearer ${token}`, // Agregar el token en el header de la solicitud
            },
          });

          if (!response.ok) {
            throw new Error('Error al obtener el perfil del usuario');
          }

          const userData = await response.json();
          setUser({ ...userData, token });
        } catch (error) {
          console.error('Error al obtener el perfil:', error);
          // Si hay un error (token inválido o expirado), limpiar el token
          localStorage.removeItem('authToken');
        }
      };

      fetchUserProfile();
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
