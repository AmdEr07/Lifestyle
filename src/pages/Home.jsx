// src/pages/Home.jsx

// Esta página funciona como portada principal de la revista.
// También muestra cada categoría cuando el usuario entra en /categoria/tendencias,
// /categoria/belleza, /categoria/estilo o /categoria/viviendo.

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { servicioBlog } from "../services/api";
import ArticleCard from "../components/ArticleCard";

export default function Home() {
  // Estado para saber el idioma actual de la web.
  const [idioma, setIdioma] = useState("es");

  // Estado donde guardamos todos los artículos que vienen de MockAPI.
  const [articulos, setArticulos] = useState([]);

  // Estado que controla si estamos cargando artículos.
  const [cargando, setCargando] = useState(false);

  // Estado para el buscador de artículos.
  const [busqueda, setBusqueda] = useState("");

  // Recogemos la categoría desde la URL.
  const { categoriaUrl } = useParams();

  // Si no hay categoría en la URL, estamos en la Home principal.
  const categoriaActual = categoriaUrl ? categoriaUrl.toUpperCase() : "TODOS";

  // Saber si estamos en la portada o en una categoría.
  const esPortadaPrincipal = categoriaActual === "TODOS";

  // Textos propios de cada sección para que cada categoría parezca una página real.
  const textosCategoria = {
    TODOS: {
      etiqueta: "MODA & LIFESTYLE",
      titulo: "Tu revista digital de moda, belleza y estilo de vida.",
      descripcion:
        "Explora artículos, guarda tus favoritos y navega por secciones pensadas para inspirarte.",
    },
    TENDENCIAS: {
      etiqueta: "SECCIÓN MODA",
      titulo: "Moda, tendencias y estilo personal",
      descripcion:
        "Looks, inspiración y propuestas para construir un estilo propio con elegancia y naturalidad.",
    },
    BELLEZA: {
      etiqueta: "SECCIÓN BELLEZA",
      titulo: "Belleza, cuidado y bienestar",
      descripcion:
        "Rutinas, autocuidado y pequeños rituales para sentirte bien por dentro y por fuera.",
    },
    ESTILO: {
      etiqueta: "SECCIÓN ESTILO DE VIDA",
      titulo: "Estilo de vida, deporte, viajes e inspiración",
      descripcion:
        "Ideas para vivir mejor, moverte más, descubrir lugares y cuidar tu crecimiento personal.",
    },
    VIVIENDO: {
      etiqueta: "SECCIÓN VIVIENDO",
      titulo: "Hogar, decoración y vida lenta",
      descripcion:
        "Espacios bonitos, calma visual y detalles que hacen que una casa se sienta como hogar.",
    },
  };

  const textoActual = textosCategoria[categoriaActual] || textosCategoria.TODOS;

  // Cargamos artículos cuando entra la página o cambia la categoría.
  useEffect(() => {
    const cargarArticulos = async () => {
      try {
        setCargando(true);
        const datos = await servicioBlog.obtenerArticulos(categoriaActual);
        setArticulos(datos);
      } catch (error) {
        console.error("Error cargando artículos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarArticulos();
  }, [categoriaActual]);

  // Filtro del buscador.
  const articulosFiltrados = articulos.filter((articulo) => {
    const textoBusqueda = busqueda.toLowerCase();

    const titulo = (articulo.title_es || articulo.title || "").toLowerCase();
    const contenido = (articulo.content_es || articulo.content || "").toLowerCase();
    const categoria = (articulo.category || "").toLowerCase();

    return (
      titulo.includes(textoBusqueda) ||
      contenido.includes(textoBusqueda) ||
      categoria.includes(textoBusqueda)
    );
  });

  // Primer artículo destacado solo en Home.
  const articuloDestacado =
    articulosFiltrados.length > 0 ? articulosFiltrados[0] : null;

  // En Home evitamos repetir el destacado en la lista inferior.
  const articulosParaMostrar =
    esPortadaPrincipal && articulosFiltrados.length > 1
      ? articulosFiltrados.slice(1)
      : articulosFiltrados;

  return (
    <>
      <Navbar
        idioma={idioma}
        setIdioma={setIdioma}
        categoriaActiva={categoriaActual}

      />

      <main className="magazine-layout">
        {esPortadaPrincipal ? (
          <>
            {/* Portada visual tipo revista con identidad verde salvia */}
            <section className="portada-salvia">
              <div className="portada-salvia-texto">
                <span className="pretitle-salvia">
                  INSPÍRATE · DESCUBRE · VIVE
                </span>

                <h1>
                  Moda <span>&</span> Lifestyle
                </h1>

                <p>
                  Una revista digital creada para explorar moda, belleza, estilo
                  de vida, hogar, viajes y bienestar.
                </p>

                <Link
                  to="/categoria/tendencias"
                  className="btn-portada-salvia"
                >
                  Explorar la revista
                </Link>
              </div>

              <div className="portada-salvia-imagen">
                <div className="imagen-hojas"></div>
              </div>
            </section>

            {/* Categorías que llevan a páginas/rutas reales */}
            <section className="categorias-salvia">
              <Link
                to="/categoria/tendencias"
                className="categoria-salvia-card"
              >
                <span className="icono-categoria">⌁</span>
                <h3>Moda</h3>
                <p>Tendencias, looks y estilo personal</p>
              </Link>

              <Link
                to="/categoria/belleza"
                className="categoria-salvia-card"
              >
                <span className="icono-categoria">✧</span>
                <h3>Belleza</h3>
                <p>Cuidados, rutinas y maquillaje</p>
              </Link>

              <Link
                to="/categoria/estilo"
                className="categoria-salvia-card"
              >
                <span className="icono-categoria">◌</span>
                <h3>Estilo de vida</h3>
                <p>Bienestar, deporte, viajes y más</p>
              </Link>

              <Link
                to="/categoria/viviendo"
                className="categoria-salvia-card"
              >
                <span className="icono-categoria">⌂</span>
                <h3>Viviendo</h3>
                <p>Decoración, hogar y espacios</p>
              </Link>
            </section>
          </>
        ) : (
          // Cabecera propia para cada categoría.
          <section className="cabecera-categoria-salvia">
            <span className="categoria-link">
              {textoActual.etiqueta}
            </span>

            <h1>{textoActual.titulo}</h1>

            <p>{textoActual.descripcion}</p>
          </section>
        )}

        {/* Buscador de artículos */}
        <section className="buscador-section" id="articulos">
          <label htmlFor="buscador-articulos">
            Buscar en la revista
          </label>

          <input
            id="buscador-articulos"
            type="text"
            placeholder="Buscar por título, contenido o categoría..."
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </section>

        {cargando && (
          <p className="loading-pantalla">
            Cargando artículos...
          </p>
        )}

        {!cargando && articulosFiltrados.length === 0 && (
          <p className="mensaje-vacio">
            No se han encontrado artículos.
          </p>
        )}

        {/* Artículo destacado solo en portada */}
        {!cargando && esPortadaPrincipal && articuloDestacado && (
          <section className="articulo-destacado-salvia">
            <div className="articulo-destacado-imagen">
              {articuloDestacado.photo_url && (
                <img
                  src={articuloDestacado.photo_url}
                  alt={
                    articuloDestacado[`title_${idioma}`] ||
                    articuloDestacado.title_es ||
                    articuloDestacado.title ||
                    "Artículo destacado"
                  }
                />
              )}
            </div>

            <div className="articulo-destacado-texto">
              <span className="categoria-link">
                {articuloDestacado.category?.toUpperCase() || "DESTACADO"}
              </span>

              <h2>
                {articuloDestacado[`title_${idioma}`] ||
                  articuloDestacado.title_es ||
                  articuloDestacado.title ||
                  "Artículo sin título"}
              </h2>

              <p>
                {(articuloDestacado[`content_${idioma}`] ||
                  articuloDestacado.content_es ||
                  articuloDestacado.content ||
                  "").substring(0, 180)}
                ...
              </p>

              <Link
                to={`/post/${articuloDestacado.id}`}
                className="btn-leer-articulo"
              >
                Leer artículo
              </Link>
            </div>
          </section>
        )}

        {!cargando && articulosParaMostrar.length > 0 && (
          <section className="titulo-listado-salvia">
            <span className="categoria-link">
              {esPortadaPrincipal
                ? "ÚLTIMOS ARTÍCULOS"
                : textoActual.etiqueta}
            </span>

            <h2>
              {esPortadaPrincipal
                ? "Lo más reciente"
                : "Artículos de esta sección"}
            </h2>
          </section>
        )}

        {!cargando && articulosParaMostrar.length > 0 && (
          <div className="bloque-secundario-posts">
            {articulosParaMostrar.map((articulo) => (
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