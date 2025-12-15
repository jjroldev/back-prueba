import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * /autenticacion/login:
 *   post:
 *     summary: Login básico VERIS
 *     tags:
 *       - Autenticación
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 0
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login exitoso
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno
 */
router.post("/login", authController.login);

export default router;
