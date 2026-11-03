import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test } from 'vitest'
import App from './App'

describe('App', () => {

    beforeEach(() => {
        window.history.pushState({}, '', '/')
    })

    test('renderiza el inicio con la barra de navegación y el pie', () => {

        render(<App />)

        expect(
            screen.getByRole('heading', {
                name: 'Clínica Nutricional NutriVida'
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Bienvenido a NutriVida' })
        ).toBeInTheDocument()

        expect(
            screen.getByText('© 2026 Clínica Nutricional NutriVida')
        ).toBeInTheDocument()
    })

    test('navega a la página de productos', async () => {

        const user = userEvent.setup()

        render(<App />)

        await user.click(
            screen.getByRole('link', { name: 'Productos' })
        )

        expect(
            screen.getByRole('heading', { name: 'Nuestros productos' })
        ).toBeInTheDocument()
    })
})
