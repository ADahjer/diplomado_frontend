import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Authcontext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica para autenticar al usuario
    try {
      const response = await fetch("https://api.asmithdahjer.online/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas o error de servidor");
      }

      const data = await response.json();

      // Guardamos la información del token en localStorage
      localStorage.setItem("authToken", data.Token);

      // Guardamos la información de si el usuario es admin
      const isAdmin = data.Claims?.admin ? true : false;
      localStorage.setItem("isAdmin", isAdmin);

      // Aquí llamamos la función login del contexto y pasamos los datos del usuario
      login({ token: data.Token, role: isAdmin ? "admin" : "user" });

      // Redireccionamos basado en el rol
      if (isAdmin) {
        navigate("/admin"); // Redirige al panel de administrador si es admin
      } else {
        navigate("/"); // Redirige a la página principal si es usuario
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
                <div className="mt-3 text-center">
                  <p>
                    ¿No tienes una cuenta?{" "}
                    <Link to="/registro">Regístrate aquí</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
