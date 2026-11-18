import { useEffect, useState } from 'react'

function Administracion() {

    const [servicios, setServicios] = useState([])
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [error, setError] = useState('')
    const [editandoId, setEditandoId] = useState(null)

    const token = localStorage.getItem('token')


    const cargarServicios = async () => {

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

            setServicios(data)

        } catch (error) {

            setError('No se pudo conectar con el servidor')

        }
    }


    useEffect(() => {

        cargarServicios()

    }, [])


    const editarServicio = (servicio) => {

        setEditandoId(servicio.id)
        setNombre(servicio.nombre)
        setDescripcion(servicio.descripcion)
        setPrecio(servicio.precio)
    }


    const guardarServicio = async (event) => {

        event.preventDefault()

        if (nombre === '' || precio === '' || descripcion === '') {
            setError('Completa todos los campos')
            return
        }

        const servicio = {
            nombre: nombre,
            precio: Number(precio),
            descripcion: descripcion,
            categoria: {
                id: 2
            }
        }

        try {

            let response

            if (editandoId !== null) {

                response = await fetch(
                    `/api/v1/productos/${editandoId}`,
                    {
                        method: 'PUT',

                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },

                        body: JSON.stringify(servicio)
                    }
                )

            } else {

                response = await fetch(
                    '/api/v1/productos',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },

                        body: JSON.stringify(servicio)
                    }
                )
            }

            if (!response.ok) {
                setError('No se pudo guardar el servicio')
                return
            }

            setNombre('')
            setPrecio('')
            setDescripcion('')
            setEditandoId(null)
            setError('')

            cargarServicios()

        } catch (error) {

            setError('No se pudo conectar con el servidor')

        }
    }


    const eliminarServicio = async (id) => {

        try {

            const response = await fetch(
                `/api/v1/productos/${id}`,
                {
                    method: 'DELETE',

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (!response.ok) {
                setError('No se pudo eliminar el servicio')
                return
            }

            setError('')

            cargarServicios()

        } catch (error) {

            setError('No se pudo conectar con el servidor')

        }
    }


    return (

        <section
            id="administracion"
            className="pagina-registro"
        >

            <h2>Administración</h2>

            <h3 className="mt-4">
                {editandoId !== null
                    ? 'Editar servicio'
                    : 'Agregar servicio'}
            </h3>

            {error && (
                <p className="text-danger">
                    {error}
                </p>
            )}

            <form onSubmit={guardarServicio}>

                <div className="mb-3">

                    <label
                        className="form-label"
                        htmlFor="nombreServicio"
                    >
                        Nombre del servicio
                    </label>

                    <input
                        id="nombreServicio"
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(event) =>
                            setNombre(event.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label
                        className="form-label"
                        htmlFor="descripcionServicio"
                    >
                        Descripción
                    </label>

                    <input
                        id="descripcionServicio"
                        type="text"
                        className="form-control"
                        value={descripcion}
                        onChange={(event) =>
                            setDescripcion(event.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label
                        className="form-label"
                        htmlFor="precioServicio"
                    >
                        Precio
                    </label>

                    <input
                        id="precioServicio"
                        type="number"
                        className="form-control"
                        value={precio}
                        onChange={(event) =>
                            setPrecio(event.target.value)
                        }
                    />

                </div>

                <button
                    type="submit"
                    className="btn btn-success"
                >
                    {editandoId !== null
                        ? 'Guardar cambios'
                        : 'Agregar servicio'}
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
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Acción</th>
                        </tr>

                    </thead>

                    <tbody>

                        {servicios.map((servicio) => (

                            <tr key={servicio.id}>

                                <td>{servicio.id}</td>

                                <td>{servicio.nombre}</td>

                                <td>{servicio.descripcion}</td>

                                <td>
                                    ${servicio.precio.toLocaleString('es-CL')}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() =>
                                            editarServicio(servicio)
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            eliminarServicio(servicio.id)
                                        }
                                    >
                                        Eliminar
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </section>
    )
}

export default Administracion