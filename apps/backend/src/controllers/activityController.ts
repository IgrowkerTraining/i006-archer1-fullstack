import activityService from "@/services/activityService";
import { Request, Response } from "express";

export default {
    async createActivity(req: Request, res: Response) {
        const { plot, crop, activitytype, responsible, date_day, date_month, date_year, description } = req.body;
        const activity = await activityService.createActivity({ plot, crop, activitytype, responsible, date_day, date_month, date_year, description });
        return res.json(activity);
    },

    async getActivities(req: Request, res: Response) {
        const { producerid } = req.params;
        const activities = await activityService.getActivitiesByProducer(producerid);
        return res.json(activities);
    },

    async getFormOptions(req: Request, res: Response) {
        const { producerid } = req.params;
        const options = await activityService.getFormOptions(producerid);
        return res.json(options);
    }
}
