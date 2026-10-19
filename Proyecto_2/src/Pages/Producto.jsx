import ProductoComp from '../Components/ProductoComp'
import { useLocation } from 'react-router-dom'

function Producto() {


    const location = useLocation()

    const parametros = new URLSearchParams(location.search)

    const categoria = parametros.get('categoria')

    return (
        <div className="container mt-4">

            <h1 className="text-center mb-4">
                Nuestros Productos
            </h1>

            <p>
                Categoría seleccionada: {categoria}
            </p>

            <div className="row g-4">

                <div className="col-12 col-md-6 col-lg-4">
                    <ProductoComp
                        id="1"
                        nombre="Primera consulta nutricional"
                        descripcion="Evaluacion inicial, antropometria y diseño del primer plan de alimentacion"
                        precio={35000}
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <ProductoComp
                        id="2"
                        nombre="Control nutricional"
                        precio={25000}
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <ProductoComp
                        id="3"
                        nombre="Teleconsulta nutricional"
                        precio={20000}
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <ProductoComp
                        id="4"
                        nombre="Plan perdida de peso"
                        precio={20000}
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <ProductoComp
                        id="5"
                        nombre="Nutricion Deportiva"
                        precio={20000}
                    />
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <ProductoComp
                        id="6"
                        nombre="Antropometri completa"
                        precio={20000}
                    />
                </div>


            </div>

        </div>
    )
}

export default Producto