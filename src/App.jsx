// src/App.jsx

// Este archivo es el centro de la aplicación.
// Aquí se organizan las rutas, es decir, las “páginas” de mi bonito blog.

// Importamos BrowserRouter, Routes y Route para poder tener varias páginas en React. (Enrutador del navegador, rutas y ruta)
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importamos las páginas principales del proyecto.
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import Favoritos from "./pages/Favoritos";
import NotFound from "./pages/NotFound";
import AcercaDe from "./pages/AcercaDe";
import Footer from "./components/Footer";

// Importamos el proveedor del contexto de autenticación.
// Gracias a AuthProvider, toda la app puede saber si el admin está conectado. (Proveedor de autenticación)

import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    // BrowserRouter envuelve toda la aplicación para activar la navegación.  NAVEGADOR ENRUTADO
    <BrowserRouter>
      {/* AuthProvider comparte el login/logout con todas las páginas y componentes */}
      <AuthProvider>
        {/* Routes contiene todas las rutas de la web */}
        <Routes>
          {/* Ruta principal: muestra la portada del blog */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Ruta independiente para cada categoría */}
          <Route
            path="/categoria/:categoriaUrl"
            element={<Home />}
          />

          {/* Ruta para leer un artículo individual */}
          <Route
            path="/post/:id"
            element={<PostDetail />}
          />

          {/* Ruta para la página personal "Sobre mí" */}
          <Route
            path="/sobre-mi"
            element={<AcercaDe />}
          />

          {/* Ruta antigua "Acerca de".
              La dejamos para que no se rompa ningún enlace anterior. */}
          <Route
            path="/acerca-de"
            element={<AcercaDe />}
          />

          {/* Ruta para ver los artículos guardados como favoritos */}
          <Route
            path="/favoritos"
            element={<Favoritos />}
          />

          {/* Ruta del login del administrador */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Ruta del panel de administración */}
          <Route
            path="/admin"
            element={<Admin />}
          />

          {/* Ruta comodín: se muestra si el usuario escribe una URL que no existe */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>

        {/* Footer se coloca fuera de Routes para que aparezca al final de todas las páginas */}
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
