import { CreateActivityDTO } from "@/DTOs/activity";
import prisma from "@/utils/prisma";


class ActivityService {
    async createActivity(data: CreateActivityDTO) {
        return await prisma.agroactivity.create({
            data: {
                plot: data.plot,
                crop: data.crop,
                date_year: data.date_year,
                date_month: data.date_month,
                date_day: data.date_day,
                activitytype: data.activitytype,
                responsible: data.responsible,
                description: data.description
            }
        });
    }
    async getActivitiesByProducer(producerId: string) {
        return await prisma.agroactivity.findMany({
            where: {
                plot_agroactivity_plotToplot: {
                    exploitation_plot_exploitationToexploitation: {
                        producer: producerId
                    }
                }
            }
        });
    }
    async getFormOptions(producerId: string) {
        const plots = await prisma.plot.findMany({
            where: {
                exploitation_plot_exploitationToexploitation: {
                    producer: producerId
                }
            }
        });
        const crops = await prisma.crop.findMany({
            where: {
                plot_crop_plotToplot: {
                    exploitation_plot_exploitationToexploitation: {
                        producer: producerId
                    }
                }
            }
        });
        const activitytypes = await prisma.activitytype.findMany();
        return { plots, crops, activitytypes };
    }
}

export default new ActivityService();