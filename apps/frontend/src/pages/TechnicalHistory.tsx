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

  const [activitiesFiltered, setActivitiesFiltered] = useState<Activity[]>([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [explotationSelected, setExplotationSelected] = useState<Explotation | null>(null);
  const [filtroActividad, setFiltroActividad] = useState<string>("todas");
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>("todos");
  const [filtroParcela, setFiltroParcela] = useState<string>("todas");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const misExplotationsIds = explotations.map(ex => ex.id);

    let filtradas = activities.filter(act =>
      misExplotationsIds.includes(act.explotationId)
    );

    if (explotationSelected) {
      filtradas = filtradas.filter(act => act.explotationId === explotationSelected.id);
    }
    if (filtroActividad !== "todas") {
      filtradas = filtradas.filter(act => act.tipo === filtroActividad);
    }

    setActivitiesFiltered(filtradas);
  }, [activities, explotations, user, explotationSelected, filtroActividad, filtroPeriodo, filtroParcela]);

  useEffect(() => {
    const handleClickFuera = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  const toggleMenu = () => setMenuAbierto(prev => !prev);

  return (
    <div className="historial-wrapper">
      <div className="navbar">
        <div className="navbar-left">
          <span className="navbar-title">Historial</span>
        </div>

        <div className="navbar-center">
          <select
            value={explotationSelected?.id || ""}
            onChange={e => {
              const ex = explotations.find(ex => ex.id === e.target.value) || null;
              setExplotationSelected(ex);
            }}
          >
            <option value="">Seleccionar Explotación</option>
            {explotations.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.nombre}</option>
            ))}
          </select>
        </div>

        <div className="user-menu" ref={menuRef}>
          <div className="user-chip" onClick={toggleMenu}>
            <span className="user-icon">👤</span>
            <span className="user-name">{user?.name || user?.email}</span>
          </div>
          {menuAbierto && (
            <div className="dropdown-menu">
              <LogoutButton className="dropdown-item" />
            </div>
          )}
        </div>
      </div>

      <div className="filtros-container">
        <label>
          Explotación:
          <select
            value={explotationSelected?.id || ""}
            onChange={e => {
              const ex = explotations.find(ex => ex.id === e.target.value) || null;
              setExplotationSelected(ex);
            }}
          >
            <option value="">Todas</option>
            {explotations.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.nombre}</option>
            ))}
          </select>
        </label>

        <label>
          Actividad:
          <select value={filtroActividad} onChange={e => setFiltroActividad(e.target.value)}>
            <option value="todas">Todas</option>
            {Array.from(new Set(activities.map(a => a.tipo))).map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </label>

        <label>
          Periodo:
          <select value={filtroPeriodo} onChange={e => setFiltroPeriodo(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="ultimo-mes">Último mes</option>
            <option value="ultimo-trimestre">Último trimestre</option>
          </select>
        </label>

        <label>
          Parcela:
          <select value={filtroParcela} onChange={e => setFiltroParcela(e.target.value)}>
            <option value="todas">Todas</option>
          </select>
        </label>
      </div>

      <div className="historial-container">
        <h2>Historial de Actividades</h2>

        {activitiesFiltered.length === 0 ? (
          <p>No hay actividades registradas.</p>
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
              {activitiesFiltered.map((act) => {
                const ex = explotations.find((e) => e.id === act.explotationId);
                return (
                  <tr key={act.id}>
                    <td>{ex?.nombre || "Sin nombre"}</td>
                    <td>{act.tipo}</td>
                    <td>{new Date(act.fecha).toLocaleDateString()}</td>
                    <td>{act.detalles}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TechnicalHistory;