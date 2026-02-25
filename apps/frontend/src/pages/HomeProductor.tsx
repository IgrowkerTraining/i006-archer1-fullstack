import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useExplotation, Explotation } from "../context/ExplotationContext";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";
import ActivityRegister from "./ActivityRegister"; // Importamos el modal
import "../styles/HomeProductor.css";

export default function HomeProductor() {
  const { explotations } = useExplotation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [explotationSeleccionada, setExplotationSeleccionada] = useState<Explotation | null>(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showModal, setShowModal] = useState(false); // ESTADO PARA EL MODAL
  const menuRef = useRef<HTMLDivElement>(null);

  const misExplotations = user ? explotations.filter(ex => ex.userId === user.id) : explotations;

  useEffect(() => {
    const idRecibido = (location.state as any)?.seleccionadaId;
    if (idRecibido) {
      const encontrada = explotations.find(e => e.id === idRecibido);
      if (encontrada) {
        setExplotationSeleccionada(encontrada);
        window.history.replaceState({}, document.title);
        return; 
      }
    }
    if (explotationSeleccionada) {
        const sigueExistiendo = explotations.some(e => e.id === explotationSeleccionada.id);
        if (sigueExistiendo) return;
    }
    if (misExplotations.length > 0) {
      setExplotationSeleccionada(misExplotations[0]);
    }
  }, [explotations, misExplotations, location.state]);

  const handleCambioExplotation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const encontrada = misExplotations.find(ex => ex.id === e.target.value);
    setExplotationSeleccionada(encontrada || null);
  };

  return (
    <div className="page-background">
      <div className="producer-frame">
        <div className="home-container">
          <div className="navbar">
            <div className="nav-left">
              <select value={explotationSeleccionada?.id || ""} onChange={handleCambioExplotation}>
                <option value="" disabled>Explotación seleccionada</option>
                {misExplotations.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.nombre}</option>
                ))}
              </select>
            </div>

            <div className="nav-right">
              <div className="user-menu" ref={menuRef}>
                <div className="user-chip" onClick={() => setMenuAbierto(!menuAbierto)}>
                  <span className="user-icon">👤</span>
                  <span className="user-name">{user?.name || "Usuario"}</span>
                </div>
                {menuAbierto && <div className="dropdown-menu"><LogoutButton /></div>}
              </div>
            </div>
          </div>

          <div className="buttons">
            {/* AHORA ABRE EL MODAL EN LUGAR DE NAVEGAR */}
            <button onClick={() => setShowModal(true)}>Registrar actividad</button>
            <button onClick={() => navigate("/producer-history")}>Historial</button>
            <button>Generar resumen</button>
          </div>
        </div>
      </div>

      {/* RENDERIZADO DEL MODAL */}
      {showModal && explotationSeleccionada && (
        <ActivityRegister 
          explotationId={explotationSeleccionada.id} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}