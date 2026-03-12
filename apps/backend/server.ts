import express from "express";
import { setupMiddleware } from "./src/middleware";
import apiRoutes from "./src/routes";
import config from "./src/config";

// BigInt serialization support (Prisma returns BigInt for some ID fields)
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const app = express();

setupMiddleware(app);

app.use("/api", apiRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON format"
    });
  }
  next();
});

app.listen(config.port, () => {
  console.log(`Example Auth Backend running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
