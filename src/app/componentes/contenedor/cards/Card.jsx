import React, { useEffect, useState } from "react";
import "./Card.css";

const Card = ({ product, addItem, removeItem, addedItems, descuento }) => {
  const [isAdded, setIsAdded] = useState(true);
  const item = addedItems.filter((addedItem) => addedItem.id === product.id);

  useEffect(() => {
    setIsAdded(item.length === 0);
  }, [item]);

  return (
    <div className="card">
      <div className="contImg">
        <img
          className={descuento ? "icoDesc" : "icoDescWithout"}
          src="https://cdn.icon-icons.com/icons2/1675/PNG/512/3890937-black-friday-cheap-discount-price-reduced-sale-tag_111190.png"
          alt=""
        />
        <img className="card__img" src={product.image} alt="" />
      </div>

      <div>
        <h2>{product.category}</h2>
        <h4>{product.title}</h4>
        <p>{product.description}</p>
      </div>
      <div className="card-price-add">
        <span className="withOutDesc">
          Price: ${descuento ? (product.price * 0.5): product.price}
        </span>
        <button
          className={isAdded ? "add-item-btn" : "remove-item-btn"}
          onClick={() => {
            isAdded ? addItem(product) : removeItem(product);
            setIsAdded(!isAdded);
          }}
        >
          {isAdded ? "ADD" : "CANCEL"}
        </button>
      </div>
    </div>
  );
};

export default Card;
