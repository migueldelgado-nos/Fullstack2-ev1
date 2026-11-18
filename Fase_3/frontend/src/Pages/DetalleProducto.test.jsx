import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import DetalleProducto from './DetalleProducto'
import { renderConRuta } from '../test/utils'

function renderDetalle(id) {
    return renderConRuta(<DetalleProducto />, {
        route: `/servicio/${id}`,
        path: '/servicio/:id'
    })
}

describe('Página DetalleProducto', () => {

    test('muestra el detalle del servicio obtenido de la API', async () => {

        renderDetalle(1)

        expect(
            await screen.findByRole('heading', {
                name: 'Primera consulta nutricional'
            })
        ).toBeInTheDocument()

        expect(
            screen.getByText('Evaluación nutricional inicial')
        ).toBeInTheDocument()

        expect(
            screen.getByText('Precio: $35.000')
        ).toBeInTheDocument()

        expect(
            screen.getByText('Stock disponible: 5')
        ).toBeInTheDocument()
    })

    test('el enlace vuelve a la lista de servicios', async () => {

        renderDetalle(1)

        expect(
            await screen.findByRole('link', { name: 'Volver a servicios' })
        ).toHaveAttribute('href', '/servicios')
    })

    test('muestra un mensaje si el servicio no existe', async () => {

        renderDetalle(99)

        expect(
            await screen.findByRole('heading', {
                name: 'Servicio no encontrado'
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('link', { name: 'Volver a servicios' })
        ).toHaveAttribute('href', '/servicios')
    })
})
