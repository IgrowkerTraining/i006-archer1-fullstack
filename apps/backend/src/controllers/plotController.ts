import { Request, Response } from "express";
import plotService from "@/services/plotService";
import ResponseHelper from "../utils/responseHelper";

export default {
  async createPlot(req: Request, res: Response) {
    try {
      const plot = await plotService.create({
        name: req.body.name,
        exploitation: req.body.exploitation,
      });

      return ResponseHelper.success(res,{ "Plot created": plot.name },201);

    } catch (error) {
      return ResponseHelper.error(res,"Failure to create plot",401,error instanceof Error ? error.message : error);
    }
  }
};