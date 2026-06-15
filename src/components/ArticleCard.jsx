// src/components/ArticleCard.jsx

// Este componente representa cada tarjeta pequeña de artículo.

// Importamos useState para cambiar visualmente el botón de favoritos.
import { useState } from "react";

// Importamos Link para poder ir al detalle del artículo sin recargar la web.
import { Link } from "react-router-dom";

export default function ArticleCard({ articulo, idioma }) {
  // Buscamos el título según el idioma elegido.
  // Si no existe en ese idioma, usamos title_es.
  // Si tampoco existe, usamos title.
  // Y si no hay nada, ponemos un texto por defecto.
  const titulo =
    articulo[`title_${idioma}`] ||
    articulo.title_es ||
    articulo.title ||
    "Artículo sin título";

  // Hacemos lo mismo con el contenido.
  const contenido =
    articulo[`content_${idioma}`] ||
    articulo.content_es ||
    articulo.content ||
    "";

  // Recuperamos los favoritos guardados en localStorage.
  // Si todavía no hay favoritos, usamos un array vacío.
  const favoritosGuardados = JSON.parse(
    localStorage.getItem("favoritos") || "[]"
  );

  // Estado que comprueba si este artículo ya está guardado como favorito.
  const [esFavorito, setEsFavorito] = useState(
    favoritosGuardados.includes(articulo.id)
  );

  // Función para añadir o quitar favoritos.
  // Ahora el botón ya no muestra solo un alert: guarda datos reales en localStorage.
  const cambiarFavorito = () => {
    // Volvemos a leer localStorage por si otro artículo cambió la lista.
    const favoritosActuales = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

    let nuevosFavoritos;

    // Si ya estaba guardado, lo quitamos.
    if (favoritosActuales.includes(articulo.id)) {
      nuevosFavoritos = favoritosActuales.filter((idFavorito) => idFavorito !== articulo.id);
      setEsFavorito(false);
    } else {
      // Si no estaba guardado, lo añadimos.
      nuevosFavoritos = [...favoritosActuales, articulo.id];
      setEsFavorito(true);
    }

    // Guardamos la nueva lista de favoritos.
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  return (
    <article className="post-editorial-secundario">
      {/* Imagen del artículo */}
      <div className="contenedor-img-secundario">
        {articulo.photo_url && (
          <Link to={`/post/${articulo.id}`}>
            <img
              src={articulo.photo_url}
              alt={titulo}
              loading="lazy"
            />
          </Link>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="contenido-editorial">
        {/* Categoría del artículo */}
        <span className="categoria-link">
          {articulo.category?.toUpperCase() || "TENDENCIAS"}
        </span>

        {/* Título con enlace al detalle */}
        <h3>
          <Link to={`/post/${articulo.id}`}>
            {titulo}
          </Link>
        </h3>

        {/* Fecha de publicación, si existe en la API */}
        {articulo.created_at && (
          <small className="fecha-articulo">
            Publicado el {new Date(articulo.created_at).toLocaleDateString("es-ES")}
          </small>
        )}

        {/* Extracto corto del contenido */}
        <p>{contenido.substring(0, 100)}...</p>

        {/* Botón de favoritos real usando localStorage */}
        <button
          type="button"
          className={`btn-favorito ${esFavorito ? "favorito-activo" : ""}`}
          onClick={cambiarFavorito}
        >
          {esFavorito ? "♥ Guardado" : "♡ Añadir a favoritos"}
        </button>
      </div>
    </article>
  );
}
