import { useParams } from 'react-router-dom'

function DetalleProducto() {

    const { id } = useParams()

    const productos = {
        1: {
            nombre: 'Primera consulta nutricional',
            descripcion: 'Evaluación inicial, antropometría y diseño del primer plan de alimentación',
            precio: 35000
        },

        2: {
            nombre: 'Control nutricional',
            descripcion: 'Seguimiento del progreso y ajustes al plan de alimentación',
            precio: 25000
        },

        3: {
            nombre: 'Teleconsulta nutricional',
            descripcion: 'Consulta nutricional realizada de manera online',
            precio: 20000
        },

        4: {
            nombre: 'Plan pérdida de peso',
            descripcion: 'Plan alimenticio personalizado enfocado en la pérdida de peso',
            precio: 20000
        },

        5: {
            nombre: 'Nutrición deportiva',
            descripcion: 'Plan nutricional orientado al rendimiento y actividad física',
            precio: 20000
        },

        6: {
            nombre: 'Antropometría completa',
            descripcion: 'Evaluación de medidas corporales y composición corporal',
            precio: 20000
        }
    }

    const producto = productos[id]

    if (!producto) {
        return (
            <div className="container mt-4">
                <h1>Servicio no encontrado</h1>
            </div>
        )
    }

    return (
        <div className="container mt-4">

            <h1>Detalle del servicio</h1>

            <h3>{producto.nombre}</h3>

            <p>{producto.descripcion}</p>

            <p>
                Precio: ${producto.precio.toLocaleString('es-CL')}
            </p>

        </div>
    )
}

export default DetalleProducto