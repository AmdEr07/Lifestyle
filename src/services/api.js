// src/services/api.js

// Este archivo centraliza todas las llamadas a MockAPI.
// Así evitamos repetir fetch en Home, Admin, PostDetail u otros componentes.

// Esta función devuelve la URL base de tu proyecto en MockAPI.
const obtenerUrlBase = () => {
  // Este es el identificador de tu proyecto en MockAPI.
  const claveApi = "6a1db606bcc4f20d5ca50746";

  // Devolvemos la dirección principal de la API.
  return `https://${claveApi}.mockapi.io`;
};

// Esta función revisa si la respuesta del servidor ha ido bien.
async function gestionarRespuesta(respuesta) {
  // Si la respuesta no es correcta, lanzamos un error.
  if (!respuesta.ok) {
    throw new Error("Error en la comunicación con el servidor.");
  }

  // Si todo ha ido bien, convertimos la respuesta a JSON.
  return await respuesta.json();
}

// Exportamos un objeto llamado servicioBlog.
// Desde este objeto llamaremos a todas las funciones de la API.
export const servicioBlog = {
  // ============================================================
  // ARTÍCULOS
  // ============================================================

  // Función para traer artículos.
  // Si no recibe categoría, trae todos los artículos.
  obtenerArticulos: async (categoria = "TODOS") => {
    // Creamos la URL de la colección posts.
    const url = `${obtenerUrlBase()}/posts`;

    // Pedimos todos los artículos a MockAPI.
    const datos = await fetch(url).then(gestionarRespuesta);

    // Si la categoría es TODOS, devolvemos todos los artículos.
    if (categoria === "TODOS") return datos;

    // Si hay una categoría concreta, filtramos los artículos por categoría.
    return datos.filter(
      (articulo) => articulo.category?.toUpperCase() === categoria.toUpperCase()
    );
  },

  // Función para traer un único artículo por su id.
  // Se usa en la página de detalle.
  obtenerArticuloPorId: async (id) => {
    // Creamos la URL específica del artículo.
    const url = `${obtenerUrlBase()}/posts/${id}`;

    // Pedimos ese artículo concreto a MockAPI.
    return await fetch(url).then(gestionarRespuesta);
  },

  // Función para crear un artículo nuevo.
  // Se usa desde el panel de administración.
  crearArticulo: async (nuevoArticulo) => {
    // Creamos la URL de la colección posts.
    const url = `${obtenerUrlBase()}/posts`;

    // Enviamos el nuevo artículo con método POST.
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoArticulo),
    }).then(gestionarRespuesta);
  },

  // Función para editar un artículo existente.
  // Se usa para guardar los cambios del formulario de edición.
  actualizarArticulo: async (id, articuloActualizado) => {
    // Creamos la URL del artículo que queremos editar.
    const url = `${obtenerUrlBase()}/posts/${id}`;

    // Enviamos los datos actualizados con método PUT.
    return await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(articuloActualizado),
    }).then(gestionarRespuesta);
  },

  // Función para borrar un artículo.
  // Se usa desde el panel de administración.
  eliminarArticulo: async (id) => {
    // Creamos la URL del artículo que queremos eliminar.
    const url = `${obtenerUrlBase()}/posts/${id}`;

    // Enviamos una petición DELETE a MockAPI.
    return await fetch(url, {
      method: "DELETE",
    }).then(gestionarRespuesta);
  },

  // ============================================================
  // SUSCRIPCIONES
  // ============================================================

  // Función para crear una suscripción nueva.
  // IMPORTANTE: en MockAPI tendré que crear una nueva colección llamada "subscribir" de cara al FUTURO.
  crearSuscriptor: async (nuevoSuscriptor) => {
    // Creamos la URL de la colección subscribir.
    const url = `${obtenerUrlBase()}/subscribir`;

    // Enviamos la suscripción con método POST.
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoSuscriptor),
    }).then(gestionarRespuesta);
  },

  // Función para traer todas las suscripciones.
  // Puede servirte en el futuro para ver emails desde Admin.
  obtenerSuscriptores: async () => {
    // Creamos la URL de subscribir.
    const url = `${obtenerUrlBase()}/subscribir`;

    // Pedimos la lista de suscriptores a MockAPI.
    return await fetch(url).then(gestionarRespuesta);
  },
};

// ============================================================
// FAVORITOS EN LOCALSTORAGE
// ============================================================

// Exportamos otro objeto llamado servicioFavoritos.
// Este no usa MockAPI: guarda los favoritos en el navegador.
export const servicioFavoritos = {
  // Nombre de la clave donde se guardan los favoritos.
  claveAlmacenamiento: "favoritos_blog",

  // Función para obtener favoritos guardados.
  obtenerFavoritos: () => {
    // Buscamos los favoritos en localStorage.
    const favoritosGuardados = localStorage.getItem("favoritos_blog");

    // Si no hay nada guardado, devolvemos un array vacío.
    if (!favoritosGuardados) return [];

    try {
      // Convertimos el texto guardado en un array de JavaScript.
      return JSON.parse(favoritosGuardados);
    } catch (error) {
      // Si el JSON está mal, mostramos el error y devolvemos array vacío.
      console.error("Error leyendo favoritos:", error);
      return [];
    }
  },

  // Función para guardar el array de favoritos.
  guardarFavoritos: (favoritos) => {
    // Convertimos el array a texto y lo guardamos en localStorage.
    localStorage.setItem("favoritos_blog", JSON.stringify(favoritos));
  },

  // Función para comprobar si un artículo ya está en favoritos.
  esFavorito: (id) => {
    // Obtenemos todos los favoritos.
    const favoritos = servicioFavoritos.obtenerFavoritos();

    // Devolvemos true si el id existe dentro del array.
    return favoritos.includes(String(id));
  },

  // Función para añadir o quitar un favorito.
  alternarFavorito: (id) => {
    // Convertimos el id a texto para comparar siempre igual.
    const idTexto = String(id);

    // Obtenemos los favoritos actuales.
    const favoritos = servicioFavoritos.obtenerFavoritos();

    // Comprobamos si el artículo ya estaba guardado.
    const yaExiste = favoritos.includes(idTexto);

    // Si ya existe, lo quitamos.
    if (yaExiste) {
      const nuevosFavoritos = favoritos.filter((idFavorito) => idFavorito !== idTexto);
      servicioFavoritos.guardarFavoritos(nuevosFavoritos);
      return false;
    }

    // Si no existe, lo añadimos.
    const nuevosFavoritos = [...favoritos, idTexto];
    servicioFavoritos.guardarFavoritos(nuevosFavoritos);
    return true;
  },
};