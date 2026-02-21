import { Router } from "express";
import authRoutes from "./auth";
import healthRoutes from "./health";

const router = Router();

router.use("/auth", authRoutes);
router.use("/health", healthRoutes);
router.use("/activity");
router.use("/plot");
router.use("/history");

export default router;
