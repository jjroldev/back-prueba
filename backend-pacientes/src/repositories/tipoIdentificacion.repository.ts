import { AppDataSource } from "../config/data.source";
import { TipoIdentificacion } from "../entities/TipoIdentificacion";

export const TipoIdentificacionRepository =
  AppDataSource.getRepository(TipoIdentificacion);
