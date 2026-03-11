import React from "react";
import "../../styles/summary.css";

export const SummaryLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[520px] text-center">
      <h2
        className="text-[28px] md:text-[32px] font-medium"
        style={{ color: "#567A12" }}
      >
        Generando resumen
      </h2>

      <div className="mt-10 summary-loading-track">
        <div className="summary-loading-bar" />
      </div>
    </div>
  );
};