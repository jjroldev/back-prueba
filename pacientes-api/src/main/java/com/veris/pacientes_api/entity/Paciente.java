@Entity
@Table(name = "MGM_PACIENTES")
@Data
public class Paciente {

    @Id
    @Column(name = "ID_PACIENTE")
    private Long idPaciente;

    @ManyToOne
    @JoinColumn(name = "CODIGO_TIPO_IDENTIFICACION")
    private TipoIdentificacion tipoIdentificacion;

    @Column(name = "NUMERO_IDENTIFICACION")
    private String numeroIdentificacion;

    @Column(name = "PRIMER_NOMBRE")
    private String primerNombre;

    @Column(name = "SEGUNDO_NOMBRE")
    private String segundoNombre;

    @Column(name = "PRIMER_APELLIDO")
    private String primerApellido;

    @Column(name = "SEGUNDO_APELLIDO")
    private String segundoApellido;

    @Column(name = "NOMBRE_COMPLETO")
    private String nombreCompleto;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "ESTADO")
    private String estado;

    @Column(name = "FECHA_INGRESO")
    private LocalDateTime fechaIngreso;

    @Column(name = "USUARIO_INGRESO")
    private String usuarioIngreso;

    @Column(name = "FECHA_MODIFICACION")
    private LocalDateTime fechaModificacion;

    @Column(name = "USUARIO_MODIFICACION")
    private String usuarioModificacion;
}
