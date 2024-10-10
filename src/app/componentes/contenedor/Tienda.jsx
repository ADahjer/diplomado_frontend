import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import Search from "./search/Search";
import AddProducts from "./addproducts/AddProducts";
import CardBody from "./cards/CardBody";


import "./App.css";

export const Tienda = () => {
  const [items, setItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [descuentoActivo, setDescuentoActivo] = useState(false);

  useEffect( () => {
     fetch("https://fakestoreapi.com/products")
     .then((res) => res.json())
     .then((data) => {
       setItem(data);  // Establecer los elementos con la respuesta de la API
       console.log(data);  // Asegúrate de imprimir los datos aquí
     })
     .catch((error) => console.error("Error fetching products:", error));
 }, []);

  function changingSrarchData(e) {
    setSearchValue(e.target.value);
  }

  const itmesFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    setAddedItem([...addedItems, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
  }

  function changingCuponData(e) {
    setDescValue(e.target.value);

    if (e.target.value === "1234") {
      setDescuentoActivo(true);
    } else {
      setDescuentoActivo(false);
    }
  }

  return (
    <div>
      <div className="body__container">
        <div className="nav">
          <Header />
          <div className="nav-right">
            
            <Search value={searchValue} onChangeData={changingSrarchData} />
           
          </div>
        </div>

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
          descuentoActivo={descuentoActivo}
        />
      </div>
    </div>
  );
};


