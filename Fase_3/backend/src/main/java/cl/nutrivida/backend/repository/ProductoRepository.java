package cl.nutrivida.backend.repository;

import cl.nutrivida.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}