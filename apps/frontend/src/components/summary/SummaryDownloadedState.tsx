import React from "react";

type Props = {
  onGoHome: () => void;
};

export const SummaryDownloadedState: React.FC<Props> = ({ onGoHome }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[640px] text-center">
      <h2
        className="text-[42px] md:text-[56px] font-extrabold leading-tight"
        style={{ color: "#6A9418" }}
      >
        RESUMEN DESCARGADO
        <br />
        CON ÉXITO
      </h2>

      <button
        type="button"
        onClick={onGoHome}
        className="mt-12 underline text-[18px]"
        style={{ color: "#D58D12" }}
      >
        Ir a Home
      </button>
    </div>
  );
};