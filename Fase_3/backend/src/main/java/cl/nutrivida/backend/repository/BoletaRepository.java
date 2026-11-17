package cl.nutrivida.backend.repository;

import cl.nutrivida.backend.model.Boleta;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BoletaRepository extends JpaRepository<Boleta, Long> {
}