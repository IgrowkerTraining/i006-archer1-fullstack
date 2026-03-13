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
  return (
    <div
      className="w-full max-w-[520px] rounded-[22px] p-4 md:p-5"
      style={{
        backgroundColor: "#95CB1D",
        color: "#FFFBF1",
      }}
    >
      <p className="text-[12px] leading-none opacity-95">{observation.createdAt}</p>

      <h3 className="mt-2 text-[18px] md:text-[20px] font-bold leading-tight">
        {activityType}
      </h3>

      <p className="mt-1 text-[14px] leading-tight opacity-95">{parcelCrop}</p>

      <p className="mt-1 text-[13px] leading-tight opacity-95">
        {observation.technicianName}
        {observation.technicianLicense ? ` Nº ${observation.technicianLicense}` : ""}
      </p>

      <div
        className="mt-4 rounded-[12px] min-h-[72px] px-4 py-3"
        style={{
          backgroundColor: "#FFFBF1",
          color: "#567A12",
        }}
      >
        <p className="text-[13px] md:text-[14px] leading-relaxed">{observation.detail}</p>
      </div>
    </div>
  );
};