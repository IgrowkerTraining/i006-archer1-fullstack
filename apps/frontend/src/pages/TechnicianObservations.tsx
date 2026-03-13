import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ObservationForm } from "../components/observations/ObservationForm";
import "../styles/archer-shell.css";
import { mockAddObservation, mockGetActivity, type Activity } from "../mocks/observationsMock";

export default function TechnicianAddObservation() {
  const navigate = useNavigate();
  const { activityId } = useParams<{ activityId: string }>();

  const [activity, setActivity] = useState<Activity | null>(null);
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activityId) return;
    mockGetActivity(activityId).then(setActivity).catch(() => setActivity(null));
  }, [activityId]);

  const save = async () => {
    if (!activityId || !detail.trim()) return;

    try {
      setLoading(true);
      await mockAddObservation(activityId, detail);
      navigate(`/app/technician/activities/${activityId}/observations`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="archer-page-bg">
      <div className="archer-page-shell--narrow">
        <div
          className="rounded-[34px] p-6 md:p-8 shadow-2xl border"
          style={{
            backgroundColor: "rgba(255,251,241,0.45)",
            borderColor: "rgba(11,16,1,0.10)",
          }}
        >
          <div
            className="w-full rounded-[28px] border shadow-2xl overflow-hidden"
            style={{
              backgroundColor: "#FFFBF1",
              borderColor: "rgba(11,16,1,0.12)",
              color: "#0B1001",
            }}
          >
            <div
              className="px-8 md:px-10 pt-8 md:pt-10 pb-6 border-b"
              style={{ borderColor: "rgba(11,16,1,0.10)" }}
            >
              <div className="flex items-start gap-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="h-14 w-14 rounded-full flex items-center justify-center border shadow-sm"
                  style={{
                    backgroundColor: "rgba(11,16,1,0.06)",
                    borderColor: "rgba(11,16,1,0.12)",
                    color: "#0B1001",
                  }}
                  aria-label="Volver"
                >
                  ←
                </button>

                <div className="flex-1">
                  <h1 className="text-[32px] md:text-[34px] leading-tight font-extrabold tracking-tight">
                    Agregar observación
                  </h1>
                  <p className="mt-2 text-lg" style={{ opacity: 0.78 }}>
                    {activity
                      ? `${activity.activityType} · ${activity.parcel}`
                      : "Tipo de actividad · Parcela"}
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
                  TÉCNICO
                </div>
              </div>
            </div>

            <div className="px-8 md:px-10 py-10 flex justify-center">
              <ObservationForm
                value={detail}
                onChange={setDetail}
                onSave={save}
                onCancel={() => navigate(-1)}
                loading={loading}
              />
            </div>

            <div className="px-8 md:px-10 pb-8">
              <div className="h-[6px] rounded-full" style={{ backgroundColor: "#EFAD23" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}