// src/pages/HomeProductor.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useExplotaciones, Explotacion } from "../context/ExplotacionesContext";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";
import "../styles/HomeProductor.css";

export default function HomeProductor() {
  const { explotaciones } = useExplotaciones();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [explotacionSeleccionada, setExplotacionSeleccionada] = useState<Explotacion | null>(null);

  useEffect(() => {
    // Filtramos las explotaciones del usuario
    const misExplotaciones = explotaciones.filter(ex => ex.userId === user?.id);

    const idSeleccionado = (location.state as any)?.seleccionadaId;
    if (idSeleccionado) {
      const encontrada = misExplotaciones.find(e => e.id === idSeleccionado);
      setExplotacionSeleccionada(encontrada || misExplotaciones[0] || null);
    } else {
      setExplotacionSeleccionada(misExplotaciones[0] || null);
    }
  }, [explotaciones, location.state, user]);

  const handleCambioExplotacion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const encontrada = explotaciones.find(ex => ex.id === id && ex.userId === user?.id);
    setExplotacionSeleccionada(encontrada || null);
  };

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="navbar">
          <div className="nav-title">Archer1</div>
          <div className="nav-user">
            {user?.name || user?.email} 👤
            <LogoutButton />
          </div>
        </div>

        <div className="top-bar">
          <select value={explotacionSeleccionada?.id || ""} onChange={handleCambioExplotacion}>
            <option value="" disabled>Explotación seleccionada</option>
            {explotaciones
              .filter(ex => ex.userId === user?.id)
              .map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.nombre}</option>
              ))}
          </select>
        </div>

        <div className="buttons">
          <button onClick={() => navigate("/actividad")}>Registrar actividad</button>
          <button>Historial</button>
          <button>Generar resumen</button>
        </div>
      </div>
    </div>
  );
}

