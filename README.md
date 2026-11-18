# NutriVida — Proyecto Fullstack 2

Repositorio de una clínica nutricional desarrollado en **tres fases independientes**. Cada carpeta conserva su propia estructura, tecnologías y forma de ejecutarse:

| Fase | Enfoque | Estado |
|---|---|---|
| **`Fase_1/`** | Sitio web estático con HTML, CSS, Bootstrap y JavaScript vanilla | Cerrada — base inicial del proyecto |
| **`Fase_2/`** | Aplicación SPA con React, Vite, React Router y Context API | En desarrollo — base del frontend actual |
| **`Fase_3/`** | Full stack: React + Spring Boot + MySQL con autenticación JWT | **Activa — desplegada en EC2 con nginx + MySQL** |

![Fase 1](https://img.shields.io/badge/Fase%201-HTML%20%7C%20CSS%20%7C%20JavaScript-0b7285?style=flat-square)
![Fase 2](https://img.shields.io/badge/Fase%202-React%20%2B%20Vite-2f9e44?style=flat-square)
![Fase 3](https://img.shields.io/badge/Fase%203-React%20%2B%20Spring%20Boot%20%2B%20MySQL-7048e8?style=flat-square)
![Pruebas Fase 2](https://img.shields.io/badge/Fase%202%20pruebas-51%20passing-brightgreen?style=flat-square)
![Pruebas Fase 3](https://img.shields.io/badge/Fase%203%20pruebas-44%20passing-brightgreen?style=flat-square)

> **Importante:** `Fase_3` es la versión vigente del proyecto: integra el frontend React con un backend real, base de datos y autenticación, y está desplegada en la EC2 en <http://18.208.189.121>. `Fase_2` se conserva como la etapa intermedia de SPA y `Fase_1` como referencia histórica. Cada fase puede ejecutarse de forma independiente.

---

## Vista rápida: ¿en qué se diferencian?

| Dimensión | `Fase_1` | `Fase_2` | `Fase_3` |
|---|---|---|---|
| **Tipo de aplicación** | Sitio estático multipágina | Single Page Application (SPA) | Full stack (SPA + API REST + BD) |
| **Navegación** | Enlaces entre archivos `.html` y anclas | React Router con rutas (`/servicios`, `/carrito`, etc.) | React Router + rutas protegidas por rol |
| **Interactividad** | JavaScript vanilla con `addEventListener` | Estado de React, hooks y Context API | React + `fetch` a la API de Spring Boot |
| **Estilos** | Bootstrap 5 por CDN + CSS propio | Bootstrap 5 instalado + CSS propio | Bootstrap 5 + React Bootstrap + CSS propio |
| **Formularios** | Validación con `alert()` | Validación con estado y mensajes en pantalla | Validación en cliente y en el backend |
| **Carrito** | Contador global de cantidad y total | Carrito con servicios únicos, descripción, valor y total | Carrito que genera boletas reales en la BD |
| **Datos** | Fijos en el HTML | Definidos en componentes y estado de React | MySQL + JPA (productos con stock, usuarios, categorías, boletas) |
| **Autenticación** | No existe | Solo validación de formularios | Spring Security + JWT con roles ADMIN/VENDEDOR/CLIENTE |
| **Pruebas** | Verificación manual | 51 pruebas automatizadas con Vitest + Testing Library | Pruebas de frontend (Vitest) + prueba de contexto de Spring |
| **Build** | No requiere build | Vite (`dev`, `build`, `preview`) | Vite (frontend) + Maven (backend) |
| **Ejecución** | Abrir `index.html` o servidor estático | `npm install` + `npm run dev` | EC2: nginx + systemd + MySQL / local: MySQL + Maven + Vite |

---

# 🟦 Fase_1 — Sitio estático (base del proyecto)

**Ruta:** [`Fase_1/`](./Fase_1)

Primera versión del sitio de la clínica nutricional. Está construida con HTML, CSS, Bootstrap 5 y JavaScript vanilla, sin frameworks ni proceso de compilación. Su objetivo fue maquetar la experiencia completa del sitio y validar la lógica básica del carrito y de los formularios.

## Funcionalidades

- Página principal con secciones de inicio, servicios, nosotros y contacto.
- Catálogo de seis servicios nutricionales con precios.
- Carrito básico que acumula cantidad de productos y total.
- Formulario de registro con validaciones de RUN, nombre, apellidos, correo, región, comuna, dirección y contraseña.
- Paneles de rol como maquetas: administrador, nutricionista y paciente.
- Estilos responsivos con Bootstrap y una hoja de estilos propia.

## Páginas

| Archivo | Descripción |
|---|---|
| `index.html` | Landing con inicio, catálogo de servicios, carrito resumido, nosotros y contacto |
| `registro_de_usuario.html` | Formulario de registro con validaciones en JavaScript |
| `administrador.html` | Maqueta del panel de administración con sidebar y tabla de usuarios |
| `nutricionista.html` | Ficha del paciente y formulario de plan de alimentación |
| `paciente.html` | Agendamiento de citas, progreso y plan alimenticio |
| `secretaria.html` | Archivo reservado, actualmente sin contenido |

## Estructura

```text
Fase_1/
├── index.html
├── registro_de_usuario.html
├── administrador.html
├── nutricionista.html
├── paciente.html
├── secretaria.html
├── css/
│   └── estilos.css
└── js/
    ├── validaciones.js
    └── img/
        └── nutricion.jpg
```

## Cómo ejecutar

No necesita instalación. Se puede abrir `index.html` directamente en el navegador, aunque se recomienda usar un servidor local para que el JavaScript y las rutas funcionen correctamente:

```bash
cd Fase_1
python3 -m http.server 8000
```

Luego abrir <http://localhost:8000>.

> Bootstrap se carga desde CDN, por lo que se necesita conexión a internet para ver los estilos completos.

## Limitaciones de esta fase

- No hay persistencia: al recargar la página se pierde el carrito y el estado de los formularios.
- Las validaciones usan `alert()`, por lo que la experiencia no es la de una aplicación moderna.
- Los paneles de administrador, nutricionista y paciente son maquetas visuales, sin lógica conectada.
- La información de servicios está duplicada en el HTML.
- No existen pruebas automatizadas.

---

# 🟩 Fase_2 — Aplicación React (base del frontend)

**Ruta:** [`Fase_2/`](./Fase_2)

Reconstrucción del sitio como una aplicación SPA con React. Esta fase fue la etapa intermedia del proyecto: aquí se consolidaron la arquitectura de componentes, la experiencia de compra, la administración de servicios, los estilos y la cobertura de pruebas. Su código sirvió de base para el frontend de `Fase_3`.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 | Componentes y estado |
| Vite 8 | Servidor de desarrollo y build |
| React Router DOM 7 | Rutas de la SPA |
| Context API | Estado global del carrito |
| Bootstrap 5 | Base visual y componentes |
| Vitest 5 | Framework de pruebas |
| Testing Library | Renderizado y consultas del DOM en pruebas |
| ESLint | Análisis estático del código |

## Funcionalidades implementadas

- **Inicio:** presentación de la clínica, historia y datos de contacto.
- **Servicios:** catálogo de seis servicios en tarjetas reutilizables.
- **Detalle de servicio:** vista individual por `id` con nombre, descripción y precio.
- **Carrito:** agregar servicios (sin duplicados), ver nombre y descripción, eliminar, valor por servicio y total en CLP.
- **Administración:** alta y eliminación de servicios en una tabla.
- **Registro:** validación de nombre, correo y contraseña con mensajes en pantalla.
- **Login:** validación de correo y contraseña.
- **Navegación:** barra con enlaces activos según la ruta y pie de página.
- **Persistencia básica:** stock inicial por servicio guardado en `localStorage`.
- **Diseño:** estilos alineados con la identidad visual de la clínica.

## Rutas de la aplicación

| Ruta | Página | Descripción |
|---|---|---|
| `/` | `Inicio` | Presentación, historia y contacto |
| `/servicios` | `Producto` | Catálogo de servicios |
| `/servicio/:id` | `DetalleProducto` | Detalle de un servicio |
| `/login` | `Login` | Inicio de sesión |
| `/registro` | `Registro` | Registro de usuario |
| `/administracion` | `Administracion` | Gestión de servicios |
| `/carrito` | `Carrito` | Carrito y resumen de compra |

## Estructura

```text
Fase_2/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── Components/
    │   ├── Navbar.jsx
    │   └── ProductoComp.jsx
    ├── Context/
    │   ├── carritoContext.js
    │   ├── CarritoContext.jsx
    │   └── useCarrito.js
    ├── Pages/
    │   ├── Inicio.jsx
    │   ├── Producto.jsx
    │   ├── DetalleProducto.jsx
    │   ├── Login.jsx
    │   ├── Registro.jsx
    │   ├── Administracion.jsx
    │   └── Carrito.jsx
    ├── styles/
    │   └── estilos.css
    ├── test/
    │   └── utils.jsx
    ├── setupTests.js
    └── *.test.jsx
```

> `Components/Contador.jsx` es un componente de ejemplo que no está conectado a ninguna ruta de la aplicación.

## Cómo ejecutar

Requiere Node.js 20 o superior (recomendado 22).

```bash
cd Fase_2
npm install
npm run dev
```

Abrir la URL que muestra Vite, normalmente <http://localhost:5173>.

## Scripts disponibles

| Comando | Acción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm test` | Ejecuta todas las pruebas una vez |
| `npm run test:watch` | Ejecuta las pruebas en modo watch |

## Pruebas automatizadas

La fase cuenta con **51 pruebas en 11 archivos**, usando Vitest como runner y Testing Library para renderizar y consultar la interfaz como lo haría un usuario. No se usan snapshots ni pruebas E2E.

| Área | Archivo | Pruebas |
|---|---|---:|
| Contexto del carrito | `Context/CarritoContext.test.jsx` | 6 |
| Página del carrito | `Pages/Carrito.test.jsx` | 6 |
| Login | `Pages/Login.test.jsx` | 4 |
| Registro | `Pages/Registro.test.jsx` | 5 |
| Administración | `Pages/Administracion.test.jsx` | 6 |
| Tarjeta de servicio | `Components/Producto.test.jsx` | 5 |
| Página de servicios | `Pages/Producto.test.jsx` | 4 |
| Detalle de servicio | `Pages/DetalleProducto.test.jsx` | 8 |
| Inicio | `Pages/Inicio.test.jsx` | 2 |
| Navegación | `Components/Navbar.test.jsx` | 3 |
| Aplicación completa | `App.test.jsx` | 2 |

```bash
cd Fase_2
npm test
```

Resultado esperado:

```text
Test Files  11 passed (11)
Tests       51 passed (51)
```

## Aspectos que motivaron la siguiente fase

Estas necesidades de `Fase_2` motivaron la evolución hacia `Fase_3`:

- Persistir el carrito en `localStorage` o en un backend.
- Unificar el catálogo de servicios entre `Producto`, `DetalleProducto` y `Administracion`.
- Conectar la administración con el catálogo visible al cliente.
- Implementar autenticación real y sesiones.
- Reemplazar las alertas y los `console.log` por flujos de compra reales.
- Integrar una API o base de datos para servicios, usuarios y pedidos.
- Ampliar la cobertura de pruebas y agregar reporte de cobertura.
- Pulir accesibilidad, estados de carga y manejo de errores.

> En `Fase_3` se implementaron la API, la base de datos, la autenticación JWT, la administración conectada al catálogo, la generación real de boletas y el stock en MySQL. El carrito sigue en memoria (la boleta sí se persiste) y quedan pendientes aspectos como el reporte de cobertura y el reemplazo total de `alert()`/`console.log`.

## Limitaciones actuales de esta fase

- El carrito vive en memoria: se pierde al recargar la página.
- El login y el registro solo validan en el cliente; no hay backend.
- La administración modifica una lista local que no alimenta al catálogo de servicios.
- El botón de finalizar compra solo muestra una alerta.
- El stock se guarda en `localStorage`, pero todavía no se muestra ni se descuenta en la interfaz.

---

# 🟪 Fase_3 — Aplicación Full Stack (versión vigente)

**Ruta:** [`Fase_3/`](./Fase_3)

Implementación final de NutriVida como aplicación Full Stack. El frontend React consume una API REST construida con Spring Boot, que persiste los datos en MySQL y protege los recursos con autenticación JWT y roles. Es la fase activa del repositorio.

## Tecnologías

### Frontend (`Fase_3/frontend/`)

| Tecnología | Uso |
|---|---|
| React 19 | Componentes y estado |
| Vite 8 | Servidor de desarrollo y build |
| React Router DOM 7 | Rutas de la SPA y rutas protegidas |
| Bootstrap 5 + React Bootstrap | Base visual y componentes |
| Context API | Estado global del carrito |
| Vitest 5 + Testing Library | Pruebas automatizadas |
| ESLint | Análisis estático |

### Backend (`Fase_3/backend/`)

| Tecnología | Uso |
|---|---|
| Java 21 | Lenguaje del backend |
| Spring Boot 4.1.2 | Framework de la API REST |
| Spring WebMVC | Controladores REST |
| Spring Data JPA | Persistencia con Hibernate |
| Spring Security | Autenticación y autorización por roles |
| JWT (jjwt 0.13.0) | Tokens de sesión stateless |
| Spring Validation | Validación de datos |
| Springdoc OpenAPI 3.2.0 | Documentación Swagger UI |
| MySQL Connector/J | Conexión a la base de datos |
| Maven Wrapper (`mvnw`) | Build y ejecución del backend |

### Base de datos (`Fase_3/database/`)

MySQL 8 con el script [`nutrivida.sql`](./Fase_3/database/nutrivida.sql), que crea la base de datos `nutrivida`, sus tablas y datos de ejemplo. Tablas principales: `usuario`, `rol` (como enum `ADMIN`, `VENDEDOR`, `CLIENTE`), `categoria`, `producto`, `boleta` y `detalle_boleta`.

Usuarios de ejemplo incluidos en el script:

| Correo | Rol |
|---|---|
| `admin@nutrivida.cl` | `ADMIN` |
| `vendedor@nutrivida.cl` | `VENDEDOR` |
| `cliente@nutrivida.cl` | `CLIENTE` |

## Estructura

```text
Fase_3/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── Components/     # Navbar, ProductoComp y pruebas
│       ├── Context/        # CarritoContext, useCarrito y pruebas
│       ├── Pages/          # Inicio, Producto, DetalleProducto, Login,
│       │                   # Registro, Administracion, Carrito, Pedidos
│       ├── styles/         # estilos.css
│       ├── utils/auth.js   # Validación de expiración del JWT
│       └── test/           # utilidades de pruebas
├── backend/
│   ├── pom.xml
│   ├── mvnw
│   ├── src/main/java/cl/nutrivida/backend/
│   │   ├── config/         # SecurityConfig (CORS, JWT, reglas por rol)
│   │   ├── controller/     # Auth, Producto, Categoria, Usuario, Boleta
│   │   ├── dto/            # LoginRequest, LoginResponse, CrearBoletaRequest...
│   │   ├── model/          # Usuario, Rol, Producto, Categoria, Boleta, DetalleBoleta
│   │   ├── repository/     # Repositorios JPA
│   │   ├── security/       # JwtService y JwtAuthenticationFilter
│   │   └── service/        # Lógica de negocio
│   └── src/main/resources/application.properties
├── database/
│   └── nutrivida.sql
└── README.md
```

## Funcionalidades implementadas

- **Catálogo de servicios:** el frontend obtiene los productos (nombre, descripción, precio, categoría y stock) desde `GET /api/v1/productos`.
- **Detalle de servicio:** vista individual por `id` que consulta `GET /api/v1/productos/{id}`; ya no usa un catálogo hardcodeado.
- **Carrito y compra:** `finalizarCompra()` envía un `POST /api/v1/boletas` con el token JWT; el backend crea la boleta con sus detalles en MySQL y descuenta el stock de cada producto.
- **Stock en la BD:** el valor se muestra en el catálogo y en el detalle, y se actualiza en la tabla `producto` al vender.
- **Login real:** `POST /api/v1/auth/login` valida la contraseña con BCrypt y devuelve un JWT; el frontend guarda `token`, `nombre`, `rol` y `usuarioId` en `localStorage`.
- **Registro real:** `POST /api/v1/auth/registro` crea usuarios con rol `CLIENTE` y contraseña codificada.
- **Administración de productos:** alta, edición y eliminación contra la API, restringida al rol `ADMIN`.
- **Pedidos:** página visible solo para `ADMIN` y `VENDEDOR`, con listado de boletas desde `GET /api/v1/boletas`.
- **Rutas protegidas:** `/administracion` exige `ADMIN`; `/pedidos` exige `ADMIN` o `VENDEDOR`; se verifica la expiración del JWT en el cliente.
- **Documentación de la API:** Swagger UI y OpenAPI disponibles en el backend.

## Rutas del frontend

| Ruta | Página | Acceso |
|---|---|---|
| `/` | `Inicio` | Público |
| `/servicios` | `Producto` | Público |
| `/servicio/:id` | `DetalleProducto` | Público |
| `/login` | `Login` | Público |
| `/registro` | `Registro` | Público |
| `/carrito` | `Carrito` | Público (la compra exige sesión) |
| `/administracion` | `Administracion` | Solo `ADMIN` |
| `/pedidos` | `Pedidos` | `ADMIN` o `VENDEDOR` |

## API REST y control de acceso

Base URL en la web desplegada: rutas relativas `/api/v1/...` (nginx redirige a `http://127.0.0.1:8080`). En desarrollo local con Vite, el backend responde en `http://localhost:8080`.

| Endpoint | Método | Descripción | Acceso |
|---|---|---|---|
| `/api/v1/auth/login` | POST | Inicia sesión y devuelve token + datos del usuario | Público |
| `/api/v1/auth/registro` | POST | Registra un nuevo usuario (`CLIENTE`) | Público |
| `/api/v1/productos` | GET | Lista los servicios | Público |
| `/api/v1/productos/{id}` | GET | Obtiene un servicio | Público |
| `/api/v1/productos` | POST | Crea un servicio | `ADMIN` |
| `/api/v1/productos/{id}` | PUT / DELETE | Edita o elimina un servicio | `ADMIN` |
| `/api/v1/categorias` | GET | Lista categorías | Público |
| `/api/v1/categorias` | POST / PUT / DELETE | Gestiona categorías | `ADMIN` |
| `/api/v1/boletas` | GET | Lista pedidos | `ADMIN`, `VENDEDOR` |
| `/api/v1/boletas` | POST | Crea una boleta | `ADMIN`, `CLIENTE` |
| `/api/v1/boletas/{id}` | DELETE | Elimina una boleta | `ADMIN` |
| `/api/v1/usuarios/**` | GET / POST / PUT / DELETE | Gestiona usuarios | `ADMIN` |
| `/swagger-ui.html`, `/v3/api-docs/**` | GET | Documentación OpenAPI | Público |

La configuración de CORS permite solicitudes desde `http://localhost:5173` para desarrollo local. En el despliegue no hace falta CORS: el frontend y la API comparten el mismo origen a través de nginx. Las sesiones son `STATELESS` y CSRF está desactivado porque la autenticación se realiza mediante JWT.

## Configuración de la base de datos

`backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nutrivida
spring.datasource.username=nutrivida
spring.datasource.password=Proyecto03_
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

> El usuario `nutrivida` se crea con permisos solo sobre la BD `nutrivida`. La contraseña mostrada es la configuración actual del proyecto; no debe usarse en producción.

## Despliegue en EC2 (estado actual)

La versión desplegada está disponible en **<http://18.208.189.121>**. En la EC2:

- **MySQL 8** con la BD `nutrivida` y el usuario `nutrivida`.
- **Backend** como servicio systemd `nutrivida-backend` (JAR en `/opt/nutrivida/backend.jar`, `127.0.0.1:8080`, `-Xmx256m`).
- **Frontend** compilado con `npm run build` y copiado a `/var/www/html`.
- **nginx** con `/etc/nginx/sites-available/nutrivida`: sirve el SPA, hace proxy de `/api/` y Swagger, y usa `try_files $uri $uri/ /index.html` para las rutas de React Router.
- Se agregó un archivo *swap* de 1 GB y un perfil de baja memoria para MySQL porque la EC2 tiene menos de 1 GB de RAM.

```bash
curl http://18.208.189.121/api/v1/productos   # JSON con los servicios y su stock
curl http://18.208.189.121/swagger-ui.html    # documentación interactiva
sudo systemctl status mysql nutrivida-backend nginx
```

## Cómo ejecutar Fase_3 en local

Necesitas **Java 21**, **Node.js 20+**, **Maven** (o el wrapper incluido) y **MySQL 8** en ejecución.

**1. Preparar la base de datos**

```bash
mysql -u root -p < Fase_3/database/nutrivida.sql
```

**2. Iniciar el backend** (desde `Fase_3/backend`)

```bash
cd Fase_3/backend
./mvnw spring-boot:run
# API en http://localhost:8080
# Swagger UI en http://localhost:8080/swagger-ui.html
```

> En Windows usar `mvnw.cmd spring-boot:run`.

**3. Iniciar el frontend** (desde `Fase_3/frontend`, en otra terminal)

```bash
cd Fase_3/frontend
npm install
npm run dev
# http://localhost:5173
```

## Scripts del frontend (Fase_3)

| Comando | Acción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo de Vite |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm test` | Ejecuta las pruebas de Vitest una vez |
| `npm run test:watch` | Ejecuta las pruebas en modo watch |

También se puede ejecutar la prueba del backend con `./mvnw test` desde `Fase_3/backend`.

## Limitaciones actuales de Fase_3

Estas limitaciones son parte del alcance de curso y están documentadas en `Fase_3/README.md`:

- El JWT no se renueva: expira a las 8 horas y hay que volver a iniciar sesión.
- El token y los datos del usuario se guardan en `localStorage`, accesibles desde JavaScript del navegador.
- La clave de firma del JWT y la contraseña de MySQL están en archivos de configuración del proyecto.
- El carrito se mantiene en memoria/Context API; no se persiste entre recargas (la boleta sí se guarda en la BD).
- La validación de datos en el backend es básica y el stock se descuenta sin control de concurrencia.
- Algunos mensajes de éxito/error usan `alert()` y `console.log`, y no hay reporte de cobertura.

---

## Cómo ejecutar cada fase

```bash
# Fase_1 — sitio estático
cd Fase_1
python3 -m http.server 8000
# http://localhost:8000

# Fase_2 — aplicación React
cd Fase_2
npm install
npm run dev
# http://localhost:5173

# Fase_3 — Full Stack (requiere MySQL, Java 21 y Node.js)
mysql -u root -p < Fase_3/database/nutrivida.sql
cd Fase_3/backend && ./mvnw spring-boot:run   # terminal 1, http://localhost:8080
cd Fase_3/frontend && npm install && npm run dev  # terminal 2, http://localhost:5173

# Despliegue en la EC2: http://18.208.189.121 (nginx + systemd + MySQL)
```

## Estado del repositorio

| Fase | ¿Se sigue modificando? | Rol en el proyecto |
|---|---|---|
| `Fase_1` | No | Referencia histórica y base visual/funcional |
| `Fase_2` | No (base reutilizada) | Etapa intermedia de SPA sobre React |
| `Fase_3` | **Sí, activamente** | Implementación Full Stack vigente, desplegada en EC2 |

Si estás revisando el proyecto en GitHub, toma `Fase_3` como la versión vigente: es la que conecta React con Spring Boot, MySQL y autenticación JWT, y la que está sirviéndose a través de nginx en <http://18.208.189.121>. `Fase_2` muestra la evolución del frontend y `Fase_1` el punto de partida estático. Las diferencias entre fases son intencionales.
