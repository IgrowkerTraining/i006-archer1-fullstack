import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useExplotation, Explotation } from "../context/ExplotationContext";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";
import "../styles/HomeProductor.css";

export default function HomeProductor() {
  const { explotations } = useExplotation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [explotationSeleccionada, setExplotationSeleccionada] = useState<Explotation | null>(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const misExplotations = explotations.filter(ex => ex.userId === user?.id);

  useEffect(() => {
    const idSeleccionado = (location.state as any)?.seleccionadaId;
    if (idSeleccionado) {
      const encontrada = misExplotations.find(e => e.id === idSeleccionado);
      setExplotationSeleccionada(encontrada || misExplotations[0] || null);
    } else {
      setExplotationSeleccionada(misExplotations[0] || null);
    }
  }, [misExplotations, location.state]);

  const handleCambioExplotation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const encontrada = misExplotations.find(ex => ex.id === id);
    setExplotationSeleccionada(encontrada || null);
  };

  const toggleMenu = () => setMenuAbierto(prev => !prev);

  useEffect(() => {
    const handleClickFuera = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => {
      document.removeEventListener("mousedown", handleClickFuera);
    };
  }, []);

  return (
  <div className="page-background">
    <div className="producer-frame">
      
      <div className="home-container">
        <div className="navbar">
          <div className="nav-left">
            <select
              value={explotationSeleccionada?.id || ""}
              onChange={handleCambioExplotation}
            >
              <option value="" disabled>
                Explotación seleccionada
              </option>
              {misExplotations.map(ex => (
                <option key={ex.id} value={ex.id}>
                  {ex.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="nav-right">
            <div className="user-menu" ref={menuRef}>
              <div className="user-chip" onClick={toggleMenu}>
                <span className="user-icon">👤</span>
                <span className="user-name">
                  {user?.name || user?.email}
                </span>
              </div>

              {menuAbierto && (
                <div className="dropdown-menu">
                  <LogoutButton />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="buttons">
          <button onClick={() => navigate("/activity")}>
            Registrar actividad
          </button>

          <button onClick={() => navigate("/producer-history")}>
            Historial
          </button>

          <button>
            Generar resumen
          </button>
        </div>

      </div>
    </div>
  </div>
);
}