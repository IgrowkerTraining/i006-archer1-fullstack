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
    cultivo: "",
    fecha: new Date().toISOString().split('T')[0],
    tipoActividad: "",
    responsable: "",
    descripcion: "",
  });

  const opcionesParcelas = [
    { nombre: "Parcela 14", id: "b8e69891-7b61-478a-88ba-248f82d87139" },
    { nombre: "Parcela 1", id: "6d631b2e-5cd4-4c43-ad6d-4229ba90cb57" },
    { nombre: "Parcela 17", id: "1a4b1e5a-6923-49f3-8d41-cd0f6df88a75" },
    { nombre: "Parcela 8", id: "d9ae4cd9-e352-4c5a-bed7-94775ff588ec"},
    { nombre: "Parcela 12", id: "fc0d93f6-4687-4179-9540-e7104539f110" }
  ];

  const opcionesCultivos = [
    { nombre: "Viñedo", id: "48aa76b4-d873-488a-965b-2af94bb355ac" },
    { nombre: "Olivar Picual", id: "54ae2205-a67b-4644-92a2-6afb9a63098a" },
    { nombre: "Viñedo soleado", id: "e264ca15-0354-4967-a3f2-cc226ece4605" }
  ]; 

  const opcionesActividades = [
    { nombre: "Recarga de activos", id: "c3ac43b4-a03e-4977-9eca-f3ca0c8eace4" },
    { nombre: "Aplicación fitosanitaria", id: "ca797386-2d27-49eb-b743-38df41da148e" },
    { nombre: "Monitorización de plagas", id: "69aa6b18-8f1e-4130-b0c1-7196434e0cc9" },
    { nombre: "Control de malezas", id: "7cd6b82c-545b-4ccd-b453-2ffea9d948b7" },
    { nombre: "Mantenimiento de sistemas de riego", id: "d0e72c22-52d9-4aa8-8393-245e6d8e7cb8" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const [year, month, day] = formData.fecha.split('-').map(Number);

  const userStr = localStorage.getItem('example_user');
  const userData = userStr ? JSON.parse(userStr) : null;

 const datosParaBackend = {
  plot: formData.parcela, 

  crop: formData.cultivo, 
  responsible: formData.responsable, 
  
  activitytype: formData.tipoActividad,
  description: formData.descripcion,
  date_day: day,
  date_month: month,
  date_year: year
};

  await agregarActivity(datosParaBackend as any); 
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
        <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#5d4a44', fontSize: '16px' }}>
          Completa los datos de la actividad realizada
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div className="form-group">
            <label>Parcela</label>
            <select name="parcela" value={formData.parcela} onChange={handleChange} required>
              <option value="">Selecciona una parcela</option>
              {opcionesParcelas.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Tipo de cultivo</label>
            <select name="cultivo" value={formData.cultivo} onChange={handleChange} required>
              <option value="">Selecciona cultivo</option>
              {opcionesCultivos.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Tipo de actividad</label>
            <select name="tipoActividad" value={formData.tipoActividad} onChange={handleChange} required>
              <option value="">Selecciona actividad</option>
              {opcionesActividades.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Fecha</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Responsable</label>
            <input 
              type="text" 
              name="responsable" 
              value={formData.responsable} 
              onChange={handleChange} 
              placeholder="Ingrese el nombre del productor responsable" 
              required 
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripcion de la act. realizada" />
          </div>

          <button type="submit" className="btn-submit" style={{ backgroundColor: '#68911B', color: 'white', padding: '15px', borderRadius: '20px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            Registrar actividad
          </button>
        </form>

        <div style={{ height: '6px', backgroundColor: '#EFAD23', width: '70%', margin: '30px auto 0', borderRadius: '10px' }}></div>
      </div>
    </div>
  );
};

export default ActivityRegister;