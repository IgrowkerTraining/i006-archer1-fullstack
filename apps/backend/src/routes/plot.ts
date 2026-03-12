import { Router } from "express";
import plotController from "@/controllers/plotController";
import { validateCreatePlot } from "../middleware/validators";
import { authenticateJWT } from "@/middleware/auth.middleware";

const router = Router();

router.post("/createPlot",authenticateJWT,validateCreatePlot,plotController.createPlot);

export default router;