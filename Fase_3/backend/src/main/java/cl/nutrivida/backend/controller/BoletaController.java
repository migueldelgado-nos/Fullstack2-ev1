package cl.nutrivida.backend.controller;

import cl.nutrivida.backend.dto.CrearBoletaRequest;
import cl.nutrivida.backend.model.Boleta;
import cl.nutrivida.backend.service.BoletaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/boletas")
public class BoletaController {

    private final BoletaService boletaService;

    public BoletaController(BoletaService boletaService) {
        this.boletaService = boletaService;
    }

    @GetMapping
    public List<Boleta> listar() {
        return boletaService.listarBoletas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Boleta> buscarPorId(@PathVariable Long id) {

        return boletaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Boleta crear(@RequestBody CrearBoletaRequest request) {
        return boletaService.crearBoleta(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {

        if (boletaService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        boletaService.eliminarBoleta(id);

        return ResponseEntity.noContent().build();
    }
}