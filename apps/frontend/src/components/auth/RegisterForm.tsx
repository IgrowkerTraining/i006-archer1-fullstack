import React, { useMemo, useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { api } from "../../services/api";

type Role = "producer" | "technician";

type RegisterFormProps = {
  role: Role;
  showLicenseField?: boolean;
  subtitle?: string;
  onSuccess?: () => void;
};

const COUNTRIES = [
  "España",
  "Alemania",
  "Francia",
  "Italia",
  "Portugal",
  "Reino Unido",
  "Países Bajos",
  "Bélgica",
  "Suiza",
  "Argentina",
  "Chile",
  "México",
  "Colombia",
  "Uruguay",
  "Perú",
];

export const RegisterForm: React.FC<RegisterFormProps> = ({
  role,
  showLicenseField = false,
  subtitle = "Completa tus datos para registrarte",
  onSuccess,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const title = useMemo(() => "CREA TU CUENTA", []);

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
      fullname: fullName,
      email,
      password,
      country,
      istechnician: role === "technician",
      registrationnumber: showLicenseField ? licenseNumber : "",
    };

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
              {title}
            </h1>
            <p className="mt-2 text-lg" style={{ opacity: 0.78 }}>
              {subtitle}
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
            {role === "producer" ? "PRODUCTOR" : "TÉCNICO"}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-10 py-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="col-span-2">
            <Input
              label="Nombre completo"
              placeholder="Ingrese su nombre y apellido"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="col-span-2">
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

          <div className="w-full">
            <label
              className="block text-[14px] font-semibold mb-2"
              style={{ color: "#0B1001" }}
            >
              País
            </label>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={loading}
              className="w-full h-12 px-4 text-[16px] rounded-xl border outline-none"
              style={{
                backgroundColor: "#FFFBF1",
                borderColor: "rgba(11,16,1,0.18)",
                color: "#0B1001",
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(239,173,35,0.25)";
                e.currentTarget.style.borderColor = "#EFAD23";
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(11,16,1,0.18)";
              }}
            >
              <option value="" disabled>
                Seleccionar país
              </option>

              {COUNTRIES.map((countryOption) => (
                <option key={countryOption} value={countryOption}>
                  {countryOption}
                </option>
              ))}
            </select>
          </div>

          {showLicenseField ? (
            <div className="col-span-2">
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
          <div
            className="mt-6 rounded-2xl border px-4 py-3 text-sm font-medium"
            style={{
              borderColor: "rgba(239, 68, 68, 0.35)",
              backgroundColor: "rgba(239, 68, 68, 0.10)",
              color: "#7f1d1d",
            }}
          >
            {error}
          </div>
        ) : null}

        <div className="mt-8">
          <Button
            type="submit"
            className="w-full py-4 text-lg rounded-2xl"
            isLoading={loading}
            style={
              {
                backgroundColor: "#68911B",
                color: "#FFFBF1",
              } as any
            }
          >
            Crear cuenta
          </Button>

          <p className="mt-4 text-sm text-center" style={{ opacity: 0.75 }}>
            Al continuar aceptas los términos y condiciones.
          </p>
        </div>

        <div
          className="mt-8 h-[6px] rounded-full"
          style={{ backgroundColor: "#EFAD23" }}
        />
      </form>
    </div>
  );
};

export default RegisterForm;