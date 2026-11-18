import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function DetalleProducto() {

    const { id } = useParams()

    const [producto, setProducto] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        const cargarProducto = async () => {

            try {

                const response = await fetch(`/api/v1/productos/${id}`)

                if (response.status === 404) {
                    setProducto(null)
                    setCargando(false)
                    return
                }

                if (!response.ok) {
                    setError('No se pudo cargar el servicio')
                    setCargando(false)
                    return
                }

                const data = await response.json()

                setProducto(data)
                setCargando(false)

            } catch (error) {

                setError('No se pudo conectar con el servidor')
                setCargando(false)
            }
        }

        cargarProducto()

    }, [id])

    if (cargando) {
        return (
            <section id="detalle">
                <p>Cargando servicio...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section id="detalle">
                <p className="text-danger">{error}</p>
                <Link to="/servicios" className="btn btn-primary">
                    Volver a servicios
                </Link>
            </section>
        )
    }

    if (!producto) {
        return (
            <section id="detalle">
                <h2>Servicio no encontrado</h2>

                <Link to="/servicios" className="btn btn-primary">
                    Volver a servicios
                </Link>
            </section>
        )
    }

    return (
        <section id="detalle">
            <h2>Detalle del servicio</h2>

            <h3>{producto.nombre}</h3>

            <p>{producto.descripcion}</p>

            <p>
                <strong>
                    Precio: ${producto.precio.toLocaleString('es-CL')}
                </strong>
            </p>

            <p>Stock disponible: {producto.stock}</p>

            <Link to="/servicios" className="btn btn-primary">
                Volver a servicios
            </Link>

        </section>
    )
}

export default DetalleProducto
