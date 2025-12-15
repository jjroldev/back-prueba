import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "VERIS_SECRET_KEY"; // usa el mismo del login

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  // 1️⃣ Verificar que exista el header
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Token requerido",
      data: null
    });
  }

  // 2️⃣ Verificar formato Bearer
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Formato de token inválido",
      data: null
    });
  }

  // 3️⃣ Extraer token
  const token = authHeader.split(" ")[1];

  try {
    // 4️⃣ Validar token
    const decoded = jwt.verify(token, JWT_SECRET);

    // (opcional) guardar info del usuario
    (req as any).user = decoded;

    // 5️⃣ Continuar al controller
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
      data: null
    });
  }
};
