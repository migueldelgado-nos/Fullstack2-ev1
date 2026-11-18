# NutriVida - Evaluación 3

Proyecto Full Stack desarrollado con React, Spring Boot y MySQL.

## Tecnologías utilizadas

### Frontend
- React
- Vite
- React Router
- Bootstrap

### Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT
- Swagger / OpenAPI

### Base de datos
- MySQL

---

## Estructura del proyecto

```text
Fase_3/
├── frontend/
├── backend/
├── database/
│   └── nutrivida.sql
└── README.md
```

---

## Requisitos asumidos por el grupo

No existe un documento de requerimientos del cliente: el alcance fue definido por el grupo como proyecto universitario. La aplicación resuelve estos casos:

1. Catálogo de servicios nutricionales con categoría y stock, administrado por `ADMIN`.
2. Registro de usuarios (`CLIENTE`) e inicio de sesión con JWT.
3. Roles `ADMIN`, `VENDEDOR` y `CLIENTE` con permisos distintos.
4. Carrito que genera una boleta real en MySQL con su detalle y descuenta el stock.
5. Listado de pedidos para `ADMIN` y `VENDEDOR`.
6. Interfaz accesible desde la IP pública de la EC2 a través de nginx.

---

## 1. Backend, base de datos y lógica de negocio

El backend es una aplicación Spring Boot (Java 21) que usa Spring Data JPA sobre MySQL. `application.properties` define la conexión a `jdbc:mysql://localhost:3306/nutrivida`.

`database/nutrivida.sql` crea el esquema y los datos iniciales:

| Tabla | Contenido |
|---|---|
| `usuario` | Nombre, email único, password BCrypt y `rol` enum (`ADMIN`, `VENDEDOR`, `CLIENTE`) |
| `categoria` | Categorías de servicios |
| `producto` | Servicio con nombre, descripción, precio, `categoria_id` y `stock` |
| `boleta` | Compra con fecha, total y `usuario_id` |
| `detalle_boleta` | Cada servicio comprado, cantidad, precio unitario y subtotal |

Los modelos Java (`cl.nutrivida.backend.model`) mapean esas tablas con `@Entity`, `@ManyToOne` y `@OneToMany`. La lógica de negocio vive en `service/`:

- `BoletaService.crearBoleta()` busca el usuario y cada producto en la BD, toma el precio desde la tabla, calcula subtotal y total, descuenta el stock y guarda la boleta con sus detalles en una sola operación.
- `UsuarioService.guardarUsuario()` codifica la contraseña con BCrypt antes de persistir.
- `ProductoService` y `CategoriaService` exponen el catálogo y las operaciones de administración.

---

## 2. API REST y Swagger

Todos los controladores usan `@RestController` y `@RequestMapping("/api/v1/...")`. Springdoc OpenAPI 3 genera la documentación automáticamente desde los controladores; no se requieren anotaciones adicionales.

| Endpoint | Método | Descripción | Acceso |
|---|---|---|---|
| `/api/v1/auth/login` | POST | Inicia sesión y devuelve token + datos del usuario | Público |
| `/api/v1/auth/registro` | POST | Crea un usuario con rol `CLIENTE` | Público |
| `/api/v1/productos` | GET | Lista los servicios | Público |
| `/api/v1/productos/{id}` | GET | Obtiene un servicio (lo usa el detalle) | Público |
| `/api/v1/productos` | POST | Crea un servicio | ADMIN |
| `/api/v1/productos/{id}` | PUT / DELETE | Edita o elimina un servicio | ADMIN |
| `/api/v1/categorias` | GET / POST / PUT / DELETE | Gestiona categorías | GET público, resto ADMIN |
| `/api/v1/boletas` | GET | Lista pedidos | ADMIN, VENDEDOR |
| `/api/v1/boletas` | POST | Crea una boleta | ADMIN, CLIENTE |
| `/api/v1/boletas/{id}` | DELETE | Elimina una boleta | ADMIN |
| `/api/v1/usuarios/**` | GET / POST / PUT / DELETE | Gestiona usuarios | ADMIN |

**Swagger UI:** `http://<IP-EC2>/swagger-ui.html`
**OpenAPI JSON:** `http://<IP-EC2>/v3/api-docs`

El CRUD completo se demuestra con productos, categorías y usuarios. Las boletas son comprobantes de venta: se crean, se consultan y se eliminan, pero no se editan.

---

## 3. Integración frontend ↔ backend

El frontend no guarda el catálogo en el navegador. Todas las llamadas usan rutas relativas (`fetch('/api/v1/...')`) y nginx las redirige al backend:

```text
Navegador (IP de la EC2)
   │  GET /api/v1/productos
   ▼
nginx (:80)  ──proxy_pass──▶  Spring Boot (127.0.0.1:8080)
                                  │  JPA
                                  ▼
                               MySQL (127.0.0.1:3306)
```

