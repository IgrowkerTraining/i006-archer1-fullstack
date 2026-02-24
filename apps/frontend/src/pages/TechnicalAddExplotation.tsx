import React, { useState } from "react";
import { useExplotation } from "../context/ExplotationContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/TechnicalAddExplotation.css";

const TechnicalAddExplotation: React.FC = () => {
  const { agregarExplotation } = useExplotation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [pais, setPais] = useState("");
  const [region, setRegion] = useState("");
  const [superficie, setSuperficie] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Error: No se ha podido identificar al usuario. Por favor, reinicie sesión.");
      return;
    }

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
      userId: user.id,
    };

    agregarExplotation(nuevaExplotation);
    navigate("/homeProductor", {
      state: { seleccionadaId: nuevaExplotation.id },
    });
  };

  return (
    <div className="page-background">
      <div className="outer-frame">
        <div className="home-container">
          <h2 className="form-title">Agregar Explotación</h2>
          
          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre de la explotación</label>
              <input
                placeholder="Ej: Finca de Olivares"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Ubicación</label>
              <input
                placeholder="Ciudad o coordenadas"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>País</label>
              <select value={pais} onChange={(e) => setPais(e.target.value)}>
                <option value="">Seleccionar país</option>
                <option value="España">España</option>
                <option value="Italia">Italia</option>
                <option value="Polonia">Polonia</option>
                <option value="Argentina">Argentina</option>
                <option value="Perú">Perú</option>
              </select>
            </div>

            <div className="form-group">
              <label>Región</label>
              <input
                type="text"
                placeholder="Provincia / Estado"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Superficie (ha)</label>
              <input
                type="number"
                placeholder="Total hectáreas"
                value={superficie}
                onChange={(e) =>
                  setSuperficie(e.target.value === "" ? "" : Number(e.target.value))
                }
              />
            </div>

            <button type="submit" className="btn-submit">
              Añadir Explotación
            </button>
          </form>
        </div>
        <div className="footer-line"></div>
      </div>

      <div className="back-link-container">
        <button className="back-link" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default TechnicalAddExplotation;