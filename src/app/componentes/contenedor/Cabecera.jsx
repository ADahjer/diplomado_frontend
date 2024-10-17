import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Authcontext";

export const Cabecera = () => {
  const { user, logout } = useContext(AuthContext); // Obtenemos user y logout del contexto

  // Verificamos si el usuario es admin
  const isAdmin = user && user.role === "admin";

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-primary-subtle"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            MiTienda
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tienda">
                  Tienda
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/carrito">
                  <FaShoppingCart />
                </NavLink>
              </li>

              {/* Mostrar el enlace de Admin solo si el usuario es admin */}
              {isAdmin && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin">
                    Admin
                  </NavLink>
                </li>
              )}

              {/* Si el usuario está autenticado, mostrar su nombre y el botón de "Cerrar sesión" */}
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link">Hola, {user.name}</span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={logout}>
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* Si no está autenticado, mostrar los enlaces de Login y Sign Up */}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/logeo">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/registro">
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};