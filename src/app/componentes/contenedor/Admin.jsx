import React from "react";
import { Navigate } from "react-router-dom";
import { AdminPrductos } from "./AdminPrductos";

export const Admin = () => {
    const isAdmin = localStorage.getItem("isAdmin");

  if (!isAdmin) {
    return <Navigate to="/" />; // Redirigir si no es admin
  }
  return (
    <>
      <h1>Panel Administrativo</h1>
      <AdminPrductos />
    </>
  );
};
