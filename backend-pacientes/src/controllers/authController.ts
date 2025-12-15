import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class AuthController {

  login(req: Request, res: Response) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Authorization header missing or invalid",
        data: null
      });
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");

    if (username !== "VERIS" || password !== "PRUEBAS123") {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Las credenciales de autentión no son válidas",
        data: null
      });
    }

    const token = jwt.sign(
      { usuario: username },
      "VERIS_SECRET_KEY",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      code: 0,
      success: true,
      message: "Login exitoso",
      data: {
        token
      }
    });
  }
}

export default new AuthController();
