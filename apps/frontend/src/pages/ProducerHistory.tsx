import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExplotation, Activity } from "../context/ExplotationContext";
import { useAuth } from "../hooks/useAuth";
import "../styles/ProducerHistory.css";

const OPCIONES_PARCELAS = [
  { nombre: "Parcela 14", id: "b8e69891-7b61-478a-88ba-248f82d87139" },
  { nombre: "Parcela 1", id: "6d631b2e-5cd4-4c43-ad6d-4229ba90cb57" },
  { nombre: "Parcela 17", id: "1a4b1e5a-6923-49f3-8d41-cd0f6df88a75" },
  { nombre: "Parcela 8", id: "d9ae4cd9-e352-4c5a-bed7-94775ff588ec" },
  { nombre: "Parcela 12", id: "fc0d93f6-4687-4179-9540-e7104539f110" }
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
  const { activities, cargarActividades, cargarExplotacionesByProducer, actualizarActivity } = useExplotation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [actividadesFiltradas, setActividadesFiltradas] = useState<Activity[]>([]);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroParcela, setFiltroParcela] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [actividadAEditar, setActividadAEditar] = useState<Activity | null>(null);

  const getNombreActividad = (id: string) => OPCIONES_ACTIVIDADES.find(a => a.id === id)?.nombre || "Actividad";
  const getNombreParcela = (id: string) => OPCIONES_PARCELAS.find(p => p.id === id)?.nombre || "Parcela";
  const getNombreCultivo = (id: string) => OPCIONES_CULTIVOS.find(c => c.id === id)?.nombre || "Cultivo";
  const formatearFecha = (act: Activity) => `${act.date_day}/${act.date_month}/${act.date_year}`;

  useEffect(() => {
    if (user?.id) {
      cargarExplotacionesByProducer(user.id);
      cargarActividades();
    }
  }, [user?.id]);

  useEffect(() => {
    let filtradas = [...activities];

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
  }, [activities, filtroTipo, filtroParcela, filtroFecha]);

  const abrirEditor = (act: Activity) => {
    setActividadAEditar({ ...act });
    setMostrarModal(true);
  };

  const guardarCambios = async (e: React.FormEvent) => {
    e.preventDefault();
    if (actividadAEditar && actividadAEditar.id) {
      try {
        await actualizarActivity(actividadAEditar.id, actividadAEditar);
        setMostrarModal(false);
        alert("Cambios guardados");
      } catch (err) {
        alert("Error al guardar cambios");
      }
    }
  };

  return (
    <div className="page-background">
      <div className="history-frame">
        <div className="navbar" style={{ backgroundColor: '#689028', color: 'white', padding: '15px' }}>
          <h2 style={{ margin: 0 }}>Historial de Actividades</h2>
        </div>

        <div className="history-content">
          <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Aplicar filtros:</span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <select className="navbar-select-small" style={{ flex: 1, color: 'black' }} value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                <option value="">Todas las Actividades</option>
                {OPCIONES_ACTIVIDADES.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
              </select>
              <select className="navbar-select-small" style={{ flex: 1, color: 'black' }} value={filtroParcela} onChange={(e) => setFiltroParcela(e.target.value)}>
                <option value="">Todas las Parcelas</option>
                {OPCIONES_PARCELAS.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
              <input type="date" className="navbar-select-small" style={{ flex: 1, color: 'black' }} value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)} />
            </div>
          </div>

          <div className="cards-container">
            {actividadesFiltradas.length > 0 ? (
              actividadesFiltradas.map(act => (
                <div className="activity-card" key={act.id}>
                  <div className="card-header-main" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 className="card-activity-name">{getNombreActividad(act.activitytype)}</h3>
                    <span className="card-date-label">{formatearFecha(act)}</span>
                  </div>
                  <div className="card-body-data">
                    <p><strong>Parcela:</strong> {getNombreParcela(act.plot)}</p>
                    <p><strong>Cultivo:</strong> {getNombreCultivo(act.crop)}</p>
                    <p><strong>Resp:</strong> {act.responsible}</p>
                  </div>
                  <div className="card-description-box" style={{ margin: '10px 0', padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
                    {act.description}
                  </div>
                  <div className="card-footer-actions" style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-edit-activity" onClick={() => abrirEditor(act)}>Editar</button>
                    <button
                      className="btn-view-obs"
                      onClick={() => navigate(`/app/producer/activities/${act.id}/observations`)}
                    >
                      Ver observaciones
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', marginTop: '20px' }}>No hay actividades con estos filtros.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bottom-container" style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="back-link-main" onClick={() => navigate("/homeProductor")}>Volver</button>
      </div>

      {mostrarModal && actividadAEditar && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000 }}>
          <div style={{ backgroundColor: '#FFFBF1', width: '95%', maxWidth: '550px', borderRadius: '40px', padding: '30px', position: 'relative', border: '10px solid #f0eee4' }}>
            <button onClick={() => setMostrarModal(false)} style={{ position: 'absolute', right: '25px', top: '20px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
            <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Editar Actividad</h2>
            <form onSubmit={guardarCambios} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, color: 'black' }}>
                  <label>Fecha</label>
                  <input
                    type="date"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', color: 'black' }}
                    value={`${actividadAEditar.date_year}-${String(actividadAEditar.date_month).padStart(2, '0')}-${String(actividadAEditar.date_day).padStart(2, '0')}`}
                    onChange={e => {
                      const [y, m, d] = e.target.value.split('-').map(Number);
                      setActividadAEditar({ ...actividadAEditar, date_year: y, date_month: m, date_day: d });
                    }}
                  />
                </div>
                <div style={{ flex: 1, color: 'black' }}>
                  <label>Actividad</label>
                  <select
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', color: 'black' }}
                    value={actividadAEditar.activitytype}
                    onChange={e => setActividadAEditar({ ...actividadAEditar, activitytype: e.target.value })}
                  >
                    {OPCIONES_ACTIVIDADES.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', color: 'black' }}>
                <div style={{ flex: 1, color: 'black' }}>
                  <label>Parcela</label>
                  <select
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', color: 'black' }}
                    value={actividadAEditar.plot}
                    onChange={e => setActividadAEditar({ ...actividadAEditar, plot: e.target.value })}
                  >
                    {OPCIONES_PARCELAS.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1, color: 'black' }}>
                  <label>Cultivo</label>
                  <select
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', color: 'black' }}
                    value={actividadAEditar.crop}
                    onChange={e => setActividadAEditar({ ...actividadAEditar, crop: e.target.value })}
                  >
                    {OPCIONES_CULTIVOS.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label>Responsable</label>
                <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', color: 'black' }} value={actividadAEditar.responsible} onChange={e => setActividadAEditar({ ...actividadAEditar, responsible: e.target.value })} />
              </div>
              <div>
                <label>Descripción</label>
                <textarea style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '80px', color: 'black' }} value={actividadAEditar.description} onChange={e => setActividadAEditar({ ...actividadAEditar, description: e.target.value })} />
              </div>
              <button type="submit" style={{ backgroundColor: '#68911B', color: 'white', padding: '15px', borderRadius: '20px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
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
