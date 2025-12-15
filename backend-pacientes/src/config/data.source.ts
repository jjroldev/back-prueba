import "reflect-metadata";
import { DataSource } from "typeorm";
import { Paciente } from "../entities/Paciente";
import { TipoIdentificacion } from "../entities/TipoIdentificacion";

export const AppDataSource = new DataSource({
  type: "oracle",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  serviceName: process.env.DB_SERVICE,

  logging: true,
  synchronize: false,

  entities: [
    Paciente,
    TipoIdentificacion
  ],
});
