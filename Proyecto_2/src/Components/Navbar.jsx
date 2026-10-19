import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">

                <Link
                    className="navbar-brand text-white"
                    to="/"
                >
                    Clinica Nutricional NutriVida
                </Link>

                <div>
                    <Link
                        className="btn btn-outline-light me-2"
                        to="/"
                    >
                        Inicio
                    </Link>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/productos"
                    >
                        Productos
                    </Link>

                    <Link
                        className="btn btn-outline-light"
                        to="/login"
                    >
                        Login
                    </Link>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/registro"
                    >
                        Registro
                    </Link>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/administracion"
                    >
                        Administracion
                    </Link>

                    <Link
                        className='btn btn-outline-light me-2'
                        to='/carrito'
                    >
                        Carrito
                    </Link>

                </div>

            </div>
        </nav>
    )
}

export default Navbar