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

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickAfuera = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickAfuera);
    return () => document.removeEventListener("mousedown", handleClickAfuera);
  }, []);

  const handleVerObservaciones = (actId: string) => {
    navigate(`/ver-observacion/${actId}`);
  };

  return (
    <div className="page-background">
      <div className="history-frame">
        <div className="navbar">
          <div className="navbar-left"><span className="navbar-title">Historial</span></div>
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
            <div className="user-chip" onClick={() => setMenuAbierto(!menuAbierto)}>
              <span>👤</span>
              <span className="user-name">{user?.name || user?.email || "Usuario Invitado"}</span>
            </div>
            {menuAbierto && <div className="dropdown-menu"><LogoutButton /></div>}
          </div>
        </div>

        <h2 className="history-title">Actividades Registradas</h2>

        <div className="table-container">
          {actividadesFiltradas.length === 0 ? (
            <p className="no-data">No hay actividades registradas.</p>
          ) : (
            <div className="cards-container">
              {actividadesFiltradas.map(act => (
                <div className="activity-card" key={act.id}>
                  {/* Vista de lectura única (Sin formulario de edición) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '15px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '10px' }}>
                    <span style={{ fontSize: '14px', color: '#444', fontWeight: '600', display: 'block' }}>{act.fecha}</span>
                    <h3 style={{ fontSize: '32px', color: '#000000', fontWeight: '900', margin: '5px 0 0 0', padding: '0', lineHeight: '1', display: 'block' }}>
                      {act.tipo}
                    </h3> 
                  </div>

                  <div className="card-body">
                    <p><strong>Parcela:</strong> {act.parcela}</p>
                    <p><strong>Responsable:</strong> {act.responsable}</p>
                    <div className="card-description-box" style={{ marginTop: '10px', background: 'rgba(255, 255, 255, 0.3)', padding: '12px', borderRadius: '8px', color: '#000' }}>
                      {act.detalles}
                    </div>
                  </div>

                  <div className="card-footer" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '15px' }}>
                    {/* El botón de editar ha sido eliminado por orden superior */}
                    <button 
                      className="btn-obs-transparent" 
                      onClick={() => handleVerObservaciones(act.id)}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(0,0,0,0.2)',
                        borderRadius: '15px',
                        padding: '5px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#444',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      Ver observaciones
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="back-link-container">
        <button className="back-link" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
};

export default ProducerHistory;