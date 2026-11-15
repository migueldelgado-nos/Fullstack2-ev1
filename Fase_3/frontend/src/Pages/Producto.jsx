import ProductoComp from '../Components/ProductoComp'
import { useLocation } from 'react-router-dom'

function Producto() {


    const location = useLocation()

    const parametros = new URLSearchParams(location.search)

    const categoria = parametros.get('categoria')

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

            <div className="row g-4">

                <div className="col-12 col-md-6 col-lg-4">
                    <ProductoComp
                        id="1"
                        nombre="Primera consulta nutricional"
                        descripcion="Evaluación inicial, antropometría y diseño del primer plan de alimentación"
                        precio={35000}
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <ProductoComp
                        id="2"
                        nombre="Control nutricional"
                        descripcion="Seguimiento del progreso y ajustes al plan de alimentación"
                        precio={25000}
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <ProductoComp
                        id="3"
                        nombre="Teleconsulta nutricional"
                        descripcion="Consulta nutricional realizada de manera online"
                        precio={20000}
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <ProductoComp
                        id="4"
                        nombre="Plan perdida de peso"
                        descripcion="Plan alimenticio personalizado enfocado en la pérdida de peso"
                        precio={20000}
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <ProductoComp
                        id="5"
                        nombre="Nutricion Deportiva"
                        descripcion="Plan nutricional orientado al rendimiento y actividad física"
                        precio={20000}
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <ProductoComp
                        id="6"
                        nombre="Antropometri completa"
                        descripcion="Evaluación de medidas corporales y composición corporal"
                        precio={20000}
                    />
                </div>


            </div>

        </section>
    )
}

export default Producto
