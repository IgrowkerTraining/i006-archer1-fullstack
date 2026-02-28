import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useExplotation, Activity, Explotation } from "../context/ExplotationContext";
import "../styles/ProducerHistory.css"; // Usamos tu archivo de estilos

const TechnicalHistory: React.FC = () => {
  const { explotations = [], activities = [] } = useExplotation();
  const navigate = useNavigate();
  const location = useLocation();

  const [actividadesFiltradas, setActividadesFiltradas] = useState<Activity[]>([]);
  const [explotacionSeleccionada, setExplotacionSeleccionada] = useState<Explotation | null>(null);

  // ESTADOS PARA FILTROS
  const [filtroActividad, setFiltroActividad] = useState("");
  const [filtroParcela, setFiltroParcela] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  // Opciones predefinidas sincronizadas con ActivityRegister
  const opcionesParcelas = ["Parcela Norte", "Parcela Sur", "Sector A1"];
  const opcionesActividades = ["Riego", "Abonado", "Cosecha", "Poda", "Tratamiento"];

  // Lógica para capturar la explotación si venimos navegando desde otra pantalla
  useEffect(() => {
    const idRecibido = (location.state as any)?.explotationId;
    if (idRecibido) {
      const encontrada = explotations.find(ex => ex.id === idRecibido);
      if (encontrada) setExplotacionSeleccionada(encontrada);
    }
  }, [explotations, location.state]);

  // Lógica de filtrado
  useEffect(() => {
    let resultado = [...activities];

    if (explotacionSeleccionada) {
      resultado = resultado.filter(act => act.explotationId === explotacionSeleccionada.id);
    }

    if (filtroActividad) {
      resultado = resultado.filter(act => act.tipo === filtroActividad);
    }

    if (filtroParcela) {
      resultado = resultado.filter(act => (act as any).parcela === filtroParcela);
    }

    if (fechaDesde) {
      resultado = resultado.filter(act => new Date(act.fecha) >= new Date(fechaDesde));
    }
    if (fechaHasta) {
      resultado = resultado.filter(act => new Date(act.fecha) <= new Date(fechaHasta));
    }

    resultado.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    setActividadesFiltradas(resultado);
  }, [activities, explotacionSeleccionada, filtroActividad, filtroParcela, fechaDesde, fechaHasta]);

  return (
    <div className="page-background">
      <div className="history-frame">
        
        {/* NAVBAR: Título a la izquierda, Explotaciones a la derecha */}
        <div className="navbar" style={{ marginTop: "30px" }}>
          <span className="navbar-title">Historial</span>
          
          <select
            className="navbar-select-small"
            style={{ minWidth: "220px" }}
            value={explotacionSeleccionada?.id || ""}
            onChange={e => {
              const ex = explotations.find(ex => ex.id === e.target.value) || null;
              setExplotacionSeleccionada(ex);
            }}
          >
            <option value="">Todas las Explotaciones</option>
            {explotations.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.nombre}</option>
            ))}
          </select>
        </div>

        <div className="history-content">
          <h2 className="history-title">Registro de Actividades</h2>

          {/* PANEL DE FILTROS */}
          <div style={{ padding: '15px', borderRadius: '20px', marginBottom: '20px' }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#555', marginBottom: '10px' }}>
              Aplicar filtros:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '4px', color: '#202020' }}>ACTIVIDAD</label>
                <select 
                  className="navbar-select-small"
                  style={{ border: '1px solid #ccc', width: '100%' }}
                  value={filtroActividad}
                  onChange={(e) => setFiltroActividad(e.target.value)}
                >
                  <option value="">Todas</option>
                  {opcionesActividades.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '4px', color: '#202020' }}>PARCELA</label>
                <select 
                   className="navbar-select-small"
                   style={{ border: '1px solid #ccc', width: '100%' }}
                  value={filtroParcela}
                  onChange={(e) => setFiltroParcela(e.target.value)}
                >
                  <option value="">Todas</option>
                  {opcionesParcelas.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '4px', color: '#202020' }}>FECHA DESDE</label>
                <input 
                  type="date" 
                  className="navbar-select-small"
                  style={{ border: '1px solid #ccc', width: '100%' }}
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                />
              </div>

            </div>
          </div>

          {/* LISTADO DE CARDS */}
          <div className="cards-container">
            {actividadesFiltradas.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No hay actividades registradas.</div>
            ) : (
              actividadesFiltradas.map((act) => (
                <div key={act.id} className="activity-card">
                  <div className="card-header-main">
                    <span className="card-date-label">
                        {new Date(act.fecha).toLocaleDateString()}
                    </span>
                    <h3 className="card-activity-name">{act.tipo}</h3>
                  </div>

                  <div className="card-body-data">
                    <div>
                      <p><strong>PARCELA:</strong> {(act as any).parcela || "N/A"}</p>
                      <p><strong>CULTIVO:</strong> {(act as any).cultivo || "No definido"}</p>
                    </div>
                    <div>
                      <p><strong>RESPONSABLE:</strong> {act.responsable || "N/A"}</p>
                    </div>
                  </div>

                  <div className="card-footer-actions">
                    <button 
                      className="btn-view-obs"
                      style={{ backgroundColor: '#FFFAF2', color: "#68911B", border: '2px solid #68911B' }}
                      onClick={() => navigate(`/nueva-observacion/${act.id}`)}
                    >
                     OBSERVACIÓN
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bottom-container">
        <button className="back-link-main" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default TechnicalHistory;