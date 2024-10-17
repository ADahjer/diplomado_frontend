import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../componentes/contenedor/Authcontext";

export const ProtectedRouteAdmin = ({ children }) => {
    const { user } = useContext(AuthContext); // Obtener el usuario desde el contexto

    // Verificamos si el usuario está autenticado y es administrador
    const isAdmin = user && user.role === "admin";
  
    return isAdmin ? children : <Navigate to="/" />;
};
