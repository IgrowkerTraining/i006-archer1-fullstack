import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";

const RegisterProducer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 md:py-14">
      <div className="mx-auto w-full max-w-md md:max-w-2xl">
        <RegisterForm
          role="producer"
          showLicenseField={false}
          onSuccess={() => navigate("/login")}
        />

        <div className="mt-6 text-center">
          <Link to="/register" className="text-sm text-slate-300 underline">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterProducer;
