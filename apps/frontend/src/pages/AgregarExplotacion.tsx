import React, { useState } from "react";
import { useExplotaciones } from "../context/ExplotacionesContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/AgregarExplotacion.css"; // asegúrate que la ruta sea correcta

const AgregarExplotacion: React.FC = () => {
  const { agregarExplotacion } = useExplotaciones();
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

    const nuevaExplotacion = {
      id: Date.now().toString(),
      nombre,
      ubicacion,
      pais,
      region,
      superficie: Number(superficie),
      userId: user?.id || "unknown",
    };

    agregarExplotacion(nuevaExplotacion);

    navigate("/homeProductor", {
      state: { seleccionadaId: nuevaExplotacion.id },
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
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">Selecciona una región</option>
          <option value="andalucia">Andalucía</option>
          <option value="catalunya">Cataluña</option>
          <option value="madrid">Madrid</option>
          <option value="extremadura">Extremadura</option>
          <option value="castilla_leon">Castilla León</option>
          <option value="murcia">Murcia</option>
          <option value="valencia">Comunidad Valenciana</option>
          <option value="galicia">Galicia</option>
          <option value="cantabria">Cantabria</option>
          <option value="asturias">Asturias</option>
          <option value="pais_vasco">País Vasco</option>
          <option value="navarra">Navarra</option>
          <option value="aragon">Aragón</option>
          <option value="canarias">Islas Canarias</option>
          <option value="baleares">Islas Baleares</option>
          <option value="ceuta">Ceuta</option>
          <option value="melilla">Melilla</option>
        </select>
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

export default AgregarExplotacion;
