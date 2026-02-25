export interface CreateActivityDTO {
    plot: string;
    crop: string;
    date_year?: number;
    date_month?: number;
    date_day?: number;
    activitytype: string;
    responsible: string;
    description: string;
}
