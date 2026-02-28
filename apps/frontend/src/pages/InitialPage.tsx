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
          padding: "0px 0px 60px 0px", 
          display: "flex",
          flexDirection: "column",
          border: "20px solid #f0eee4",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          position: "relative",
          overflow: "hidden"
        }}>



          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "30px", padding: "0 40px" }}>
            <p style={{ fontSize: "1.6rem", color: "#333", fontWeight: "600", textAlign: "center" }}>
              Aún no tienes explotaciones creadas
            </p>

            <button
              onClick={() => setShowModal(true)}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#72922B",
                color: "white",
                fontSize: "35px",
                fontWeight: "300",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: "0",
                paddingBottom: "5px"
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