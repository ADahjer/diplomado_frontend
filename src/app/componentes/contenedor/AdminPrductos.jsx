import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Container, Row } from "react-bootstrap";

export const AdminPrductos = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const filterProductsByCategory = (selectedCategory) => {
    if (selectedCategory === "Categorias") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.categories.includes(selectedCategory)
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.asmithdahjer.online/v1/product");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        const categoria = data.flatMap((product) => product.categories);
        const categoriasUnicas = [...new Set(categoria)];
        setCategory(categoriasUnicas);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://api.asmithdahjer.online/v1/product/${id}`,
      { method: "DELETE" }
    );
    if (response.ok) {
      setProducts(products.filter((product) => product.id !== id));
      setFilteredProducts(filteredProducts.filter((product) => product.id !== id));
    } else {
      console.error("Error al eliminar el producto");
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", currentProduct.name);
      formData.append("price", currentProduct.price);
      formData.append("categories", currentProduct.categories);
      const response = await fetch(
        `https://api.asmithdahjer.online/v1/product/${currentProduct.id}`,
        { method: "PUT", body: formData }
      );
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(
          products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setFilteredProducts(
          filteredProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        handleClose();
      } else {
        console.error("Error al guardar los cambios");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <Container>
        <Row>
          <Form.Select onChange={(e) => filterProductsByCategory(e.target.value)}>
            <option>Categorias</option>
            {category.map((categor) => (
              <option key={categor}>{categor}</option>
            ))}
          </Form.Select>
        </Row>
      </Container>
      {filteredProducts.length === 0 ? (
        <p>Cargando productos...</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100px", height: "auto" }}
              />
              <h2>{product.name}</h2>
              <p>Precio: ${product.price.toFixed(2)}</p>
              <Button variant="primary" onClick={() => handleEdit(product)}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => handleDelete(product.id)}>
                Eliminar
              </Button>
            </li>
          ))}
        </ul>
      )}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form onSubmit={handleSave}>
              <Form.Group controlId="formProductName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formProductCategories">
                <Form.Label>Categorías</Form.Label>
                <Form.Control
                  type="text"
                  name="categories"
                  value={currentProduct.categories || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
