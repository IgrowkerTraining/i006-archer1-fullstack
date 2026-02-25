import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExplotation } from "../context/ExplotationContext";
import "../styles/ActivityRegister.css";

const ActivityRegister: React.FC = () => {
  const navigate = useNavigate();
  const { agregarActivity, explotations } = useExplotation();

  const [formData, setFormData] = useState({
    parcela: "",
    cultivo: "",
    fecha: "",
    tipoActividad: "",
    responsable: "",
    descripcion: "",
  });

  const opcionesParcelas = ["Parcela Norte", "Parcela Sur", "Sector A1"];
  const opcionesCultivos = ["Trigo", "Maíz", "Olivos", "Vides"];
  const opcionesActividades = ["Riego", "Abonado", "Cosecha", "Poda", "Tratamiento"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    agregarActivity({
      id: crypto.randomUUID(),
      explotationId: explotations[0]?.id || "temp-id", 
      tipo: formData.tipoActividad,
      parcela: formData.parcela,
      responsable: formData.responsable,
      detalles: formData.descripcion,
      fecha: formData.fecha,
    });
    navigate("/producer-history");
  };

  return (
    <div className="page-background" style={{ backgroundColor: '#868686', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      
      {/* CUADRO BLANCO CON MARCO FORZADO */}
      <div style={{ 
        backgroundColor: '#FFFBF1', 
        width: '100%', 
        maxWidth: '600px', 
        borderRadius: '50px', 
        border: '20px solid rgba(0, 0, 0, 0.15)', 
        boxShadow: '0px 25px 60px rgba(0, 0, 0, 0.5)', 
        padding: '40px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="home-container">
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#222', fontSize: '28px', fontWeight: 'bold' }}>
            Registrar Actividad
          </h2>
          
          <form onSubmit={handleSubmit} className="form-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <div className="form-group">
              <label>Parcela</label>
              <select name="parcela" value={formData.parcela} onChange={handleChange} required>
                <option value="">Selecciona una parcela</option>
                {opcionesParcelas.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Cultivo</label>
              <select name="cultivo" value={formData.cultivo} onChange={handleChange} required>
                <option value="">Selecciona un cultivo</option>
                {opcionesCultivos.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Fecha</label>
              <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Tipo de actividad</label>
              <select name="tipoActividad" value={formData.tipoActividad} onChange={handleChange} required>
                <option value="">Selecciona actividad</option>
                {opcionesActividades.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Responsable</label>
              <input type="text" name="responsable" value={formData.responsable} onChange={handleChange} placeholder="Nombre del responsable" />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Detalles de la actividad..." />
            </div>

            <button type="submit" className="btn-submit">Registrar Actividad</button>
          </form>
        </div>
        
        <div style={{ height: '6px', backgroundColor: '#EFAD23', width: '70%', margin: '40px auto 0', borderRadius: '10px' }}></div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ backgroundColor: '#5e5d5d', color: 'white', padding: '10px 50px', borderRadius: '30px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default ActivityRegister;