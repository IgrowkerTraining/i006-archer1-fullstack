import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useExplotation, Activity } from "../context/ExplotationContext";
import "../styles/ProducerHistory.css";

interface ExplotacionLocal {
  id: string;
  name?: string;
  nombre?: string;
}

const OPCIONES_PARCELAS = [
  { nombre: "Parcela 14", id: "b8e69891-7b61-478a-88ba-248f82d87139", exploitationId: "fc0d93f6-4687-4179-9540-e7104539f110" },
  { nombre: "Parcela 1", id: "6d631b2e-5cd4-4c43-ad6d-4229ba90cb57", exploitationId: "fc0d93f6-4687-4179-9540-e7104539f110" },
  { nombre: "Parcela 17", id: "1a4b1e5a-6923-49f3-8d41-cd0f6df88a75", exploitationId: "fc0d93f6-4687-4179-9540-e7104539f110" },
  { nombre: "Parcela 8", id: "d9ae4cd9-e352-4c5a-bed7-94775ff588ec", exploitationId: "fc0d93f6-4687-4179-9540-e7104539f110" },
  { nombre: "Parcela 12", id: "fc0d93f6-4687-4179-9540-e7104539f110", exploitationId: "fc0d93f6-4687-4179-9540-e7104539f110" }
];

const OPCIONES_ACTIVIDADES = [
  { nombre: "Recarga de activos", id: "c3ac43b4-a03e-4977-9eca-f3ca0c8eace4" },
  { nombre: "Aplicación fitosanitaria", id: "ca797386-2d27-49eb-b743-38df41da148e" },
  { nombre: "Monitorización de plagas", id: "69aa6b18-8f1e-4130-b0c1-7196434e0cc9" },
  { nombre: "Control de malezas", id: "7cd6b82c-545b-4ccd-b453-2ffea9d948b7" },
  { nombre: "Mantenimiento de sistemas de riego", id: "d0e72c22-52d9-4aa8-8393-245e6d8e7cb8" }
];

const TechnicalHistory: React.FC = () => {
  const { explotations = [], activities = [], cargarActividades, cargarExplotacionesByProducer } = useExplotation();
  const navigate = useNavigate();
  const location = useLocation();

  const [explotacionSeleccionada, setExplotacionSeleccionada] = useState<ExplotacionLocal | null>(null);
  const [filtroActividad, setFiltroActividad] = useState("");
  const [filtroParcela, setFiltroParcela] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");

  const getNombreActividad = (id: string) => OPCIONES_ACTIVIDADES.find(a => a.id === id)?.nombre || "Desconocida";
  const getNombreParcela = (id: string) => OPCIONES_PARCELAS.find(p => p.id === id)?.nombre || "N/A";
  const formatearFecha = (act: Activity) => `${act.date_day}/${act.date_month}/${act.date_year}`;

  useEffect(() => {
    const fetchInitialData = async () => {
      const userStr = localStorage.getItem('example_user');
      if (userStr) {
        const userData = JSON.parse(userStr);
        if (userData?.id) {
          await cargarExplotacionesByProducer(userData.id);
          await cargarActividades();
        }
      }
    };
    fetchInitialData();
  }, [cargarActividades, cargarExplotacionesByProducer]);

  useEffect(() => {
    const idRecibido = (location.state as any)?.explotationId;
    if (idRecibido && explotations.length > 0) {
      const encontrada = explotations.find(ex => ex.id === idRecibido);
      if (encontrada) setExplotacionSeleccionada(encontrada);
    }
  }, [explotations, location.state]);

  const actividadesFiltradas = useMemo(() => {
    if (!activities) return [];

    return activities.filter(act => {
      if (explotacionSeleccionada) {
        const infoParcela = OPCIONES_PARCELAS.find(p => p.id === act.plot);
        const matchExplotacion = 
          act.explotation === explotacionSeleccionada.id || 
          (act as any).exploitation === explotacionSeleccionada.id ||
          infoParcela?.exploitationId === explotacionSeleccionada.id;

        if (!matchExplotacion) return false;
      }

      if (filtroActividad && act.activitytype !== filtroActividad) return false;
      if (filtroParcela && act.plot !== filtroParcela) return false;

      if (fechaDesde) {
        const [y, m, d] = fechaDesde.split('-').map(Number);
        const fechaLimite = new Date(y, m - 1, d);
        const fechaAct = new Date(act.date_year, act.date_month - 1, act.date_day);
        if (fechaAct < fechaLimite) return false;
      }

      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.date_year, a.date_month - 1, a.date_day).getTime();
      const dateB = new Date(b.date_year, b.date_month - 1, b.date_day).getTime();
      return dateB - dateA;
    });
  }, [activities, explotacionSeleccionada, filtroActividad, filtroParcela, fechaDesde]);

  return (
    <div className="page-background">
      <div className="history-frame">
        <div className="navbar" style={{ backgroundColor: '#689028', color: 'white', padding: '10px 15px' }}>
          <div className="navbar-left">
            <h2 style={{ margin: 0, fontSize: '20px' }}>Historial Técnico</h2>
          </div>
          <select
            className="navbar-select-small"
            style={{ minWidth: "200px", color: '#333' }}
            value={explotacionSeleccionada?.id || ""}
            onChange={e => setExplotacionSeleccionada(explotations.find(ex => ex.id === e.target.value) || null)}
          >
            <option value="">Todas las Explotaciones</option>
            {explotations.map((ex: any) => (
              <option style={{color: '#333'}}key={ex.id} value={ex.id}>{ex.name || ex.nombre}</option>
            ))}
          </select>
        </div>

        <div className="history-content">
          <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <select className="navbar-select-small" style={{ flex: 1 }} value={filtroActividad} onChange={(e) => setFiltroActividad(e.target.value)}>
                <option value="">Todas las Actividades</option>
                {OPCIONES_ACTIVIDADES.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
              </select>
              <select className="navbar-select-small" style={{ flex: 1 }} value={filtroParcela} onChange={(e) => setFiltroParcela(e.target.value)}>
                <option value="">Todas las Parcelas</option>
                {OPCIONES_PARCELAS.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
              <input type="date" className="navbar-select-small" style={{ flex: 1 }} value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} />
            </div>
          </div>

          <div className="cards-container">
            {actividadesFiltradas.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No hay registros para esta explotación.</p>
            ) : (
              actividadesFiltradas.map((act) => (
                <div key={act.id} className="activity-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 className="card-activity-name" style={{ color: 'black', margin: 0, fontWeight: 'bold' }}>
                      {getNombreActividad(act.activitytype).toUpperCase()}
                    </h3>
                    <span className="card-date-label">{formatearFecha(act)}</span>
                  </div>
                  <div className="card-body-data">
                    <p><strong>Parcela:</strong> {getNombreParcela(act.plot)}</p>
                    <p><strong>Responsable:</strong> {act.responsible || "N/A"}</p>
                    <p style={{ marginTop: '10px', color: '#444' }}>{act.description}</p>
                  </div>
                  <div className="card-footer-actions">
                    <button
                      className="btn-edit-activity"
                      onClick={() => navigate(`/nueva-observacion/${act.id}`)}
                      style={{ backgroundColor: 'white', border: '1px solid #689028', color: '#689028' }}
                    >
                      Nueva Observación
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