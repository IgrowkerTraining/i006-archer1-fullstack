import { Request, Response } from "express";
import userService from "../services/userService";
import ValidatorUser from "../utils/validatorUser";
import ResponseHelper from "../utils/responseHelper";

class AuthController {

  async register(req: Request, res: Response): Promise<void> {
    try {

      const errors = ValidatorUser.validateRegister(req.body);
      if (errors.length > 0) {
        ResponseHelper.error(res, "Validation failed", 400, errors);
        return;
      }

      const user = await userService.register(req.body);

      ResponseHelper.success(res, "Registered successfully" ,201);

    } catch (error: any) {
      if (error.message === "User already exists") {
        ResponseHelper.error(res, "Validation failed", 409, {error: error.message});
        return;
      }

      ResponseHelper.error(res, "Validation failed", 500, {error: "Registration failed"});
    }
  }


  async login(req: Request, res: Response): Promise<void> {
    try {
      const errors = ValidatorUser.validateLogin(req.body);

      if (errors.length > 0) {
        ResponseHelper.error(res, "Validation failed", 400, {errors});
        return;
      }

      const { email, password } = req.body;

      const result = await userService.login(email, password);

      ResponseHelper.success(res," token: result.token",200);

    } catch (error: any) {
        if (error.message === "Invalid credentials") {
          ResponseHelper.error(res, "Validation failed", 401, {error: error.message});
          return;
        }
        ResponseHelper.error(res, "Login failed", 500, {detail: error.message});
      }
  }
}

export default new AuthController();
