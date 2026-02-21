import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";

const RegisterProducer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#FFFBF1" }}
    >
      <div className="mx-auto max-w-[980px] px-8 py-12">
        <div
          className="rounded-[34px] p-8 shadow-2xl border"
          style={{
            backgroundColor: "rgba(11,16,1,0.05)",
            borderColor: "rgba(11,16,1,0.10)",
          }}
        >
          <RegisterForm
            role="producer"
            showLicenseField={false}
            subtitle="Perfil: Productor"
            onSuccess={() => navigate("/login")}
          />

          <div className="mt-6 text-center">
            <Link
              to="/register"
              style={{ color: "#0B1001" }}
              className="underline font-semibold"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProducer;