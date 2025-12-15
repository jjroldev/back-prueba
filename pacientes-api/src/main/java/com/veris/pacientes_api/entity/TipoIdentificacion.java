@Entity
@Table(name = "DAF_TIPOS_IDENTIFICACION")
@Data
public class TipoIdentificacion {

    @Id
    @Column(name = "CODIGO_TIPO_IDENTIFICACION")
    private String codigoTipoIdentificacion;

    @Column(name = "NOMBRE_TIPO_IDENTIFICACION")
    private String nombreTipoIdentificacion;

    @Column(name = "ESTADO")
    private String estado;
}
