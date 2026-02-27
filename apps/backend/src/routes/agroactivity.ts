import { Router, Request, Response } from 'express';
import agroactivityController from "@/controllers/agroactivityController";


const router = Router();

router.get("/history", agroactivityController.getHistory);


export default router;