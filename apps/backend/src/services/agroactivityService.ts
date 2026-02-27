import prisma from "@/utils/prisma";

class AgroactivityService {
  
  async getHistory() {
    const history = await prisma.agroactivity.findMany({
      include: {
        activitytype_agroactivity_activitytypeToactivitytype: true,
        crop_agroactivity_cropTocrop: true,
        plot_agroactivity_plotToplot: true,
      },
      orderBy: [
        { date_year: "desc" },
        { date_month: "desc" },
        { date_day: "desc" },
      ],
    });

    return history.map((activity) => ({
      id: activity.id,
      date: `${activity.date_day}/${activity.date_month}/${activity.date_year}`,
      activityType:
        activity.activitytype_agroactivity_activitytypeToactivitytype?.name,
      plot: activity.plot_agroactivity_plotToplot?.name,
      crop: activity.crop_agroactivity_cropTocrop?.name,
      responsible: activity.responsible,
      description: activity.description,
    }));
  }
}

export default new AgroactivityService();