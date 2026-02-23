import { Router } from "express";
import authRoutes from "./auth";
import healthRoutes from "./health";
import testRoutes from "./test";
import exploitationRoutes from "./exploitation";
import plotRoutes from "./plot";

const router = Router();

router.use("/auth", authRoutes);
router.use("/health", healthRoutes);
router.use("/test", testRoutes);
router.use("/exploitation", exploitationRoutes);
router.use("/plot", plotRoutes);

export default router;
