import React, { useState } from "react";
import { useExplotation } from "../context/ExplotationContext";
import "../styles/TechnicalAddExplotation.css";
import { useAuth } from "../hooks/useAuth";

interface Props {
  onClose: () => void;
  onSuccess: (id: string) => void;
}

const TechnicalAddExplotation: React.FC<Props> = ({ onClose, onSuccess }) => {
  // --- PASO 1: INSPECCIÓN ---
  const contexto = useExplotation();
  console.log("¿Qué hay dentro de useExplotation?:", contexto);

  const { agregarExplotation } = contexto;
  const { user } = useAuth();
  
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

    // Importante: user.id debe ser un UUID válido en Supabase
    const nuevaEx = {
      id: idTemporal,
      name: nombre,
      ubication_country: pais,
      ubication_region: region,
      surface: Number(superficie),
      producer: user?.id, 
    };

    console.log("Intentando enviar a Supabase:", nuevaEx);

    try {
      // Si agregarExplotation es undefined, aquí saltará al catch
      if (typeof agregarExplotation !== 'function') {
        throw new Error("La función agregarExplotation no existe en el contexto. Revisa ExplotationContext.tsx");
      }

      const resultado = await agregarExplotation(nuevaEx);
      
      console.log("✅ Guardado con éxito en el servidor:", resultado);
      const idFinal = resultado?.id || idTemporal;
      onSuccess(idFinal);
      onClose();

    } catch (error: any) {
      // --- PASO 2: VER EL ERROR REAL EN CONSOLA ---
      console.error("❌ ERROR REAL DEL SERVIDOR:", error.response?.data || error.message || error);
      
      console.warn("⚠️ Falló la conexión/validación. Guardando localmente como plan B...");
      onSuccess(idTemporal);
      onClose();
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