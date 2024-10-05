import React, { useState } from 'react';
import './SimulacionPago.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const SimulacionPago1 = () => {
  return (
    <div className="container mt-5">
      <h1>Simulación de Pago</h1>
      <p>Gracias por tu compra. El pago ha sido procesado con éxito.</p>
    </div>
  );
};

export const SimulacionPago = () => {
  const [datosPago, setDatosPago] = useState({
    nombre: '',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: '',
  });
  
  const [estadoPago, setEstadoPago] = useState(null); // null, 'exitoso' o 'fallido'

  const manejarCambio = (e) => {
    setDatosPago({
      ...datosPago,
      [e.target.name]: e.target.value,
    });
  };

  const procesarPago = (e) => {
    e.preventDefault();
    
    // Simulamos un pequeño delay antes de "procesar" el pago
    setTimeout(() => {
      // Simulamos que el pago es exitoso el 80% del tiempo
      const exito = Math.random() > 0.2;

      if (exito) {
        setEstadoPago('exitoso');
      } else {
        setEstadoPago('fallido');
      }
    }, 1000);
  };

  return (
    <div className="pago-container">
      <h1>Simulación de Pago</h1>
      {estadoPago === 'exitoso' ? (
        <div className="exito">
          <h2>¡Pago exitoso!</h2>
          <p>Gracias por tu compra. Hemos procesado tu pago.</p>
        </div>
      ) : estadoPago === 'fallido' ? (
        <div className="fallo">
          <h2>Pago fallido</h2>
          <p>Hubo un problema al procesar tu pago. Inténtalo nuevamente.</p>
        </div>
      ) : (
        <form onSubmit={procesarPago}>
          <div className="campo">
            <label>Nombre del titular</label>
            <input
              type="text"
              name="nombre"
              value={datosPago.nombre}
              onChange={manejarCambio}
              required
            />
          </div>
          <div className="campo">
            <label>Número de Tarjeta</label>
            <input
              type="text"
              name="numeroTarjeta"
              value={datosPago.numeroTarjeta}
              onChange={manejarCambio}
              required
              pattern="\d{16}"
              placeholder="1234 5678 9123 4567"
            />
          </div>
          <div className="campo">
            <label>Fecha de Expiración</label>
            <input
              type="text"
              name="fechaExpiracion"
              value={datosPago.fechaExpiracion}
              onChange={manejarCambio}
              required
              pattern="\d{2}/\d{2}"
              placeholder="MM/YY"
            />
          </div>
          <div className="campo">
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={datosPago.cvv}
              onChange={manejarCambio}
              required
              pattern="\d{3}"
              placeholder="123"
            />
          </div>
          <button type="submit" className="boton-pago">Pagar</button>
        </form>
      )}
    </div>
  );
};
