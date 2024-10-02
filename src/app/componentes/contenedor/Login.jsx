import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

      const data = await response.json();

      if (response.ok) {
        // Aquí puedes guardar el token en el localStorage o en el estado global
        console.log("Inicio de sesión exitoso:", data);

        // Redirigir a la página principal o dashboard
        navigate("/");
      } else {
        alert("Error: " + data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error al conectarse al servidor");
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
