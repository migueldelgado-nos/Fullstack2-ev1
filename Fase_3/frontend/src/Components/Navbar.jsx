import { NavLink, useNavigate } from 'react-router-dom'
import { tokenExpirado } from '../utils/auth'

function Navbar() {

    const navigate = useNavigate()

    const claseEnlace = ({ isActive }) =>
        isActive ? 'active' : undefined

    const token = localStorage.getItem('token')
    const nombre = localStorage.getItem('nombre')
    const rol = localStorage.getItem('rol')

    const sesionValida = token && !tokenExpirado(token)

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('nombre')
        localStorage.removeItem('rol')
        localStorage.removeItem('usuarioId')

        navigate('/login')
        window.location.reload()
    }

    return (
        <header>

            <h1>Clínica Nutricional NutriVida</h1>

            <nav>

                <NavLink to="/" end className={claseEnlace}>
                    Inicio
                </NavLink>

                <NavLink to="/servicios" className={claseEnlace}>
                    Servicios
                </NavLink>

                {!sesionValida && (
                    <>
                        <NavLink to="/login" className={claseEnlace}>
                            Login
                        </NavLink>

                        <NavLink to="/registro" className={claseEnlace}>
                            Registrarse
                        </NavLink>
                    </>
                )}

                {sesionValida && rol === 'ADMIN' && (
                    <NavLink
                        to="/administracion"
                        className={claseEnlace}
                    >
                        Administración
                    </NavLink>
                )}

                {sesionValida &&
                    (rol === 'ADMIN' || rol === 'VENDEDOR') && (
                        <NavLink
                            to="/pedidos"
                            className={claseEnlace}
                        >
                            Pedidos
                        </NavLink>
                    )}

                <NavLink to="/carrito" className={claseEnlace}>
                    Carrito
                </NavLink>

                {sesionValida && (
                    <>
                        <span>
                            Hola, {nombre}
                        </span>

                        <button
                            type="button"
                            onClick={cerrarSesion}
                        >
                            Cerrar sesión
                        </button>
                    </>
                )}

            </nav>

        </header>
    )
}

export default Navbar