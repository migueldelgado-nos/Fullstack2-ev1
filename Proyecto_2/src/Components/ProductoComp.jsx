import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ProductoComp({ id, nombre, precio, descripcion }) {

    const [stock, setStock] = useState(() => {
        const stockGuardado = localStorage.getItem(nombre)

        return stockGuardado !== null ? Number(stockGuardado) : 5 //operador ternario
    })


    useEffect(() => {
        localStorage.setItem(nombre, stock)
    }, [stock, nombre])


    const disminuirStock = () => {
        if (stock > 0) {
            setStock(stock - 1)
        }
    }

    return (
        <div className="card h-100">
            <div className="card-body">

                <h5 className="card-title">
                    {nombre}
                </h5>

                <p className='card-text'>
                    {descripcion}
                </p>

                <p className="card-text">
                    {precio.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                        maximumFractionDigits: 0,
                    })}
                </p>

                <Link
                    to={`/producto/${id}`}
                    className="btn btn-primary ms-2"
                >
                    Ver detalle
                </Link>


            </div>
        </div>
    )
}

export default ProductoComp