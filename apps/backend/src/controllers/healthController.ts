import { Request, Response } from "express";

class HealthController {
  async check(_req: Request, res: Response): Promise<void> {
    try {
      res.json({
        status: "ok",
        timestamp: new Date(),
        uptime: process.uptime(),
      });
    } catch (_error) {
      res.status(500).json({
        status: "error",
        timestamp: new Date(),
        error: "Health check failed",
      });
    }
  }
}

export default new HealthController();
