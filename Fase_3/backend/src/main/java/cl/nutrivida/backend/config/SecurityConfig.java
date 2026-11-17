package cl.nutrivida.backend.config;

import cl.nutrivida.backend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

            .cors(cors ->
                cors.configurationSource(corsConfigurationSource())
            )

            .csrf(csrf ->
                csrf.disable()
            )

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .authorizeHttpRequests(auth -> auth

                // LOGIN Y REGISTRO
                .requestMatchers(
                    "/api/v1/auth/**"
                )
                .permitAll()


                // SWAGGER
                .requestMatchers(
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**"
                )
                .permitAll()


                // USUARIOS
                // Solo ADMIN puede ver/modificar usuarios
                .requestMatchers(
                    "/api/v1/usuarios/**"
                )
                .hasRole("ADMIN")


                // PRODUCTOS
                // Cualquier persona puede ver los servicios
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/v1/productos/**"
                )
                .permitAll()

                // Solo ADMIN puede crear productos
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/v1/productos/**"
                )
                .hasRole("ADMIN")

                // Solo ADMIN puede editar productos
                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/v1/productos/**"
                )
                .hasRole("ADMIN")

                // Solo ADMIN puede eliminar productos
                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/v1/productos/**"
                )
                .hasRole("ADMIN")


                // CATEGORIAS
                // Cualquiera puede verlas
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/v1/categorias/**"
                )
                .permitAll()

                // Solo ADMIN puede crear categorías
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/v1/categorias/**"
                )
                .hasRole("ADMIN")

                // Solo ADMIN puede editar categorías
                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/v1/categorias/**"
                )
                .hasRole("ADMIN")

                // Solo ADMIN puede eliminar categorías
                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/v1/categorias/**"
                )
                .hasRole("ADMIN")


                // BOLETAS / PEDIDOS

                // ADMIN y VENDEDOR pueden ver pedidos
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/v1/boletas/**"
                )
                .hasAnyRole(
                    "ADMIN",
                    "VENDEDOR"
                )

                // CLIENTE y ADMIN pueden crear compras
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/v1/boletas/**"
                )
                .hasAnyRole(
                    "ADMIN",
                    "CLIENTE"
                )

                // Solo ADMIN puede eliminar boletas
                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/v1/boletas/**"
                )
                .hasRole("ADMIN")


                // Cualquier otra ruta necesita autenticación
                .anyRequest()
                .authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );


        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                    "http://localhost:5173"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE",
                    "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);


        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}