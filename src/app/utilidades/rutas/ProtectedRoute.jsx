import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../componentes/contenedor/Authcontext"; // Importamos el contexto de autenticación

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Obtenemos el estado del usuario

  // Si el usuario no está autenticado, redirigir a la página de login
  if (!user) {
    return <Navigate to="/logeo" replace />;
  }

  // Si está autenticado, renderizamos los componentes hijos
  return children;
};
