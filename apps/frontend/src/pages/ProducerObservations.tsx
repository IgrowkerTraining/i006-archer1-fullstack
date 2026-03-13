import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ObservationCard } from "../components/observations/ObservationCard";
import "../styles/archer-shell.css";
import { ObservationsEmptyState } from "../components/observations/ObservationsEmptyState";
import {
  mockGetActivity,
  mockGetObservations,
  type Activity,
  type Observation,
} from "../mocks/observationsMock";

export default function ProducerObservations() {
  const navigate = useNavigate();
  const { activityId } = useParams<{ activityId: string }>();

  const [activity, setActivity] = useState<Activity | null>(null);
  const [items, setItems] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activityId) return;

    (async () => {
      try {
        setLoading(true);
        const [a, obs] = await Promise.all([
          mockGetActivity(activityId),
          mockGetObservations(activityId),
        ]);
        setActivity(a);
        setItems(obs);
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
                    Observaciones
                  </h1>
                  <p className="mt-2 text-lg" style={{ opacity: 0.78 }}>
                    {activity
                      ? `${activity.activityType} · ${activity.parcel}`
                      : "Tipo de actividad · Parcela"}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-8 md:px-10 py-8">
              {loading ? (
                <div className="mt-20 flex flex-col items-center">
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
                <div className="space-y-6">
                  {items.map((o) => (
                    <ObservationCard
                      key={o.id}
                      observation={o}
                      activityType={activity?.activityType}
                      parcelCrop={`${activity?.parcel ?? "Parcela"} - ${activity?.crop ?? "Cultivo"
                        }`}
                    />
                  ))}
                </div>
              )}

              <div className="mt-8 h-[6px] rounded-full" style={{ backgroundColor: "#EFAD23" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}