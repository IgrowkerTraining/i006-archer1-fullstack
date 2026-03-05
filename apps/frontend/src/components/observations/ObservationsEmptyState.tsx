import React from "react";

type Props = {
  message?: string;
  showFab?: boolean;
  onAdd?: () => void;
};

export const ObservationsEmptyState: React.FC<Props> = ({
  message = "Aún no se realizaron observaciones",
  showFab = false,
  onAdd,
}) => {
  return (
    <div className="mt-24 flex flex-col items-center text-center">
      <p className="text-lg font-medium" style={{ color: "#0B1001", opacity: 0.45 }}>
        {message}
      </p>

      {showFab ? (
        <button
          type="button"
          onClick={onAdd}
          className="mt-10 h-20 w-20 rounded-full flex items-center justify-center shadow-lg border"
          style={{
            backgroundColor: "rgba(11,16,1,0.06)",
            borderColor: "rgba(11,16,1,0.12)",
            color: "#0B1001",
          }}
          aria-label="Agregar observación"
        >
          <span className="text-4xl leading-none">+</span>
        </button>
      ) : null}
    </div>
  );
};