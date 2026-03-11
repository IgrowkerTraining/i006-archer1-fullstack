import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SummaryPeriodForm } from "../components/summary/SummaryPeriodForm";
import { SummaryLoadingState } from "../components/summary/SummaryLoadingState";
import { SummaryResultCard } from "../components/summary/SummaryResultCard";
import { SummaryDownloadedState } from "../components/summary/SummaryDownloadedState";
import { mockGenerateSummary, type MonthlySummary } from "../mocks/summaryMock";

type Step = "form" | "loading" | "result" | "downloaded";


const GenerateSummary: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("form");
  const [period, setPeriod] = useState("");
  const [summary, setSummary] = useState<MonthlySummary | null>(null);

  const handleGenerate = async () => {
    if (!period) return;

    setStep("loading");
    const data = await mockGenerateSummary(period);
    setSummary(data);
    setStep("result");
  };

  const handleDownload = () => {
    // Temporal para frontend: luego backend devolverá PDF real
    setStep("downloaded");
  };

  const handleGenerateNew = () => {
    setPeriod("");
    setSummary(null);
    setStep("form");
  };

  const handleGoHome = () => {
    navigate("/homeTecnic");
  };

  return (
    <div className="min-h-[100svh] bg-[#FFFBF1] flex items-center justify-center p-6">
      <div className="w-full max-w-[980px]">
        <div
          className="rounded-[34px] p-6 md:p-8 shadow-2xl border"
          style={{
            backgroundColor: "rgba(11,16,1,0.05)",
            borderColor: "rgba(11,16,1,0.10)",
          }}
        >
          <div
            className="w-full min-h-[880px] rounded-[28px] border shadow-2xl overflow-hidden"
            style={{
              backgroundColor: "#FFFBF1",
              borderColor: "rgba(11,16,1,0.12)",
              color: "#0B1001",
            }}
          >
            {step === "form" && (
              <div className="px-8 md:px-12 pt-14 pb-12">
                <div className="flex items-start gap-7">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="h-[58px] w-[58px] rounded-full flex items-center justify-center border shadow-sm text-[28px]"
                    style={{
                      backgroundColor: "#95CB1D",
                      borderColor: "#95CB1D",
                      color: "#FFFBF1",
                    }}
                    aria-label="Volver"
                  >
                    ↩
                  </button>

                  <div>
                    <h1 className="text-[40px] font-medium leading-tight">Generar resumen</h1>
                    <p className="mt-2 text-[18px]" style={{ opacity: 0.7 }}>
                      Seleccioná un período para generar el reporte mensual
                    </p>
                  </div>
                </div>

                <div className="mt-64 flex justify-center">
                  <SummaryPeriodForm
                    value={period}
                    onChange={setPeriod}
                    onSubmit={handleGenerate}
                  />
                </div>
              </div>
            )}

            {step === "loading" && <SummaryLoadingState />}

            {step === "result" && summary && (
              <div className="px-8 md:px-12 py-16">
                <SummaryResultCard
                  summary={summary}
                  onDownload={handleDownload}
                  onGenerateNew={handleGenerateNew}
                />
              </div>
            )}

            {step === "downloaded" && (
              <SummaryDownloadedState onGoHome={handleGoHome} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateSummary;