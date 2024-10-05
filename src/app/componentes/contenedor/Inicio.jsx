import React, { useEffect, useState } from "react";

export const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [destacados, setDestacados] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [populares, setPopulares] = useState([]);

  useEffect(() => {
    fetch("https://api.asmithdahjer.online/v1/product")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        // Filtrando para cada sección
        setDestacados(data.slice(0, 3));
        setOfertas(
          data.filter((producto) => producto.discount > 0).slice(0, 3)
        );
        setPopulares(data.slice(6, 9));
      });
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center">Bienvenido a nuestra tienda</h1>

        {/* Sección de Destacados */}
        <section className="mb-5">
          <h2>Destacados</h2>
          <div className="row">
            {destacados.map((producto) => (
              <div className="col-md-4" key={producto.id}>
                <div className="card">
                  <img
                    src={producto.image}
                    className="card-img-top"
                    alt={producto.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.name}</h5>
                    <p className="card-text">${producto.price}</p>
                    <a href="#" className="btn btn-primary">
                      Ver más
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Ofertas */}
        <section className="mb-5">
          <h2>Ofertas</h2>
          <div className="row">
            {ofertas.map((producto) => (
              <div className="col-md-4" key={producto.id}>
                <div className="card">
                  <img
                    src={producto.image}
                    className="card-img-top"
                    alt={producto.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.name}</h5>
                    <p className="card-text">
                      <span style={{ textDecoration: "line-through" }}>
                        ${producto.price.toFixed(2)}
                      </span>{" "}
                      <span className="text-danger">
                        ${(producto.price * (1 - producto.discount)).toFixed(2)}
                      </span>
                    </p>
                    <a href="#" className="btn btn-danger">
                      Comprar ahora
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Productos Populares */}
        <section>
          <h2>Productos Populares</h2>
          <div className="row">
            {populares.map((producto) => (
              <div className="col-md-4" key={producto.id}>
                <div className="card">
                  <img
                    src={producto.image}
                    className="card-img-top"
                    alt={producto.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.name}</h5>
                    <p className="card-text">${producto.price}</p>
                    <a href="#" className="btn btn-primary">
                      Ver más
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
