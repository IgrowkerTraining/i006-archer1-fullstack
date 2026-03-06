import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  { nombre: "Monitorización de plagas", id: "69aa6b18-8f1e-4130-b0c1-7196434e0cc9" },
  { nombre: "Control de malezas", id: "7cd6b82c-545b-4ccd-b453-2ffea9d948b7" },
  { nombre: "Mantenimiento de sistemas de riego", id: "d0e72c22-52d9-4aa8-8393-245e6d8e7cb8" }
];

const ProducerHistory: React.FC = () => {
  const { explotations, activities, actualizarActivity } = useExplotation();
  const navigate = useNavigate();

  const [actividadesFiltradas, setActividadesFiltradas] = useState<Activity[]>([]);
  const [explotacionSeleccionada, setExplotacionSeleccionada] = useState<Explotation | null>(null);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroParcela, setFiltroParcela] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [actividadAEditar, setActividadAEditar] = useState<Activity | null>(null);

  const getNombreActividad = (id: string) => OPCIONES_ACTIVIDADES.find(a => a.id === id)?.nombre || "Desconocida";
  const getNombreParcela = (id: string) => OPCIONES_PARCELAS.find(p => p.id === id)?.nombre || "Desconocida";
  const getNombreCultivo = (id: string) => OPCIONES_CULTIVOS.find(c => c.id === id)?.nombre || "No definido";

  const formatearFecha = (act: Activity) => `${act.date_day}/${act.date_month}/${act.date_year}`;

  useEffect(() => {
    let filtradas = [...activities];
    if (explotacionSeleccionada) {
      filtradas = filtradas.filter(act => act.explotationId === explotacionSeleccionada.id);
    }
    if (filtroTipo) {
      filtradas = filtradas.filter(act => act.activitytype === filtroTipo);
    }
    if (filtroParcela) {
      filtradas = filtradas.filter(act => act.plot === filtroParcela);
    }
    if (filtroFecha) {
      const [y, m, d] = filtroFecha.split('-').map(Number);
      filtradas = filtradas.filter(act => 
        act.date_day === d && act.date_month === m && act.date_year === y
      );
    }
    filtradas.sort((a, b) => {
      const fechaB = new Date(b.date_year, b.date_month - 1, b.date_day).getTime();
      const fechaA = new Date(a.date_year, a.date_month - 1, a.date_day).getTime();
      return fechaB - fechaA;
    });
    setActividadesFiltradas(filtradas);
  }, [activities, explotacionSeleccionada, filtroTipo, filtroParcela, filtroFecha]);

  const abrirEditor = (act: Activity) => {
    setActividadAEditar({ ...act });
    setMostrarModal(true);
  };

  const guardarCambios = (e: React.FormEvent) => {
    e.preventDefault();
    if (actividadAEditar) {
      actualizarActivity(actividadAEditar);
      setMostrarModal(false);
    }
  };

  return (
    <div className="page-background">
      <div className="history-frame">
        <div className="navbar">
          <div className="navbar-left"><span className="navbar-title">Historial</span></div>
          <select
            className="navbar-select-small"
            value={explotacionSeleccionada?.id || ""}
            onChange={e => setExplotacionSeleccionada(explotations.find(ex => ex.id === e.target.value) || null)}
          >
            <option value="">Todas las Explotaciones</option>
            {explotations.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
          </select>
        </div>

        <div className="history-content">
          <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Aplicar filtros:</span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <select className="navbar-select-small" style={{flex: 1}} value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                <option value="">Todas las Actividades</option>
                {OPCIONES_ACTIVIDADES.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
              </select>
              <select className="navbar-select-small" style={{flex: 1}} value={filtroParcela} onChange={(e) => setFiltroParcela(e.target.value)}>
                <option value="">Todas las Parcelas</option>
                {OPCIONES_PARCELAS.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
              <input type="date" className="navbar-select-small" style={{flex: 1}} value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)} />
            </div>
          </div>

          <div className="cards-container">
            {actividadesFiltradas.length > 0 ? (
              actividadesFiltradas.map(act => (
                <div className="activity-card" key={act.id}>
                  <div className="card-header-main">
                    <span className="card-date-label">{formatearFecha(act)}</span>
                    <h3 className="card-activity-name">{getNombreActividad(act.activitytype)}</h3>
                  </div>
                  <div className="card-body-data">
                    <p><strong>Parcela:</strong> {getNombreParcela(act.plot)}</p>
                    <p><strong>Cultivo:</strong> {getNombreCultivo(act.crop)}</p>
                    <p><strong>Resp:</strong> {act.responsible}</p>
                  </div>
                  <div className="card-description-box">{act.description}</div>
                  <div className="card-footer-actions">
                    <button className="btn-edit-activity" onClick={() => abrirEditor(act)}>Editar</button>
                    <button className="btn-view-obs" onClick={() => navigate(`/ver-observacion/${act.id}`)}>Ver observaciones</button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No hay actividades registradas.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bottom-container">
        <button className="back-link-main" onClick={() => navigate(-1)}>Volver</button>
      </div>

      {mostrarModal && actividadAEditar && (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000 }}>
    <div style={{ backgroundColor: '#FFFBF1', width: '95%', maxWidth: '550px', borderRadius: '40px', padding: '30px', position: 'relative', border: '10px solid #f0eee4', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
      
      <button onClick={() => setMostrarModal(false)} style={{ position: 'absolute', right: '25px', top: '20px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888' }}>✕</button>
      
      <h2 style={{ textAlign: 'center', marginBottom: '25px', fontWeight: 800, color: '#333', fontSize: '24px' }}>Editar Actividad</h2>
      
      <form onSubmit={guardarCambios} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginLeft: '5px' }}>Fecha</label>
            <input 
              type="date" 
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', marginTop: '5px', color: '#202020' }} 
              value={`${actividadAEditar.date_year}-${String(actividadAEditar.date_month).padStart(2, '0')}-${String(actividadAEditar.date_day).padStart(2, '0')}`} 
              onChange={e => {
                const [y, m, d] = e.target.value.split('-').map(Number);
                setActividadAEditar({ ...actividadAEditar, date_year: y, date_month: m, date_day: d });
              }} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginLeft: '5px' }}>Actividad</label>
            <select 
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', marginTop: '5px', color: '#202020' }} 
              value={actividadAEditar.activitytype} 
              onChange={e => setActividadAEditar({ ...actividadAEditar, activitytype: e.target.value })}
            >
              {OPCIONES_ACTIVIDADES.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginLeft: '5px' }}>Parcela</label>
            <select 
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', marginTop: '5px', color: '#202020' }} 
              value={actividadAEditar.plot} 
              onChange={e => setActividadAEditar({ ...actividadAEditar, plot: e.target.value })}
            >
              {OPCIONES_PARCELAS.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginLeft: '5px' }}>Cultivo</label>
            <select 
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', marginTop: '5px', color: '#202020' }} 
              value={actividadAEditar.crop} 
              onChange={e => setActividadAEditar({ ...actividadAEditar, crop: e.target.value })}
            >
              {OPCIONES_CULTIVOS.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginLeft: '5px' }}>Responsable</label>
          <input 
            type="text" 
            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', marginTop: '5px', color: '#202020' }} 
            value={actividadAEditar.responsible} 
            onChange={e => setActividadAEditar({ ...actividadAEditar, responsible: e.target.value })} 
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#3a3a3a', marginLeft: '5px' }}>Descripción de la actividad</label>
          <textarea 
            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', marginTop: '5px', minHeight: '80px', resize: 'none',color: '#202020' }} 
            value={actividadAEditar.description} 
            onChange={e => setActividadAEditar({ ...actividadAEditar, description: e.target.value })} 
          />
        </div>

        <button type="submit" style={{ backgroundColor: '#68911B', color: 'white', padding: '15px', borderRadius: '20px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 10px rgba(104, 145, 27, 0.3)' }}>
          Guardar cambios
        </button>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default ProducerHistory;