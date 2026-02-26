import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useExplotation } from "../context/ExplotationContext";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/LogoutButton";
import TechnicalAddExplotation from "./TechnicalAddExplotation";

const InitialPage: React.FC = () => {
  const { explotations } = useExplotation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (explotations.length > 0) {
      navigate("/homeProductor");
    }
  }, [explotations, navigate]);

  return (
    <>

      <div style={{
        backgroundColor: "#61615b",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}>

        <div style={{
          backgroundColor: "#fdfaf2",
          width: "100%",
          maxWidth: "900px",
          minHeight: "85vh",
          borderRadius: "80px",
          padding: "60px 40px",
          display: "flex",
          flexDirection: "column",
          border: "20px solid #f0eee4",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          position: "relative"
        }}>

          <div style={{ backgroundColor: "#EFAD23", borderRadius: "20px", padding: "15px 25px", display: "flex", justifyContent: "flex-end" }}>
            <div ref={menuRef} style={{ position: "relative" }}>
              <div onClick={() => setMenuAbierto(!menuAbierto)} style={{ borderRadius: "30px", cursor: "pointer", display: "flex", alignItems: "center" }}>

                <i className="bi bi-person-circle" style={{
                  marginRight: "8px",
                  fontSize: "2.5rem",
                  color: "#000000",
                  display: "inline-block"
                }}></i>

                <span style={{ color: "#333" }}> {user?.name || user?.email}</span>
              </div>
              {menuAbierto && (
                <div style={{ position: "absolute", top: "50px", right: 0, backgroundColor: "#fff", padding: "10px", borderRadius: "10px", zIndex: 100 }}>
                  <LogoutButton />
                </div>
              )}
            </div>
          </div>


          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "30px" }}>
            <p style={{ fontSize: "1.6rem", color: "#333", fontWeight: "600" }}>Aún no tienes explotaciones creadas</p>

            <button
              onClick={() => setShowModal(true)}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%", // Círculo perfecto
                border: "none",
                backgroundColor: "#72922B",
                color: "white",
                fontSize: "35px",
                fontWeight: "300", // Un poco más fino queda más elegante
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: "0",   // Truco para centrar verticalmente el +
                paddingBottom: "5px" // Ajuste fino manual para el símbolo +
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <TechnicalAddExplotation
          onClose={() => setShowModal(false)}
          onSuccess={(id) => {
            setShowModal(false);
            navigate("/homeProductor", { state: { seleccionadaId: id } });
          }}
        />
      )}
    </>
  );
};

export default InitialPage;