import { Request, Response, NextFunction } from "express";

export const requireTechnician = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // 1️⃣ Verificar que exista user (por seguridad extra)
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    // 2️⃣ Verificar campo isTechnicial
    if (!req.user.istechnician) {
      res.status(403).json({
        message: "No tienes permisos para acceder a este recurso",
      });
      return;
    }

    // 3️⃣ Si es técnico → continuar
    next();
  } catch (error) {
    res.status(500).json({ message: "Error verificando permisos" });
  }
};