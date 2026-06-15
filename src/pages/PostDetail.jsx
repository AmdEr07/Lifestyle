// src/pages/PostDetail.jsx

// Esta página muestra un artículo completo cuando el usuario pulsa en una tarjeta.

import { useEffect, useState } from "react";

// useParams nos permite obtener el id que viene en la URL.
// Link nos permite volver al inicio sin recargar.
import { useParams, Link } from "react-router-dom";

import { servicioBlog } from "../services/api";

function PostDetail() {
  // Sacamos el id de la URL.
  // Ejemplo: /post/5 nos da id = 5.
  const { id } = useParams();

  // Estado donde guardamos el post que se está leyendo.
  const [articulo, setArticulo] = useState(null);

  // Estado para saber si todavía está cargando.
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Pedimos a la API el artículo concreto por su id.
    servicioBlog
      .obtenerArticuloPorId(id)
      .then((datos) => {
        // Guardamos el artículo recibido.
        setArticulo(datos);

        // Quitamos el estado de carga.
        setCargando(false);
      })
      .catch((error) => {
        // Si hay error, lo mostramos en consola.
        console.error(error);

        // Quitamos igualmente la carga.
        setCargando(false);
      });
  }, [id]);

  // Mientras carga, mostramos este texto.
  if (cargando) return <p className="loading-pantalla">Cargando lectura...</p>;

  // Si no encuentra el post, mostramos aviso.
  if (!articulo) return <p className="mensaje-vacio">El artículo no existe. 😢</p>;

  // Guardamos título y contenido con fallback para evitar huecos si falta algún campo.
  const titulo = articulo.title_es || articulo.title || "Artículo sin título";
  const contenido = articulo.content_es || articulo.content || "";

  return (
    <article className="post-detail">
      {/* Enlace para volver al inicio */}
      <Link to="/">
        ← Volver al inicio
      </Link>

      {/* Categoría y fecha del artículo */}
      <div className="detalle-meta">
        <span className="categoria-link">
          {articulo.category?.toUpperCase() || "ARTÍCULO"}
        </span>

        {articulo.created_at && (
          <small className="fecha-articulo">
            Publicado el {new Date(articulo.created_at).toLocaleDateString("es-ES")}
          </small>
        )}
      </div>

      {/* Título del artículo */}
      <h1>{titulo}</h1>

      {/* Imagen del artículo */}
      {articulo.photo_url && (
        <img
          src={articulo.photo_url}
          alt={titulo}
        />
      )}

      {/* Contenido completo */}
      <div className="post-content">
        <p style={{ whiteSpace: "pre-line" }}>
          {contenido}
        </p>
      </div>
    </article>
  );
}

export default PostDetail;
