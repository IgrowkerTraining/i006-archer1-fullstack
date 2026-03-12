import { CreateObservationDTO, ObservationFiltersDTO } from "@/DTOs/observation";
import prisma from "@/utils/prisma";

class ObservationService {
    async CreateObservation(data: CreateObservationDTO) {
        return await prisma.observation.create({
            data: {
                technician: data.technician,
                observation: data.observation,
                agroactivity: data.agroactivity,
                date: new Date()
            }
        });
    }
    async GetObservationsByActivity(activity: string, filters: ObservationFiltersDTO) {
        const where: any = {};

        where.agroactivity = activity;

        // Filter by activity
        if (filters.agroactivity) {
            where.agroactivity = filters.agroactivity;
        }

        // Filter by plot (through the agroactivity relation)
        if (filters.plot) {
            where.agroactivity_observation_agroactivityToagroactivity = {
                plot: filters.plot
            };
        }

        if (filters.period) {
            const month = parseInt(filters.period);
            const year = new Date().getFullYear();
            const startDate = new Date(year, month - 1, 1);          // Feb 1
            const endDate = new Date(year, month, 0);                 // Feb 28/29 (last day)
            where.date = {
                gte: startDate,
                lte: endDate
            };
        }

        return await prisma.observation.findMany({ where });
    }
}

export default new ObservationService();
