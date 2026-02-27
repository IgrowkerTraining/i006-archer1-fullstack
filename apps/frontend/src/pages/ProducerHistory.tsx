import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useExplotation, Activity, Explotation } from "../context/ExplotationContext";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";
import "../styles/ProducerHistory.css";

const ProducerHistory: React.FC = () => {
  const { user } = useAuth();
  const { explotations, activities } = useExplotation();
  const navigate = useNavigate();

  const [actividadesFiltradas, setActividadesFiltradas] = useState<Activity[]>([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [explotacionSeleccionada, setExplotacionSeleccionada] = useState<Explotation | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let filtradas = [...activities];
    if (explotacionSeleccionada) {
      filtradas = filtradas.filter(act => act.explotationId === explotacionSeleccionada.id);
    }
    setActividadesFiltradas(filtradas);
  }, [activities, explotacionSeleccionada]);

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
      <div className="history-frame">
        
        <div className="navbar">
          <div className="navbar-left">
            <span className="navbar-title">Historial</span>
          </div>

          <div className="navbar-center">
            <select
              className="navbar-select-small"
              value={explotacionSeleccionada?.id || ""}
              onChange={e => setExplotacionSeleccionada(explotations.find(ex => ex.id === e.target.value) || null)}
            >
              <option value="">Todas las Explotaciones</option>
              {explotations.map(ex => <option key={ex.id} value={ex.id}>{ex.nombre}</option>)}
            </select>
          </div>

          <div className="navbar-right" ref={menuRef}>
            <button className="user-icon-btn" onClick={() => setMenuAbierto(!menuAbierto)}>
              <i className="bi bi-person-circle"></i>
            </button>
            {menuAbierto && (
              <div className="dropdown-menu">
                <div className="dropdown-user-info">{user?.name || user?.email || "Usuario"}</div>
                <hr />
                <LogoutButton className="logout-btn-style" />
              </div>
            )}
          </div>
        </div>

        <div className="history-content">
          <h2 className="history-title">Actividades Registradas</h2>

          <div className="cards-container">
            {actividadesFiltradas.length === 0 ? (
              <p className="no-data">No hay actividades registradas.</p>
            ) : (
              actividadesFiltradas.map(act => (
                <div className="activity-card" key={act.id}>
                  <div className="card-header-main">
                    <span className="card-date">{act.fecha}</span>
                    <span className="card-activity">{act.tipo}</span>
                  </div>

                  <div className="card-body">
                    <p><strong>Parcela:</strong> {act.parcela}</p>
                    <p><strong>Responsable:</strong> {act.responsable}</p>
                    <div className="card-description-box">
                      {act.detalles}
                    </div>
                  </div>

                  <div className="card-footer">
                    <button 
                      className="btn-ver-observaciones" 
                      onClick={() => navigate(`/ver-observacion/${act.id}`)}
                      style={{
                        backgroundColor: '#8cbe219f',
                        border: 'none',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        padding: '10px 20px',
                        borderRadius: '15px',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer',
                        color: '#333'
                      }}
                    >
                      Ver observaciones
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <button className="back-link-main" onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default ProducerHistory;