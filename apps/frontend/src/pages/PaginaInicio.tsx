// src/pages/PaginaInicio.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExplotaciones } from "../context/ExplotacionesContext";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";
import "../styles/PaginaInicio.css"; // 👈 importa el CSS

export default function PaginaInicio() {
  const { explotaciones } = useExplotaciones();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Si ya tiene explotaciones, ir directo a HomeProductor
    if (explotaciones.length > 0) {
      navigate("/homeProductor");
    }
  }, [explotaciones, navigate]);

  return (
    <div className="pagina-inicio-wrapper">
      {/* Navbar */}
      <div className="navbar">
        <div className="nav-title">Archer1</div>
        <div className="nav-user">
          {user?.name || user?.email} 👤
          <LogoutButton />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="pagina-inicio-content">
        <p>Aún no tienes explotaciones creadas</p>
        <button onClick={() => navigate("/agregarExplotacion")}>
          Agregar explotación
        </button>
      </div>
    </div>
  );
}

