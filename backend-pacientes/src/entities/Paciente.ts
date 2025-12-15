import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { TipoIdentificacion } from "./TipoIdentificacion";
@Entity("MGM_PACIENTES")
export class Paciente {

  @PrimaryColumn({ name: "ID_PACIENTE", type: "int" })
  idPaciente!: number;

  @Column({ name: "NUMERO_IDENTIFICACION" })
  numeroIdentificacion!: string;

  @Column({ name: "PRIMER_NOMBRE" })
  primerNombre!: string;

  @Column({ name: "SEGUNDO_NOMBRE", nullable: true })
  segundoNombre?: string;

  @Column({ name: "PRIMER_APELLIDO" })
  primerApellido!: string;

  @Column({ name: "SEGUNDO_APELLIDO", nullable: true })
  segundoApellido?: string;

  @Column({ name: "NOMBRE_COMPLETO" })
  nombreCompleto!: string;

  @Column({ name: "EMAIL" })
  email!: string;

  @Column({ name: "ESTADO" })
  estado!: string;

  @Column({ name: "FECHA_INGRESO", type: "timestamp" })
  fechaIngreso!: Date;

  @Column({ name: "USUARIO_INGRESO" })
  usuarioIngreso!: string;

  @Column({ name: "FECHA_MODIFICACION", type: "timestamp", nullable: true })
  fechaModificacion?: Date;

  @Column({ name: "USUARIO_MODIFICACION", nullable: true })
  usuarioModificacion?: string;

  @ManyToOne(() => TipoIdentificacion)
  @JoinColumn({ name: "CODIGO_TIPO_IDENTIFICACION" })
  tipoIdentificacion!: TipoIdentificacion;

}
