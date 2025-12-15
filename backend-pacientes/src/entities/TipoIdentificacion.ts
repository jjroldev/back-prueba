import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Paciente } from "./Paciente";

@Entity("DAF_TIPOS_IDENTIFICACION")
export class TipoIdentificacion {

  @PrimaryColumn({ name: "CODIGO_TIPO_IDENTIFICACION" })
  codigoTipoIdentificacion!: string;

  @Column({ name: "NOMBRE_TIPO_IDENTIFICACION" })
  nombreTipoIdentificacion!: string;

  @Column({ name: "ESTADO" })
  estado!: string;

  @OneToMany(() => Paciente, paciente => paciente.tipoIdentificacion)
  pacientes!: Paciente[];
}
