import React from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    loading?: boolean;
};

const PERIOD_OPTIONS = [
    "marzo de 2026",
    "abril de 2026",
    "mayo de 2026",
    "junio de 2026",
];

export const SummaryPeriodForm: React.FC<Props> = ({
    value,
    onChange,
    onSubmit,
    loading = false,
}) => {
    return (
        <div className="w-full max-w-[560px]">
            <label
                className="block text-[14px] font-semibold mb-2"
                style={{ color: "#0B1001" }}
            >
                Período
            </label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={loading}
                className="w-full h-12 px-4 text-[16px] rounded-[18px] border outline-none"
                style={{
                    backgroundColor: "#FFFBF1",
                    borderColor: "rgba(104,145,27,0.7)",
                    color: "#0B1001",
                }}
                onFocus={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(239,173,35,0.20)";
                    e.currentTarget.style.borderColor = "#EFAD23";
                }}
                onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(104,145,27,0.7)";
                }}
            >
                <option value="" disabled>
                    Seleccionar período
                </option>

                {PERIOD_OPTIONS.map((period) => (
                    <option key={period} value={period}>
                        {period}
                    </option>
                ))}
            </select>

            <button
                type="button"
                onClick={onSubmit}
                disabled={!value || loading}
                className="mt-10 w-full h-[54px] rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                    backgroundColor: !value || loading ? "rgba(104,145,27,0.12)" : "#68911B",
                    color: !value || loading ? "rgba(11,16,1,0.30)" : "#FFFBF1",
                }}
                onMouseEnter={(e) => {
                    if (!value || loading) return;
                    e.currentTarget.style.backgroundColor = "#5E8418";
                }}
                onMouseLeave={(e) => {
                    if (!value || loading) return;
                    e.currentTarget.style.backgroundColor = "#68911B";
                }}
            >
                Generar resumen
            </button>
        </div>
    );
};