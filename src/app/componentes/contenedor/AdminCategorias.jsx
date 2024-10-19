import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const AdminCategorias = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Cargar las categorías al iniciar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://api.asmithdahjer.online/v1/category");
      const data = await response.json();
      setCategories(data);
      
    };

    fetchCategories();
  }, []);

  // Eliminar categoría
  const handleDelete = async (id) => {
    const response = await fetch(`https://api.asmithdahjer.online/v1/category/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setCategories(categories.filter((category) => category.id !== id));
     
    } else {
      console.error("Error al eliminar la categoría");
    }
  };

  // Preparar la categoría para editar o añadir
  const handleEdit = (category = { name: "" }) => {
    setCurrentCategory(category);
    setShowModal(true);
  };

  // Cerrar el modal
  const handleClose = () => {
    setShowModal(false);
    setCurrentCategory(null);
  };

  // Guardar cambios (Crear o Editar)
  const handleSave = async (e) => {
    e.preventDefault();
    const method = currentCategory.id ? "PUT" : "POST";
    const url = currentCategory.id
      ? `https://api.asmithdahjer.online/v1/category/${currentCategory.id}`
      : "https://api.asmithdahjer.online/v1/category";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentCategory),
      });

      if (response.ok) {
        const updatedCategory = await response.json();
        if (method === "POST") {
          setCategories([...categories, updatedCategory]);
        } else {
          setCategories(
            categories.map((category) =>
              category.id === updatedCategory.id ? updatedCategory : category
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

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    setCurrentCategory({ ...currentCategory, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Lista de Categorías</h1>
      <Button variant="success" onClick={() => handleEdit()}>
        Agregar Categoría
      </Button>

      {categories.length === 0 ? (
        <p>Cargando categorías...</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <h2>{category.name}</h2>
              <Button variant="primary" onClick={() => handleEdit(category)}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => handleDelete(category.id)}>
                Eliminar
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal para Crear/Editar Categoría */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentCategory?.id ? "Editar" : "Agregar"} Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentCategory?.name || ""}
                onChange={handleChange}
                required
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
