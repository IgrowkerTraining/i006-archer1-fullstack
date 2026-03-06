import { Request, Response } from "express";
import agroactivityService from "@/services/agroactivityService";

class AgroactivityController {
  async getHistory(req: Request, res: Response) {
    try {
      const history = await agroactivityService.getHistory();
      return res.json(history);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error retrieving agroactivity history",
      });
    }
  }
}

export default new AgroactivityController();