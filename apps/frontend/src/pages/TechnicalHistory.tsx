import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useExplotation, Activity, Explotation } from "../context/ExplotationContext";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";
import "../styles/ProducerHistory.css";

const TechnicalHistory: React.FC = () => {
  const { user } = useAuth();
  const { explotations = [], activities = [] } = useExplotation();
  const navigate = useNavigate();
  const location = useLocation();

  const [actividadesFiltradas, setActividadesFiltradas] = useState<Activity[]>([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [explotacionSeleccionada, setExplotacionSeleccionada] = useState<Explotation | null>(null);
  const [filtroActividad, setFiltroActividad] = useState<string>("todas");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const idRecibido = (location.state as any)?.explotationId;
    if (idRecibido) {
      const encontrada = explotations.find(ex => ex.id === idRecibido);
      if (encontrada) setExplotacionSeleccionada(encontrada);
    }
  }, [explotations, location.state]);

  useEffect(() => {
    let filtradas = [...activities];
    if (explotacionSeleccionada) {
      filtradas = filtradas.filter(act => act.explotationId === explotacionSeleccionada.id);
    }
    if (filtroActividad !== "todas") {
      filtradas = filtradas.filter(act => act.tipo === filtroActividad);
    }

    filtradas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    setActividadesFiltradas(filtradas);
  }, [activities, explotacionSeleccionada, filtroActividad]);

  const handleIrAObservacion = (actividadId: string) => {
    navigate(`/nueva-observacion/${actividadId}`);
  };

  return (
    <div className="page-background" style={{ backgroundColor: "#837d7d", minHeight: "100vh", padding: "20px" }}>
      <div className="history-frame" style={{ 
        backgroundColor: "#FFFAF2", 
        borderRadius: "40px", 
        padding: "30px", 
        maxWidth: "900px", 
        margin: "0 auto",
        border: "15px solid rgba(0,0,0,0.15)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        position: "relative"
      }}>
        
        <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontWeight: '900', fontSize: '1.4rem', color: '#000' }}>Historial Técnico</span>
          
          <select
            style={{ padding: '8px', borderRadius: '10px', border: '2px solid #F3B130', fontWeight: 'bold', cursor: 'pointer' }}
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

          <div ref={menuRef} style={{ position: 'relative' }}>
            <div className="user-chip" onClick={() => setMenuAbierto(!menuAbierto)} style={{ cursor: 'pointer', backgroundColor: '#F3B130', padding: '5px 15px', borderRadius: '20px' }}>
              <span style={{ fontWeight: 'bold', color: '#000' }}>👤 {user?.name || "Técnico"}</span>
            </div>
            {menuAbierto && (
              <div style={{ position: 'absolute', right: 0, top: '45px', backgroundColor: 'white', padding: '10px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', zIndex: 100 }}>
                <LogoutButton />
              </div>
            )}
          </div>
        </div>

        <h2 style={{ textAlign: 'center', color: '#000', fontWeight: '900', marginBottom: '20px' }}>Registro de Actividades</h2>

        <div className="table-container" style={{ marginTop: '20px', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '20px', padding: '15px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '3px solid #F3B130' }}>
                <th style={{ padding: '15px', textAlign: 'left', color: '#000', fontWeight: 'bold' }}>Actividad</th>
                <th style={{ padding: '15px', textAlign: 'left', color: '#000', fontWeight: 'bold' }}>Fecha</th>
                <th style={{ padding: '15px', textAlign: 'center', color: '#000', fontWeight: 'bold' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {actividadesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '30px', color: '#666' }}>No hay actividades registradas.</td>
                </tr>
              ) : (
                actividadesFiltradas.map((act) => (
                  <tr key={act.id} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={{ padding: '15px' }}>
                      <div style={{ color: '#000', fontWeight: 'bold', fontSize: '1.1rem' }}>{act.tipo}</div>
                      {act.detalles && (
                        <div style={{ fontSize: '12px', color: '#444', marginTop: '4px', fontStyle: 'italic' }}>
                          {act.detalles}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '15px', color: '#000', fontWeight: '500' }}>
                      {new Date(act.fecha).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleIrAObservacion(act.id)}
                        style={{
                          backgroundColor: '#F3B130',
                          border: '2px solid #000',
                          borderRadius: '12px',
                          padding: '8px 15px',
                          cursor: 'pointer',
                          fontWeight: '900',
                          fontSize: '11px',
                          boxShadow: '0 2px 0 #000'
                        }}
                      >
                        OBSERVACIÓN
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{
          width: "70%",
          height: "6px",
          backgroundColor: "#F3B130",
          margin: "40px auto 10px auto",
          borderRadius: "10px"
        }} />
      </div>

      <div style={{ textAlign: 'center', marginTop: '25px' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            padding: '12px 40px', 
            borderRadius: '25px', 
            border: 'none', 
            backgroundColor: '#333', 
            color: 'white', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)'
          }}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default TechnicalHistory;