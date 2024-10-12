import React, { useEffect, useState } from "react";
import './Carrito.css'; 

export const Carrito = ({ addedItems, removeItem }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calcularTotal(addedItems);
  }, [addedItems]);

  const calcularTotal = (items) => {
    const totalCalculado = items.reduce((acc, item) => acc + item.price * item.addNumber, 0);
    setTotal(totalCalculado);
  };

  const cambiarCantidad = (id, cantidad) => {
    const nuevoCarrito = addedItems.map(item =>
      item.id === id ? { ...item, addNumber: item.addNumber + cantidad } : item
    );
    calcularTotal(nuevoCarrito);
  };

  return (
    <div className="carrito-container">
      <h1>Carrito de Compras</h1>
      <div className="productos">
        {addedItems.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          addedItems.map((producto) => (
            <div key={producto.id} className="producto">
              <img src={producto.image} alt={producto.name} className="producto-img" />
              <div className="producto-info">
                <h3>{producto.name}</h3>
                <p>Precio: ${producto.price}</p>
                <p>Cantidad: {producto.addNumber}</p>
                <div className="producto-cantidad">
                  <button onClick={() => cambiarCantidad(producto.id, -1)} disabled={producto.addNumber === 1}>-</button>
                  <button onClick={() => cambiarCantidad(producto.id, 1)}>+</button>
                </div>
                <button className="eliminar" onClick={() => removeItem(producto)}>Eliminar</button>
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
