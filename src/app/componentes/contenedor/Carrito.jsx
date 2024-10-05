import React, { useEffect, useState } from "react";
import './Carrito.css'; // Los estilos actualizados aquí

export const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Simula el carrito con productos
    const carritoSimulado = [
      { id: 1, nombre: "Teclado", precio: 88.88, cantidad: 1, imagen: "https://storage.googleapis.com/egocomerce-68f22.appspot.com/products/0f1599f3-169e-478f-bd1d-d3f48dec1648" },
      { id: 2, nombre: "Parlante bluetooth", precio: 45, cantidad: 2, imagen: "https://storage.googleapis.com/egocomerce-68f22.appspot.com/products/a3682b94-3eea-44ed-b81f-0d253ba408e7" }
      
    ];
    setCarrito(carritoSimulado);
    calcularTotal(carritoSimulado);
  }, []);

  const calcularTotal = (items) => {
    const totalCalculado = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(totalCalculado);
  };

  const cambiarCantidad = (id, cantidad) => {
    const nuevoCarrito = carrito.map(item =>
      item.id === id ? { ...item, cantidad: item.cantidad + cantidad } : item
    );
    setCarrito(nuevoCarrito);
    calcularTotal(nuevoCarrito);
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    setCarrito(nuevoCarrito);
    calcularTotal(nuevoCarrito);
  };

  return (
    <div className="carrito-container">
      <h1>Carrito de Compras</h1>
      <div className="productos">
        {carrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          carrito.map((producto) => (
            <div key={producto.id} className="producto">
              <img src={producto.imagen} alt={producto.nombre} className="producto-img" />
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p>Precio: ${producto.precio}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <div className="producto-cantidad">
                  <button onClick={() => cambiarCantidad(producto.id, -1)} disabled={producto.cantidad === 1}>-</button>
                  <button onClick={() => cambiarCantidad(producto.id, 1)}>+</button>
                </div>
                <button className="eliminar" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="resumen">
        <h2>Total: ${total}</h2>
        <button className="checkout">Proceder al Pago</button>
      </div>
    </div>
  );
};
