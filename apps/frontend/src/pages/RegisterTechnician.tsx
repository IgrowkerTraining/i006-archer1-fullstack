import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";

const RegisterTechnician: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100svh] bg-[#FFFBF1] flex items-center justify-center p-6">
      <div className="w-full max-w-[900px]">
        <div
          className="rounded-[34px] p-6 md:p-8 shadow-2xl border"
          style={{
            backgroundColor: "rgba(11,16,1,0.05)",
            borderColor: "rgba(11,16,1,0.10)",
          }}
        >
          <RegisterForm
            role="technician"
            showLicenseField
            subtitle="Perfil: Técnico"
            onSuccess={() => navigate("/login")}
          />

          <div className="mt-6 text-center">
            <Link to="/register" className="underline font-semibold" style={{ color: "#0B1001" }}>
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTechnician;