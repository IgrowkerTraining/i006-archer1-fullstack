import { Request, Response } from "express";
import ResumeService from "../services/resumeService";
import ResponseHelper from "../utils/responseHelper";

class ResumeController {
    async getResumeData(req: Request, res: Response) {
        const { exploitationId } = req.params;
        const month = Number(req.query.month);
        const year = Number(req.query.year);

        if (!exploitationId) {
            return res.status(400).json({ error: "exploitationId is required" });
        }
        if (!month || !year || isNaN(month) || isNaN(year)) {
            return res.status(400).json({ error: "month and year query parameters are required and must be valid numbers" });
        }

        const resumeData = await ResumeService.getResumeData(exploitationId, month, year);

        if (resumeData.activities.length === 0) {
            return ResponseHelper.success(res, {
                message: `No activities found for month ${month}/${year} in this exploitation`,
            });
        }

        return res.json(resumeData);
    }
    async getResume(req: Request, res: Response) {
        const { exploitationId } = req.params;
        const month = Number(req.query.month);
        const year = Number(req.query.year);

        if (!exploitationId) {
            return res.status(400).json({ error: "exploitationId is required" });
        }
        if (!month || !year || isNaN(month) || isNaN(year)) {
            return res.status(400).json({ error: "month and year query parameters are required and must be valid numbers" });
        }

        const resumeData = await ResumeService.getResumeData(exploitationId, month, year);

        if (resumeData.activities.length === 0) {
            return ResponseHelper.success(res, {
                message: `No activities found for month ${month}/${year} in this exploitation`,
            });
        }

        const result = await ResumeService.getResume(exploitationId, month, year);
        return res.json(result);
    }
}

export default new ResumeController();