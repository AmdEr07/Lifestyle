// src/components/Navbar.jsx

// Este componente es la barra de navegación superior.

// useState nos permite abrir y cerrar el menú hamburguesa y mostrar el formulario de suscripción.
import { useState } from "react";

// NavLink crea enlaces de navegación.
// useNavigate nos permite cambiar de página desde una función.
import { NavLink, useNavigate } from "react-router-dom";
import { FaGlobeEurope } from "react-icons/fa";

// Importamos el contexto de autenticación para saber si hay sesión iniciada.
import { useAuth } from "../context/AuthContext";

export default function Navbar({
  idioma,
  setIdioma,
  categoriaActiva,
}) {
  // Sacamos del contexto si el administrador está conectado y la función para cerrar sesión.
  const { usuarioConectado, cerrarSesion: cerrarSesionContexto } = useAuth();

  // Hook(Gancho) para movernos a otra ruta desde JavaScript.
  const navegar = useNavigate();

  // Estado que controla si el menú hamburguesa está abierto o cerrado.
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Estado que controla si se ve o no la ventana de suscripción.
  const [mostrarSuscripcion, setMostrarSuscripcion] = useState(false);

  // Estados del pequeño formulario de suscripción.
  const [nombreSuscriptor, setNombreSuscriptor] = useState("");
  const [emailSuscriptor, setEmailSuscriptor] = useState("");
  const [mensajeSuscripcion, setMensajeSuscripcion] = useState("");

  // Diccionario de textos para español e inglés.
  const traduccionesNav = {
    es: {
      navTodos: "Todos",
      navModa: "Moda",
      navBelleza: "Belleza",
      navEstilo: "Estilo Vida",
      navLiving: "Viviendo",
      navAdmin: "Administración",
      navFavoritos: "Favoritos",
      navAcerca: "Sobre mí",
      btnSuscribirse: "Suscríbete",
      btnLog: "Iniciar sesión",
      btnLogout: "Salir",
      tituloSuscripcion: "Suscríbete a la revista",
      textoSuscripcion: "Recibe novedades y artículos destacados de Moda & Lifestyle.",
      placeholderNombre: "Tu nombre",
      placeholderEmail: "Tu email",
      btnEnviar: "Guardar suscripción",
      mensajeOk: "¡Suscripción guardada correctamente!",
      mensajeError: "Por favor, escribe un nombre y un email válido.",
    },
    en: {
      navTodos: "All",
      navModa: "Fashion",
      navBelleza: "Beauty",
      navEstilo: "Lifestyle",
      navLiving: "Living",
      navAdmin: "Administración",
      navFavoritos: "Favorites",
      navAcerca: "About me",
      btnSuscribirse: "Subscribe",
      btnLog: "Login",
      btnLogout: "Logout",
      tituloSuscripcion: "Subscribe to the magazine",
      textoSuscripcion: "Get updates and featured articles from Moda & Lifestyle.",
      placeholderNombre: "Your name",
      placeholderEmail: "Your email",
      btnEnviar: "Save subscription",
      mensajeOk: "Subscription saved successfully!",
      mensajeError: "Please enter a name and a valid email.",
    },
  };

  // Guardamos en t los textos del idioma actual.
  const textos = traduccionesNav[idioma];

  // Lista de categorías.
  // Cada categoría tiene un id, un texto visible y una ruta independiente.
  const categoriasMenu = [
    { id: "TODOS", label: textos.navTodos, ruta: "/" },
    { id: "TENDENCIAS", label: textos.navModa, ruta: "/categoria/tendencias" },
    { id: "BELLEZA", label: textos.navBelleza, ruta: "/categoria/belleza" },
    { id: "ESTILO", label: textos.navEstilo, ruta: "/categoria/estilo" },
    { id: "VIVIENDO", label: textos.navLiving, ruta: "/categoria/viviendo" },
  ];

  // Función para cerrar sesión.
  // Ahora usa el contexto global para borrar la api_key y actualizar la sesión.
  const cerrarSesion = () => {
    cerrarSesionContexto();
    navegar("/");
  };

  // Función para guardar la suscripción en localStorage.
  // Así el botón Suscríbete ya no queda vacío y la web tiene una acción real.
  const guardarSuscripcion = (evento) => {
    evento.preventDefault();

    // Comprobamos que los campos tengan información útil.
    if (!nombreSuscriptor.trim() || !emailSuscriptor.includes("@")) {
      setMensajeSuscripcion(textos.mensajeError);
      return;
    }

    // Recuperamos suscripciones anteriores o empezamos con un array vacío.
    const suscripcionesGuardadas = JSON.parse(
      localStorage.getItem("suscripciones") || "[]"
    );

    // Creamos la nueva suscripción.
    const nuevaSuscripcion = {
      nombre: nombreSuscriptor.trim(),
      email: emailSuscriptor.trim(),
      fecha: new Date().toISOString(),
    };

    // Guardamos la lista actualizada en localStorage.
    localStorage.setItem(
      "suscripciones",
      JSON.stringify([...suscripcionesGuardadas, nuevaSuscripcion])
    );

    // Mostramos feedback positivo y limpiamos el formulario.
    setMensajeSuscripcion(textos.mensajeOk);
    setNombreSuscriptor("");
    setEmailSuscriptor("");
  };

  return (
    <>
      <header className="magazine-navbar">
        <div className="magazine-navbar-left">
          {/* Botón hamburguesa.
              Al pulsarlo cambia menuAbierto de true a false o al revés. */}
          <button
            className={`menu-hamburguesa ${menuAbierto ? "abierto" : ""}`}
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Logo de la web.
              Al pulsarlo vuelve a la página principal. */}
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

          {/* Enlace a la página de favoritos guardados */}
          <NavLink to="/favoritos">
            {textos.navFavoritos}
          </NavLink>

          {/* Enlace a la página personal de Amanda */}
          <NavLink
            to="/sobre-mi"
            className={categoriaActiva === "SOBRE" ? "active-link" : ""}
          >
            {textos.navAcerca}
          </NavLink>

          {/* El enlace Admin solo aparece si hay sesión iniciada */}
          {usuarioConectado && (
            <NavLink to="/admin">
              {textos.navAdmin}
            </NavLink>
          )}
        </nav>

        {/* Parte derecha del navbar */}
        <div className="magazine-navbar-right">
          {/* Selector de idioma */}
          <div className="idioma-wrapper">
            <FaGlobeEurope className="icono-idioma" />

            <select
              className="select-idioma"
              value={idioma}
              onChange={(evento) => setIdioma(evento.target.value)}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Botón de suscripción con funcionalidad real */}
          <button
            className="btn-suscribete"
            onClick={() => setMostrarSuscripcion(true)}
          >
            {textos.btnSuscribirse}
          </button>

          {/* Login solo aparece si NO está conectado */}
          {!usuarioConectado && (
            <button
              className="btn-login"
              onClick={() => navegar("/login")}
            >
              {textos.btnLog}
            </button>
          )}

          {/* Logout solo aparece si SÍ está conectado */}
          {usuarioConectado && (
            <button
              className="btn-login"
              onClick={cerrarSesion}
            >
              {textos.btnLogout}
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
              {/*link de navegación a...*/}
              <NavLink to="/favoritos" onClick={() => setMenuAbierto(false)}>
                {textos.navFavoritos}
              </NavLink>

              <NavLink to="/sobre-mi" onClick={() => setMenuAbierto(false)}>
                {textos.navAcerca}
              </NavLink>

              {usuarioConectado && (
                <NavLink to="/admin" onClick={() => setMenuAbierto(false)}>
                  {textos.navAdmin}
                </NavLink>
              )}

              {!usuarioConectado ? (
                <button onClick={() => { setMenuAbierto(false); navegar("/login"); }}>
                  {textos.btnLog}
                </button>
              ) : ( //Al hacer clic
                <button onClick={() => { setMenuAbierto(false); cerrarSesion(); }}>
                  {textos.btnLogout}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Ventana flotante de suscripción */}
      {mostrarSuscripcion && (
        <div className="modal-suscripcion-fondo">
          <div className="modal-suscripcion">
            <button
              className="cerrar-modal"
              onClick={() => setMostrarSuscripcion(false)}
              aria-label="Cerrar suscripción"
            >
              ×
            </button>

            <h2>{textos.tituloSuscripcion}</h2>
            <p>{textos.textoSuscripcion}</p>

            <form onSubmit={guardarSuscripcion}>
              <input
                type="text"
                placeholder={textos.placeholderNombre}
                value={nombreSuscriptor}
                onChange={(evento) => setNombreSuscriptor(evento.target.value)}
              />

              <input
                type="email"
                placeholder={textos.placeholderEmail}
                value={emailSuscriptor}
                onChange={(evento) => setEmailSuscriptor(evento.target.value)}
              />

              <button type="submit">
                {textos.btnEnviar}
              </button>
            </form>

            {mensajeSuscripcion && (
              <p className="mensaje-suscripcion">
                {mensajeSuscripcion}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
