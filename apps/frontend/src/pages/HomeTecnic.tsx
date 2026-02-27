import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useExplotation } from "../context/ExplotationContext";
import LogoutButton from "../components/LogoutButton";

export default function HomeTecnic() {
  const { user } = useAuth();
  const { explotations } = useExplotation();
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
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
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxSizing: "border-box",
        border: "20px solid rgba(255, 255, 255, 0.4)", 
        boxShadow: "0px 25px 60px rgba(0, 0, 0, 0.5)",
        overflow: "hidden"
      }}>
        

        <div style={{
          backgroundColor: "#68911B",
          width: "100%",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          marginTop: "40px"
        }}>
          <span style={{ fontWeight: "bold", color: "white", fontSize: "18px" }}>
            Panel de Control Técnico
          </span>
          
          <div ref={menuRef} style={{ position: "relative" }}>
            <div 
              onClick={toggleMenu}
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <span style={{ fontSize: "38px", color: "white" }}>
                <i className="bi bi-person-circle"></i>
              </span>
            </div>

            {menuAbierto && (
              <div style={{
                position: "absolute",
                top: "45px",
                right: "0",
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
                padding: "10px",
                width: "180px",
                zIndex: 1000,
              }}>
                <div style={{ 
                  padding: "5px 10px", 
                  fontSize: "14px", 
                  fontWeight: "bold", 
                  color: "#333",
                  borderBottom: "1px solid #eee",
                  marginBottom: "5px" 
                }}>
                  {user?.name || "Técnico"}
                </div>
                <LogoutButton />
              </div>
            )}
          </div>
        </div>

        <div style={{ 
          padding: "40px", 
          flex: 1, 
          display: "flex", 
          flexDirection: "column" 
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "28px", fontWeight: "900", color: "#333" }}>
            Explotaciones Asignadas
          </h2>

          <div style={{ 
            flex: 1, 
            overflowY: "auto", 
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            paddingRight: "5px"
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
                    <h3 style={{ margin: 0, fontSize: "22px", fontWeight: "900", color: "#000" }}>
                      {ex.nombre}
                    </h3>
                    <p style={{ margin: 0, fontSize: "15px", color: "#222", fontWeight: "600" }}>
                      Responsable: {ex.userId === "invitado" ? "Productor Invitado" : ex.userId}
                    </p>
                    <p style={{ margin: 0, fontSize: "14px", color: "#444" }}>
                      <i className="bi bi-geo-alt"></i> {ex.ubicacion}
                    </p>
                  </div>

                  <button 
                    onClick={() => navigate("/technical-history")}
                    style={{
                      backgroundColor: "#fdfaf2",
                      color: "#333",
                      border: "none",
                      padding: "10px 25px",
                      borderRadius: "15px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "13px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                      transition: "0.2s"
                    }}
                  >
                    HISTORIAL
                  </button>
                </div>
              ))
            )}
          </div>

          <div style={{
            width: "60%",
            height: "6px",
            backgroundColor: "#F3B130",
            margin: "30px auto 0 auto",
            borderRadius: "10px"
          }} />
        </div>
      </div>
    </div>
  );
}