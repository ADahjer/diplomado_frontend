// app/componentes/contenedor/AdminCarrito.jsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const AdminCarrito = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Cargar los productos del carrito al iniciar el componente
  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch("https://api.asmithdahjer.online/v1/cart");
      const data = await response.json();
      setCartItems(data);
    };

    fetchCartItems();
  }, []);

  // Eliminar un producto del carrito
  const handleDelete = async (id) => {
    const response = await fetch(`https://api.asmithdahjer.online/v1/cart/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      console.error("Error al eliminar el producto del carrito");
    }
  };

  // Preparar para editar o agregar un producto al carrito
  const handleEdit = (item = { name: "", quantity: 1 }) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  // Cerrar el modal
  const handleClose = () => {
    setShowModal(false);
    setCurrentItem(null);
  };

  // Guardar cambios (Agregar o Editar)
  const handleSave = async (e) => {
    e.preventDefault();
    const method = currentItem.id ? "PUT" : "POST";
    const url = currentItem.id
      ? `https://api.asmithdahjer.online/v1/cart/${currentItem.id}`
      : "https://api.asmithdahjer.online/v1/cart";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentItem),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        if (method === "POST") {
          setCartItems([...cartItems, updatedItem]);
        } else {
          setCartItems(
            cartItems.map((item) =>
              item.id === updatedItem.id ? updatedItem : item
            )
          );
        }
        handleClose();
      } else {
        console.error("Error al guardar los cambios");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <Button variant="success" onClick={() => handleEdit()}>
        Agregar Producto al Carrito
      </Button>

      {cartItems.length === 0 ? (
        <p>El carrito está vacío...</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>Cantidad: {item.quantity}</p>
              <Button variant="primary" onClick={() => handleEdit(item)}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => handleDelete(item.id)}>
                Eliminar
              </Button>
            </li>
          ))}
        </ul>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentItem?.id ? "Editar" : "Agregar"} Producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group controlId="formItemName">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentItem?.name || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formItemQuantity">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={currentItem?.quantity || 1}
                onChange={handleChange}
                required
                min="1"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
