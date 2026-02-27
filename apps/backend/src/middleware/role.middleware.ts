import { Request, Response, NextFunction } from "express";

export const requireTechnician = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    //Verificar que exista user 
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    // Verificar campo isTechnicial
    if (!req.user.istechnician) {
      res.status(403).json({
        message: "No tienes permisos para acceder a este recurso",
      });
      return;
    }

    //Si es técnico,continuar
    next();
  } catch (error) {
    res.status(500).json({ message: "Error verificando permisos" });
  }
};