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
    <div className="w-full max-w-[420px]">
      <label
        className="block text-[14px] font-medium mb-2"
        style={{ color: "#0B1001" }}
      >
        Observación técnica
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Completar con la observación técnica"
        className="w-full min-h-[260px] rounded-[14px] p-4 outline-none border resize-none"
        style={{
          backgroundColor: "#FFFBF1",
          borderColor: "rgba(104,145,27,0.65)",
          color: "#567A12",
        }}
        disabled={loading}
      />

      <button
        type="button"
        onClick={onSave}
        disabled={disabled}
        className="mt-8 w-full h-[54px] rounded-full font-medium disabled:opacity-50"
        style={{
          backgroundColor: "rgba(104,145,27,0.12)",
          color: "rgba(11,16,1,0.30)",
        }}
      >
        Guardado observación
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="mt-4 w-full text-center text-[15px] underline"
        style={{ color: "#D58D12" }}
      >
        Cancelar
      </button>
    </div>
  );
};