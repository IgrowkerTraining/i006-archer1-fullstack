import { Button } from "../components/common/Button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"producer" | "technician" | "">("");

  useEffect(() => {
    const fetchTip = async () => {
      const tip = await getSecurityTip();
      setSecurityTip(tip);
    };
    fetchTip();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError(null);
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError(null);

    const newErrors: Record<string, string> = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      login(response.user);
      navigate("/"); 
    } catch (err: any) {
      setServerError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-slate-700">
          CREA TU CUENTA
        </h1>
        <p className="mt-2 text-center text-slate-500">
          Selecciona tu perfil para continuar
        </p>

        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={() => setRole("producer")}
            className={`w-full rounded-xl border px-4 py-4 text-left transition ${
              role === "producer"
                ? "border-slate-700 bg-slate-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <p className="font-semibold text-slate-700">PRODUCTOR</p>
            <p className="text-sm text-slate-500">
              Registro y gestión de actividades agrícolas
            </p>
          </button>

          <button
            type="button"
            onClick={() => setRole("technician")}
            className={`w-full rounded-xl border px-4 py-4 text-left transition ${
              role === "technician"
                ? "border-slate-700 bg-slate-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <p className="font-semibold text-slate-700">TÉCNICO</p>
            <p className="text-sm text-slate-500">
              Supervisión y observaciones técnicas
            </p>
          </button>

          <Button
            type="button"
            className="w-full mt-2"
            disabled={!role}
            onClick={handleContinue}
          >
            Continuar
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <p className="text-slate-500 text-sm">
            Ya tengo cuenta.{" "}
            <Link to="/login" className="font-semibold underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
