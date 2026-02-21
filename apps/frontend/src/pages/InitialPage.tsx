import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useExplotation } from "../context/ExplotationContext";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";

const InitialPage: React.FC = () => {
  const { explotations } = useExplotation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Redirigir automáticamente si ya existen explotaciones
  useEffect(() => {
    if (explotations.length > 0) {
      navigate("/homeProductor");
    }
  }, [explotations, navigate]);

  const toggleMenu = () => setMenuAbierto(prev => !prev);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{
      backgroundColor: "#FFFBF1",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "30px 20px",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "1100px",
        display: "flex",
        flexDirection: "column",
        gap: "30px"
      }}>
        <div style={{
          width: "100%",
          backgroundColor: "#EFAD23",
          borderRadius: "20px",
          padding: "16px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          marginBottom: "50px"
        }}>
          {/* Espacio para mantener el layout si decides poner algo a la izquierda */}
          <div /> 

          <div ref={menuRef} style={{ position: "relative" }}>
            <div
              onClick={toggleMenu}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "30px",
                backgroundColor: "#FFFBF1",
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "14px"
              }}
            >
              <span>👤</span>
              <span>{user?.name || user?.email}</span>
            </div>

            {menuAbierto && (
              <div style={{
                position: "absolute",
                top: "55px",
                right: 0,
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                padding: "8px",
                minWidth: "150px",
                zIndex: 10
              }}>
                <LogoutButton
                  className="dropdown-item"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "13px",
                    padding: "6px 10px",
                    cursor: "pointer",
                    color: "#0B1001",
                    borderRadius: "8px",
                    width: "100%",
                    textAlign: "left"
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "80px",
          textAlign: "center",
          padding: "0 20px",
          gap: "20px"
        }}>
          <p style={{
            fontSize: "1.3rem",
            color: "#0B1001"
          }}>
            Aún no tienes explotaciones creadas
          </p>
          <button
            onClick={() => navigate("/add-explotation")}
            style={{
              backgroundColor: "#68911B",
              color: "white",
              padding: "15px 40px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: "bold",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#557716")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#68911B")}
          >
            Agregar explotación
          </button>
        </div>
      </div>
    </div>
  );
};

// EXPORTACIÓN POR DEFECTO PARA EL ROUTER
export default InitialPage;