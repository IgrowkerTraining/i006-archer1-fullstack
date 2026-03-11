export type MonthlySummary = {
  explotacion: string;
  titular: string;
  responsableOperativo: string;
  tecnicoAsesor: string;
  periodoAnalizado: string;
  fechaGeneracion: string;
  origenDatos: string;
  resumenNarrativo: string;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function mockGenerateSummary(period: string): Promise<MonthlySummary> {
  await wait(1800);

  return {
    explotacion: "Finca El Olivar de San Pedro",
    titular: "María Dolores Fernández Ruiz",
    responsableOperativo: "Juan Manuel García López",
    tecnicoAsesor: "Ing. Agr. Carlos Martínez Navarro",
    periodoAnalizado: `1 al 31 de ${period}`,
    fechaGeneracion: "2 de abril de 2026",
    origenDatos: "Registros operativos ingresados por el productor en el sistema",
    resumenNarrativo:
      "Durante el período analizado se registraron actividades agrícolas de forma continua y cronológica sobre la Parcela 12 (“La Loma Norte”), correspondiente al cultivo de olivar variedad Picual, con una superficie total de 3,4 hectáreas.",
  };
}