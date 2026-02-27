import React, { useState } from "react";
import { useExplotation } from "../context/ExplotationContext";
import "../styles/ActivityRegister.css";

interface ActivityRegisterProps {
  onClose: () => void;
  explotationId: string;
}

const ActivityRegister: React.FC<ActivityRegisterProps> = ({ onClose, explotationId }) => {
  const { agregarActivity } = useExplotation();

  const [formData, setFormData] = useState({
    parcela: "",
    cultivo: "", // Campo añadido
    fecha: new Date().toISOString().split('T')[0],
    tipoActividad: "",
    responsable: "", // Campo para escribir
    descripcion: "",
  });

  const opcionesParcelas = ["Parcela Norte", "Parcela Sur", "Sector A1"];
  const opcionesCultivos = ["Trigo", "Maíz", "Olivos", "Vides"]; // Opciones para el select
  const opcionesActividades = ["Riego", "Abonado", "Cosecha", "Poda", "Tratamiento"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    agregarActivity({
      id: crypto.randomUUID(),
      explotationId: explotationId, 
      tipo: formData.tipoActividad,
      parcela: formData.parcela,
      responsable: formData.responsable, // Ahora se envía lo que el usuario escribe
      detalles: formData.descripcion,
      fecha: formData.fecha,
      // Si tu contexto soporta 'cultivo', puedes añadirlo aquí también
    });
    onClose();
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1000
    }} onClick={onClose}>
      
      <div style={{ 
        backgroundColor: '#FFFBF1', width: '100%', maxWidth: '600px', 
        borderRadius: '50px', border: '15px solid rgba(0, 0, 0, 0.15)', 
        padding: '40px', position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} style={{ position: 'absolute', right: '30px', top: '20px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>

        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#222', fontSize: '28px', fontWeight: 'bold' }}>
          Registrar Actividad
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* PARCELA */}
          <div className="form-group">
            <label>Parcela</label>
            <select name="parcela" value={formData.parcela} onChange={handleChange} required>
              <option value="">Selecciona una parcela</option>
              {opcionesParcelas.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* CULTIVO (Añadido debajo de Parcela) */}
          <div className="form-group">
            <label>Tipo de cultivo</label>
            <select name="cultivo" value={formData.cultivo} onChange={handleChange} required>
              <option value="">Selecciona cultivo</option>
              {opcionesCultivos.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* TIPO DE ACTIVIDAD */}
          <div className="form-group">
            <label>Tipo de actividad</label>
            <select name="tipoActividad" value={formData.tipoActividad} onChange={handleChange} required>
              <option value="">Selecciona actividad</option>
              {opcionesActividades.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          {/* FECHA */}
          <div className="form-group">
            <label>Fecha</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
          </div>

          {/* RESPONSABLE (Añadido como Input de texto) */}
          <div className="form-group">
            <label>Responsable</label>
            <input 
              type="text" 
              name="responsable" 
              value={formData.responsable} 
              onChange={handleChange} 
              placeholder="Nombre del responsable..." 
              required 
            />
          </div>

          {/* DESCRIPCIÓN */}
          <div className="form-group">
            <label>Descripción</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Detalles de la actividad..." />
          </div>

          <button type="submit" className="btn-submit" style={{ backgroundColor: '#68911B', color: 'white', padding: '15px', borderRadius: '20px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            REGISTRAR ACTIVIDAD
          </button>
        </form>

        <div style={{ height: '6px', backgroundColor: '#EFAD23', width: '70%', margin: '30px auto 0', borderRadius: '10px' }}></div>
      </div>
    </div>
  );
};

export default ActivityRegister;