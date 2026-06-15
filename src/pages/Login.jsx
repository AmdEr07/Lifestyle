// src/pages/Login.jsx

// Esta página permite entrar al panel de administración.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // Estado donde guardamos lo que escribe el usuario en el input.
  const [claveAcceso, setClaveAcceso] = useState("");

  // Estado para mostrar un pequeño mensaje si el usuario intenta entrar sin escribir nada.
  const [mensaje, setMensaje] = useState("");

  // Sacamos del contexto la función que inicia sesión.
  const { iniciarSesion: iniciarSesionContexto } = useAuth();

  // Hook para redirigir al usuario al panel admin.
  const navegar = useNavigate();

  // Esta función se ejecuta al enviar el formulario.
  const iniciarSesion = (evento) => {
    // Evitamos que la página se recargue.
    evento.preventDefault();

    // Si el usuario ha escrito algo, lo consideramos válido.
    if (claveAcceso.trim()) {
      // Usamos el contexto para guardar la clave y marcar la sesión como iniciada.
      iniciarSesionContexto(claveAcceso.trim());

      // Redirigimos al panel de administración.
      navegar("/admin");
    } else {
      // Si no escribe nada, avisamos sin romper la aplicación.
      setMensaje("Introduce una clave para poder acceder.");
    }
  };

  return (
    <div className="login-container">
      <h2>Acceso Admin</h2>
      <p>Introduce tu clave para gestionar los artículos de la revista.</p>

      <form onSubmit={iniciarSesion}>
        <input
          type="text"
          placeholder="Introduce tu ID de MockAPI (api_key)"
          value={claveAcceso}
          onChange={(evento) => setClaveAcceso(evento.target.value)}
        />

        <button type="submit">
          CONECTAR
        </button>
      </form>

      {mensaje && <p className="mensaje-admin">{mensaje}</p>}
    </div>
  );
}
