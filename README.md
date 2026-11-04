# NutriVida — Proyecto Fullstack 2

Repositorio de una clínica nutricional desarrollado en **dos fases independientes**. Cada carpeta conserva su propia estructura, tecnologías y forma de ejecutarse:

| Fase | Enfoque | Estado |
|---|---|---|
| **`Fase_1/`** | Sitio web estático con HTML, CSS, Bootstrap y JavaScript vanilla | Cerrada — base inicial del proyecto |
| **`Fase_2/`** | Aplicación SPA con React, Vite, React Router y Context API | **Activa — en desarrollo y modificación continua** |

![Fase 1](https://img.shields.io/badge/Fase%201-HTML%20%7C%20CSS%20%7C%20JavaScript-0b7285?style=flat-square)
![Fase 2](https://img.shields.io/badge/Fase%202-React%20%2B%20Vite-2f9e44?style=flat-square)
![Pruebas](https://img.shields.io/badge/pruebas-51%20passing-brightgreen?style=flat-square)

> **Importante:** `Fase_2` es la fase que sigue avanzando. Sus páginas, componentes, estilos, pruebas y funcionalidades pueden cambiar entre commits. `Fase_1` se mantiene como referencia histórica y ya no recibe nuevas características.

---

## Vista rápida: ¿en qué se diferencian?

| Dimensión | `Fase_1` | `Fase_2` |
|---|---|---|
| **Tipo de aplicación** | Sitio estático multipágina | Single Page Application (SPA) |
| **Navegación** | Enlaces entre archivos `.html` y anclas | React Router con rutas (`/servicios`, `/carrito`, etc.) |
| **Interactividad** | JavaScript vanilla con `addEventListener` | Estado de React, hooks y Context API |
| **Estilos** | Bootstrap 5 por CDN + CSS propio | Bootstrap 5 instalado + CSS propio |
| **Formularios** | Validación con `alert()` | Validación con estado y mensajes en pantalla |
| **Carrito** | Contador global de cantidad y total | Carrito con servicios únicos, descripción, valor y total |
| **Datos** | Fijos en el HTML | Definidos en componentes y estado de React |
| **Pruebas** | Verificación manual | 51 pruebas automatizadas con Vitest + Testing Library |
| **Build** | No requiere build | Vite (`dev`, `build`, `preview`) |
| **Ejecución** | Abrir `index.html` o servidor estático | `npm install` + `npm run dev` |

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

# 🟩 Fase_2 — Aplicación React (en evolución)

**Ruta:** [`Fase_2/`](./Fase_2)

Reconstrucción del sitio como una aplicación SPA con React. Esta fase **sigue avanzando**: se continúa trabajando en la arquitectura de componentes, la experiencia de compra, la administración de servicios, los estilos y la cobertura de pruebas.

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

## En desarrollo: próximos pasos

`Fase_2` continúa modificándose. Algunas líneas de trabajo abiertas son:

- Persistir el carrito en `localStorage` o en un backend.
- Unificar el catálogo de servicios entre `Producto`, `DetalleProducto` y `Administracion`.
- Conectar la administración con el catálogo visible al cliente.
- Implementar autenticación real y sesiones.
- Reemplazar las alertas y los `console.log` por flujos de compra reales.
- Integrar una API o base de datos para servicios, usuarios y pedidos.
- Ampliar la cobertura de pruebas y agregar reporte de cobertura.
- Pulir accesibilidad, estados de carga y manejo de errores.

## Limitaciones actuales de esta fase

- El carrito vive en memoria: se pierde al recargar la página.
- El login y el registro solo validan en el cliente; no hay backend.
- La administración modifica una lista local que no alimenta al catálogo de servicios.
- El botón de finalizar compra solo muestra una alerta.
- El stock se guarda en `localStorage`, pero todavía no se muestra ni se descuenta en la interfaz.

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
```

## Estado del repositorio

| Fase | ¿Se sigue modificando? | Rol en el proyecto |
|---|---|---|
| `Fase_1` | No | Referencia histórica y base visual/funcional |
| `Fase_2` | **Sí, activamente** | Implementación actual sobre React |

Si estás revisando el proyecto en GitHub, toma `Fase_2` como la versión vigente y `Fase_1` como el punto de partida. Las diferencias entre ambas son intencionales: muestran la evolución desde un sitio estático hasta una aplicación React con estado, rutas y pruebas automatizadas.
