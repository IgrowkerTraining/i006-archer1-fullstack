import { Response } from "express";

class ResponseHelper {
  static success(
    res: Response,
    payload: Record<string, any> = {},
    statusCode: number = 200
  ): Response {
    return res.status(statusCode).json({
      success: true,
      ...payload
    });
  }

  static error(
    res: Response,
    message: string = "Internal Server Error",
    statusCode: number = 500,
    error: unknown = null,
  ): Response {
    const responseBody: Record<string, unknown> = {
      success: false,
      message,
    };
    if (error) {
      responseBody.error = error;
    }
    return res.status(statusCode).json(responseBody);
  }

  static validationError(
    res: Response,
    errors: Array<{ field: string; message: string }>,
  ): Response {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }
}

export default ResponseHelper;
