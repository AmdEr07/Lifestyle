// src/components/Footer.jsx

// Este componente representa el pie de página de la web.
// Se muestra al final del proyecto para dar sensación de página completa y profesional.

// Importamos Link para navegar dentro de la web sin recargar la página.
import { Link } from "react-router-dom";

// Importamos los iconos profesionales del footer.
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-revista">
      {/* Parte principal del footer con el nombre de la revista */}
      <div className="footer-contenido">
        <div className="footer-marca">
          <h2>
            Moda <span>&</span> Lifestyle
          </h2>

          <p>
            Revista digital desarrollada con React, JavaScript, MockAPI y diseño web responsive.
          </p>

          <p className="footer-autora">
            Amanda Espinar · Frontend Developer
          </p>
        </div>

        {/* Enlaces internos de la aplicación */}
        <nav className="footer-links">
          <h3>Navegación</h3>

          <Link to="/">
            Inicio
          </Link>

          <Link to="/favoritos">
            Favoritos
          </Link>

          <Link to="/sobre-mi">
            Sobre mí
          </Link>

          <Link to="/login">
            Administración
          </Link>
        </nav>

        {/* Iconos profesionales de contacto */}
        <div className="footer-redes">
          <h3>Contacto profesional</h3>

          <ul className="lista-iconos-footer">
            <li>
              <a
                href="https://github.com/tuusuario"
                target="_blank"
                rel="noopener noreferrer"
                className="icono-contacto"
                aria-label="GitHub"
                title="GitHub"
              >
                <FaGithub />
              </a>
            </li>

            <li>
              <a
                href="https://linkedin.com/in/tuperfil"
                target="_blank"
                rel="noopener noreferrer"
                className="icono-contacto"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </li>

            <li>
              <a
                href="mailto:tuemail@gmail.com"
                className="icono-contacto"
                aria-label="Email"
                title="Email"
              >
                <FaEnvelope />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea final del footer con copyright */}
      <div className="footer-copy">
        <p>
          © 2026 Moda & Lifestyle. Proyecto final React creado por Amanda Espinar.
        </p>
      </div>
    </footer>
  );
}