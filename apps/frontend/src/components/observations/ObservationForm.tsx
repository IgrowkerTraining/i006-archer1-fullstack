import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export const ObservationForm: React.FC<Props> = ({
  value,
  onChange,
  onSave,
  onCancel,
  loading = false,
}) => {
  const disabled = loading || !value.trim();

  return (
    <div className="w-full max-w-[560px]">
      <label className="block text-sm font-semibold mb-2" style={{ color: "#0B1001" }}>
        Observación técnica
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Completar con la observación técnica"
        className="w-full min-h-[240px] rounded-[18px] p-4 outline-none border"
        style={{
          backgroundColor: "#FFFBF1",
          borderColor: "rgba(11,16,1,0.18)",
          color: "#0B1001",
        }}
        disabled={loading}
      />

      <button
        type="button"
        onClick={onSave}
        disabled={disabled}
        className="mt-8 w-full h-[52px] rounded-[18px] font-semibold shadow-md disabled:opacity-50"
        style={{
          backgroundColor: "#68911B",
          color: "#FFFBF1",
        }}
      >
        Guardar observación
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="mt-3 w-full text-center text-sm font-semibold underline"
        style={{ color: "#0B1001", opacity: 0.8 }}
      >
        Cancelar
      </button>
    </div>
  );
};