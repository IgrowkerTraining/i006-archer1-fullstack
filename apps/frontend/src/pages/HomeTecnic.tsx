import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useExplotation, Explotation } from "../context/ExplotationContext";
import LogoutButton from "../components/LogoutButton";

export default function HomeTecnic() {
  const { user } = useAuth();
  const { explotations } = useExplotation(); // hook ya seguro dentro del Provider
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Solo mostramos las explotaciones asignadas al técnico (filtrar después)
  // Cambié tecnicoId por userId
  const assignedExplotations = explotations.filter(
    (ex) => ex.userId === user?.id // Ahora usamos userId en vez de tecnicoId
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
    <div
      style={{
        backgroundColor: "#FFFBF1",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        {/* NAVBAR */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#EFAD23",
            borderRadius: "20px",
            padding: "16px 25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
            marginBottom: "50px",
          }}
        >
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
                fontSize: "14px",
              }}
            >
              <span>👤</span>
              <span>{user?.name || user?.email}</span>
            </div>

            {menuAbierto && (
              <div
                style={{
                  position: "absolute",
                  top: "55px",
                  right: 0,
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  padding: "8px",
                  minWidth: "150px",
                  zIndex: 10,
                }}
              >
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
                    width: "auto",
                    textAlign: "left",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* CONTENIDO */}
        {assignedExplotations.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              color: "#777",
            }}
          >
            No tienes ninguna explotación asignada por el momento.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {assignedExplotations.map((ex) => (
              <div
                key={ex.id}
                onClick={() =>
                  navigate("/detalle-explotacion", { state: { explotationId: ex.id } })
                }
                style={{
                  display: "flex",
                  backgroundColor: "#F4EBDC",
                  padding: "25px",
                  borderRadius: "25px",
                  alignItems: "center",
                  gap: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontSize: "40px" }}>🖼️</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "20px" }}>{ex.nombre}</h3>
                  <p style={{ margin: "5px 0 15px 0", fontSize: "14px" }}>
                    <strong>Productor:</strong> {user?.name || user?.email} {/* Aquí he puesto el nombre del usuario */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}