Flujo de una compra: el usuario inicia sesión → el token se guarda en el navegador → `Carrito.jsx` envía `POST /api/v1/boletas` con `usuarioId` y los productos → `BoletaService` persiste la boleta y descuenta el stock → `Pedidos.jsx` vuelve a consultar `GET /api/v1/boletas` desde la BD.

Al usar rutas relativas y un solo origen (nginx), el problema de CORS desaparece: el navegador habla siempre con la IP de la EC2.

---

## 4. Autenticación JWT y roles

1. `POST /api/v1/auth/login` compara la contraseña con BCrypt y, si es correcta, `JwtService.generarToken()` crea un JWT firmado HMAC-SHA con `subject=email`, claims `rol` y `nombre`, y expiración de 8 horas.
2. En cada petición, `JwtAuthenticationFilter` lee la cabecera `Authorization: Bearer <token>`, valida la firma y la expiración, y carga el usuario con autoridad `ROLE_<rol>` en el `SecurityContext`.
3. `SecurityConfig` define las reglas por rol (`hasRole`, `hasAnyRole`) y mantiene las sesiones `STATELESS` con CSRF desactivado.
4. El registro fuerza el rol `CLIENTE`; solo un `ADMIN` puede cambiar roles mediante `PUT /api/v1/usuarios/{id}`.

---

## 5. Gestión de la sesión en el frontend

`Login.jsx` guarda `token`, `nombre`, `rol` y `usuarioId` en `localStorage`. `Navbar.jsx` y `App.jsx` leen esos valores en cada render, por lo que la sesión **sobrevive a recargas de página**. `utils/auth.js` decodifica el claim `exp` para considerar expirado un token y ocultar las opciones de sesión. `Cerrar sesión` elimina los cuatro valores y recarga la vista.

La validación real de la identidad no depende del navegador: cada petición al backend vuelve a verificar la firma del JWT.

---

## 6. Restricciones de acceso en el frontend

- `App.jsx` define `RutaAdmin` (exige `ADMIN`) y `RutaPedidos` (exige `ADMIN` o `VENDEDOR`). Si el rol no corresponde, redirige a `/login`.
- `Navbar.jsx` muestra «Administración» solo a `ADMIN` y «Pedidos» solo a `ADMIN`/`VENDEDOR`.
- Ejemplos de interfaces restringidas:
  - `/administracion`: alta, edición y eliminación de servicios (solo ADMIN).
  - `/pedidos`: listado de boletas (ADMIN o VENDEDOR).

Estas restricciones son de interfaz; la seguridad efectiva está en las reglas de `SecurityConfig`, que rechazan la llamada aunque un usuario manipule el navegador.

---

## Despliegue en la EC2 (estado actual)

- MySQL 8 con la BD `nutrivida` y el usuario `nutrivida`.
- Backend desplegado como servicio systemd `nutrivida-backend` (JAR en `/opt/nutrivida/backend.jar`, puerto `127.0.0.1:8080`, `-Xmx256m` por la memoria limitada de la EC2).
- Frontend compilado con `npm run build` y copiado a `/var/www/html` (el build anterior de Fase_2 quedó en `/var/www/html.fase2-backup`).
- nginx con configuración en `/etc/nginx/sites-available/nutrivida`: sirve el SPA, redirige `/api/` y `/swagger-ui|v3/api-docs` al backend, y usa `try_files $uri $uri/ /index.html` para las rutas de React Router.
- Se agregó un archivo `swap` de 1 GB y un perfil de baja memoria para MySQL porque la EC2 tiene menos de 1 GB de RAM.

### Comandos de verificación

```bash
curl http://<IP-EC2>/api/v1/productos      # JSON con los 6 servicios y su stock
curl http://<IP-EC2>/swagger-ui.html       # documentación interactiva
mysql -u nutrivida -p -e 'USE nutrivida; SELECT id, nombre, stock FROM producto;'
sudo systemctl status mysql nutrivida-backend nginx
```

### Pruebas automatizadas

```bash
cd frontend && npm ci && npm test -- --run
# Test Files 11 passed (11) / Tests 44 passed (44)
```

---

## Limitaciones conocidas (alcance de curso)

- El JWT no tiene renovación: expira a las 8 horas y hay que volver a iniciar sesión.
- El token se guarda en `localStorage`, accesible desde JavaScript del navegador.
- La clave de firma del JWT y la contraseña de MySQL están en archivos de configuración del proyecto.
- La validación de datos en el backend es básica; no se usan anotaciones `@Valid`.
- El stock se descuenta de forma simple, sin control de concurrencia.
- Estas limitaciones se documentan y no se corrigen porque quedan fuera de los conocimientos cubiertos en el curso.
