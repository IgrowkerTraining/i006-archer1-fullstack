import { Request, Response } from "express";
import userService from "../services/userService";
import ResponseHelper from "../utils/responseHelper";

class AuthController {

  async register(req: Request, res: Response): Promise<void> {
  try {

    const user = await userService.register(req.body);

    ResponseHelper.success(res, { "Registered successfully": user }, 201);

  } catch (error: any) {
    if (error.message === "User already exists") {
      ResponseHelper.error(res, "Validation failed", 409, { error: error.message });
      return;
    }

    ResponseHelper.error(res, "Validation failed", 500, { error: "Registration failed" });
  }
}


async login(req: Request, res: Response): Promise<void> {
  try {

    const { email, password } = req.body;

    const result = await userService.login(email, password);

    res.cookie("token", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

    ResponseHelper.success(res, { token: result.token }, 200);

  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      ResponseHelper.error(res, "Validation failed", 401, { error: error.message });
      return;
    }

    ResponseHelper.error(res, "Login failed", 500, { detail: error.message });
  }
}
}

export default new AuthController();
