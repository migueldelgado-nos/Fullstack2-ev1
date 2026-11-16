package cl.nutrivida.backend.dto;

import java.util.List;

public class CrearBoletaRequest {

    private Long usuarioId;
    private List<DetalleBoletaRequest> detalles;

    public CrearBoletaRequest() {
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public List<DetalleBoletaRequest> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleBoletaRequest> detalles) {
        this.detalles = detalles;
    }
}