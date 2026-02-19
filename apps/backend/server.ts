import express from "express";
import { setupMiddleware } from "./src/middleware";
import apiRoutes from "./src/routes";
import config from "./src/config";

const app = express();

setupMiddleware(app);

app.use("/api", apiRoutes);

app.listen(config.port, () => {
  console.log(`Example Auth Backend running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
