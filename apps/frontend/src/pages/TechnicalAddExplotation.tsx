import React, { useState } from "react";
import { useExplotation } from "../context/ExplotationContext";
import { useNavigate } from "react-router-dom";
import "../styles/TechnicalAddExplotation.css";

const TechnicalAddExplotation: React.FC = () => {
  const { agregarExplotation } = useExplotation();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [region, setRegion] = useState("");
  const [superficie, setSuperficie] = useState<number | "">("");

  // Opciones para los selectores
  const opcionesRegiones = ["Extremadura", "Andalucía", "Castilla-La Mancha", "Aragón", "Comunidad Valenciana"];
  const opcionesUbicaciones = ["Badajoz", "Cáceres", "Sevilla", "Córdoba", "Jaén", "Ciudad Real"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !ubicacion || !region || !superficie) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const nuevaId = crypto.randomUUID();

    agregarExplotation({
      id: nuevaId,
      nombre,
      ubicacion,
      pais: "España", 
      region,
      superficie: Number(superficie),
      userId: "invitado",
    });

    navigate("/homeProductor", { state: { seleccionadaId: nuevaId } });
  };

  return (
    <div className="page-background">
      <div className="explotation-frame">
        <h2 className="form-title">Agregar Explotación</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Nombre de la explotación</label>
            <input 
              placeholder="Ej: Olivares" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Ubicación</label>
            <select value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
              <option value="">Selecciona ubicación</option>
              {opcionesUbicaciones.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Región</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">Selecciona región</option>
              {opcionesRegiones.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Superficie (ha)</label>
            <input 
              type="number" 
              value={superficie} 
              onChange={(e) => setSuperficie(e.target.value === "" ? "" : Number(e.target.value))} 
            />
          </div>

          <button type="submit" className="btn-submit">Añadir Explotación</button>
        </form>
      </div>
    </div>
  );
};

export default TechnicalAddExplotation;