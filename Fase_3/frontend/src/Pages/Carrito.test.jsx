import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Carrito from './Carrito'
import { useCarrito } from '../Context/useCarrito'
import { renderConCarrito } from '../test/utils'

const producto = {
    id: '1',
    nombre: 'Primera consulta nutricional',
    precio: 35000,
    descripcion: 'Evaluación inicial, antropometría y diseño del primer plan de alimentación'
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

    test('muestra nombre, descripción, valor y total del servicio', async () => {

        const user = userEvent.setup()

        renderConCarrito(<CarritoConSemilla productos={[producto]} />)

        await sembrar(user, producto.id)

        expect(
            screen.getByRole('heading', {
                name: 'Primera consulta nutricional'
            })
        ).toBeInTheDocument()

        expect(
            screen.getByText(producto.descripcion)
        ).toBeInTheDocument()

        expect(
            screen.getAllByText('$35.000')
        ).toHaveLength(2)

        expect(
            screen.getByText('Servicios').parentElement
        ).toHaveTextContent('1')
    })

    test('no duplica el servicio si se agrega dos veces', async () => {

        const user = userEvent.setup()

        renderConCarrito(<CarritoConSemilla productos={[producto]} />)

        await sembrar(user, producto.id, 2)

        expect(
            screen.getAllByRole('heading', {
                name: 'Primera consulta nutricional'
            })
        ).toHaveLength(1)

        expect(
            screen.getAllByText('$35.000')
        ).toHaveLength(2)

        expect(
            screen.getByText('Servicios').parentElement
        ).toHaveTextContent('1')
    })

    test('no muestra controles para modificar la cantidad', async () => {

        const user = userEvent.setup()

        renderConCarrito(<CarritoConSemilla productos={[producto]} />)

        await sembrar(user, producto.id)

        expect(
            screen.queryByRole('button', { name: '+' })
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('button', { name: '-' })
        ).not.toBeInTheDocument()
    })

    test('eliminar un servicio deja el carrito vacío', async () => {

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
