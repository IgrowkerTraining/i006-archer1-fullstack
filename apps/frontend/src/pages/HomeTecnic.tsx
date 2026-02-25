import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useExplotation } from "../context/ExplotationContext";
import LogoutButton from "../components/LogoutButton";

export default function HomeTecnic() {
  const { user } = useAuth();
  const { explotations } = useExplotation(); // Traemos todas las explotaciones del contexto
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Eliminamos el filtro de userId para que el Técnico vea TODO lo creado
  const allExplotations = explotations;

  const toggleMenu = () => setMenuAbierto((prev) => !prev);

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
      backgroundColor: "#837d7d",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      <div style={{
        backgroundColor: "#FFFAF2",
        width: "100%",
        maxWidth: "850px", 
        minHeight: "88vh",
        borderRadius: "60px",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxSizing: "border-box",
        border: "20px solid rgba(0, 0, 0, 0.15)", 
        boxShadow: "0px 25px 60px rgba(0, 0, 0, 0.5)",
      }}>
        
        {/* Cabecera del Panel */}
        <div ref={menuRef} style={{ position: "relative", marginBottom: "30px" }}>
          <div 
            onClick={toggleMenu}
            style={{
              backgroundColor: "#F3B130",
              padding: "10px 20px",
              borderRadius: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer"
            }}
          >
            <span style={{ fontWeight: "bold", color: "white", fontSize: "18px" }}>
              Panel de Control Técnico
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
               <span style={{ color: "white", fontWeight: "bold" }}>{user?.name || "Técnico"}</span>
               <span style={{ fontSize: "20px" }}>👤</span>
            </div>
          </div>

          {menuAbierto && (
            <div style={{
              position: "absolute",
              top: "55px",
              right: "0",
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
              padding: "10px",
              width: "180px",
              zIndex: 1000,
            }}>
              <LogoutButton />
            </div>
          )}
        </div>

        {/* Listado de Explotaciones (Cards) */}
        <div style={{ 
          flex: 1, 
          overflowY: "auto", 
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          paddingRight: "10px"
        }}>
          {allExplotations.length === 0 ? (
            <div style={{ textAlign: "center", color: "#A0A0A0", marginTop: "50px" }}>
              No hay explotaciones registradas en el sistema.
            </div>
          ) : (
            allExplotations.map((ex) => (
              <div 
                key={ex.id}
                style={{
                  backgroundColor: "#99a877",
                  borderRadius: "25px",
                  padding: "20px 30px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "900", color: "#000" }}>
                    {ex.nombre}
                  </h3>
                  <p style={{ margin: 0, fontSize: "16px", color: "#222", fontWeight: "600" }}>
                    Responsable: {ex.userId === "invitado" ? "Productor Invitado" : `Productor (${ex.userId})`}
                  </p>
                  <p style={{ margin: 0, fontSize: "15px", color: "#444" }}>
                    📍 {ex.ubicacion}, {ex.region}
                  </p>
                </div>

                <button 
                  onClick={() => navigate("/technical-history")}
                  style={{
                    backgroundColor: "#5e5d5d",
                    color: "white",
                    border: "none",
                    padding: "12px 25px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "15px",
                    transition: "0.2s"
                  }}
                >
                  Historial
                </button>
              </div>
            ))
          )}
        </div>

        {/* Línea decorativa inferior */}
        <div style={{
          width: "70%",
          height: "6px",
          backgroundColor: "#F3B130",
          margin: "30px auto 0 auto",
          borderRadius: "10px"
        }} />
      </div>
    </div>
  );
}