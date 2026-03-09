import { Request, Response } from "express";
import cropService from "@/services/cropService";
import ResponseHelper from "../utils/responseHelper";

export default {
  async createCrop(req: Request, res: Response) {
    try {
      const crop = await cropService.create({
        name: req.body.name,
        plot: req.body.plot,
      });

      return ResponseHelper.success(res, { "Crop created": crop.name }, 201);
    } catch (error) {
      return ResponseHelper.error(res,"Failure to create crop", 401,error instanceof Error ? error.message : error);
    }
  },
};