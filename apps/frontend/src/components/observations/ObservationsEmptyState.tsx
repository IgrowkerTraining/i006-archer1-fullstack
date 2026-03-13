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
    <div className="flex flex-col items-center justify-between min-h-[520px] pt-24 pb-10">
      <p
        className="text-center text-[22px] md:text-[24px] font-medium"
        style={{ color: "#A8A8A8" }}
      >
        {message}
      </p>

      {showFab ? (
        <button
          type="button"
          onClick={onAdd}
          className="h-[96px] w-[96px] rounded-full flex items-center justify-center shadow-lg"
          style={{
            backgroundColor: "#95CB1D",
            color: "#FFFBF1",
          }}
          aria-label="Agregar observación"
        >
          <span className="text-[58px] leading-none">+</span>
        </button>
      ) : <div />}
    </div>
  );
};