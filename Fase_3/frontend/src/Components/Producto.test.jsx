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
    descripcion: 'Evaluación nutricional inicial'
}

function ContadorCarrito() {
    const { productos } = useCarrito()

    return <p>Productos en carrito: {productos.length}</p>
}

describe('Componente Producto', () => {

    test('muestra el nombre, precio y descripción', () => {

        renderConCarrito(<ProductoComp {...producto} />)

        expect(
            screen.getByRole('heading', {
                name: 'Primera consulta nutricional'
            })
        ).toBeInTheDocument()

        expect(
            screen.getByText('Evaluación nutricional inicial')
        ).toBeInTheDocument()

        expect(
            screen.getByText('$35.000')
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

        expect(
            screen.getByText('Productos en carrito: 0')
        ).toBeInTheDocument()

        await user.click(
            screen.getByRole('button', { name: 'Agregar al carrito' })
        )

        expect(
            screen.getByText('Productos en carrito: 1')
        ).toBeInTheDocument()
    })

    test('guarda el stock inicial de 5 en localStorage', () => {

        renderConCarrito(<ProductoComp {...producto} />)

        expect(
            localStorage.getItem('Primera consulta nutricional')
        ).toBe('5')
    })

    test('respeta el stock guardado en localStorage', () => {

        localStorage.setItem('Primera consulta nutricional', '3')

        renderConCarrito(<ProductoComp {...producto} />)

        expect(
            localStorage.getItem('Primera consulta nutricional')
        ).toBe('3')
    })
})
