import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar si la contraseña es segura
    if (!validatePassword(formData.password)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    setPasswordError(""); // Limpiar el error si la validación es exitosa

    try {
      const response = await fetch(
        "https://api.asmithdahjer.online/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: formData.userName,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Registro exitoso:", data);

        // Redirigir al login después de registrarse
        navigate("/logeo");
      } else {
        alert("Error: " + data.message || "Error al registrarse");
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
                <h2 className="card-title text-center mb-4">Registro</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                      UserName
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico o Usuario
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {passwordError && (
                      <small className="text-danger">{passwordError}</small>
                    )}
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Registrarse
                    </button>
                  </div>
                </form>
                <div className="mt-3 text-center">
                  <p>
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/logeo">Inicia sesión aquí</Link>
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
