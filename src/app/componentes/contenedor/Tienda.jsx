import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import Search from "./search/Search";
import AddProducts from "./addproducts/AddProducts";
import CardBody from "./cards/CardBody";
import "./App.css";

export const Tienda = ({ addedItems, addItem, removeItem }) => {
  const [items, setItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showAddProducts, setShowAddProducts] = useState(false);

  useEffect(() => {
    fetch("https://api.asmithdahjer.online/v1/product")
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  function changingSrarchData(e) {
    setSearchValue(e.target.value);
  }

  const itmesFilter = items.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <div className="body__container">
        <div className="nav">
          <Header />
          <div className="nav-right">
            <Search value={searchValue} onChangeData={changingSrarchData} />
          </div>
        </div>
        <br></br>

        {showAddProducts && (
          <AddProducts
            click={setShowAddProducts}
            items={addedItems}
            removeItem={removeItem}
            setAddedItem={setAddedItem}
          />
        )}

        <CardBody
          products={itmesFilter}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      </div>
    </div>
  );
};
