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
              <div onClick={() => setMenuAbierto(!menuAbierto)} style={{ background: "white", padding: "8px 15px", borderRadius: "30px", cursor: "pointer" }}>
                <span>👤 {user?.name || user?.email}</span>
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
              onClick={() => {
                console.log("Abriendo modal...");
                setShowModal(true);
              }}
              style={{
                width: "90px",             // Ancho y alto iguales
                height: "90px",
                borderRadius: "60%",       // 50% lo hace círculo perfecto
                border: "none",
                backgroundColor: "#72922B",
                color: "white",
                fontSize: "40px",          // El símbolo + más grande
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 3px 0px #566e21",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.2s"
              }}
              title="Agregar explotación"
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