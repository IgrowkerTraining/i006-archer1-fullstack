import observationService from "@/services/observationService";
import { Request, Response } from "express";

export default {
    async createObservation(req: Request, res: Response) {
        const { technician, observation, agroactivity } = req.body;
        const newObservation = await observationService.CreateObservation({ technician, observation, agroactivity });
        return res.json(newObservation);
    },

    async getObservationsByActivity(req: Request, res: Response) {
        const { activity } = req.params;
        const { agroactivity, plot, period } = req.query as { agroactivity?: string, plot?: string, period?: string };
        const observations = await observationService.GetObservationsByActivity(activity, { agroactivity, plot, period });
        return res.json(observations);
    }
}