import React, { useState } from "react";
import { useExplotation } from "../context/ExplotationContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/TechnicalAddExplotation.css"; 

const TechnicalAddExplotation: React.FC = () => {
  const { agregarExplotation } = useExplotation(); // actualizado
  const { user } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [pais, setPais] = useState("");
  const [region, setRegion] = useState("");
  const [superficie, setSuperficie] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !ubicacion || !pais || !region || !superficie) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const nuevaExplotation = {
      id: Date.now().toString(),
      nombre,
      ubicacion,
      pais,
      region,
      superficie: Number(superficie),
      userId: user?.id || "unknown",
    };

    agregarExplotation(nuevaExplotation);

    navigate("/homeProductor", {
      state: { seleccionadaId: nuevaExplotation.id },
    });
  };

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Agregar Explotación</h2>
        <input
          placeholder="Nombre de la explotación"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        />
        <select value={pais} onChange={(e) => setPais(e.target.value)}>
          <option value="">Selecciona un país</option>
          <option value="España">España</option>
          <option value="Francia">Francia</option>
        </select>
        <input
          type="text"
          placeholder="Región"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <input
          type="number"
          placeholder="Superficie (ha)"
          value={superficie}
          onChange={(e) =>
            setSuperficie(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
        <button type="submit">Añadir Explotación</button>
      </form>
    </div>
  );
};

export default TechnicalAddExplotation;
