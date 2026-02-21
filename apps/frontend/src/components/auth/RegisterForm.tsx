import React, { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { api } from "../../services/api";

type Role = "producer" | "technician";

type RegisterFormProps = {
  role: Role;
  showLicenseField?: boolean;
  onSuccess?: () => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  role,
  showLicenseField = false,
  onSuccess,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!fullName.trim()) return "El nombre completo es obligatorio.";
    if (!email.includes("@")) return "El email no es válido.";
    if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    if (!country.trim()) return "El país es obligatorio.";
    if (showLicenseField && !licenseNumber.trim()) return "La matrícula es obligatoria.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload: any = {
      name: fullName,
      email,
      password,
      country,
      role,
    };
    if (showLicenseField) payload.licenseNumber = licenseNumber;

    try {
      setLoading(true);
      await api.register(payload);
      onSuccess?.();
    } catch (err: any) {
      setError(err?.message || "No se pudo completar el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-700">
        CREA TU CUENTA
      </h1>
      <p className="mt-2 text-center text-slate-500 text-sm sm:text-base">
        Completa tus datos para registrarte
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div className="md:col-span-2">
            <Input
              label="Nombre completo"
              placeholder="Ingrese su nombre y apellido"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="md:col-span-2">
            <Input
              label="E-mail"
              type="email"
              placeholder="Ingrese su e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <Input
            label="Contraseña"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <Input
            label="País"
            placeholder="Seleccionar país"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={loading}
          />

          {showLicenseField ? (
            <div className="md:col-span-2">
              <Input
                label="Nº de matrícula"
                placeholder="Ingrese número de matrícula"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                disabled={loading}
              />
            </div>
          ) : null}
        </div>

        {error ? (
          <p className="mt-5 text-sm text-red-600 text-center">{error}</p>
        ) : null}

        {/* Botón grande y cómodo para tablet */}
        <div className="mt-6">
          <Button
            type="submit"
            className="w-full py-3 md:py-3.5 text-base"
            isLoading={loading}
          >
            Crear cuenta
          </Button>
        </div>
      </form>
    </div>
  );
};
