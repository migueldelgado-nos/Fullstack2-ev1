import { useState } from 'react'

function Administracion() {

    const [servicios, setServicios] = useState([
        { id: 1, nombre: 'Primera consulta nutricional', precio: 35000 },
        { id: 2, nombre: 'Control nutricional', precio: 25000 },
        { id: 3, nombre: 'Teleconsulta nutricional', precio: 20000 }
    ])

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')


    const agregarServicio = (event) => {

        event.preventDefault()

        if (nombre === '' || precio === '') {
            return
        }

        const nuevoServicio = {
            id: Date.now(),
            nombre: nombre,
            precio: Number(precio)
        }

        setServicios([
            ...servicios,
            nuevoServicio
        ])

        setNombre('')
        setPrecio('')
    }


    const eliminarServicio = (id) => {

        const nuevaLista = servicios.filter(
            servicio => servicio.id !== id
        )

        setServicios(nuevaLista)
    }


    return (
        <div className="container mt-4">

            <h1>Administración</h1>


            <h3 className="mt-4">
                Agregar servicio
            </h3>

            <form onSubmit={agregarServicio}>

                <div className="mb-3">

                    <label className="form-label">
                        Nombre del servicio
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                    />

                </div>


                <div className="mb-3">

                    <label className="form-label">
                        Precio
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={precio}
                        onChange={(event) => setPrecio(event.target.value)}
                    />

                </div>


                <button
                    type="submit"
                    className="btn btn-success"
                >
                    Agregar servicio
                </button>

            </form>


            <h3 className="mt-5">
                Servicios disponibles
            </h3>


            <div className="table-responsive">

                <table className="table table-striped">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Servicio</th>
                            <th>Precio</th>
                            <th>Acción</th>
                        </tr>

                    </thead>

                    <tbody>

                        {servicios.map((servicio) => (

                            <tr key={servicio.id}>

                                <td>
                                    {servicio.id}
                                </td>

                                <td>
                                    {servicio.nombre}
                                </td>

                                <td>
                                    ${servicio.precio.toLocaleString('es-CL')}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => eliminarServicio(servicio.id)}
                                    >
                                        Eliminar
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default Administracion