// src/components/Navbar.jsx

// Este componente es la barra de navegación superior.
// Permite moverse por las páginas principales, abrir/cerrar el menú hamburguesa
// y mostrar login/logout según si el administrador ha iniciado sesión.

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ categoriaActiva }) {
  // Sacamos del contexto si el administrador está conectado y la función para cerrar sesión.
  const { usuarioConectado, cerrarSesion: cerrarSesionContexto } = useAuth();

  // Hook para cambiar de página desde JavaScript sin recargar la web.
  const navegar = useNavigate();

  // Estado que controla si el menú hamburguesa está abierto o cerrado.
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Lista de categorías principales de la revista.
  const categoriasMenu = [
    { id: "TODOS", label: "Todos", ruta: "/" },
    { id: "TENDENCIAS", label: "Moda", ruta: "/categoria/tendencias" },
    { id: "BELLEZA", label: "Belleza", ruta: "/categoria/belleza" },
    { id: "ESTILO", label: "Estilo Vida", ruta: "/categoria/estilo" },
    { id: "VIVIENDO", label: "Viviendo", ruta: "/categoria/viviendo" },
  ];

  // Función para cerrar sesión.
  // Usa el contexto global para borrar la api_key y actualizar usuarioConectado.
  const cerrarSesion = () => {
    cerrarSesionContexto();
    navegar("/");
  };

  return (
    <header className="magazine-navbar">
      <div className="magazine-navbar-left">
        {/* Botón hamburguesa: cambia menuAbierto de true a false o al revés. */}
        <button
          className={`menu-hamburguesa ${menuAbierto ? "abierto" : ""}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Logo de la web. Al pulsarlo vuelve a la página principal. */}
        <h1
          className="magazine-brand"
          onClick={() => navegar("/")}
        >
          Moda <span>&</span> Lifestyle
        </h1>
      </div>

      {/* Menú de escritorio */}
      <nav className="magazine-nav-links">
        {categoriasMenu.map((categoria) => (
          <NavLink
            key={categoria.id}
            to={categoria.ruta}
            className={categoriaActiva === categoria.id ? "active-link" : ""}
          >
            {categoria.label}
          </NavLink>
        ))}

        <NavLink to="/favoritos">
          Favoritos
        </NavLink>

        <NavLink
          to="/sobre-mi"
          className={categoriaActiva === "SOBRE" ? "active-link" : ""}
        >
          Sobre mí
        </NavLink>

        {/* El enlace Admin solo aparece si hay sesión iniciada */}
        {usuarioConectado && (
          <NavLink to="/admin">
            Administración
          </NavLink>
        )}
      </nav>

      {/* Parte derecha del navbar: login o logout según la sesión */}
      <div className="magazine-navbar-right">
        {!usuarioConectado ? (
          <button
            className="btn-login"
            onClick={() => navegar("/login")}
          >
            Iniciar sesión
          </button>
        ) : (
          <button
            className="btn-login"
            onClick={cerrarSesion}
          >
            Salir
          </button>
        )}
      </div>

      {/* Menú tipo hoja limpia cuando se abre la hamburguesa */}
      {menuAbierto && (
        <div className="menu-overlay">
          <div className="menu-hoja">
            {categoriasMenu.map((categoria) => (
              <NavLink
                key={categoria.id}
                to={categoria.ruta}
                onClick={() => setMenuAbierto(false)}
              >
                {categoria.label}
              </NavLink>
            ))}

            <NavLink to="/favoritos" onClick={() => setMenuAbierto(false)}>
              Favoritos
            </NavLink>

            <NavLink to="/sobre-mi" onClick={() => setMenuAbierto(false)}>
              Sobre mí
            </NavLink>

            {usuarioConectado && (
              <NavLink to="/admin" onClick={() => setMenuAbierto(false)}>
                Administración
              </NavLink>
            )}

            {!usuarioConectado ? (
              <button
                onClick={() => {
                  setMenuAbierto(false);
                  navegar("/login");
                }}
              >
                Iniciar sesión
              </button>
            ) : (
              <button
                onClick={() => {
                  setMenuAbierto(false);
                  cerrarSesion();
                }}
              >
                Salir
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
