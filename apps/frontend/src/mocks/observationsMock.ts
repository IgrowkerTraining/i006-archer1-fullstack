export type Activity = {
  id: string;
  date: string;
  activityType: string;
  parcel: string;
  crop: string;
  assignedTechnician?: { name: string; licenseNumber?: string };
};

export type Observation = {
  id: string;
  activityId: string;
  createdAt: string;
  technicianName: string;
  technicianLicense?: string;
  detail: string;
};

const activities: Record<string, Activity> = {
  "1": {
    id: "1",
    date: "2026-01-05",
    activityType: "Fertilización",
    parcel: "Parcela 1",
    crop: "Trigo",
    assignedTechnician: { name: "Técnico Demo", licenseNumber: "MAT-123" },
  },
  "2": {
    id: "2",
    date: "2026-01-12",
    activityType: "Riego",
    parcel: "Parcela 2",
    crop: "Maíz",
    assignedTechnician: { name: "Técnico Demo", licenseNumber: "MAT-123" },
  },
};

let observations: Observation[] = [
  {
    id: "obs-1",
    activityId: "1",
    createdAt: new Date().toISOString(),
    technicianName: "Técnico Demo",
    technicianLicense: "MAT-123",
    detail: "Se observó buen estado general. Registrar cantidad exacta aplicada.",
  },
];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function mockGetActivity(activityId: string): Promise<Activity> {
  await wait(200);
  return (
    activities[activityId] || {
      id: activityId,
      date: "2026-01-01",
      activityType: "Tipo de actividad",
      parcel: "Parcela",
      crop: "Cultivo",
      assignedTechnician: { name: "Técnico", licenseNumber: "MAT-000" },
    }
  );
}

export async function mockGetObservations(activityId: string): Promise<Observation[]> {
  await wait(200);
  return observations.filter((o) => o.activityId === activityId);
}

export async function mockAddObservation(activityId: string, detail: string): Promise<Observation> {
  await wait(300);
  const created: Observation = {
    id: `obs-${Math.random().toString(16).slice(2)}`,
    activityId,
    createdAt: new Date().toISOString(),
    technicianName: "Técnico Demo",
    technicianLicense: "MAT-123",
    detail,
  };
  observations = [created, ...observations];
  return created;
}