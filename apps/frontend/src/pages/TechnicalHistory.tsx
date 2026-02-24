import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useExplotation, Activity, Explotation } from "../context/ExplotationContext";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";
import "../styles/ProducerHistory.css";

const TechnicalHistory: React.FC = () => {
  const { user } = useAuth();
  const { explotations = [], activities = [] } = useExplotation();
  const navigate = useNavigate();

  const [actividadesFiltradas, setActividadesFiltradas] = useState<Activity[]>([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [explotacionSeleccionada, setExplotacionSeleccionada] = useState<Explotation | null>(null);
  const [filtroActividad, setFiltroActividad] = useState<string>("todas");
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>("todos");
  const [filtroParcela, setFiltroParcela] = useState<string>("todas");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    let filtradas = [...activities];

    if (explotacionSeleccionada) {
      filtradas = filtradas.filter(act => act.explotationId === explotacionSeleccionada.id);
    }

    if (filtroActividad !== "todas") {
      filtradas = filtradas.filter(act => act.tipo === filtroActividad);
    }

    setActividadesFiltradas(filtradas);
  }, [activities, user, explotacionSeleccionada, filtroActividad]);

  return (
    <div className="page-background">
      <div className="history-frame">

        {/* NAVBAR */}
        <div className="navbar">

          {/* IZQUIERDA */}
          <div className="navbar-left">
            <span className="navbar-title">Historial Técnico</span>
          </div>

          {/* CENTRO (SELECT) */}
          <div className="navbar-center">
            <select
              className="navbar-select-small"
              value={explotacionSeleccionada?.id || ""}
              onChange={e => {
                const ex = explotations.find(ex => ex.id === e.target.value) || null;
                setExplotacionSeleccionada(ex);
              }}
            >
              <option value="">Todas las Explotaciones</option>
              {explotations.map(ex => (
                <option key={ex.id} value={ex.id}>{ex.nombre}</option>
              ))}
            </select>
          </div>

          {/* DERECHA (USUARIO) */}
          <div className="navbar-right" ref={menuRef}>
            <div className="user-chip" onClick={() => setMenuAbierto(!menuAbierto)}>
              <span style={{ fontSize: "20px" }}>👤</span>
              <span className="user-name">{user?.name || user?.email}</span>
            </div>

            {menuAbierto && (
              <div className="dropdown-menu">
                <LogoutButton />
              </div>
            )}
          </div>

        </div>

        {/* TÍTULO */}
        <h2 className="history-title">Registro Histórico de Actividades</h2>

        {/* FILTROS */}
        <div className="filtros-grid">
          <div className="form-group">
            <label>Actividad</label>
            <select
              className="filter-select"
              value={filtroActividad}
              onChange={e => setFiltroActividad(e.target.value)}
            >
              <option value="todas">Todas</option>
              {Array.from(new Set(activities.map(a => a.tipo))).map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Periodo</label>
            <select
              className="filter-select"
              value={filtroPeriodo}
              onChange={e => setFiltroPeriodo(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="ultimo-mes">Último mes</option>
              <option value="ultimo-trimestre">Último trimestre</option>
            </select>
          </div>

          <div className="form-group">
            <label>Parcela</label>
            <select
              className="filter-select"
              value={filtroParcela}
              onChange={e => setFiltroParcela(e.target.value)}
            >
              <option value="todas">Todas</option>
            </select>
          </div>
        </div>

        {/* TABLA */}
        <div className="table-container">
          {actividadesFiltradas.length === 0 ? (
            <p className="no-data">No hay registros que coincidan con los filtros.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Explotación</th>
                  <th>Actividad</th>
                  <th>Fecha</th>
                  <th>Detalles</th>
                </tr>
              </thead>
              <tbody>
                {actividadesFiltradas.map((act) => {
                  const ex = explotations.find((e) => e.id === act.explotationId);
                  return (
                    <tr key={act.id}>
                      <td className="bold">{ex?.nombre || "N/A"}</td>
                      <td><span className="badge">{act.tipo}</span></td>
                      <td>{new Date(act.fecha).toLocaleDateString()}</td>
                      <td className="text-small">{act.detalles}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
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

export default TechnicalHistory;