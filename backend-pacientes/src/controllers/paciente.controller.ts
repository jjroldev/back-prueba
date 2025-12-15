import { Request, Response } from "express";
import { PacienteRepository } from "../repositories/paciente.repository";
import { TipoIdentificacionRepository } from "../repositories/tipoIdentificacion.repository";
import { AppDataSource } from "../config/data.source";
import { ApiResponse } from "../utils/apiResponse";
import { esEmailValido } from "../utils/validators";
class PacienteController {

    async crear(req: Request, res: Response) {
        try {
            const {
                codigoTipoIdentificacion,
                numeroIdentificacion,
                primerNombre,
                segundoNombre,
                primerApellido,
                segundoApellido,
                email
            } = req.body;

            if (!esEmailValido(email)) {
                return ApiResponse.error(res, "Email inválido", 1, 400);
            }

            const tipo = await TipoIdentificacionRepository.findOneBy({
                codigoTipoIdentificacion
            });

            if (!tipo) {
                return ApiResponse.error(res, "Tipo de identificación no existe", 2, 400);
            }

            const existeNumero = await PacienteRepository.findOne({
                where: { numeroIdentificacion }
            });

            if (existeNumero) {
                return ApiResponse.error(
                    res,
                    "Ya existe un paciente con ese número de identificación",
                    3,
                    409
                );
            }

            const existeEmail = await PacienteRepository.findOne({
                where: { email }
            });

            if (existeEmail) {
                return ApiResponse.error(
                    res,
                    "Ya existe un paciente con ese email",
                    4,
                    409
                );
            }

            const result = await AppDataSource.query(
                `SELECT MGM_SEQ_PACIENT.NEXTVAL AS ID FROM DUAL`
            );
            const idPaciente = result[0].ID;

            const paciente = PacienteRepository.create({
                idPaciente,
                numeroIdentificacion,
                primerNombre,
                segundoNombre,
                primerApellido,
                segundoApellido,
                nombreCompleto: `${primerNombre} ${segundoNombre ?? ""} ${primerApellido} ${segundoApellido ?? ""}`.trim(),
                email,
                estado: "A",
                fechaIngreso: new Date(),
                usuarioIngreso: "VERIS",
                tipoIdentificacion: tipo
            });

            await PacienteRepository.save(paciente);

            return ApiResponse.success(
                res,
                { idPaciente },
                "Paciente creado correctamente",
                0,
                201
            );

        } catch (error: any) {
            console.error("ERROR ORACLE:", error);
            return ApiResponse.error(res, error.message);
        }
    }

    async buscarPorId(req: Request, res: Response) {
        try {
            const { idPaciente } = req.params;

            const paciente = await PacienteRepository.findOne({
                where: { idPaciente: Number(idPaciente) },
                relations: ["tipoIdentificacion"]
            });

            if (!paciente) {
                return ApiResponse.error(res, "Paciente no encontrado", 3, 404);
            }

            return ApiResponse.success(
                res,
                paciente,
                "Paciente encontrado"
            );

        } catch (error) {
            console.error(error);
            return ApiResponse.error(res, "Error al buscar paciente");
        }
    }

