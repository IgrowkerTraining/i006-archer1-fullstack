import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ObservationForm } from "../components/observations/ObservationForm";
import { mockGetActivity, type Activity } from "../mocks/observationsMock";
import { api } from "../services/api";
import "../styles/archer-shell.css";

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

      await api.createObservation({
        observation: detail,
        agroactivity: activityId,
      });

      navigate(`/app/technician/activities/${activityId}/observations`);
    } catch (error: any) {
      console.error("Error al crear observación:", error);
      alert(error?.message || "No se pudo guardar la observación.");
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
            className="w-full min-h-[760px] rounded-[28px] border shadow-2xl overflow-hidden"
            style={{
              backgroundColor: "#FFFBF1",
              borderColor: "rgba(11,16,1,0.12)",
              color: "#0B1001",
            }}
          >
            <div className="px-8 md:px-10 pt-10 pb-6">
              <div className="flex items-start gap-5">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="h-[54px] w-[54px] rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "#95CB1D",
                    color: "#FFFBF1",
                  }}
                  aria-label="Volver"
                >
                  <span className="text-[28px] leading-none">↩</span>
                </button>

                <div>
                  <h1 className="text-[34px] md:text-[38px] leading-tight font-medium">
                    Agregar observación
                  </h1>
                  <p className="mt-2 text-[13px]" style={{ color: "#567A12" }}>
                    {activity
                      ? `${activity.activityType} - ${activity.parcel}`
                      : `Actividad ${activityId ?? ""}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-8 md:px-10 pt-16 pb-10 flex justify-center">
              <ObservationForm
                value={detail}
                onChange={setDetail}
                onSave={save}
                onCancel={() => navigate(-1)}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}