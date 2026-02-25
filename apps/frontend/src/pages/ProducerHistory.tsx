import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useExplotation, Activity, Explotation } from "../context/ExplotationContext";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";
import "../styles/ProducerHistory.css";

const ProducerHistory: React.FC = () => {
  const { user } = useAuth();
  const { explotations, activities, actualizarActivity } = useExplotation();
  const navigate = useNavigate();

  const [actividadesFiltradas, setActividadesFiltradas] = useState<Activity[]>([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [explotacionSeleccionada, setExplotacionSeleccionada] = useState<Explotation | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [idEditando, setIdEditando] = useState<string | null>(null);
  const [tempData, setTempData] = useState<Activity | null>(null);

  const tiposActividad = ["Riego", "Abonado", "Tratamiento", "Poda", "Cosecha"];

  useEffect(() => {
    let filtradas = [...activities];
    if (explotacionSeleccionada) {
      filtradas = filtradas.filter(act => act.explotationId === explotacionSeleccionada.id);
    }
    setActividadesFiltradas(filtradas);
  }, [activities, explotacionSeleccionada]);

  const handleEditClick = (act: Activity) => {
    setIdEditando(act.id);
    setTempData({ ...act });
  };

  const ejecutarGuardado = (e: React.MouseEvent) => {
    e.preventDefault();
    if (tempData && typeof actualizarActivity === "function") {
      actualizarActivity(tempData);
      setIdEditando(null);
      setTempData(null);
    }
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
                  {idEditando === act.id ? (
                    <div className="edit-form-card">
                      <div className="form-group">
                        <label>Tipo de Actividad</label>
                        {/* 1. CAMBIO A SELECT AQUÍ */}
                        <select 
                          className="filter-select"
                          value={tempData?.tipo || ""} 
                          onChange={e => setTempData(prev => prev ? {...prev, tipo: e.target.value} : null)}
                        >
                          <option value="">Selecciona un tipo</option>
                          {tiposActividad.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Fecha</label>
                        <input 
                          type="date" 
                          value={tempData?.fecha || ""} 
                          onChange={e => setTempData(prev => prev ? {...prev, fecha: e.target.value} : null)} 
                        />
                      </div>
                      <div className="form-group">
                        <label>Descripción</label>
                        <textarea 
                          value={tempData?.detalles || ""} 
                          onChange={e => setTempData(prev => prev ? {...prev, detalles: e.target.value} : null)} 
                        />
                      </div>
                      <div className="card-footer">
                        <button type="button" className="btn-save" onClick={ejecutarGuardado}>Guardar</button>
                        <button type="button" className="btn-cancel" onClick={() => setIdEditando(null)}>Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* 2. DISEÑO FORZADO CON ESTILOS INLINE */}
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

                      <div className="card-footer">
                        <button className="btn-edit" onClick={() => handleEditClick(act)}>Editar</button>
                      </div>
                    </>
                  )}
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