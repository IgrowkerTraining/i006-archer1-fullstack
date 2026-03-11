import React from "react";
import type { MonthlySummary } from "../../mocks/summaryMock";

type Props = {
  summary: MonthlySummary;
  onDownload: () => void;
  onGenerateNew: () => void;
};

export const SummaryResultCard: React.FC<Props> = ({
  summary,
  onDownload,
  onGenerateNew,
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <h2
        className="text-[42px] md:text-[56px] font-extrabold leading-tight"
        style={{ color: "#6A9418" }}
      >
        RESUMEN GENERADO
        <br />
        CON ÉXITO
      </h2>

      <div
        className="mt-12 w-full max-w-[620px] rounded-[18px] p-6 border"
        style={{
          backgroundColor: "rgba(11,16,1,0.08)",
          borderColor: "rgba(11,16,1,0.08)",
        }}
      >
        <div
          className="w-full rounded-full py-3 px-6 text-center text-[20px] font-medium"
          style={{
            backgroundColor: "#95CB1D",
            color: "#FFFBF1",
          }}
        >
          Resumen de actividad
        </div>

        <div className="mt-5 text-left text-[15px]" style={{ color: "#0B1001" }}>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Explotación:</strong> {summary.explotacion}</li>
            <li><strong>Titular:</strong> {summary.titular}</li>
            <li><strong>Responsable operativo:</strong> {summary.responsableOperativo}</li>
            <li><strong>Técnico asesor:</strong> {summary.tecnicoAsesor}</li>
            <li><strong>Período analizado:</strong> {summary.periodoAnalizado}</li>
            <li><strong>Fecha de generación:</strong> {summary.fechaGeneracion}</li>
            <li><strong>Origen de datos:</strong> {summary.origenDatos}</li>
          </ul>

          <p className="mt-6 leading-7">{summary.resumenNarrativo}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onDownload}
        className="mt-14 w-full max-w-[520px] h-[58px] rounded-full text-[18px] font-medium"
        style={{
          backgroundColor: "#95CB1D",
          color: "#FFFBF1",
        }}
      >
        Descargar PDF
      </button>

      <button
        type="button"
        onClick={onGenerateNew}
        className="mt-6 underline text-[18px]"
        style={{ color: "#D58D12" }}
      >
        Generar nuevo resumen
      </button>
    </div>
  );
};