import React from "react";
import Card from "./Card";
import "./CardBody.css";

const CardBody = ({ products, addItem, removeItem, addedItems, descuentoActivo }) => {
  return (
    <div className="card__body">
      {products.map((product) => (
        <Card
          key={product.id}
          product={product}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
          descuento={descuentoActivo} // Pasar el estado de descuento
        />
      ))}
    </div>
  );
};

export default CardBody;
