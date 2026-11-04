import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import DetalleProducto from './DetalleProducto'
import { renderConRuta } from '../test/utils'

const productos = [
    {
        id: 1,
        nombre: 'Primera consulta nutricional',
        descripcion: 'Evaluación inicial, antropometría y diseño del primer plan de alimentación',
        precio: '$35.000'
    },
    {
        id: 2,
        nombre: 'Control nutricional',
        descripcion: 'Seguimiento del progreso y ajustes al plan de alimentación',
        precio: '$25.000'
    },
    {
        id: 3,
        nombre: 'Teleconsulta nutricional',
        descripcion: 'Consulta nutricional realizada de manera online',
        precio: '$20.000'
    },
    {
        id: 4,
        nombre: 'Plan pérdida de peso',
        descripcion: 'Plan alimenticio personalizado enfocado en la pérdida de peso',
        precio: '$20.000'
    },
    {
        id: 5,
        nombre: 'Nutrición deportiva',
        descripcion: 'Plan nutricional orientado al rendimiento y actividad física',
        precio: '$20.000'
    },
    {
        id: 6,
        nombre: 'Antropometría completa',
        descripcion: 'Evaluación de medidas corporales y composición corporal',
        precio: '$20.000'
    }
]

function renderDetalle(id) {
    return renderConRuta(<DetalleProducto />, {
        route: `/servicio/${id}`,
        path: '/servicio/:id'
    })
}

describe('Página DetalleProducto', () => {

    test.each(productos)(
        'muestra el detalle del servicio $id',
        ({ id, nombre, descripcion, precio }) => {

            renderDetalle(id)

            expect(
                screen.getByRole('heading', { name: 'Detalle del servicio' })
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', { name: nombre })
            ).toBeInTheDocument()

            expect(
                screen.getByText(descripcion)
            ).toBeInTheDocument()

            expect(
                screen.getByText(`Precio: ${precio}`)
            ).toBeInTheDocument()
        }
    )

    test('el enlace vuelve a la lista de servicios', () => {

        renderDetalle(1)

        expect(
            screen.getByRole('link', { name: 'Volver a servicios' })
        ).toHaveAttribute('href', '/servicios')
    })

    test('muestra un mensaje si el servicio no existe', () => {

        renderDetalle(99)

        expect(
            screen.getByRole('heading', { name: 'Servicio no encontrado' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('link', { name: 'Volver a servicios' })
        ).toHaveAttribute('href', '/servicios')
    })
})
