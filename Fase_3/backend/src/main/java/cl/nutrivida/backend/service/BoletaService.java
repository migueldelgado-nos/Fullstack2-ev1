package cl.nutrivida.backend.service;

import cl.nutrivida.backend.dto.CrearBoletaRequest;
import cl.nutrivida.backend.dto.DetalleBoletaRequest;
import cl.nutrivida.backend.model.Boleta;
import cl.nutrivida.backend.model.DetalleBoleta;
import cl.nutrivida.backend.model.Producto;
import cl.nutrivida.backend.model.Usuario;
import cl.nutrivida.backend.repository.BoletaRepository;
import cl.nutrivida.backend.repository.ProductoRepository;
import cl.nutrivida.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BoletaService {

    private final BoletaRepository boletaRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public BoletaService(
            BoletaRepository boletaRepository,
            ProductoRepository productoRepository,
            UsuarioRepository usuarioRepository) {

        this.boletaRepository = boletaRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Boleta> listarBoletas() {
        return boletaRepository.findAll();
    }

    public Optional<Boleta> buscarPorId(Long id) {
        return boletaRepository.findById(id);
    }

    public Boleta crearBoleta(CrearBoletaRequest request) {

        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado")
                );

        Boleta boleta = new Boleta();

        boleta.setFecha(LocalDateTime.now());
        boleta.setUsuario(usuario);

        List<DetalleBoleta> detalles = new ArrayList<>();

        int total = 0;

        for (DetalleBoletaRequest detalleRequest : request.getDetalles()) {

            Producto producto = productoRepository
                    .findById(detalleRequest.getProductoId())
                    .orElseThrow(() ->
                            new RuntimeException("Producto no encontrado")
                    );

            int cantidad = detalleRequest.getCantidad();
            int precioUnitario = producto.getPrecio();
            int subtotal = precioUnitario * cantidad;

            int stockActual = producto.getStock() == null ? 0 : producto.getStock();
            producto.setStock(Math.max(0, stockActual - cantidad));
            productoRepository.save(producto);

            DetalleBoleta detalle = new DetalleBoleta();

            detalle.setProducto(producto);
            detalle.setCantidad(cantidad);
            detalle.setPrecioUnitario(precioUnitario);
            detalle.setSubtotal(subtotal);
            detalle.setBoleta(boleta);

            detalles.add(detalle);

            total += subtotal;
        }

        boleta.setDetalles(detalles);
        boleta.setTotal(total);

        return boletaRepository.save(boleta);
    }

    public void eliminarBoleta(Long id) {
        boletaRepository.deleteById(id);
    }
}