import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useExplotation, Activity, Explotation } from "../context/ExplotationContext";
import "../styles/ProducerHistory.css";

const OPCIONES_PARCELAS = [
  { nombre: "Parcela Norte", id: "fc0d93f6-4687-4179-9540-e7104539f110" },
  { nombre: "Parcela Sur", id: "1a4b1e5a-6923-49f3-8d41-cd0f6df88a75" },
];

const OPCIONES_CULTIVOS = [
  { nombre: "Viñedo", id: "48aa76b4-d873-488a-965b-2af94bb355ac" },
  { nombre: "Olivar Picual", id: "54ae2205-a67b-4644-92a2-6afb9a63098a" },
  { nombre: "Viñedo soleado", id: "e264ca15-0354-4967-a3f2-cc226ece4605" },
]; 

const OPCIONES_ACTIVIDADES = [
  { nombre: "Recarga de activos", id: "c3ac43b4-a03e-4977-9eca-f3ca0c8eace4" },
  { nombre: "Aplicación fitosanitaria", id: "ca797386-2d27-49eb-b743-38df41da148e" },
];

const TechnicalHistory: React.FC = () => {
  const { explotations = [], activities = [] } = useExplotation();
  const navigate = useNavigate();
  const location = useLocation();

  const [actividadesFiltradas, setActividadesFiltradas] = useState<Activity[]>([]);
  const [explotacionSeleccionada, setExplotacionSeleccionada] = useState<Explotation | null>(null);
  const [filtroActividad, setFiltroActividad] = useState("");
  const [filtroParcela, setFiltroParcela] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");

  const getNombreActividad = (id: string) => OPCIONES_ACTIVIDADES.find(a => a.id === id)?.nombre || "Desconocida";
  const getNombreParcela = (id: string) => OPCIONES_PARCELAS.find(p => p.id === id)?.nombre || "N/A";
  const getNombreCultivo = (id: string) => OPCIONES_CULTIVOS.find(c => c.id === id)?.nombre || "No definido";

  const formatearFecha = (act: Activity) => `${act.date_day}/${act.date_month}/${act.date_year}`;
  const crearFechaJS = (act: Activity) => new Date(act.date_year, act.date_month - 1, act.date_day);

  useEffect(() => {
    const idRecibido = (location.state as any)?.explotationId;
    if (idRecibido) {
      const encontrada = explotations.find(ex => ex.id === idRecibido);
      if (encontrada) setExplotacionSeleccionada(encontrada);
    }
  }, [explotations, location.state]);

  useEffect(() => {
    let resultado = [...activities];
    if (explotacionSeleccionada) {
      resultado = resultado.filter(act => act.explotationId === explotacionSeleccionada.id);
    }
    if (filtroActividad) {
      resultado = resultado.filter(act => act.activitytype === filtroActividad);
    }
    if (filtroParcela) {
      resultado = resultado.filter(act => act.plot === filtroParcela);
    }
    if (fechaDesde) {
      const [y, m, d] = fechaDesde.split('-').map(Number);
      const desde = new Date(y, m - 1, d);
      resultado = resultado.filter(act => crearFechaJS(act) >= desde);
    }
    resultado.sort((a, b) => crearFechaJS(b).getTime() - crearFechaJS(a).getTime());
    setActividadesFiltradas(resultado);
  }, [activities, explotacionSeleccionada, filtroActividad, filtroParcela, fechaDesde]);

  return (
    <div className="page-background">
      <div className="history-frame">
        <div className="navbar">
          <div className="navbar-left">
            <span className="navbar-title">Historial Técnico</span>
          </div>
          <select
            className="navbar-select-small"
            style={{ minWidth: "200px" }}
            value={explotacionSeleccionada?.id || ""}
            onChange={e => setExplotacionSeleccionada(explotations.find(ex => ex.id === e.target.value) || null)}
          >
            <option value="">Todas las Explotaciones</option>
            {explotations.map(ex => <option key={ex.id} value={ex.id}>{ex.name || ex.nombre}</option>)}
          </select>
        </div>

        <div className="history-content">
          {/* SECCIÓN DE FILTROS CORREGIDA PARA SER IGUAL A PRODUCER */}
          <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Aplicar filtros:</span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <select className="navbar-select-small" style={{flex: 1}} value={filtroActividad} onChange={(e) => setFiltroActividad(e.target.value)}>
                <option value="">Todas las Actividades</option>
                {OPCIONES_ACTIVIDADES.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
              </select>
              <select className="navbar-select-small" style={{flex: 1}} value={filtroParcela} onChange={(e) => setFiltroParcela(e.target.value)}>
                <option value="">Todas las Parcelas</option>
                {OPCIONES_PARCELAS.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
              <input type="date" className="navbar-select-small" style={{flex: 1}} value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} />
            </div>
          </div>

          <div className="cards-container">
            {actividadesFiltradas.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No hay actividades registradas.</p>
            ) : (
              actividadesFiltradas.map((act) => (
                <div key={act.id} className="activity-card">
                  <div className="card-header-main">
                    <span className="card-date-label">{formatearFecha(act)}</span>
                    <h3 className="card-activity-name">{getNombreActividad(act.activitytype)}</h3>
                  </div>
                  <div className="card-body-data">
                    <p><strong>Parcela:</strong> {getNombreParcela(act.plot)}</p>
                    <p><strong>Cultivo:</strong> {getNombreCultivo(act.crop)}</p>
                    <p><strong>Resp:</strong> {act.responsible || "N/A"}</p>
                  </div>
                  <div className="card-description-box">{act.description}</div>
                  <div className="card-footer-actions">
                    <button 
                      className="btn-edit-activity"
                      onClick={() => navigate(`/nueva-observacion/${act.id}`)}
                    >
                      Observación
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bottom-container">
        <button className="back-link-main" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
};

export default TechnicalHistory;