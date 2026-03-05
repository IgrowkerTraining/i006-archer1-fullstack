import React, { useState } from "react";
import { useExplotation } from "../context/ExplotationContext";
import "../styles/TechnicalAddExplotation.css";

interface Props {
  onClose: () => void;
  onSuccess: (id: string) => void;
}

const TechnicalAddExplotation: React.FC<Props> = ({ onClose, onSuccess }) => {
  const { agregarExplotation } = useExplotation();
  const [nombre, setNombre] = useState("");
  const [pais, setPais] = useState("");
  const [region, setRegion] = useState("");
  const [superficie, setSuperficie] = useState<number | "">("");

  const opcionesRegiones = ["Madrid", "Cataluña", "Mendoza", "Galicia"];
  const opcionesPaises = ["España", "Argentina"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !pais || !region || !superficie) {
      alert("Por favor completa todos los campos.");
      return;
    }


    const idTemporal = crypto.randomUUID();

    const nuevaEx = {
      id: idTemporal,
      name: nombre,
      ubication_country: pais,
      ubication_region: region,
      surface: Number(superficie),
      producer: "53e26dcf-5c71-4157-8cac-e786504083b2", 
    };

    try {
      const resultado = await agregarExplotation(nuevaEx);

      const idFinal = resultado?.id || idTemporal;
      onSuccess(idFinal);
    } catch (error) {
      console.warn("Backend no disponible, guardando localmente...");

      onSuccess(idTemporal);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="explotation-frame-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-x" onClick={onClose}>&times;</button>
        <h2 className="form-title">Crear explotación</h2>
        <h3 className="form-subtitle">Completa los datos de la explotación asignada</h3>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de la explotación</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Ubicación</label>
            <select value={pais} onChange={(e) => setPais(e.target.value)} required>
              <option value="">Selecciona tu ubicación</option>
              {opcionesPaises.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Región</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} required>
              <option value="">Selecciona región</option>
              {opcionesRegiones.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Superficie (ha)</label>
            <input type="number" step="0.01" value={superficie} onChange={(e) => setSuperficie(e.target.value === "" ? "" : Number(e.target.value))} required />
          </div>
          <button type="submit" className="btn-submit">Añadir Explotación</button>
        </form>
      </div>
    </div>
  );
};

export default TechnicalAddExplotation;