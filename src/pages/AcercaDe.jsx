// src/pages/AcercaDe.jsx

// Esta página muestra la parte personal y profesional de Amanda.
// Antes esta sección estaba en la portada, pero ahora se coloca aquí para que la página principal
// sea más limpia y se centre principalmente en los artículos de la revista.

import Navbar from "../components/Navbar";

// Importamos la foto elegida para la sección personal.
import fotoAmanda from "../assets/Foto_proyecto.jpg";

export default function AcercaDe() {
  return (
    <>
      {/* Navbar superior para mantener la misma navegación que en el resto de la web */}
      <Navbar categoriaActiva="SOBRE" />

      <main className="acerca-page">
        {/* Tarjeta principal de presentación personal */}
        <section className="acerca-contenedor">
          {/* Columna izquierda: foto profesional */}
          <div className="acerca-imagen">
            <img
              src={fotoAmanda}
              alt="Amanda Espinar Rodrigo, Frontend Developer"
            />
          </div>

          {/* Columna derecha: texto de presentación */}
          <div className="acerca-texto">
            <span className="categoria-link">FRONTEND DEVELOPER</span>

            <h1>Amanda Espinar</h1>

            <h2>
              Creando experiencias digitales con React, JavaScript y diseño web.
            </h2>

            <p>
              Después de muchos años afrontando retos personales importantes, decidí apostar
              por mí misma y construir una nueva etapa profesional dentro del mundo tecnológico.
            </p>

            <p>
              Actualmente me especializo en desarrollo web frontend y continúo creciendo con
              HTML, CSS, JavaScript, GitHub y React mediante proyectos reales como esta revista digital.
            </p>

            <p>
              La tecnología es una de mis grandes pasiones, pero también me inspiran profundamente
              la moda, el estilo de vida saludable, el deporte, los viajes y todo aquello relacionado
              con la creatividad y el crecimiento personal.
            </p>

            <p>
              Disfruto combinando estos intereses para crear experiencias digitales que no solo sean
              funcionales, sino también visualmente atractivas, cercanas y capaces de conectar con las personas.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
