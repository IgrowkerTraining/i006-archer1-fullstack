import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ObservationCard } from "../components/observations/ObservationCard";
import { ObservationsEmptyState } from "../components/observations/ObservationsEmptyState";
import { mockGetActivity, mockGetObservations, type Activity } from "../mocks/observationsMock";
import "../styles/archer-shell.css";

type ObservationUI = {
  id: string;
  activityId: string;
  createdAt: string;
  technicianName: string;
  technicianLicense?: string;
  detail: string;
};

export default function ProducerObservations() {
  const navigate = useNavigate();
  const { activityId } = useParams<{ activityId: string }>();

  const [activity, setActivity] = useState<Activity | null>(null);
  const [items, setItems] = useState<ObservationUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activityId) return;

    (async () => {
      try {
        setLoading(true);

        const [activityData, obs] = await Promise.all([
          mockGetActivity(activityId).catch(() => null),
          mockGetObservations(activityId),
        ]);

        setActivity(activityData);

        const mapped: ObservationUI[] = obs.map((item: any) => ({
          id: item.id,
          activityId: item.activityId,
          createdAt: item.createdAt,
          technicianName: item.technicianName || "Técnico asignado",
          technicianLicense: item.technicianLicense || "Matrícula",
          detail: item.detail,
        }));

        setItems(mapped);
      } catch (error) {
        console.error("Error cargando observaciones productor:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [activityId]);

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
                  onClick={() => navigate("/producer-history")}
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
                    Observaciones
                  </h1>
                  <p className="mt-2 text-[13px]" style={{ color: "#567A12" }}>
                    {activity
                      ? `${activity.activityType} - ${activity.parcel}`
                      : `Actividad ${activityId ?? ""}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-8 md:px-10 pb-10">
              {loading ? (
                <div className="mt-24 flex flex-col items-center">
                  <p className="italic" style={{ color: "#0B1001", opacity: 0.75 }}>
                    Cargando observaciones…
                  </p>
                  <div
                    className="mt-4 h-[6px] w-52 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(11,16,1,0.12)" }}
                  >
                    <div className="h-full w-20" style={{ backgroundColor: "#0B1001" }} />
                  </div>
                </div>
              ) : items.length === 0 ? (
                <ObservationsEmptyState showFab={false} />
              ) : (
                <div className="pt-6 pl-4 md:pl-10">
                  <div className="space-y-6">
                    {items.map((o) => (
                      <ObservationCard
                        key={o.id}
                        observation={o}
                        activityType={activity?.activityType || "Tipo de actividad"}
                        parcelCrop={`${activity?.parcel ?? "Parcela"} - ${activity?.crop ?? "Cultivo"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}