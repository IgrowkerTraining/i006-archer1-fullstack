export interface CreateObservationDTO {
    technician: string;
    observation: string;
    agroactivity: string;
}

export interface ObservationFiltersDTO {
    agroactivity?: string;
    plot?: string;
    period?: string;
}