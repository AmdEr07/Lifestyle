// src/context/AuthContext.jsx

// Este archivo crea un contexto global para la sesión del administrador.
// Así evitamos pasar usuarioConectado y setUsuarioConectado por props en muchas páginas.

// createContext crea una "caja global" donde guardaremos datos compartidos.
import { createContext, useContext, useState } from "react";

// Creamos el contexto de autenticación.
// Al principio está vacío porque lo rellenaremos dentro del proveedor.
const AuthContext = createContext();

// Este componente envuelve la aplicación y comparte la información del login.
export function AuthProvider({ children }) {
  // Estado global para saber si el administrador está conectado.
  // Si existe api_key en localStorage, mantenemos la sesión aunque se recargue la página.
  const [usuarioConectado, setUsuarioConectado] = useState(
    localStorage.getItem("api_key") ? true : false
  );

  // Función para iniciar sesión.
  // Guarda la clave en localStorage y cambia usuarioConectado a true.
  const iniciarSesion = (claveAcceso) => {
    localStorage.setItem("api_key", claveAcceso);
    setUsuarioConectado(true);
  };

  // Función para cerrar sesión.
  // Borra la clave del navegador y cambia usuarioConectado a false.
  const cerrarSesion = () => {
    localStorage.removeItem("api_key");
    setUsuarioConectado(false);
  };

  return (
    <AuthContext.Provider
      value={{
        usuarioConectado,
        setUsuarioConectado,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto fácilmente.
// En vez de repetir useContext(AuthContext), usamos useAuth().
export function useAuth() {
  return useContext(AuthContext);
}
