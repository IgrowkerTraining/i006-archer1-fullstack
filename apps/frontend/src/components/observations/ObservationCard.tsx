import React from "react";

type Observation = {
  id: string;
  activityId: string;
  createdAt: string;
  technicianName: string;
  technicianLicense?: string;
  detail: string;
};

type Props = {
  observation: Observation;
  activityType?: string;
  parcelCrop?: string;
};

export const ObservationCard: React.FC<Props> = ({
  observation,
  activityType = "Tipo de actividad",
  parcelCrop = "Parcela - Cultivo",
}) => {
  const date = new Date(observation.createdAt);
  const dateText = Number.isNaN(date.getTime())
    ? observation.createdAt
    : date.toLocaleDateString("es-ES");

  return (
    <div
      className="rounded-[22px] p-6 border shadow-md"
      style={{
        backgroundColor: "rgba(11,16,1,0.05)",
        borderColor: "rgba(11,16,1,0.12)",
        color: "#0B1001",
      }}
    >
      <p className="text-xs" style={{ opacity: 0.7 }}>
        {dateText}
      </p>

      <p className="mt-1 font-extrabold">{activityType}</p>
      <p className="text-sm" style={{ opacity: 0.8 }}>
        {parcelCrop}
      </p>

      <p className="text-xs mt-1" style={{ opacity: 0.7 }}>
        {observation.technicianName}
        {observation.technicianLicense ? ` · ${observation.technicianLicense}` : ""}
      </p>

      <div
        className="mt-4 rounded-[14px] p-4 min-h-[72px] border"
        style={{
          backgroundColor: "#FFFBF1",
          borderColor: "rgba(11,16,1,0.12)",
        }}
      >
        {observation.detail}
      </div>
    </div>
  );
};