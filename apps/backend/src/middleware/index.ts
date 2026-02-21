import cors from "cors";
import bodyParser from "body-parser";
import { Application, Request, Response, NextFunction } from "express";

export const setupMiddleware = (app: Application): void => {
  app.use(cors());
  app.use(bodyParser.json());

  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
};
