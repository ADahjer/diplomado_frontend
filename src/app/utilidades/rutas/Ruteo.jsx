import { Route, Routes } from "react-router-dom";
import { Inicio } from "../../componentes/contenedor/Inicio";
import { Tienda } from "../../componentes/contenedor/Tienda";
import { Carrito } from "../../componentes/contenedor/Carrito";
import { Login } from "../../componentes/contenedor/Login";
import { Signup } from "../../componentes/contenedor/Signup";
import { useState } from "react";
import { SimulacionPago } from '../../componentes/contenedor/simulacionpago';
import  Perfil  from '../../componentes/contenedor/Perfil'
import { ProtectedRoute } from "./ProtectedRoute";

export const Ruteo = () => {
    const [discount, setDiscount] = useState(0);
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/logeo" element={<Login />} />
            <Route path="/registro" element={<Signup />} />
            <Route path="/simulacion-pago" element={<SimulacionPago />} />
            <Route path="/perfil" element= {
                <ProtectedRoute>
                    <Perfil />
                </ProtectedRoute>
            }/>
        </Routes>
    );
};
