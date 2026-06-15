// src/pages/Admin.jsx

// Esta página es el panel de administración.
// Desde aquí se crean nuevos artículos y también se gestionan artículos ya publicados.
// Ahora el panel incluye CRUD completo: crear, leer, editar y borrar.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { servicioBlog } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  // Sacamos del contexto si el administrador está conectado.
  const { usuarioConectado } = useAuth();

  // Estados del formulario.
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("TENDENCIAS");
  const [urlImagen, setUrlImagen] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Estado donde guardamos todos los artículos para poder gestionarlos desde Admin.
  const [articulos, setArticulos] = useState([]);

  // Estado para saber si estamos cargando la lista de artículos.
  const [cargando, setCargando] = useState(false);

  // Estado que guarda el id del artículo que estamos editando.
  // Si vale null, el formulario está en modo crear.
  // Si tiene un id, el formulario está en modo editar.
  const [editandoId, setEditandoId] = useState(null);

  // Hook para cambiar de página.
  const navegar = useNavigate();

  // Función para cargar todos los artículos desde MockAPI.
  const cargarArticulos = async () => {
    try {
      setCargando(true);
      const datos = await servicioBlog.obtenerArticulos("TODOS");
      setArticulos(datos);
    } catch (error) {
      console.error(error);
      setMensaje("No se pudieron cargar los artículos.");
    } finally {
      setCargando(false);
    }
  };

  // useEffect carga los artículos cuando se entra en el panel de administración.
  useEffect(() => {
    if (usuarioConectado) {
      cargarArticulos();
    }
  }, [usuarioConectado]);

  // Si no hay login, no dejamos entrar al panel.
  if (!usuarioConectado) {
    return (
      <div className="admin-container">
        <h2>Acceso restringido</h2>
        <p>Debes iniciar sesión para entrar al panel de administración.</p>
        <button onClick={() => navegar("/login")}>
          Ir al login
        </button>
      </div>
    );
  }

  // Función para limpiar el formulario.
  // La usamos después de crear, después de editar y al cancelar una edición.
  const limpiarFormulario = () => {
    setTitulo("");
    setContenido("");
    setCategoria("TENDENCIAS");
    setUrlImagen("");
    setEditandoId(null);
  };

  // Función para crear o editar un post.
  // Si editandoId es null, crea un artículo nuevo.
  // Si editandoId tiene valor, actualiza el artículo existente.
  const guardarArticulo = async (evento) => {
    // Evitamos que el formulario recargue la página.
    evento.preventDefault();

    // Creamos el objeto que enviaremos a MockAPI.
    const datosArticulo = {
      title_es: titulo,
      content_es: contenido,
      category: categoria,
      photo_url: urlImagen,
      updated_at: new Date().toISOString(),
    };

    try {
      if (editandoId) {
        // UPDATE: si hay un id en edición, actualizamos ese artículo.
        await servicioBlog.actualizarArticulo(editandoId, datosArticulo);
        setMensaje("¡Artículo editado con éxito!");
      } else {
        // CREATE: si no estamos editando, creamos un artículo nuevo.
        await servicioBlog.crearArticulo({
          ...datosArticulo,
          created_at: new Date().toISOString(),
        });
        setMensaje("¡Artículo publicado con éxito!");
      }

      // Limpiamos el formulario y recargamos la lista para ver los cambios.
      limpiarFormulario();
      await cargarArticulos();
    } catch (error) {
      // Si hay error, avisamos al usuario.
      setMensaje("Hubo un error al guardar. Inténtalo de nuevo.");
      console.error(error);
    }
  };

  // Función para preparar el formulario en modo edición.
  const prepararEdicion = (articulo) => {
    // Guardamos el id del artículo que se va a editar.
    setEditandoId(articulo.id);

    // Rellenamos el formulario con los datos actuales del artículo.
    setTitulo(articulo.title_es || articulo.title || "");
    setContenido(articulo.content_es || articulo.content || "");
    setCategoria(articulo.category || "TENDENCIAS");
    setUrlImagen(articulo.photo_url || "");

    // Mostramos un mensaje para que el usuario sepa que está editando.
    setMensaje("Estás editando un artículo. Modifica los campos y guarda los cambios.");

    // Subimos la pantalla al formulario para que sea cómodo editar.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Función para borrar un artículo.
  const borrarArticulo = async (id) => {
    // Confirmamos antes de borrar para evitar eliminar por accidente.
    const confirmar = window.confirm("¿Seguro que quieres borrar este artículo?");

    if (!confirmar) return;

    try {
      // DELETE: borramos el artículo de MockAPI.
      await servicioBlog.eliminarArticulo(id);

      // Actualizamos el estado quitando el artículo borrado.
      setArticulos((articulosAnteriores) =>
        articulosAnteriores.filter((articulo) => articulo.id !== id)
      );

      // Si estábamos editando justo ese artículo, limpiamos el formulario.
      if (editandoId === id) {
        limpiarFormulario();
      }

      setMensaje("Artículo borrado correctamente.");
    } catch (error) {
      setMensaje("No se pudo borrar el artículo.");
      console.error(error);
    }
  };

  // Estadísticas simples para reforzar el panel de administración.
  const totalArticulos = articulos.length;
  const totalTendencias = articulos.filter((articulo) => articulo.category === "TENDENCIAS").length;
  const totalBelleza = articulos.filter((articulo) => articulo.category === "BELLEZA").length;
  const totalEstilo = articulos.filter((articulo) => articulo.category === "ESTILO").length;
  const totalViviendo = articulos.filter((articulo) => articulo.category === "VIVIENDO").length;

  return (
    <div className="admin-container admin-container-grande">
      <h2>{editandoId ? "Editar artículo" : "Panel de Gestión: Crear Artículo"}</h2>

      {/* Mensaje de éxito o error */}
      <p className="mensaje-admin">{mensaje}</p>

      {/* Bloque de estadísticas del panel */}
      <section className="admin-stats">
        <div>
          <strong>{totalArticulos}</strong>
          <span>Total artículos</span>
        </div>
        <div>
          <strong>{totalTendencias}</strong>
          <span>Tendencias</span>
        </div>
        <div>
          <strong>{totalBelleza}</strong>
          <span>Belleza</span>
        </div>
        <div>
          <strong>{totalEstilo}</strong>
          <span>Estilo</span>
        </div>
        <div>
          <strong>{totalViviendo}</strong>
          <span>Viviendo</span>
        </div>
      </section>

      {/* Formulario para crear o editar artículos */}
      <form onSubmit={guardarArticulo} className="form-admin">
        <label>Categoría Editorial:</label>

        <select
          value={categoria}
          onChange={(evento) => setCategoria(evento.target.value)}
        >
          <option value="TENDENCIAS">Tendencias</option>
          <option value="BELLEZA">Belleza</option>
          <option value="ESTILO">Estilo de Vida</option>
          <option value="VIVIENDO">Viviendo</option>
        </select>

        <input
          type="text"
          placeholder="Título del artículo"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          required
        />

        <input
          type="text"
          placeholder="URL de la imagen"
          value={urlImagen}
          onChange={(evento) => setUrlImagen(evento.target.value)}
          required
        />

        <textarea
          placeholder="Contenido..."
          rows="6"
          value={contenido}
          onChange={(evento) => setContenido(evento.target.value)}
          required
        />

        <button type="submit">
          {editandoId ? "GUARDAR CAMBIOS" : "PUBLICAR ARTÍCULO"}
        </button>

        {/* Este botón solo aparece cuando estamos editando un artículo */}
        {editandoId && (
          <button
            type="button"
            className="btn-cancelar-edicion"
            onClick={limpiarFormulario}
          >
            CANCELAR EDICIÓN
          </button>
        )}
      </form>

      {/* Lista de artículos existentes para poder editar o borrar */}
      <section className="admin-listado">
        <h3>Artículos publicados</h3>

        {cargando ? (
          <p>Cargando artículos...</p>
        ) : articulos.length === 0 ? (
          <p>No hay artículos publicados todavía.</p>
        ) : (
          <div className="admin-articulos-grid">
            {articulos.map((articulo) => (
              <article key={articulo.id} className="admin-articulo-card">
                {articulo.photo_url && (
                  <img
                    src={articulo.photo_url}
                    alt={articulo.title_es || articulo.title || "Artículo"}
                  />
                )}

                <div>
                  <span className="categoria-link">
                    {articulo.category?.toUpperCase() || "SIN CATEGORÍA"}
                  </span>

                  <h4>{articulo.title_es || articulo.title || "Artículo sin título"}</h4>

                  {articulo.created_at && (
                    <small>
                      Publicado el {new Date(articulo.created_at).toLocaleDateString("es-ES")}
                    </small>
                  )}

                  <p>
                    {(articulo.content_es || articulo.content || "").substring(0, 120)}...
                  </p>

                  <div className="admin-card-botones">
                    <button
                      type="button"
                      onClick={() => prepararEdicion(articulo)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="btn-borrar"
                      onClick={() => borrarArticulo(articulo.id)}
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
