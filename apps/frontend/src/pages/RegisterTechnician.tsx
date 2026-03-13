import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";
import "../styles/archer-shell.css";

const RegisterTechnician: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="archer-page-bg">
      <div className="archer-page-shell--narrow">
        <div
          className="rounded-[34px] p-6 md:p-8 shadow-2xl border"
          style={{
            backgroundColor: "rgba(255,251,241,0.45)",
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