    async actualizar(req: Request, res: Response) {
        try {
            const { idPaciente } = req.params;
            const {
                primerNombre,
                segundoNombre,
                primerApellido,
                segundoApellido,
                email
            } = req.body;

            const paciente = await PacienteRepository.findOne({
                where: { idPaciente: Number(idPaciente) },
                relations: ["tipoIdentificacion"]
            });

            if (!paciente) {
                return ApiResponse.error(res, "Paciente no encontrado", 3, 404);
            }

            if (email) {
                if (!esEmailValido(email)) {
                    return ApiResponse.error(res, "Email inválido", 1, 400);
                }
            }

            if (req.body.codigoTipoIdentificacion || req.body.numeroIdentificacion) {
                return ApiResponse.error(
                    res,
                    "No se puede modificar tipo ni número de identificación",
                    4,
                    400
                );
            }

            paciente.primerNombre = primerNombre ?? paciente.primerNombre;
            paciente.segundoNombre = segundoNombre ?? paciente.segundoNombre;
            paciente.primerApellido = primerApellido ?? paciente.primerApellido;
            paciente.segundoApellido = segundoApellido ?? paciente.segundoApellido;
            paciente.email = email ?? paciente.email;

            paciente.nombreCompleto = `${paciente.primerNombre} ${paciente.segundoNombre ?? ""} ${paciente.primerApellido} ${paciente.segundoApellido ?? ""}`.trim();

            paciente.usuarioModificacion = "VERIS";
            paciente.fechaModificacion = new Date();

            await PacienteRepository.save(paciente);

            return ApiResponse.success(
                res,
                paciente,
                "Paciente actualizado correctamente"
            );

        } catch (error) {
            console.error(error);
            return ApiResponse.error(res, "Error al actualizar paciente");
        }
    }


    async eliminar(req: Request, res: Response) {
        try {
            const { idPaciente } = req.params;

            const paciente = await PacienteRepository.findOneBy({
                idPaciente: Number(idPaciente)
            });

            if (!paciente) {
                return ApiResponse.error(res, "Paciente no encontrado", 3, 404);
            }

            paciente.estado = "I";
            paciente.usuarioModificacion = "VERIS";
            paciente.fechaModificacion = new Date();

            await PacienteRepository.save(paciente);

            return ApiResponse.success(
                res,
                null,
                "Paciente inactivado correctamente"
            );

        } catch (error) {
            console.error(error);
            return ApiResponse.error(res, "Error al inactivar paciente");
        }
    }

    async buscar(req: Request, res: Response) {
        try {
            const {
                numeroIdentificacion,
                nombreCompleto,
                email,
                estado,
                page,
                perPage
            } = req.query;

            const pageNumber = Number(page) > 0 ? Number(page) : 1;
            const pageSize = Number(perPage) > 0 ? Number(perPage) : 10;
            const skip = (pageNumber - 1) * pageSize;

            const estadoStr = estado?.toString().trim();
            const numeroIdStr = numeroIdentificacion?.toString().trim();
            const nombreStr = nombreCompleto?.toString().trim();
            const emailStr = email?.toString().trim();

            const qb = PacienteRepository.createQueryBuilder("p")
                .leftJoinAndSelect("p.tipoIdentificacion", "t")
                .orderBy("p.idPaciente", "ASC");

            if (estadoStr) {
                qb.where("p.estado = :estado", { estado: estadoStr });
            } else {
                qb.where("p.estado = 'A'");
            }

            if (numeroIdStr) {
                qb.andWhere(
                    `
                    UPPER(
                        REGEXP_REPLACE(p.numeroIdentificacion, '\\s+', '')
                    ) =
                    UPPER(
                        REGEXP_REPLACE(:numero, '\\s+', '')
                    )
                    `,
                    { numero: numeroIdStr }
                );
            }

            if (nombreStr) {
                qb.andWhere(
                    "UPPER(p.nombreCompleto) LIKE :nombre",
                    { nombre: `%${nombreStr.toUpperCase()}%` }
                );
            }

            if (emailStr) {
                qb.andWhere(
                    "LOWER(p.email) LIKE :email",
                    { email: `%${emailStr.toLowerCase()}%` }
                );
            }

            const [rows, total] = await qb
                .skip(skip)
                .take(pageSize)
                .getManyAndCount();

            return ApiResponse.success(
                res,
                {
                    rows,
                    page: pageNumber,
                    perPage: pageSize,
                    pageRows: rows.length,
                    totalRows: total
                },
                "Consulta exitosa"
            );

        } catch (error) {
            console.error(error);
            return ApiResponse.error(res, "Error al buscar pacientes");
        }
    }
}

export default new PacienteController();
