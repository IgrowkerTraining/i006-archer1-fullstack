import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ActivityRegister.css";

const ActivityRegister: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parcela: "",
    cultivo: "",
    fecha: "",
    tipoActividad: "",
    responsable: "",
    descripcion: "",
  });

  // Opciones de ejemplo (puedes traerlas de una API luego)
  const opcionesParcelas = ["Parcela Norte", "Parcela Sur", "Sector A1"];
  const opcionesCultivos = ["Trigo", "Maíz", "Olivos", "Vides"];
  const opcionesActividades = ["Riego", "Abonado", "Cosecha", "Poda", "Tratamiento"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="page-background">
      <div className="outer-frame">
        <div className="home-container">
          <h2>Registrar Actividad</h2>

          <form onSubmit={handleSubmit} className="form-grid">
            {/* SELECT: Parcela */}
            <div className="form-group">
              <label htmlFor="parcela">Parcela</label>
              <select
                id="parcela"
                name="parcela"
                value={formData.parcela}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una parcela</option>
                {opcionesParcelas.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* SELECT: Cultivo */}
            <div className="form-group">
              <label htmlFor="cultivo">Cultivo</label>
              <select
                id="cultivo"
                name="cultivo"
                value={formData.cultivo}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un cultivo</option>
                {opcionesCultivos.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fecha">Fecha</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
              />
            </div>

            {/* SELECT: Tipo de Actividad */}
            <div className="form-group">
              <label htmlFor="tipoActividad">Tipo de actividad</label>
              <select
                id="tipoActividad"
                name="tipoActividad"
                value={formData.tipoActividad}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona actividad</option>
                {opcionesActividades.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="responsable">Responsable</label>
              <input
                type="text"
                id="responsable"
                name="responsable"
                value={formData.responsable}
                onChange={handleChange}
                placeholder="Nombre del responsable"
              />
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Detalles de la actividad..."
              />
            </div>

            <button type="submit" className="btn-submit">
              Registrar Actividad
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

export default ActivityRegister;