import React, { useEffect, useState } from "react";

export const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [destacados, setDestacados] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [populares, setPopulares] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        // Suponiendo que los primeros 3 son destacados
        setDestacados(data.slice(0, 3));
        // Filtrando productos en oferta (ejemplo, precio menor a 20)
        setOfertas(data.filter((product) => product.price < 20));
        // Suponiendo que los populares son los que tienen calificaciones altas
        setPopulares(data.filter((product) => product.rating.rate > 4));
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
                    alt={producto.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.title}</h5>
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
                    alt={producto.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.title}</h5>
                    <p className="card-text">${producto.price}</p>
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
                    alt={producto.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.title}</h5>
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
