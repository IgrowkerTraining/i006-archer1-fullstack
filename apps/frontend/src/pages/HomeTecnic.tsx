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

  const assignedExplotations = explotations.filter(
    (ex) => ex.userId === user?.id
  );

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
        height: "88vh",
        borderRadius: "60px",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxSizing: "border-box",
        
        // BORDE FÍSICO PARA DEFINICIÓN
        border: "20px solid rgba(0, 0, 0, 0.15)", 
        
        // DOBLE SOMBRA NEGRA PURA
        boxShadow: "0px 0px 0px 10px rgba(0, 0, 0, 0.03), 0px 25px 60px rgba(0, 0, 0, 0.5)",
      }}>
        
        {/* BARRA SUPERIOR */}
        <div ref={menuRef} style={{ position: "relative" }}>
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
            <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '2px 12px' }}>
              <select style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '14px' }}>
                <option>Seleccionar explotación</option>
                {assignedExplotations.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.nombre}</option>
                ))}
              </select>
            </div>
            <span style={{ fontSize: "18px" }}>👤</span>
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

        {/* CONTENIDO */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#A0A0A0", textAlign: "center" }}>
          {assignedExplotations.length === 0 ? (
            "No tienes ninguna explotación asignada por el momento."
          ) : (
             <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '15px'}}>
                {/* Contenido si hay explotaciones */}
             </div>
          )}
        </div>

        {/* LÍNEA INFERIOR */}
        <div style={{
          width: "650px",
          height: "5px",
          backgroundColor: "#F3B130",
          margin: "0 auto 10px auto",
          borderRadius: "10px"
        }} />

      </div>
    </div>
  );
}