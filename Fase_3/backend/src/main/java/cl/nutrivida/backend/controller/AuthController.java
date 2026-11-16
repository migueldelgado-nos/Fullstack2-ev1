package cl.nutrivida.backend.controller;

import cl.nutrivida.backend.dto.LoginRequest;
import cl.nutrivida.backend.dto.LoginResponse;
import cl.nutrivida.backend.model.Usuario;
import cl.nutrivida.backend.security.JwtService;
import cl.nutrivida.backend.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

        private final UsuarioService usuarioService;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;

        public AuthController(
                        UsuarioService usuarioService,
                        PasswordEncoder passwordEncoder,
                        JwtService jwtService) {

                this.usuarioService = usuarioService;
                this.passwordEncoder = passwordEncoder;
                this.jwtService = jwtService;
        }

        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody LoginRequest request) {

                Usuario usuario = usuarioService
                                .buscarPorEmail(request.getEmail())
                                .orElse(null);

                if (usuario == null) {
                        return ResponseEntity.status(401)
                                        .body("Correo o contraseña incorrectos");
                }

                boolean passwordCorrecta = passwordEncoder.matches(
                                request.getPassword(),
                                usuario.getPassword());

                if (!passwordCorrecta) {
                        return ResponseEntity.status(401)
                                        .body("Correo o contraseña incorrectos");
                }

                String token = jwtService.generarToken(usuario);

                LoginResponse respuesta = new LoginResponse(
                                usuario.getId(),
                                token,
                                usuario.getNombre(),
                                usuario.getRol().name());

                return ResponseEntity.ok(respuesta);
        }

        @PostMapping("/registro")
        public ResponseEntity<?> registro(@RequestBody Usuario usuario) {

                if (usuarioService.buscarPorEmail(usuario.getEmail()).isPresent()) {
                        return ResponseEntity.badRequest()
                                        .body("El correo ya está registrado");
                }

                usuario.setId(null);
                usuario.setRol(cl.nutrivida.backend.model.Rol.CLIENTE);

                Usuario nuevoUsuario = usuarioService.guardarUsuario(usuario);

                return ResponseEntity.ok(nuevoUsuario);
        }
}