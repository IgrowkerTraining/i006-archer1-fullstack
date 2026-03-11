import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"producer" | "technician" | "">("");

  const handleContinue = () => {
    if (role === "producer") navigate("/register/producer");
    if (role === "technician") navigate("/register/technician");
  };

  const roleCardBase =
    "w-full rounded-2xl border px-5 py-5 text-left transition shadow-sm";
  const roleCardIdle = "bg-[#FFFBF1] border-[rgba(11,16,1,0.12)] hover:bg-[rgba(11,16,1,0.03)]";
  const roleCardActive =
    "bg-[rgba(239,173,35,0.10)] border-[rgba(239,173,35,0.55)] shadow-md";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF1" }}>
      <div className="mx-auto max-w-[980px] px-8 py-12">
        <div
          className="rounded-[34px] p-8 shadow-2xl border"
          style={{
            backgroundColor: "rgba(11,16,1,0.05)",
            borderColor: "rgba(11,16,1,0.10)",
          }}
        >
          <div
            className="w-full rounded-[28px] border shadow-2xl overflow-hidden"
            style={{
              backgroundColor: "#FFFBF1",
              borderColor: "rgba(11,16,1,0.12)",
              color: "#0B1001",
            }}
          >
  
            <div
              className="px-10 pt-10 pb-6 border-b"
              style={{ borderColor: "rgba(11,16,1,0.10)" }}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h1 className="text-[34px] leading-tight font-extrabold tracking-tight">
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
                  SELECCIÓN
                </div>
              </div>
            </div>

            <div className="px-10 py-8">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setRole("producer")}
                  className={[
                    roleCardBase,
                    role === "producer" ? roleCardActive : roleCardIdle,
                  ].join(" ")}
                >
                  <p className="font-extrabold tracking-wide" style={{ color: "#0B1001" }}>
                    PRODUCTOR
                  </p>
                  <p className="mt-1 text-sm text-[#0B1001]/80">
                    Registro y gestión de actividades agrícolas
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("technician")}
                  className={[
                    roleCardBase,
                    role === "technician" ? roleCardActive : roleCardIdle,
                  ].join(" ")}
                >
                  <p className="font-extrabold tracking-wide" style={{ color: "#0B1001" }}>
                    TÉCNICO
                  </p>
                  <p className="mt-1 text-sm text-[#0B1001]/80">
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
                    onMouseEnter={(e) => {
                      if (!role) return;
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#5A7C16";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#68911B";
                    }}
                  >
                    Continuar
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: "rgba(11,16,1,0.10)" }}>
                  <p className="text-sm" style={{ opacity: 0.75 }}>
                    Ya tengo cuenta.{" "}
                    <Link to="/login" className="underline font-semibold" style={{ color: "#0B1001" }}>
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