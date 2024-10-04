import React from "react";
import "./Cupon.css";
const Cupon = ({ value, onChangeData }) => {
  return (
    <div>
      <input
        className="search__input"
        type="text"
        placeholder="Enter Cupon descuento"
        value={value}
        onChange={onChangeData}
      />
    </div>
  );
};

export default Cupon;
