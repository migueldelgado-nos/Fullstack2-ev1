import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import Navbar from './Navbar'

function renderNavbar(route = '/') {
    return render(
        <MemoryRouter initialEntries={[route]}>
            <Navbar />
        </MemoryRouter>
    )
}

describe('Componente Navbar', () => {

    test('muestra el título y los seis enlaces', () => {

        renderNavbar()

        expect(
            screen.getByRole('heading', {
                name: 'Clínica Nutricional NutriVida'
            })
        ).toBeInTheDocument()

        const enlaces = [
            ['Inicio', '/'],
            ['Productos', '/productos'],
            ['Login', '/login'],
            ['Registrarse', '/registro'],
            ['Administración', '/administracion'],
            ['Carrito', '/carrito']
        ]

        enlaces.forEach(([nombre, href]) => {
            expect(
                screen.getByRole('link', { name: nombre })
            ).toHaveAttribute('href', href)
        })
    })

    test('marca el enlace activo según la ruta', () => {

        renderNavbar('/carrito')

        expect(
            screen.getByRole('link', { name: 'Carrito' })
        ).toHaveClass('active')
    })

    test('no marca Inicio como activo en otras rutas', () => {

        renderNavbar('/productos')

        expect(
            screen.getByRole('link', { name: 'Inicio' })
        ).not.toHaveClass('active')

        expect(
            screen.getByRole('link', { name: 'Productos' })
        ).toHaveClass('active')
    })
})
