package cl.nutrivida.backend.repository;

import cl.nutrivida.backend.model.DetalleBoleta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetalleBoletaRepository extends JpaRepository<DetalleBoleta, Long> {
}