import cors from "cors";
import bodyParser from "body-parser";
import { Application, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swagger";

export const setupMiddleware = (app: Application): void => {
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
  app.use(bodyParser.json());

  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
