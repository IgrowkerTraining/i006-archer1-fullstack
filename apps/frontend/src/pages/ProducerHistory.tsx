import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExplotation, Activity, Explotation } from "../context/ExplotationContext";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";
import "../styles/ProducerHistory.css";

// --- USAMOS LAS MISMAS OPCIONES QUE EN TU ACTIVITYREGISTER ---
const OPCIONES_PARCELAS = ["Parcela Norte", "Parcela Sur", "Sector A1"];
const OPCIONES_CULTIVOS = ["Trigo", "Maíz", "Olivos", "Vides"]; 
const OPCIONES_ACTIVIDADES = ["Riego", "Abonado", "Cosecha", "Poda", "Tratamiento"];

const ProducerHistory: React.FC = () => {
  const { user } = useAuth();
  const { explotations, activities, actualizarActivity } = useExplotation();
  const navigate = useNavigate();

  const [actividadesFiltradas, setActividadesFiltradas] = useState<Activity[]>([]);
  const [explotacionSeleccionada, setExplotacionSeleccionada] = useState<Explotation | null>(null);
  
  // Estados para filtros superiores
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroParcela, setFiltroParcela] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [actividadAEditar, setActividadAEditar] = useState<Activity | null>(null);

  useEffect(() => {
    let filtradas = [...activities];

    if (explotacionSeleccionada) {
      filtradas = filtradas.filter(act => act.explotationId === explotacionSeleccionada.id);
    }
    if (filtroTipo) {
      filtradas = filtradas.filter(act => act.tipo === filtroTipo);
    }
    if (filtroParcela) {
      filtradas = filtradas.filter(act => act.parcela === filtroParcela);
    }
    if (filtroFecha) {
      filtradas = filtradas.filter(act => act.fecha === filtroFecha);
    }

    filtradas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
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
        </div>

        <div className="history-content">
          <h2 className="history-title">Actividades Registradas</h2>

          {/* --- SECCIÓN DE FILTROS --- */}
          <div style={{ padding: '15px', borderRadius: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Aplicar filtros:</span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              
              <select 
                style={{ flex: 1, padding: '8px', borderRadius: '10px', border: '1px solid #ccc', color: '#333' }}
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="">Todas las Actividades</option>
                {OPCIONES_ACTIVIDADES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <select 
                style={{ flex: 1, padding: '8px', borderRadius: '10px', border: '1px solid #ccc', color: '#333' }}
                value={filtroParcela}
                onChange={(e) => setFiltroParcela(e.target.value)}
              >
                <option value="">Todas las Parcelas</option>
                {OPCIONES_PARCELAS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>

              <input 
                type="date"
                style={{ flex: 1, padding: '8px', borderRadius: '10px', border: '1px solid #ccc', color: '#333' }}
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
              />
            </div>
          </div>

          <div className="cards-container">
            {actividadesFiltradas.length > 0 ? (
              actividadesFiltradas.map(act => (
                <div className="activity-card" key={act.id}>
                  <div className="card-header-main">
                    <span className="card-date-label">{act.fecha}</span>
                    <h3 className="card-activity-name">{act.tipo}</h3>
                  </div>
                  <div className="card-body-data">
                    <p><strong>Parcela:</strong> {act.parcela}</p>
                    <p><strong>Cultivo:</strong> {act.cultivo || "No definido"}</p>
                    <p><strong>Responsable:</strong> {act.responsable}</p>
                  </div>
                  <div className="card-description-box">{act.detalles}</div>
                  <div className="card-footer-actions">
                    <button className="btn-edit-activity" onClick={() => abrirEditor(act)}>EDITAR</button>
                    <button className="btn-view-obs" onClick={() => navigate(`/ver-observacion/${act.id}`)}>Ver observaciones</button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No hay actividades con estos filtros.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bottom-container">
        <button className="back-link-main" onClick={() => navigate(-1)}>Volver</button>
      </div>

      {/* --- MODAL DE EDICIÓN --- */}
      {mostrarModal && actividadAEditar && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000 }}>
          <div style={{ backgroundColor: '#FFFBF1', width: '90%', maxWidth: '500px', borderRadius: '40px', border: '12px solid rgba(0,0,0,0.1)', padding: '30px', position: 'relative' }}>
            <button onClick={() => setMostrarModal(false)} style={{ position: 'absolute', right: '20px', top: '15px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 800, color: '#202020' }}>Editar Actividad</h2>
            <form onSubmit={guardarCambios} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#202020' }}>Fecha</label>
                  <input type="date" style={{ width: '100%', padding: '8px', borderRadius: '10px', border: '1px solid #ccc', color: '#333' }} value={actividadAEditar.fecha} onChange={e => setActividadAEditar({ ...actividadAEditar, fecha: e.target.value })} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#202020' }}>Actividad</label>
                  <select style={{ width: '100%', padding: '8px', borderRadius: '10px', border: '1px solid #ccc', color: '#333' }} value={actividadAEditar.tipo} onChange={e => setActividadAEditar({ ...actividadAEditar, tipo: e.target.value })}>
                    {OPCIONES_ACTIVIDADES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#202020' }}>Parcela</label>
                  <select style={{ width: '100%', padding: '8px', borderRadius: '10px', border: '1px solid #ccc', color: '#333' }} value={actividadAEditar.parcela} onChange={e => setActividadAEditar({ ...actividadAEditar, parcela: e.target.value })}>
                    {OPCIONES_PARCELAS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                   <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#202020' }}>Cultivo</label>
                   <select style={{ width: '100%', padding: '8px', borderRadius: '10px', border: '1px solid #ccc', color: '#333' }} value={actividadAEditar.cultivo} onChange={e => setActividadAEditar({ ...actividadAEditar, cultivo: e.target.value })}>
                     {OPCIONES_CULTIVOS.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#202020' }}>Responsable</label>
                <input type="text" style={{ width: '100%', padding: '8px', borderRadius: '10px', border: '1px solid #ccc', color: '#333' }} value={actividadAEditar.responsable} onChange={e => setActividadAEditar({ ...actividadAEditar, responsable: e.target.value })} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#202020' }}>Detalles</label>
                <textarea rows={3} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', color: '#333' }} value={actividadAEditar.detalles} onChange={e => setActividadAEditar({ ...actividadAEditar, detalles: e.target.value })} />
              </div>
              <button type="submit" style={{ backgroundColor: '#68911B', color: 'white', padding: '12px', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>GUARDAR CAMBIOS</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProducerHistory;