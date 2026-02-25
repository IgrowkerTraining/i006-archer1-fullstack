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

  useEffect(() => {
    if (explotations.length > 0) {
      navigate("/homeProductor");
    }
  }, [explotations, navigate]);

  const toggleMenu = () => setMenuAbierto(prev => !prev);

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
      backgroundColor: "#61615b",
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      margin: 0
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
        position: "relative",
        

        border: "20px solid #f0eee4",


        overflow: "hidden",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" 
      }}>
        
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "50px" }}>
          
          <div style={{
            backgroundColor: "#EFAD23",
            borderRadius: "20px",
            padding: "15px 25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div />
            <div ref={menuRef} style={{ position: "relative" }}>
              <div 
                onClick={toggleMenu}
                style={{
                  background: "white",
                  padding: "8px 15px",
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <span>👤</span>
                <span style={{ marginLeft: "8px", fontWeight: 500, fontSize: "14px", color: "#333" }}>
                  {user?.name || user?.email}
                </span>
              </div>

              {menuAbierto && (
                <div style={{
                  position: "absolute",
                  top: "55px",
                  right: 0,
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  padding: "8px",
                  minWidth: "150px",
                  zIndex: 100
                }}>
                  <LogoutButton className="dropdown-item" />
                </div>
              )}
            </div>
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            textAlign: "center",
            marginTop: "60px",
            gap: "30px"
          }}>
            <p style={{
              fontSize: "1.6rem",
              color: "#333",
              fontWeight: "600",
              maxWidth: "400px",
              margin: 0
            }}>
              Aún no tienes explotaciones creadas
            </p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              <button 
                onClick={() => navigate("/add-explotation")}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  padding: "22px",
                  borderRadius: "18px",
                  border: "none",
                  backgroundColor: "#72922B",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 5px 0px #566e21",
                  transition: "transform 0.1s"
                }}
              >
                Agregar explotación
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default InitialPage;