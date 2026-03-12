import observationService from "@/services/observationService";
import { Request, Response } from "express";
import { User } from "../DTOs/user";

export default {
    async createObservation(req: Request, res: Response) {
        const { observation, agroactivity } = req.body;
        const technician = (req.user as User).id;
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