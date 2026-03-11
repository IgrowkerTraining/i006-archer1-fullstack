import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExplotation, Activity } from "../context/ExplotationContext";
import { useAuth } from "../hooks/useAuth";
import "../styles/ProducerHistory.css";


const OPCIONES_PARCELAS = [
  { nombre: "Parcela Norte", id: "fc0d93f6-4687-4179-9540-e7104539f110" },
  { nombre: "Parcela Sur", id: "1a4b1e5a-6923-49f3-8d41-cd0f6df88a75" },
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
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const getNombreActividad = (id: string) => OPCIONES_ACTIVIDADES.find(a => a.id === id)?.nombre || "Actividad";
  const getNombreParcela = (id: string) => OPCIONES_PARCELAS.find(p => p.id === id)?.nombre || "Parcela";

  useEffect(() => {
    if (user?.id) {
      cargarExplotacionesByProducer(user.id);
      cargarActividades();
    }
  }, [user?.id, cargarActividades, cargarExplotacionesByProducer]);

  useEffect(() => {
    if (activities) {
      let resultado = [...activities];
      if (filtroTipo) {
        resultado = resultado.filter(a => a.activitytype === filtroTipo);
      }
      setActividadesFiltradas(resultado);
    }
  }, [activities, filtroTipo]);

  const handleEditarClick = (act: Activity) => {
    setSelectedActivity({ ...act });
    setShowModal(true);
  };

  const handleObservacionesClick = async (act: Activity) => {
    const nuevaObs = prompt("Editar observación / descripción de la actividad:", act.description);
    if (nuevaObs !== null && act.id) {
      try {
        await actualizarActivity(act.id, { ...act, description: nuevaObs });
        alert("Observación actualizada");
      } catch (e) {
        alert(" Error al actualizar la observación");
      }
    }
  };

  const handleSaveModal = async () => {
    if (selectedActivity && selectedActivity.id) {
      console.log("Enviando a ID:", selectedActivity.id);
      try {
        await actualizarActivity(selectedActivity.id, selectedActivity);
        setShowModal(false);
        alert("Cambios guardados correctamente");
      } catch (e) {
        alert(" Error al guardar los cambios");
      }
    }
  };

  return (
    <div className="page-background">
      <div className="history-frame">
        <div className="navbar" style={{backgroundColor: '#689028', color: 'white', padding: '15px'}}>
           <h2 style={{margin: 0}}>Historial de Actividades</h2>
        </div>

        <div className="history-content">
          <select 
            className="navbar-select-small" 
            value={filtroTipo} 
            onChange={(e) => setFiltroTipo(e.target.value)}
            style={{padding: '10px', borderRadius: '8px', width: '100%', marginBottom: '20px'}}
          >
            <option 
            value="">Filtrar por</option>
            {OPCIONES_ACTIVIDADES.map(a => <option style={{color: '#333'}} key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>

          <div className="cards-container">
            {actividadesFiltradas.map((act, index) => (
              <div key={act.id || index} className="activity-card">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <h3 className="card-activity-name">{getNombreActividad(act.activitytype)}</h3>
                  <span className="card-date-label">{act.date_day}/{act.date_month}/{act.date_year}</span>
                </div>
                <div style={{margin: '10px 0'}}>
                  <p><strong>Responsable:</strong> {act.responsible || (user as any)?.name || "No asignado"}</p>
                  <p><strong>Parcela:</strong> {getNombreParcela(act.plot)}</p>
                  <p className="card-description-text" style={{marginTop: '5px'}}>{act.description}</p>
                </div>
                
                <div className="card-footer-actions">
                  <button 
                    className="btn-view-obs" 
                    onClick={() => handleObservacionesClick(act)}
                  >
                    Observaciones
                  </button>
                  <button 
                    className="btn-edit-activity" 
                    onClick={() => handleEditarClick(act)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && selectedActivity && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Actividad</h3>
            
            <label style={{color: '#333'}}>Tipo de Actividad</label>
            <select 
              style={{color: '#333'}}
              value={selectedActivity.activitytype}
              onChange={(e) => setSelectedActivity({...selectedActivity, activitytype: e.target.value})}
            >
              {OPCIONES_ACTIVIDADES.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
            </select>

            <div style={{display: 'flex', gap: '5px', color: '#333'}}>
               <div style={{flex: 1}}>
                 <label>Día</label>
                 <input type="number" value={selectedActivity.date_day} onChange={(e) => setSelectedActivity({...selectedActivity, date_day: parseInt(e.target.value)})} />
               </div>
               <div style={{flex: 1}}>
                 <label>Mes</label>
                 <input type="number" value={selectedActivity.date_month} onChange={(e) => setSelectedActivity({...selectedActivity, date_month: parseInt(e.target.value)})} />
               </div>
               <div style={{flex: 1}}>
                 <label>Año</label>
                 <input type="number" value={selectedActivity.date_year} onChange={(e) => setSelectedActivity({...selectedActivity, date_year: parseInt(e.target.value)})} />
               </div>
            </div>

            <label style={{color: '#333'}}>Responsable</label>
            <input 
            style={{color: '#333'}}
              type="text" 
              value={selectedActivity.responsible} 
              onChange={(e) => setSelectedActivity({...selectedActivity, responsible: e.target.value})} 
            />

            <label style={{color: '#333'}}>Descripción</label>
            <textarea 
            style={{color: '#333'}}
              value={selectedActivity.description} 
              onChange={(e) => setSelectedActivity({...selectedActivity, description: e.target.value})} 
              rows={3}
            />

            <div className="modal-actions">
              <button className="btn-cancel-modal" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-save-modal" onClick={handleSaveModal}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => navigate(-1)} className="back-link-main">Volver</button>
    </div>
  );
};

export default ProducerHistory;