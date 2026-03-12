import { Request, Response, NextFunction } from "express";
import ResponseHelper from "../utils/responseHelper";
import {RegisterDTO, LoginData ,ValidationError} from "../DTOs/user";


const required = (value: string | undefined, fieldName: string): string | null => {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
};

const email = (value: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Invalid email format";
  }
  return null;
};

const minLength = (value: string, min: number): string | null => {
  if (value.length < min) {
    return `Must be at least ${min} characters long`;
  }
  return null;
};

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: RegisterDTO = req.body;
  const errors: ValidationError[] = [];

  const fullnameError = required(data.fullname, "Full name");
  if (fullnameError) {
    errors.push({ field: "fullname", message: fullnameError });
  }

  const emailError = required(data.email, "Email") || email(data.email);
  if (emailError) {
    errors.push({ field: "email", message: emailError });
  }

  const passwordError =
    required(data.password, "Password") || minLength(data.password, 6);
  if (passwordError) {
    errors.push({ field: "password", message: passwordError });
  }

  if (typeof data.istechnician !== "boolean") {
    errors.push({
      field: "istechnician",
      message: "istechnician must be true or false",
    });
  }

  if (data.istechnician === true) {
    const regError = required(
      data.registrationnumber,
      "Registration number"
    );

    if (regError) {
      errors.push({
        field: "registrationnumber",
        message: "Registration number is required for technicians",
      });
    }
  }

  if (data.istechnician === false && data.registrationnumber) {
    errors.push({
      field: "registrationnumber",
      message:
        "Registration number must be null if user is not a technician",
    });
  }

  if (errors.length > 0) {
    return ResponseHelper.error(res, "Validation failed", 400, { errors });
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: LoginData = req.body;
  const errors: ValidationError[] = [];

  const emailError = required(data.email, "Email") || email(data.email);
  if (emailError) {
    errors.push({ field: "email", message: emailError });
  }

  const passwordError = required(data.password, "Password");
  if (passwordError) {
    errors.push({ field: "password", message: passwordError });
  }

  if (errors.length > 0) {
    return ResponseHelper.error(res, "Validation failed", 400, { errors });
  }

  next();
};




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