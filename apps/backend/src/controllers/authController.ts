import { Request, Response } from "express";
import userService from "../services/userService";

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({
          error: "All fields are required",
        });
        return;
      }

      const newUser = await userService.create({ name, email, password });

      res.status(201).json({
        user: newUser.toJSON(),
        message: "User registered successfully",
      });
    } catch (error) {
      if (error instanceof Error && error.message === "User already exists") {
        res.status(409).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Registration failed" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          error: "Email and password are required",
        });
        return;
      }

      const user = await userService.authenticate(email, password);

      res.json({
        user: user.toJSON(),
        token: "mock-jwt-token-" + user.id,
        message: "Login successful",
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid email or password") {
        res.status(401).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Login failed" });
    }
  }
}

export default new AuthController();
