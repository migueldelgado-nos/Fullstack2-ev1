import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import ProductoComp from './ProductoComp'
import { useCarrito } from '../Context/useCarrito'
import { renderConCarrito } from '../test/utils'

const producto = {
    id: '1',
    nombre: 'Primera consulta nutricional',
    precio: 35000,
    descripcion: 'Evaluación nutricional inicial',
    stock: 5
}

function ContadorCarrito() {
    const { productos } = useCarrito()

    return <p>Productos en carrito: {productos.length}</p>
}

describe('Componente Producto', () => {

    test('muestra el nombre, precio, descripción y stock de la BD', () => {

        renderConCarrito(<ProductoComp {...producto} />)

        expect(
            screen.getByRole('heading', {
                name: 'Primera consulta nutricional'
            })
        ).toBeInTheDocument()

        expect(
            screen.getByText('Evaluación nutricional inicial')
        ).toBeInTheDocument()

        expect(screen.getByText('$35.000')).toBeInTheDocument()

        expect(
            screen.getByText('Stock disponible: 5')
        ).toBeInTheDocument()
    })

    test('el enlace de detalle apunta al producto', () => {

        renderConCarrito(<ProductoComp {...producto} />)

        expect(
            screen.getByRole('link', { name: 'Ver detalle' })
        ).toHaveAttribute('href', '/servicio/1')
    })

    test('agrega el producto al carrito', async () => {

        const user = userEvent.setup()

        renderConCarrito(
            <>
                <ProductoComp {...producto} />
                <ContadorCarrito />
            </>
        )

        await user.click(
            screen.getByRole('button', { name: 'Agregar al carrito' })
        )

        expect(
            screen.getByText('Productos en carrito: 1')
        ).toBeInTheDocument()
    })

    test('muestra el stock que viene en la respuesta de la API', () => {

        renderConCarrito(<ProductoComp {...producto} stock={3} />)

        expect(
            screen.getByText('Stock disponible: 3')
        ).toBeInTheDocument()
    })
})
