/*{
            exploitationid: string;
            mes: string;
            anio: string;
            activities: [
                {
                    activitytype: string;
                    plot: string;
                    crop: string;
                    date_day: string;
                    date_month: string;
                    date_year: string;
                    responsible: string;
                    description: string;
                    observations: [
                            {
                                technician: {
                                    name: string;
                                }
                                description: string;
                            }
                        ]
                    }
                ]
            }
        }*/

import prisma from "@/utils/prisma";

// ── Interfaces matching the commented JSON structure ──

interface Observation {
    technician: {
        name: string;
    };
    description: string;
}

interface Activity {
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

interface ResumeData {
    exploitationid: string;
    mes: string;
    anio: string;
    activities: Activity[];
}

interface ResumeResponse {
    id: string;
    exploitationid: string;
    mes: string;
    anio: string;
    resumen: ResumeData;
    fecha_generacion: string;
    modelo_usado: string;
    exitoso: boolean;
}

// ── Example URL (replace with the real endpoint) ──
const RESUME_API_URL = "https://i006-archer1-ai.onrender.com/api/v1/ia/resumen-mensual";

class ResumeService {
    /**
     * Builds the resume data from the database and sends it
     * via POST to an external API.
     */
    async getResume(exploitationId: string, month: number, year: number) {
        const resumeData = await this.buildResumeData(exploitationId, month, year);
        console.log(resumeData);

        const response = await fetch(RESUME_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resumeData),
        });
        const result = await response.json();
        console.log((result as ResumeResponse).resumen);
        return (result as ResumeResponse).resumen;
    }

    /**
     * Queries the database and shapes the data into the ResumeData structure.
     */
    private async buildResumeData(exploitationId: string, month: number, year: number): Promise<ResumeData> {
        const activities = await prisma.agroactivity.findMany({
            where: {
                plot_agroactivity_plotToplot: {
                    exploitation: exploitationId,
                },
                date_month: month,
                date_year: year,
            },
            include: {
                activitytype_agroactivity_activitytypeToactivitytype: true,
                crop_agroactivity_cropTocrop: true,
                plot_agroactivity_plotToplot: true,
                observation_observation_agroactivityToagroactivity: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: [
                { date_year: "desc" },
                { date_month: "desc" },
                { date_day: "desc" },
            ],
        });

        const mappedActivities: Activity[] = activities.map((activity) => ({
            activitytype:
                activity.activitytype_agroactivity_activitytypeToactivitytype?.name ?? "",
            plot: activity.plot_agroactivity_plotToplot?.name ?? "",
            crop: activity.crop_agroactivity_cropTocrop?.name ?? "",
            date_day: activity.date_day?.toString() ?? "",
            date_month: activity.date_month?.toString() ?? "",
            date_year: activity.date_year?.toString() ?? "",
            responsible: activity.responsible,
            description: activity.description,
            observations: activity.observation_observation_agroactivityToagroactivity.map((obs) => ({
                technician: {
                    name: obs.user?.fullname ?? "",
                },
                description: obs.observation ?? "",
            })),
        }));

        return {
            exploitationid: exploitationId,
            mes: month.toString(),
            anio: year.toString(),
            activities: mappedActivities,
        };
    }

    async getResumeData(exploitationId: string, month: number, year: number) {
        return await this.buildResumeData(exploitationId, month, year);
    }
}

export default new ResumeService();