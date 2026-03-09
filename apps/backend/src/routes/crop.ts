import { Router } from "express";
import { authenticateJWT } from "@/middleware/auth.middleware";
import { validateCreateCrop } from "../middleware/validators";
import cropController from "@/controllers/cropController";

const router = Router();

router.post("/createCrop",authenticateJWT,validateCreateCrop,cropController.createCrop);

export default router;