import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../Context/useCarrito'

function ProductoComp({ id, nombre, precio, descripcion }) {

    const { agregarProducto } = useCarrito()

    const [stock] = useState(() => {
        const stockGuardado = localStorage.getItem(nombre)

        return stockGuardado !== null ? Number(stockGuardado) : 5 //operador ternario
    })


    useEffect(() => {
        localStorage.setItem(nombre, stock)
    }, [stock, nombre])


    const agregarAlCarrito = () => {
        agregarProducto({
            id,
            nombre,
            precio,
            descripcion
        })
    }

    return (
        <div className="card h-100">
            <div className="card-body d-flex flex-column">

                <h5 className="card-title">
                    {nombre}
                </h5>

                <p className="card-text descripcion">
                    {descripcion}
                </p>

                <p className="card-text precio">
                    {precio.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                        maximumFractionDigits: 0,
                    })}
                </p>

                <div className="d-flex flex-wrap gap-2 justify-content-center mt-auto">

                    <Link
                        to={`/servicio/${id}`}
                        className="btn btn-primary"
                    >
                        Ver detalle
                    </Link>

                    <button
                        className="btn btn-success"
                        onClick={agregarAlCarrito}
                    >
                        Agregar al carrito
                    </button>

                </div>

            </div>
        </div>
    )
}

export default ProductoComp
