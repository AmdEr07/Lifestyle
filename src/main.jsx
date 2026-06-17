// src/main.jsx

// Este archivo es el punto de entrada de React.
// Es el primero que se ejecuta cuando arranca la aplicación.
import React from "react";

//ReactDOM conecta React con el DOM real del navegador.
import ReactDOM from "react-dom/client";

// Importamos App, que contiene todas las rutas y páginas.
import App from "./App.jsx";

// Importamos los estilos generales.
import "./index.css";

// Buscamos el div con id root en index.html.
// React pintará toda la aplicación dentro de ese div.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);