export interface Observation {
    technician: {
        name: string;
    };
    description: string;
}

export interface Activity {
    activitytype: string;
    plot: string;
    crop: string;
    date_day: string;
    date_month: string;
    date_year: string;
    responsible: string;
    description: string;
    observations: Observation[];
}

export interface ResumeData {
    exploitationid: string;
    mes: string;
    anio: string;
    activities: Activity[];
}

export interface ResumeResponse {
    id: string;
    exploitationid: string;
    mes: string;
    anio: string;
    resumen: ResumeData;
    fecha_generacion: string;
    modelo_usado: string;
    exitoso: boolean;
}