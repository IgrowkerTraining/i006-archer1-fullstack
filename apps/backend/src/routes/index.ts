import { Router } from "express";
import authRoutes from "./auth";
import healthRoutes from "./health";
import testRoutes from "./test";
import activityRoutes from "./activity";
import observationRoutes from "./observation";
import agroactivityRoutes from "./agroactivity";
import exploitationRoutes from "./exploitation";
import resumeRoutes from "./resume";
import plotRoutes from "./plot";
import cropRoutes from "./crop";

const router = Router();

router.use("/auth", authRoutes);
router.use("/health", healthRoutes);
router.use("/test", testRoutes);
router.use("/activity", activityRoutes);
router.use("/observation", observationRoutes);
router.use("/agroactivity", agroactivityRoutes);
router.use("/exploitation", exploitationRoutes);
router.use("/resume", resumeRoutes);
router.use("/plot", plotRoutes);
router.use("/crop", cropRoutes);

export default router;
