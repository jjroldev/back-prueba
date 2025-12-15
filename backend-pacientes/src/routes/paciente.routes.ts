import { Router } from "express";
import PacienteController from "../controllers/paciente.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /pacientes/{idPaciente}:
 *   get:
 *     summary: Buscar paciente por ID
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPaciente
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente no encontrado
 */
router.get("/:idPaciente", PacienteController.buscarPorId);



/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Crear paciente
 *     description: Crea un nuevo paciente usando secuencia Oracle MGM_SEQ_PACIENT
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigoTipoIdentificacion
 *               - numeroIdentificacion
 *               - primerNombre
 *               - primerApellido
 *               - email
 *             properties:
 *               codigoTipoIdentificacion:
 *                 type: string
 *                 example: CED
 *               numeroIdentificacion:
 *                 type: string
 *                 example: "0912345678"
 *               primerNombre:
 *                 type: string
 *                 example: JUAN
 *               segundoNombre:
 *                 type: string
 *                 example: CARLOS
 *               primerApellido:
 *                 type: string
 *                 example: PEREZ
 *               segundoApellido:
 *                 type: string
 *                 example: LOPEZ
 *               email:
 *                 type: string
 *                 example: juan.perez@mail.com
 *     responses:
 *       201:
 *         description: Paciente creado correctamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 */
router.post("/", authMiddleware, PacienteController.crear);



/**
 * @swagger
 * /pacientes/{idPaciente}:
 *   put:
 *     summary: Modificar paciente
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPaciente
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               primerNombre:
 *                 type: string
 *               segundoNombre:
 *                 type: string
 *               primerApellido:
 *                 type: string
 *               segundoApellido:
 *                 type: string
 *               email:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente actualizado
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Paciente no encontrado
 */
router.put("/:idPaciente", authMiddleware, PacienteController.actualizar);


/**
 * @swagger
 * /pacientes/{idPaciente}:
 *   delete:
 *     summary: Inactivar paciente
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPaciente
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente inactivado correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Paciente no encontrado
 */
router.delete("/:idPaciente", authMiddleware, PacienteController.eliminar);

/**
 * @swagger
 * /pacientes:
 *   get:
 *     tags: [Pacientes]
 *     summary: Buscar pacientes
 *     description: >
 *       Búsqueda de pacientes con filtros opcionales y paginación.
 *       Por defecto devuelve solo pacientes activos.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: numeroIdentificacion
 *         schema:
 *           type: string
 *         description: Número de identificación
 *       - in: query
 *         name: nombreCompleto
 *         schema:
 *           type: string
 *         description: Nombre completo del paciente
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Email del paciente
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           example: A
 *         description: Estado del paciente (A = Activo, I = Inactivo)
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número de página
 *       - in: query
 *         name: perPage
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Registros por página
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.get("/", authMiddleware, PacienteController.buscar);



export default router;
