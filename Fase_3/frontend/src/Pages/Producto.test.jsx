import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import Producto from './Producto'
import { renderConCarrito } from '../test/utils'

describe('Página Producto', () => {

    test('muestra las tarjetas que vienen de la API', async () => {

        renderConCarrito(<Producto />)

        const botones = await screen.findAllByRole('button', {
            name: 'Agregar al carrito'
        })

        expect(botones).toHaveLength(3)
    })

    test('muestra los nombres de los servicios', async () => {

        renderConCarrito(<Producto />)

        expect(
            await screen.findByRole('heading', {
                name: 'Primera consulta nutricional'
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Control nutricional' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: 'Teleconsulta nutricional'
            })
        ).toBeInTheDocument()
    })

    test('no muestra la categoría si no viene en la URL', () => {

        renderConCarrito(<Producto />)

        expect(
            screen.queryByText(/Categoría seleccionada:/)
        ).not.toBeInTheDocument()
    })

    test('muestra la categoría cuando viene en la URL', () => {

        renderConCarrito(<Producto />, {
            route: '/servicios?categoria=deportiva'
        })

        expect(
            screen.getByText('Categoría seleccionada: deportiva')
        ).toBeInTheDocument()
    })
})
