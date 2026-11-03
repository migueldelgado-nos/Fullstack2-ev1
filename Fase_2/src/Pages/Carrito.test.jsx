import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Carrito from './Carrito'
import { useCarrito } from '../Context/useCarrito'
import { renderConCarrito } from '../test/utils'

const producto = {
    id: '1',
    nombre: 'Primera consulta nutricional',
    precio: 35000
}

function CarritoConSemilla({ productos = [] }) {
    const { agregarProducto } = useCarrito()

    return (
        <>
            {productos.map((item) => (
                <button
                    key={item.id}
                    onClick={() => agregarProducto(item)}
                >
                    sembrar-{item.id}
                </button>
            ))}

            <Carrito />
        </>
    )
}

async function sembrar(user, id, veces = 1) {
    for (let i = 0; i < veces; i++) {
        await user.click(
            screen.getByRole('button', { name: `sembrar-${id}` })
        )
    }
}

describe('Página Carrito', () => {

    test('muestra el estado vacío y deshabilita finalizar', () => {

        renderConCarrito(<Carrito />)

        expect(
            screen.getByRole('heading', { name: 'Tu carro está vacío' })
        ).toBeInTheDocument()

        expect(
            screen.getByText('Agrega servicios para comenzar tu compra.')
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: 'Finalizar compra' })
        ).toBeDisabled()
    })

    test('muestra un producto con su subtotal y total', async () => {

        const user = userEvent.setup()

        renderConCarrito(<CarritoConSemilla productos={[producto]} />)

        await sembrar(user, producto.id)

        expect(
            screen.getByRole('heading', {
                name: 'Primera consulta nutricional'
            })
        ).toBeInTheDocument()

        expect(
            screen.getAllByText('$35.000')
        ).toHaveLength(2)

        expect(
            screen.getByText('Servicios').parentElement
        ).toHaveTextContent('1')
    })

    test('calcula el total según la cantidad', async () => {

        const user = userEvent.setup()

        renderConCarrito(<CarritoConSemilla productos={[producto]} />)

        await sembrar(user, producto.id, 2)

        expect(
            screen.getAllByText('$70.000')
        ).toHaveLength(2)

        expect(
            screen.getByText('Servicios').parentElement
        ).toHaveTextContent('2')
    })

    test('el botón + aumenta la cantidad y el total', async () => {

        const user = userEvent.setup()

        renderConCarrito(<CarritoConSemilla productos={[producto]} />)

        await sembrar(user, producto.id)

        await user.click(
            screen.getByRole('button', { name: '+' })
        )

        expect(
            screen.getAllByText('$70.000')
        ).toHaveLength(2)

        expect(
            screen.getByText('Servicios').parentElement
        ).toHaveTextContent('2')
    })

    test('el botón - disminuye la cantidad sin bajar de 1', async () => {

        const user = userEvent.setup()

        renderConCarrito(<CarritoConSemilla productos={[producto]} />)

        await sembrar(user, producto.id, 2)

        await user.click(
            screen.getByRole('button', { name: '-' })
        )

        expect(
            screen.getByText('Servicios').parentElement
        ).toHaveTextContent('1')

        await user.click(
            screen.getByRole('button', { name: '-' })
        )

        expect(
            screen.getByText('Servicios').parentElement
        ).toHaveTextContent('1')
    })

    test('eliminar un producto deja el carrito vacío', async () => {

        const user = userEvent.setup()

        renderConCarrito(<CarritoConSemilla productos={[producto]} />)

        await sembrar(user, producto.id)

        await user.click(
            screen.getByRole('button', {
                name: 'Eliminar Primera consulta nutricional'
            })
        )

        expect(
            screen.getByRole('heading', { name: 'Tu carro está vacío' })
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Primera consulta nutricional'
            })
        ).not.toBeInTheDocument()
    })

    test('finalizar la compra muestra una alerta', async () => {

        const user = userEvent.setup()

        const alerta = vi.spyOn(window, 'alert').mockImplementation(() => {})

        renderConCarrito(<CarritoConSemilla productos={[producto]} />)

        await sembrar(user, producto.id)

        await user.click(
            screen.getByRole('button', { name: 'Finalizar compra' })
        )

        expect(alerta).toHaveBeenCalledWith(
            'Continuar al proceso de compra'
        )
    })
})
