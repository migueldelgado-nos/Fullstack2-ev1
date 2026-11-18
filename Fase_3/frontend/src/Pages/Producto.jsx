import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductoComp from '../Components/ProductoComp'

function Producto() {

    const [productos, setProductos] = useState([])
    const [error, setError] = useState('')

    const location = useLocation()
    const parametros = new URLSearchParams(location.search)
    const categoria = parametros.get('categoria')

    useEffect(() => {

        const cargarProductos = async () => {

            const token = localStorage.getItem('token')

            try {

                const response = await fetch(
                    '/api/v1/productos',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (!response.ok) {
                    setError('No se pudieron cargar los servicios')
                    return
                }

                const data = await response.json()

                setProductos(data)

            } catch (error) {
                setError('No se pudo conectar con el servidor')
            }
        }

        cargarProductos()

    }, [])

    return (
        <section id="servicios">

            <h2>Nuestros servicios</h2>

            <p>
                Contamos con diferentes servicios para apoyar el bienestar
                y el seguimiento nutricional de nuestros pacientes.
            </p>

            {categoria && (
                <p>
                    Categoría seleccionada: {categoria}
                </p>
            )}

            {error && (
                <p className="text-danger">
                    {error}
                </p>
            )}

            <div className="row g-4">

                {productos.map((producto) => (

                    <div
                        className="col-12 col-md-6 col-lg-4"
                        key={producto.id}
                    >

                        <ProductoComp
                            id={producto.id}
                            nombre={producto.nombre}
                            descripcion={producto.descripcion}
                            precio={producto.precio}
                            stock={producto.stock}
                        />

                    </div>

                ))}

            </div>

        </section>
    )
}

export default Producto