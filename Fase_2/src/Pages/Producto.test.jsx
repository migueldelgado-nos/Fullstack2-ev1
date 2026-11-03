import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import Producto from './Producto'
import { renderConCarrito } from '../test/utils'

describe('Página Producto', () => {

    test('muestra el título y las seis tarjetas', () => {

        renderConCarrito(<Producto />)

        expect(
            screen.getByRole('heading', { name: 'Nuestros productos' })
        ).toBeInTheDocument()

        expect(
            screen.getAllByRole('button', { name: 'Agregar al carrito' })
        ).toHaveLength(6)
    })

    test('muestra los nombres de los servicios', () => {

        renderConCarrito(<Producto />)

        expect(
            screen.getByRole('heading', {
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
            route: '/productos?categoria=deportiva'
        })

        expect(
            screen.getByText('Categoría seleccionada: deportiva')
        ).toBeInTheDocument()
    })
})
