
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useExplotaciones } from "../context/ExplotacionesContext";
import LogoutButton from "../components/LogoutButton";
import "../styles/HomeTecnico.css";

export default function HomeTecnico() {
  const { user } = useAuth();
  const { explotaciones } = useExplotaciones();
  const navigate = useNavigate();

  const explotacionesAsignadas = explotaciones.filter(
    (ex) => ex.tecnicoId === user?.id
  );

  return (
    <div className="home-wrapper">
      <div className="navbar">
        <div className="nav-title">Archer1</div>
        <div className="nav-user">
          {user?.name || user?.email} 👤
          <LogoutButton />
        </div>
      </div>

      <div className="home-container">
        <h2 className="section-title">Explotaciones asignadas</h2>

        {explotacionesAsignadas.length === 0 ? (
          <div className="empty-message">
            No tienes ninguna explotación asignada
          </div>
        ) : (
          <div className="cards-container">
            {explotacionesAsignadas.map((ex) => (
              <div
                key={ex.id}
                className="explotacion-card"
                onClick={() =>
                  navigate("/detalle-explotacion", {
                    state: { explotacionId: ex.id },
                  })
                }
              >
                <div className="card-icon">🖼️</div>

                <div className="card-content">
                  <h3>{ex.nombre}</h3>
                  <p><strong>Productor:</strong> {ex.productorNombre}</p>

                  <div className="card-buttons">
                    <button>Ver historial</button>
                    <button>Ver ubicación</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}