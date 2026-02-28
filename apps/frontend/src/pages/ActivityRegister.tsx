import React, { useState, useEffect } from "react";
import { useExplotation, Activity } from "../context/ExplotationContext";
import "../styles/ActivityRegister.css";

interface ActivityRegisterProps {
  onClose: () => void;
  explotationId: string;
  activityToEdit?: Activity; // Prop opcional para cuando editamos
}

const ActivityRegister: React.FC<ActivityRegisterProps> = ({ onClose, explotationId, activityToEdit }) => {
  const { agregarActivity, actualizarActivity } = useExplotation();

  const [formData, setFormData] = useState({
    parcela: "",
    cultivo: "",
    fecha: new Date().toISOString().split('T')[0],
    tipoActividad: "",
    responsable: "",
    descripcion: "",
  });

  // Si hay una actividad para editar, cargamos sus datos en el estado
  useEffect(() => {
    if (activityToEdit) {
      setFormData({
        parcela: activityToEdit.parcela,
        cultivo: activityToEdit.cultivo || "",
        fecha: activityToEdit.fecha,
        tipoActividad: activityToEdit.tipo,
        responsable: activityToEdit.responsable,
        descripcion: activityToEdit.detalles,
      });
    }
  }, [activityToEdit]);

  const opcionesParcelas = ["Parcela Norte", "Parcela Sur", "Sector A1"];
  const opcionesCultivos = ["Trigo", "Maíz", "Olivos", "Vides"]; 
  const opcionesActividades = ["Riego", "Abonado", "Cosecha", "Poda", "Tratamiento"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const datosFinales = {
      id: activityToEdit ? activityToEdit.id : crypto.randomUUID(),
      explotationId: explotationId, 
      tipo: formData.tipoActividad,
      parcela: formData.parcela,
      cultivo: formData.cultivo,
      responsable: formData.responsable,
      detalles: formData.descripcion,
      fecha: formData.fecha,
    };

    if (activityToEdit) {
      actualizarActivity(datosFinales); // Función para editar
    } else {
      agregarActivity(datosFinales); // Función para crear
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1000
    }}>
      <div className="modal-content" style={{ 
        backgroundColor: '#FFFBF1', width: '100%', maxWidth: '600px', 
        borderRadius: '50px', border: '15px solid rgba(0, 0, 0, 0.15)', 
        padding: '40px', position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} style={{ position: 'absolute', right: '30px', top: '20px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>

        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#222', fontSize: '28px', fontWeight: 'bold' }}>
          {activityToEdit ? "Editar Actividad" : "Registrar Actividad"}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="form-group">
            <label>Parcela</label>
            <select name="parcela" value={formData.parcela} onChange={handleChange} required>
              <option value="">Selecciona una parcela</option>
              {opcionesParcelas.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Tipo de cultivo</label>
            <select name="cultivo" value={formData.cultivo} onChange={handleChange} required>
              <option value="">Selecciona cultivo</option>
              {opcionesCultivos.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Tipo de actividad</label>
            <select name="tipoActividad" value={formData.tipoActividad} onChange={handleChange} required>
              <option value="">Selecciona actividad</option>
              {opcionesActividades.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Fecha</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Responsable</label>
            <input type="text" name="responsable" value={formData.responsable} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
          </div>

          <button type="submit" className="btn-submit" style={{ backgroundColor: '#68911B', color: 'white', padding: '15px', borderRadius: '20px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
            {activityToEdit ? "GUARDAR CAMBIOS" : "REGISTRAR ACTIVIDAD"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActivityRegister;