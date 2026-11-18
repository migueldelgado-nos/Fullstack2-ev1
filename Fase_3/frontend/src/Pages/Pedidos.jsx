import { useEffect, useState } from 'react'

function Pedidos() {

    const [boletas, setBoletas] = useState([])
    const [error, setError] = useState('')

    const token = localStorage.getItem('token')

    useEffect(() => {

        const cargarBoletas = async () => {

            try {

                const response = await fetch(
                    '/api/v1/boletas',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (!response.ok) {
                    setError('No se pudieron cargar los pedidos')
                    return
                }

                const data = await response.json()

                setBoletas(data)

            } catch (error) {

                setError('No se pudo conectar con el servidor')

            }
        }

        cargarBoletas()

    }, [token])


    const formatoPrecio = (precio) =>
        precio.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP',
            maximumFractionDigits: 0
        })


    return (

        <section>

            <h2>Pedidos realizados</h2>

            <p>
                Lista de compras realizadas por los clientes.
            </p>

            {error && (
                <p className="text-danger">
                    {error}
                </p>
            )}

            <div className="table-responsive">

                <table className="table table-striped">

                    <thead>
                        <tr>
                            <th>Boleta</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>

                    <tbody>

                        {boletas.map((boleta) => (

                            <tr key={boleta.id}>

                                <td>
                                    #{boleta.id}
                                </td>

                                <td>
                                    {new Date(
                                        boleta.fecha
                                    ).toLocaleString('es-CL')}
                                </td>

                                <td>
                                    {boleta.usuario?.nombre}
                                </td>

                                <td>
                                    {formatoPrecio(boleta.total)}
                                </td>

                                <td>

                                    {boleta.detalles?.map((detalle) => (

                                        <div key={detalle.id}>

                                            {detalle.producto?.nombre}
                                            {' x '}
                                            {detalle.cantidad}

                                        </div>

                                    ))}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </section>
    )
}

export default Pedidos