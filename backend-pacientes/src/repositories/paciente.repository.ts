import { AppDataSource } from "../config/data.source";
import { Paciente } from "../entities/Paciente";

export const PacienteRepository = AppDataSource.getRepository(Paciente);
