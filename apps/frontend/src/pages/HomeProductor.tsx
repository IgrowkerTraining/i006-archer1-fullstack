import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useExplotation } from "../context/ExplotationContext";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";
import ActivityRegister from "./ActivityRegister";
import "../styles/HomeProductor.css";

export default function HomeProductor() {
  const { explotations, cargarExplotacionesByProducer } = useExplotation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [explotationSeleccionada, setExplotationSeleccionada] = useState<any>(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 1. Cargar explotaciones al entrar si no están cargadas
  useEffect(() => {
    if (user?.id) {
      cargarExplotacionesByProducer(user.id);
    }
  }, [user?.id, cargarExplotacionesByProducer]);

  // 2. Filtrar explotaciones del usuario actual
  const misExplotations = user
    ? explotations.filter((ex: any) => ex.producer === user.id)
    : [];

  // 3. Gestionar la explotación seleccionada
  useEffect(() => {
    const idRecibido = (location.state as any)?.seleccionadaId;
    
    if (idRecibido) {
      const encontrada = explotations.find((e: any) => e.id === idRecibido);
      if (encontrada) {
        setExplotationSeleccionada(encontrada);
        window.history.replaceState({}, document.title);
        return;
      }
    }

    if (!explotationSeleccionada && misExplotations.length > 0) {
      setExplotationSeleccionada(misExplotations[0]);
    }
  }, [explotations, misExplotations, location.state]);

  useEffect(() => {
    const handleClickAfuera = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickAfuera);
    return () => document.removeEventListener("mousedown", handleClickAfuera);
  }, []);

  return (
    <div className="page-background">
      <div className="producer-frame">
        <div className="home-container">
          <div className="navbar">
            <div className="nav-left">
              {explotationSeleccionada ? (
                <div className="explotacion-info">
                  <i className="bi bi-geo-alt-fill"></i>
                  <span>{explotationSeleccionada.name}</span>
                </div>
              ) : (
                <span className="loading-text">Seleccione Explotación</span>
              )}
            </div>

            <div className="nav-right" ref={menuRef}>
              <button className="user-profile-trigger" onClick={() => setMenuAbierto(!menuAbierto)}>
                <i className="bi bi-person-circle"></i>
              </button>
              {menuAbierto && (
                <div className="custom-dropdown">
                  <div className="dropdown-user-name">{user?.name || "Usuario"}</div>
                  <div className="dropdown-divider"></div>
                  <LogoutButton className="logout-btn-style" />
                </div>
              )}
            </div>
          </div>

          <div className="main-content">
            <div className="buttons">
              <button onClick={() => setShowModal(true)}>Registrar actividad</button>
              <button onClick={() => navigate("/producer-history")}>Historial</button>
              <button>Generar resumen</button>
            </div>
          </div>
        </div>
      </div>

      {showModal && explotationSeleccionada && (
        <ActivityRegister
          explotationId={explotationSeleccionada.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}