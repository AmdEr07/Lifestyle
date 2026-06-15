// src/pages/Favoritos.jsx

// Esta página muestra los artículos que el usuario ha guardado como favoritos.
// Los favoritos se guardan en localStorage desde ArticleCard.jsx.

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import { servicioBlog } from "../services/api";

export default function Favoritos() {
  // Estado para el idioma del navbar.
  const [idioma, setIdioma] = useState("es");

  // Estado donde guardamos los artículos favoritos completos.
  const [favoritos, setFavoritos] = useState([]);

  // Estado para saber si estamos cargando datos.
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarFavoritos = async () => {
      try {
        // Recuperamos los ids guardados como favoritos.
        const idsFavoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");

        // Pedimos todos los artículos a la API.
        const todosLosArticulos = await servicioBlog.obtenerArticulos("TODOS");

        // Filtramos solo los artículos cuyo id está guardado en localStorage.
        const articulosFavoritos = todosLosArticulos.filter((articulo) =>
          idsFavoritos.includes(articulo.id)
        );

        setFavoritos(articulosFavoritos);
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarFavoritos();
  }, []);

  return (
    <>
      <Navbar
        idioma={idioma}
        setIdioma={setIdioma}
        categoriaActiva=""

      />

      <main className="favoritos-page">
        <h2>Mis artículos favoritos</h2>
        <p>
          Aquí aparecen los artículos que has guardado usando el botón de favoritos.
        </p>

        {cargando ? (
          <p className="loading-pantalla">Cargando favoritos...</p>
        ) : favoritos.length === 0 ? (
          <p className="mensaje-vacio">
            Todavía no has guardado ningún artículo como favorito.
          </p>
        ) : (
          <div className="bloque-secundario-posts">
            {favoritos.map((articulo) => (
              <ArticleCard
                key={articulo.id}
                articulo={articulo}
                idioma={idioma}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
