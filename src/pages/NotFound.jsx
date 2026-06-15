// src/pages/NotFound.jsx

// Esta página aparece cuando el usuario escribe una ruta que no existe.
// Es una mejora de experiencia de usuario y evita que la aplicación quede en blanco.

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="notfound-page">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La sección que buscas no existe o ha cambiado de dirección.</p>
      <Link to="/" className="btn-leer-articulo">
        Volver al inicio
      </Link>
    </main>
  );
}
