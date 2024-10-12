import { Route, Routes } from "react-router-dom";
import { Inicio } from "../../componentes/contenedor/Inicio";
import { Tienda } from "../../componentes/contenedor/Tienda";
import { Carrito } from "../../componentes/contenedor/Carrito";
import { Login } from "../../componentes/contenedor/Login";
import { Signup } from "../../componentes/contenedor/Signup";
import { SimulacionPago } from '../../componentes/contenedor/simulacionpago';
import { useState } from "react";
import  Perfil  from '../../componentes/contenedor/Perfil'
import { ProtectedRoute } from "./ProtectedRoute";


export const Ruteo = () => {
    const [addedItems, setAddedItem] = useState([]);
    
    // Función para agregar productos al carrito
    const addItem = (item) => {
        item.addNumber = 1;
        setAddedItem([...addedItems, item]);
    };

    // Función para eliminar productos del carrito
    const removeItem = (item) => {
        const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
        setAddedItem(newItems);
    };

    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<Tienda addedItems={addedItems} addItem={addItem} removeItem={removeItem} />} />
            <Route path="/carrito" element={<Carrito addedItems={addedItems} removeItem={removeItem} />} />
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
