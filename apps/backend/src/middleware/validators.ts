import { Request, Response, NextFunction } from "express";
import ResponseHelper from "../utils/responseHelper";


export const validateCreateExploitation = (
    req: Request,
    res: Response,
    next: NextFunction) => {

    const { name, ubication_country, ubication_region, surface } = req.body;

    if (!name?.trim()) {
        return ResponseHelper.error(res, "Name is required", 400);
    }

    if (!ubication_country?.trim()) {
        return ResponseHelper.error(res, "Country is required", 400);
    }

    if (!ubication_region?.trim()) {
        return ResponseHelper.error(res, "Region is required", 400);
    }

    if (surface === undefined || surface <= 0) {
        return ResponseHelper.error(res, "Surface must be greater than 0", 400);
    }

    next();
};

export const validateCreatePlot = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, exploitation } = req.body;

  if (!name?.trim()) {
    return ResponseHelper.error(res, "Name is required", 400);
  }

  if (!exploitation) {
    return ResponseHelper.error(res, "Exploitation ID is required", 400);
  }

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(exploitation)) {
    return ResponseHelper.error(res, "Exploitation ID must be a valid UUID", 400);
  }

  next();
};



export const validateCreateCrop = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, plot } = req.body;

  if (!name?.trim()) {
    return ResponseHelper.error(res, "Name is required", 400);
  }

  if (!plot) {
    return ResponseHelper.error(res, "Plot ID is required", 400);
  }

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(plot)) {
    return ResponseHelper.error(res, "Plot ID must be a valid UUID", 400);
  }

  next();
};