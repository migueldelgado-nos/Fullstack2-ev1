import { NavLink } from 'react-router-dom'

function Navbar() {

    const claseEnlace = ({ isActive }) => (isActive ? 'active' : undefined)

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

                <NavLink to="/login" className={claseEnlace}>
                    Login
                </NavLink>

                <NavLink to="/registro" className={claseEnlace}>
                    Registrarse
                </NavLink>

                <NavLink to="/administracion" className={claseEnlace}>
                    Administración
                </NavLink>

                <NavLink to="/carrito" className={claseEnlace}>
                    Carrito
                </NavLink>
            </nav>

        </header>
    )
}

export default Navbar
