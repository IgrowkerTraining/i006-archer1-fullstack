import { Request, Response } from "express";
import plotService from "../services/plotService";

class PlotController {
    async findAll(req: Request, res: Response) {
        const plots = await plotService.findAll();
        res.json(plots);
    }

    async create(req: Request, res: Response) {
        const plot = await plotService.create(req.body);
        res.json(plot);
    }
}

export default new PlotController();
