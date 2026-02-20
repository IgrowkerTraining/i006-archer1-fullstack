import React, { useState } from "react";
import "../styles/RegistrarActividad.css";

export default function ActividadRegistro() {
  const [formData, setFormData] = useState({
    parcela: "",
    cultivo: "",
    fecha: "",
    tipoActividad: "",
    responsable: "",
    descripcion: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Registrar Actividad</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <label htmlFor="parcela">Parcela</label>
          <input
            type="text"
            id="parcela"
            name="parcela"
            value={formData.parcela}
            onChange={handleChange}
          />

          <label htmlFor="cultivo">Cultivo</label>
          <input
            type="text"
            id="cultivo"
            name="cultivo"
            value={formData.cultivo}
            onChange={handleChange}
          />

          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />

          <label htmlFor="tipoActividad">Tipo de actividad</label>
          <input
            type="text"
            id="tipoActividad"
            name="tipoActividad"
            value={formData.tipoActividad}
            onChange={handleChange}
          />

          <label htmlFor="responsable">Responsable</label>
          <input
            type="text"
            id="responsable"
            name="responsable"
            value={formData.responsable}
            onChange={handleChange}
          />

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />

          <button type="submit">Registrar Actividad</button>
        </form>
      </div>
    </div>
  );
}
