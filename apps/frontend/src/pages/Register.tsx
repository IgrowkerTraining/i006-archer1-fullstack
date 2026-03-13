import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/archer-shell.css";
import { Button } from "../components/common/Button";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"producer" | "technician" | "">("");

  const handleContinue = () => {
    if (role === "producer") navigate("/register/producer");
    if (role === "technician") navigate("/register/technician");
  };

  const cardBase =
    "w-full rounded-2xl border px-5 py-5 text-left transition shadow-sm";
  const cardIdle = "hover:shadow-md";
  const cardSelected = "shadow-md";

  return (
    <div className="archer-page-bg">
      <div className="archer-page-shell">
        {/* Card exterior tablet */}
        <div
          className="rounded-[34px] p-6 md:p-8 shadow-2xl border"
          style={{
            backgroundColor: "rgba(11,16,1,0.05)",
            borderColor: "rgba(11,16,1,0.10)",
          }}
        >
          {/* Hoja interior */}
          <div
            className="w-full rounded-[28px] border shadow-2xl overflow-hidden"
            style={{
              backgroundColor: "#FFFBF1",
              borderColor: "rgba(11,16,1,0.12)",
              color: "#0B1001",
            }}
          >
            {/* Header */}
            <div
              className="px-8 md:px-10 pt-8 md:pt-10 pb-6 border-b"
              style={{ borderColor: "rgba(11,16,1,0.10)" }}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h1 className="text-[32px] md:text-[34px] leading-tight font-extrabold tracking-tight">
                    CREA TU CUENTA
                  </h1>
                  <p className="mt-2 text-lg" style={{ opacity: 0.78 }}>
                    Selecciona tu perfil para continuar
                  </p>
                </div>

                <div
                  className="shrink-0 px-4 py-2 rounded-2xl text-sm font-bold border"
                  style={{
                    borderColor: "rgba(11,16,1,0.18)",
                    backgroundColor: "rgba(239,173,35,0.18)",
                    color: "#0B1001",
                  }}
                >
                  REGISTRO
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 md:px-10 py-8">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setRole("producer")}
                  className={`${cardBase} ${role === "producer" ? cardSelected : cardIdle
                    }`}
                  style={{
                    backgroundColor:
                      role === "producer"
                        ? "rgba(239,173,35,0.10)"
                        : "rgba(11,16,1,0.03)",
                    borderColor:
                      role === "producer"
                        ? "rgba(239,173,35,0.55)"
                        : "rgba(11,16,1,0.12)",
                    color: "#0B1001",
                  }}
                >
                  <p className="font-extrabold tracking-wide">PRODUCTOR</p>
                  <p className="mt-1 text-sm" style={{ opacity: 0.78 }}>
                    Registro y gestión de actividades agrícolas
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("technician")}
                  className={`${cardBase} ${role === "technician" ? cardSelected : cardIdle
                    }`}
                  style={{
                    backgroundColor:
                      role === "technician"
                        ? "rgba(239,173,35,0.10)"
                        : "rgba(11,16,1,0.03)",
                    borderColor:
                      role === "technician"
                        ? "rgba(239,173,35,0.55)"
                        : "rgba(11,16,1,0.12)",
                    color: "#0B1001",
                  }}
                >
                  <p className="font-extrabold tracking-wide">TÉCNICO</p>
                  <p className="mt-1 text-sm" style={{ opacity: 0.78 }}>
                    Supervisión y observaciones técnicas
                  </p>
                </button>

                <div className="mt-6">
                  <Button
                    type="button"
                    className="w-full py-4 text-lg rounded-2xl"
                    disabled={!role}
                    onClick={handleContinue}
                    style={
                      {
                        backgroundColor: "#68911B",
                        color: "#FFFBF1",
                      } as any
                    }
                  >
                    Continuar
                  </Button>
                </div>

                <div
                  className="mt-8 pt-6 border-t text-center"
                  style={{ borderColor: "rgba(11,16,1,0.10)" }}
                >
                  <p className="text-sm" style={{ opacity: 0.75 }}>
                    Ya tengo cuenta.{" "}
                    <Link
                      to="/login"
                      className="underline font-semibold"
                      style={{ color: "#EFAD23" }}
                    >
                      Iniciar sesión
                    </Link>
                  </p>
                </div>

                <div
                  className="mt-8 h-[6px] rounded-full"
                  style={{ backgroundColor: "#EFAD23" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;